import os
import io
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QFileDialog, 
                               QMessageBox, QTableWidget, QTableWidgetItem,
                               QHeaderView, QComboBox, QApplication,
                               QSlider, QStackedWidget, QCheckBox)
from PySide6.QtCore import Qt
from PySide6.QtGui import QColor

import sys
import importlib.util

def is_installed(module_name):
    if getattr(sys, 'frozen', False):
        return True
    return importlib.util.find_spec(module_name) is not None

HAS_PIL = is_installed('PIL')

def format_size(size_bytes):
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"

class ImageCompressorTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.files_data = [] # { input_path, output_data, original_size, new_size, status, ext }
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Image Compressor & Upscaler")
        title.setStyleSheet("font-size: 20px; font-weight: bold;")
        layout.addWidget(title)

        if not HAS_PIL:
            warning = QLabel("Warning: 'Pillow' is not installed. Please install it:\n\npip install pillow\n\nThen restart the app.")
            warning.setStyleSheet("color: #ef4444; font-weight: bold; padding: 12px; background: #fee2e2; border-radius: 8px;")
            layout.addWidget(warning)

        # Controls Layout
        controls_layout = QHBoxLayout()
        
        self.add_btn = QPushButton("Add Images")
        self.add_btn.clicked.connect(self._add_images)
        controls_layout.addWidget(self.add_btn)

        self.clear_btn = QPushButton("Clear List")
        self.clear_btn.clicked.connect(self._clear_list)
        controls_layout.addWidget(self.clear_btn)

        controls_layout.addWidget(QLabel("Mode:"))
        
        self.mode_combo = QComboBox()
        self.mode_combo.addItems(["Compress (Reduce Size)", "Upscale (HD)"])
        self.mode_combo.currentIndexChanged.connect(self._on_mode_changed)
        controls_layout.addWidget(self.mode_combo)

        # Settings Stack
        self.settings_stack = QStackedWidget()
        
        # 1. Compress Settings
        compress_widget = QWidget()
        compress_layout = QHBoxLayout(compress_widget)
        compress_layout.setContentsMargins(0,0,0,0)
        
        compress_layout.addWidget(QLabel("Quality:"))
        self.quality_slider = QSlider(Qt.Horizontal)
        self.quality_slider.setRange(10, 100)
        self.quality_slider.setValue(70)
        compress_layout.addWidget(self.quality_slider)
        self.quality_label = QLabel("70%")
        compress_layout.addWidget(self.quality_label)
        self.quality_slider.valueChanged.connect(lambda v: self.quality_label.setText(f"{v}%"))
        
        compress_layout.addWidget(QLabel(" Resize:"))
        self.resize_slider = QSlider(Qt.Horizontal)
        self.resize_slider.setRange(10, 100)
        self.resize_slider.setValue(100)
        compress_layout.addWidget(self.resize_slider)
        self.resize_label = QLabel("100%")
        compress_layout.addWidget(self.resize_label)
        self.resize_slider.valueChanged.connect(lambda v: self.resize_label.setText(f"{v}%"))

        self.settings_stack.addWidget(compress_widget)
        
        # 2. Upscale Settings
        upscale_widget = QWidget()
        upscale_layout = QHBoxLayout(upscale_widget)
        upscale_layout.setContentsMargins(0,0,0,0)
        
        upscale_layout.addWidget(QLabel("Scale:"))
        self.scale_combo = QComboBox()
        self.scale_combo.addItems(["2x", "4x"])
        upscale_layout.addWidget(self.scale_combo)
        
        self.sharpen_check = QCheckBox("Apply Sharpen (Deblur)")
        self.sharpen_check.setChecked(True)
        upscale_layout.addWidget(self.sharpen_check)
        
        self.settings_stack.addWidget(upscale_widget)

        controls_layout.addWidget(self.settings_stack)

        self.process_btn = QPushButton("Process All")
        self.process_btn.clicked.connect(self._process_all)
        self.process_btn.setStyleSheet("background-color: #2563eb; color: white;")
        if not HAS_PIL:
            self.process_btn.setEnabled(False)
        controls_layout.addWidget(self.process_btn)

        self.save_all_btn = QPushButton("Save All")
        self.save_all_btn.clicked.connect(self._save_all)
        controls_layout.addWidget(self.save_all_btn)

        controls_layout.addStretch()
        layout.addLayout(controls_layout)

        # Table
        self.table = QTableWidget(0, 5)
        self.table.setHorizontalHeaderLabels(["Filename", "Original Size", "New Size", "Status", "Action"])
        self.table.horizontalHeader().setSectionResizeMode(0, QHeaderView.Stretch)
        self.table.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(2, QHeaderView.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(3, QHeaderView.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(4, QHeaderView.ResizeToContents)
        self.table.setEditTriggers(QTableWidget.NoEditTriggers)
        self.table.setSelectionBehavior(QTableWidget.SelectRows)
        layout.addWidget(self.table)

        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QPushButton {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 8px 16px;
                border-radius: 4px;
                color: #111827;
            }
            QPushButton:hover {
                background-color: #f8fafc;
            }
            QPushButton:disabled {
                background-color: #e2e8f0;
                color: #94a3b8;
            }
            QComboBox {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 8px;
                border-radius: 4px;
                color: #111827;
            }
            QTableWidget {
                border: 1px solid #cbd5e1;
                border-radius: 4px;
                background-color: #ffffff;
            }
            QHeaderView::section {
                background-color: #f8fafc;
                padding: 8px;
                border: 1px solid #cbd5e1;
                font-weight: bold;
            }
        """)

    def _on_mode_changed(self):
        self.settings_stack.setCurrentIndex(self.mode_combo.currentIndex())

    def _add_images(self):
        file_names, _ = QFileDialog.getOpenFileNames(self, "Select Images", "", "Images (*.png *.jpg *.jpeg *.webp)")
        if file_names:
            for file_name in file_names:
                if any(f['input_path'] == file_name for f in self.files_data):
                    continue
                orig_size = os.path.getsize(file_name)
                self.files_data.append({
                    'input_path': file_name,
                    'output_data': None,
                    'ext': os.path.splitext(file_name)[1].lower(),
                    'original_size': orig_size,
                    'new_size': None,
                    'status': 'Pending'
                })
            self._update_table()

    def _clear_list(self):
        self.files_data.clear()
        self._update_table()

    def _update_table(self):
        self.table.setRowCount(len(self.files_data))
        for row, data in enumerate(self.files_data):
            fname = os.path.basename(data['input_path'])
            self.table.setItem(row, 0, QTableWidgetItem(fname))
            self.table.setItem(row, 1, QTableWidgetItem(format_size(data['original_size'])))
            
            new_size_str = format_size(data['new_size']) if data['new_size'] else "-"
            self.table.setItem(row, 2, QTableWidgetItem(new_size_str))
            
            item_status = QTableWidgetItem(data['status'])
            if data['status'] == 'Pending':
                item_status.setForeground(QColor("#64748b"))
            elif data['status'] == 'Success':
                item_status.setForeground(QColor("#16a34a"))
            elif data['status'] == 'Error':
                item_status.setForeground(QColor("#dc2626"))
            elif data['status'] == 'Processing...':
                item_status.setForeground(QColor("#2563eb"))
            self.table.setItem(row, 3, item_status)
            
            save_btn = QPushButton("Save")
            save_btn.clicked.connect(lambda _, r=row: self._save_single(r))
            save_btn.setEnabled(data['output_data'] is not None)
            
            btn_wrapper = QWidget()
            btn_layout = QHBoxLayout(btn_wrapper)
            btn_layout.setContentsMargins(4, 4, 4, 4)
            btn_layout.addWidget(save_btn)
            self.table.setCellWidget(row, 4, btn_wrapper)

    def _process_all(self):
        if not HAS_PIL:
            return

        mode = self.mode_combo.currentIndex()
        
        self.process_btn.setEnabled(False)
        self.add_btn.setEnabled(False)
        self.clear_btn.setEnabled(False)

        for row, data in enumerate(self.files_data):
            if data['status'] == 'Success':
                continue
                
            data['status'] = 'Processing...'
            self._update_table()
            QApplication.processEvents()

            try:
                from PIL import Image, ImageEnhance
                with Image.open(data['input_path']) as img:
                    img = img.convert("RGB") # ensure compatibility for JPEG
                    
                    if mode == 0: # Compress
                        quality = self.quality_slider.value()
                        resize_pct = self.resize_slider.value() / 100.0
                        
                        if resize_pct < 1.0:
                            new_w = int(img.width * resize_pct)
                            new_h = int(img.height * resize_pct)
                            img = img.resize((new_w, new_h), Image.LANCZOS)
                            
                        out_io = io.BytesIO()
                        img.save(out_io, format="JPEG", quality=quality, optimize=True)
                        data['ext'] = ".jpg" # force jpg for size reduction
                        
                    elif mode == 1: # Upscale
                        scale = 2 if self.scale_combo.currentIndex() == 0 else 4
                        new_w = int(img.width * scale)
                        new_h = int(img.height * scale)
                        
                        # Use Lanczos for best standard upscaling
                        img = img.resize((new_w, new_h), Image.LANCZOS)
                        
                        # Apply sharpening if requested
                        if self.sharpen_check.isChecked():
                            enhancer = ImageEnhance.Sharpness(img)
                            img = enhancer.enhance(1.5) # moderate sharpness boost
                            
                        out_io = io.BytesIO()
                        orig_fmt = "PNG" if data['ext'] == ".png" else "JPEG"
                        img.save(out_io, format=orig_fmt, quality=95)
                    
                    result_bytes = out_io.getvalue()
                    data['output_data'] = result_bytes
                    data['new_size'] = len(result_bytes)
                    data['status'] = 'Success'
            except Exception as e:
                print(f"Error processing {data['input_path']}: {e}")
                data['status'] = 'Error'
                
            self._update_table()
            QApplication.processEvents()

        self.process_btn.setEnabled(True)
        self.add_btn.setEnabled(True)
        self.clear_btn.setEnabled(True)

    def _save_single(self, row):
        data = self.files_data[row]
        if not data['output_data']: return

        default_name = os.path.splitext(os.path.basename(data['input_path']))[0]
        if self.mode_combo.currentIndex() == 0:
            default_name += "_compressed"
        else:
            default_name += "_upscaled"
        default_name += data['ext']
            
        file_name, _ = QFileDialog.getSaveFileName(self, "Save Image", default_name, f"Image (*{data['ext']})")
        
        if file_name:
            try:
                with open(file_name, "wb") as f:
                    f.write(data['output_data'])
                QMessageBox.information(self, "Success", "Image saved successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save image:\n{str(e)}")

    def _save_all(self):
        successful = [d for d in self.files_data if d['output_data'] is not None]
        if not successful:
            QMessageBox.information(self, "No Data", "No successfully processed images to save.")
            return
            
        dir_name = QFileDialog.getExistingDirectory(self, "Select Directory to Save All Images")
        if dir_name:
            success_count = 0
            for data in successful:
                fname = os.path.splitext(os.path.basename(data['input_path']))[0]
                suffix = "_compressed" if self.mode_combo.currentIndex() == 0 else "_upscaled"
                full_path = os.path.join(dir_name, fname + suffix + data['ext'])
                try:
                    with open(full_path, "wb") as f:
                        f.write(data['output_data'])
                    success_count += 1
                except Exception as e:
                    print(f"Failed to save {full_path}: {e}")
            
            QMessageBox.information(self, "Save Complete", f"Successfully saved {success_count} out of {len(successful)} images.")
