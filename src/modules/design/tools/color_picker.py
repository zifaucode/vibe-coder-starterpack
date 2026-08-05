from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QLineEdit, QColorDialog,
                               QFrame, QGridLayout)
from PySide6.QtGui import QColor, QClipboard, QGuiApplication, QPainter
from PySide6.QtCore import Qt

class ScreenPickerOverlay(QWidget):
    def __init__(self, callback):
        super().__init__()
        self.callback = callback
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint | Qt.Tool)
        self.setCursor(Qt.CrossCursor)
        
        # Calculate full virtual desktop geometry
        from PySide6.QtCore import QRect
        virtual_geometry = QRect()
        for screen in QGuiApplication.screens():
            virtual_geometry = virtual_geometry.united(screen.geometry())
            
        # Create a single pixmap spanning all screens
        from PySide6.QtGui import QPixmap
        self.pixmap = QPixmap(virtual_geometry.size())
        
        painter = QPainter(self.pixmap)
        for screen in QGuiApplication.screens():
            sp = screen.grabWindow(0)
            painter.drawPixmap(screen.geometry().topLeft() - virtual_geometry.topLeft(), sp)
        painter.end()
        
        self.setGeometry(virtual_geometry)

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.drawPixmap(0, 0, self.pixmap)

    def mousePressEvent(self, event):
        image = self.pixmap.toImage()
        color = image.pixelColor(event.position().toPoint())
        self.callback(color)
        self.close()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            self.close()

class ColorPickerTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.current_color = QColor("#111827") # Default blue
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(24)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("Color Picker")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        # Main Layout
        main_layout = QHBoxLayout()
        main_layout.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        main_layout.setSpacing(32)
        
        # Color Preview Frame
        self.preview_frame = QFrame()
        self.preview_frame.setFixedSize(160, 160)
        self.preview_frame.setStyleSheet(f"background-color: {self.current_color.name()}; border-radius: 8px; border: 1px solid #cbd5e1;")
        main_layout.addWidget(self.preview_frame)

        # Controls
        controls_layout = QVBoxLayout()
        controls_layout.setAlignment(Qt.AlignTop)
        controls_layout.setSpacing(16)
        
        # Pick Color Button
        btn_layout = QHBoxLayout()
        self.pick_btn = QPushButton("Pick Color (Dialog)")
        self.pick_btn.setFixedHeight(40)
        self.pick_btn.clicked.connect(self._open_color_dialog)
        
        self.eyedropper_btn = QPushButton("Pick from Screen")
        self.eyedropper_btn.setFixedHeight(40)
        self.eyedropper_btn.clicked.connect(self._start_eyedropper)
        
        btn_layout.addWidget(self.pick_btn)
        btn_layout.addWidget(self.eyedropper_btn)
        controls_layout.addLayout(btn_layout)

        # Inputs Grid
        grid = QGridLayout()
        grid.setSpacing(12)
        
        grid.addWidget(QLabel("HEX:"), 0, 0)
        self.hex_input = QLineEdit(self.current_color.name())
        grid.addWidget(self.hex_input, 0, 1)

        grid.addWidget(QLabel("RGB:"), 1, 0)
        self.rgb_input = QLineEdit(f"{self.current_color.red()}, {self.current_color.green()}, {self.current_color.blue()}")
        grid.addWidget(self.rgb_input, 1, 1)
        
        controls_layout.addLayout(grid)
        
        # Actions
        actions_layout = QHBoxLayout()
        copy_hex_btn = QPushButton("Copy HEX")
        copy_hex_btn.clicked.connect(lambda: self._copy_to_clipboard(self.hex_input.text()))
        actions_layout.addWidget(copy_hex_btn)

        copy_rgb_btn = QPushButton("Copy RGB")
        copy_rgb_btn.clicked.connect(lambda: self._copy_to_clipboard(f"rgb({self.rgb_input.text()})"))
        actions_layout.addWidget(copy_rgb_btn)
        
        controls_layout.addLayout(actions_layout)

        main_layout.addLayout(controls_layout)
        layout.addLayout(main_layout)
        
        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QLineEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 8px;
                border-radius: 4px;
                color: #111827;
            }
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
        """)

    def _open_color_dialog(self):
        color = QColorDialog.getColor(self.current_color, self, "Pick a Color")
        if color.isValid():
            self._update_color(color)

    def _update_color(self, color: QColor):
        self.current_color = color
        self.preview_frame.setStyleSheet(f"background-color: {color.name()}; border-radius: 8px;")
        self.hex_input.setText(color.name())
        self.rgb_input.setText(f"{color.red()}, {color.green()}, {color.blue()}")

    def _copy_to_clipboard(self, text: str):
        clipboard = QGuiApplication.clipboard()
        clipboard.setText(text)

    def _start_eyedropper(self):
        self.overlay = ScreenPickerOverlay(self._update_color)
        self.overlay.show()
