import io
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QFileDialog, 
                               QMessageBox, QSizePolicy, QScrollArea)
from PySide6.QtCore import Qt, QSize, QThread, Signal
from PySide6.QtGui import QPixmap, QImage

import sys
import importlib.util

def is_installed(module_name):
    if getattr(sys, 'frozen', False):
        return True
    return importlib.util.find_spec(module_name) is not None

HAS_REMBG = is_installed('rembg') and is_installed('PIL')

class RembgThread(QThread):
    finished_signal = Signal(bytes)
    error_signal = Signal(str)
    
    def __init__(self, input_path):
        super().__init__()
        self.input_path = input_path
        
    def run(self):
        try:
            from rembg import remove
            with open(self.input_path, "rb") as f:
                input_bytes = f.read()
            output_bytes = remove(input_bytes)
            self.finished_signal.emit(output_bytes)
        except Exception as e:
            self.error_signal.emit(str(e))


class RemoveBackgroundTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.input_image_path = None
        self.output_image_data = None
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Remove Background")
        title.setStyleSheet("font-size: 20px; font-weight: bold;")
        layout.addWidget(title)

        if not HAS_REMBG:
            warning = QLabel("Warning: 'rembg' and 'Pillow' are not installed.\nPlease install them via terminal:\n\npip install rembg pillow\n\nThen restart the app.")
            warning.setStyleSheet("color: #ef4444; font-weight: bold; padding: 12px; background: #fee2e2; border-radius: 8px;")
            layout.addWidget(warning)

        # Actions
        actions_layout = QHBoxLayout()
        
        self.select_btn = QPushButton("Select Image")
        self.select_btn.clicked.connect(self._select_image)
        actions_layout.addWidget(self.select_btn)

        self.process_btn = QPushButton("Remove Background")
        self.process_btn.clicked.connect(self._process_image)
        self.process_btn.setEnabled(False)
        if not HAS_REMBG:
            self.process_btn.setEnabled(False)
        actions_layout.addWidget(self.process_btn)

        self.save_btn = QPushButton("Save Image")
        self.save_btn.clicked.connect(self._save_image)
        self.save_btn.setEnabled(False)
        actions_layout.addWidget(self.save_btn)

        actions_layout.addStretch()
        layout.addLayout(actions_layout)

        # Images display area
        images_layout = QHBoxLayout()
        
        # Input display
        self.input_label = QLabel("No Image Selected")
        self.input_label.setAlignment(Qt.AlignCenter)
        self.input_label.setStyleSheet("background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 300px;")
        self.input_label.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        images_layout.addWidget(self.input_label)

        # Output display
        self.output_label = QLabel("Preview")
        self.output_label.setAlignment(Qt.AlignCenter)
        self.output_label.setStyleSheet("background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 300px;")
        self.output_label.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        images_layout.addWidget(self.output_label)

        layout.addLayout(images_layout)
        layout.setStretch(2, 1)
        
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
        """)

    def _select_image(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "Select Image", "", "Images (*.png *.jpg *.jpeg *.bmp *.webp)")
        if file_name:
            self.input_image_path = file_name
            pixmap = QPixmap(file_name)
            # Scale down for display if too large
            if pixmap.width() > 600 or pixmap.height() > 600:
                pixmap = pixmap.scaled(600, 600, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            self.input_label.setPixmap(pixmap)
            self.output_label.clear()
            self.output_label.setText("Ready to process")
            self.output_image_data = None
            self.save_btn.setEnabled(False)
            if HAS_REMBG:
                self.process_btn.setEnabled(True)

    def _process_image(self):
        if not self.input_image_path or not HAS_REMBG:
            return

        self.process_btn.setText("Memproses (Loading AI)...")
        self.process_btn.setEnabled(False)
        self.select_btn.setEnabled(False)
        
        self.output_label.setStyleSheet("background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 300px; color: #2563eb; font-weight: bold;")
        self.output_label.setText("Sedang menghapus background...\nMohon tunggu beberapa detik ⏳")
        self.repaint() # Force UI update

        self.thread = RembgThread(self.input_image_path)
        self.thread.finished_signal.connect(self._on_process_finished)
        self.thread.error_signal.connect(self._on_process_error)
        self.thread.start()

    def _on_process_finished(self, output_bytes):
        self.output_image_data = output_bytes
        
        pixmap = QPixmap()
        pixmap.loadFromData(output_bytes)
        if pixmap.width() > 600 or pixmap.height() > 600:
            pixmap = pixmap.scaled(600, 600, Qt.KeepAspectRatio, Qt.SmoothTransformation)
        
        self.output_label.setStyleSheet("background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 300px; color: #111827;")
        self.output_label.setPixmap(pixmap)
        
        self.save_btn.setEnabled(True)
        self.process_btn.setText("Remove Background")
        self.process_btn.setEnabled(True)
        self.select_btn.setEnabled(True)

    def _on_process_error(self, err_msg):
        QMessageBox.critical(self, "Error", f"Failed to remove background:\n{err_msg}")
        self.output_label.setStyleSheet("background-color: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; min-height: 300px; color: #dc2626;")
        self.output_label.setText("Error memproses gambar.")
        self.process_btn.setText("Remove Background")
        self.process_btn.setEnabled(True)
        self.select_btn.setEnabled(True)

    def _save_image(self):
        if not self.output_image_data:
            return
            
        file_name, _ = QFileDialog.getSaveFileName(self, "Save Image", "output_no_bg.png", "PNG Images (*.png)")
        if file_name:
            try:
                with open(file_name, "wb") as f:
                    f.write(self.output_image_data)
                QMessageBox.information(self, "Success", "Image saved successfully!")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save image:\n{str(e)}")
