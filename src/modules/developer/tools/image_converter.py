import os
import io
import base64
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QFileDialog, 
                               QMessageBox, QTableWidget, QTableWidgetItem,
                               QHeaderView, QComboBox, QApplication)
from PySide6.QtCore import Qt
from PySide6.QtGui import QColor

import sys
import importlib.util

def is_installed(module_name):
    if getattr(sys, 'frozen', False):
        return True
    return importlib.util.find_spec(module_name) is not None

HAS_PIL = is_installed('PIL')
HAS_VTRACER = is_installed('vtracer')

class ImageConverterTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.files_data = [] # List of dicts: { input_path, output_data, output_ext, status }
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Batch Image Converter")
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

        controls_layout.addWidget(QLabel("Convert to:"))
        
        self.format_combo = QComboBox()
        self.format_combo.addItems(["WebP", "SVG (Vectorized - requires vtracer)", "SVG (Base64 Embed)"])
        controls_layout.addWidget(self.format_combo)

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
        self.table = QTableWidget(0, 3)
        self.table.setHorizontalHeaderLabels(["Filename", "Status", "Action"])
        self.table.horizontalHeader().setSectionResizeMode(0, QHeaderView.Stretch)
        self.table.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(2, QHeaderView.ResizeToContents)
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

    def _add_images(self):
        file_names, _ = QFileDialog.getOpenFileNames(self, "Select Images", "", "Images (*.png *.jpg *.jpeg)")
        if file_names:
            for file_name in file_names:
                # Avoid duplicates
                if any(f['input_path'] == file_name for f in self.files_data):
                    continue
                self.files_data.append({
                    'input_path': file_name,
                    'output_data': None,
                    'output_ext': None,
                    'status': 'Pending'
                })
            self._update_table()

    def _clear_list(self):
        self.files_data.clear()
        self._update_table()

    def _update_table(self):
        self.table.setRowCount(len(self.files_data))
        for row, data in enumerate(self.files_data):
            # Filename
            fname = os.path.basename(data['input_path'])
            item_name = QTableWidgetItem(fname)
            self.table.setItem(row, 0, item_name)
            
            # Status
            item_status = QTableWidgetItem(data['status'])
            if data['status'] == 'Pending':
                item_status.setForeground(QColor("#64748b"))
            elif data['status'] == 'Success':
                item_status.setForeground(QColor("#16a34a"))
            elif data['status'] == 'Error':
                item_status.setForeground(QColor("#dc2626"))
            elif data['status'] == 'Processing...':
                item_status.setForeground(QColor("#2563eb"))
            self.table.setItem(row, 1, item_status)
            
            # Action button
            save_btn = QPushButton("Save")
            save_btn.clicked.connect(lambda _, r=row: self._save_single(r))
            save_btn.setEnabled(data['output_data'] is not None)
            
            # Wrapper to center the button
            btn_wrapper = QWidget()
            btn_layout = QHBoxLayout(btn_wrapper)
            btn_layout.setContentsMargins(4, 4, 4, 4)
            btn_layout.addWidget(save_btn)
            self.table.setCellWidget(row, 2, btn_wrapper)

    def _process_all(self):
        if not HAS_PIL:
            return

        target_format = self.format_combo.currentIndex()
        if target_format == 1 and not HAS_VTRACER:
            QMessageBox.warning(self, "Missing Library", "To use vectorized SVG, please install vtracer:\n\npip install vtracer")
            return

        self.process_btn.setEnabled(False)
        self.add_btn.setEnabled(False)
        self.clear_btn.setEnabled(False)

        for row, data in enumerate(self.files_data):
            if data['status'] == 'Success':
                continue # Skip already processed
                
            data['status'] = 'Processing...'
            self._update_table()
            QApplication.processEvents()

            try:
                input_path = data['input_path']
                
                if target_format == 0: # WebP
                    from PIL import Image
                    with Image.open(input_path) as img:
                        out_io = io.BytesIO()
                        img.save(out_io, format="WEBP")
                        data['output_data'] = out_io.getvalue()
                        data['output_ext'] = '.webp'
                        
                elif target_format == 1: # SVG Vectorized (vtracer)
                    # vtracer works with file paths. We'll save to a temp file then read it.
                    import tempfile
                    import vtracer
                    fd, temp_path = tempfile.mkstemp(suffix=".svg")
                    os.close(fd)
                    
                    vtracer.convert_image_to_svg_py(input_path, temp_path)
                    
                    with open(temp_path, "rb") as f:
                        data['output_data'] = f.read()
                    os.remove(temp_path)
                    data['output_ext'] = '.svg'
                    
                elif target_format == 2: # SVG Base64
                    with open(input_path, "rb") as f:
                        img_bytes = f.read()
                    
                    b64_str = base64.b64encode(img_bytes).decode("utf-8")
                    from PIL import Image
                    with Image.open(input_path) as img:
                        w, h = img.size
                    
                    ext = os.path.splitext(input_path)[1].lower()
                    mime_type = "image/jpeg" if ext in ['.jpg', '.jpeg'] else "image/png"
                    
                    svg_content = f'''<svg width="{w}" height="{h}" xmlns="http://www.w3.org/2000/svg">
  <image href="data:{mime_type};base64,{b64_str}" width="{w}" height="{h}" />
</svg>'''
                    data['output_data'] = svg_content.encode('utf-8')
                    data['output_ext'] = '.svg'

                data['status'] = 'Success'
            except Exception as e:
                print(f"Error processing {input_path}: {e}")
                data['status'] = 'Error'
                
            self._update_table()
            QApplication.processEvents()

        self.process_btn.setEnabled(True)
        self.add_btn.setEnabled(True)
        self.clear_btn.setEnabled(True)

    def _save_single(self, row):
        data = self.files_data[row]
        if not data['output_data']: return

        default_name = os.path.splitext(os.path.basename(data['input_path']))[0] + data['output_ext']
        file_name, _ = QFileDialog.getSaveFileName(self, "Save Image", default_name, f"Image (*{data['output_ext']})")
        
        if file_name:
            try:
                with open(file_name, "wb") as f:
                    f.write(data['output_data'])
                QMessageBox.information(self, "Success", "Image saved successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save image:\n{str(e)}")

    def _save_all(self):
        # Filter items with success output
        successful = [d for d in self.files_data if d['output_data'] is not None]
        if not successful:
            QMessageBox.information(self, "No Data", "No successfully processed images to save.")
            return
            
        dir_name = QFileDialog.getExistingDirectory(self, "Select Directory to Save All Images")
        if dir_name:
            success_count = 0
            for data in successful:
                fname = os.path.splitext(os.path.basename(data['input_path']))[0] + data['output_ext']
                full_path = os.path.join(dir_name, fname)
                try:
                    with open(full_path, "wb") as f:
                        f.write(data['output_data'])
                    success_count += 1
                except Exception as e:
                    print(f"Failed to save {full_path}: {e}")
            
            QMessageBox.information(self, "Save Complete", f"Successfully saved {success_count} out of {len(successful)} images.")
