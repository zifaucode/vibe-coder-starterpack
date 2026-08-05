from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QLineEdit, QColorDialog,
                               QFrame, QSlider)
from PySide6.QtGui import QColor, QGuiApplication
from PySide6.QtCore import Qt

class GradientGeneratorTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.color1 = QColor("#4facfe")
        self.color2 = QColor("#00f2fe")
        self.angle = 90
        self._setup_ui()
        self._update_gradient()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(24)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("Gradient Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        main_layout = QHBoxLayout()
        main_layout.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        main_layout.setSpacing(32)

        # Preview Frame
        self.preview_frame = QFrame()
        self.preview_frame.setFixedSize(300, 200)
        self.preview_frame.setStyleSheet("border-radius: 8px;")
        main_layout.addWidget(self.preview_frame)

        # Controls
        controls_layout = QVBoxLayout()
        controls_layout.setAlignment(Qt.AlignTop)
        controls_layout.setSpacing(16)

        # Color 1
        c1_layout = QHBoxLayout()
        c1_layout.addWidget(QLabel("Start Color:"))
        self.c1_btn = QPushButton(self.color1.name())
        self.c1_btn.clicked.connect(lambda: self._pick_color(1))
        c1_layout.addWidget(self.c1_btn)
        controls_layout.addLayout(c1_layout)

        # Color 2
        c2_layout = QHBoxLayout()
        c2_layout.addWidget(QLabel("End Color:"))
        self.c2_btn = QPushButton(self.color2.name())
        self.c2_btn.clicked.connect(lambda: self._pick_color(2))
        c2_layout.addWidget(self.c2_btn)
        controls_layout.addLayout(c2_layout)

        # Angle
        angle_layout = QHBoxLayout()
        angle_layout.addWidget(QLabel("Angle (deg):"))
        self.angle_label = QLabel(f"{self.angle}°")
        angle_layout.addWidget(self.angle_label)
        controls_layout.addLayout(angle_layout)

        self.angle_slider = QSlider(Qt.Horizontal)
        self.angle_slider.setMinimumWidth(200)
        self.angle_slider.setRange(0, 360)
        self.angle_slider.setValue(self.angle)
        self.angle_slider.valueChanged.connect(self._on_angle_changed)
        controls_layout.addWidget(self.angle_slider)

        # Code Output
        controls_layout.addWidget(QLabel("CSS Output:"))
        self.css_output = QLineEdit()
        self.css_output.setReadOnly(True)
        controls_layout.addWidget(self.css_output)

        copy_btn = QPushButton("Copy CSS")
        copy_btn.clicked.connect(self._copy_css)
        controls_layout.addWidget(copy_btn)

        controls_layout.addWidget(copy_btn)

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
                font-family: monospace;
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
            QSlider::groove:horizontal {
                border: 1px solid #cbd5e1;
                height: 8px;
                background: #f1f5f9;
                margin: 2px 0;
                border-radius: 4px;
            }
            QSlider::handle:horizontal {
                background: #111827;
                border: 1px solid #111827;
                width: 16px;
                margin: -4px 0;
                border-radius: 8px;
            }
        """)

    def _pick_color(self, num):
        initial = self.color1 if num == 1 else self.color2
        color = QColorDialog.getColor(initial, self, "Pick Color")
        if color.isValid():
            if num == 1:
                self.color1 = color
                self.c1_btn.setText(color.name())
            else:
                self.color2 = color
                self.c2_btn.setText(color.name())
            self._update_gradient()

    def _on_angle_changed(self, value):
        self.angle = value
        self.angle_label.setText(f"{value}°")
        self._update_gradient()

    def _update_gradient(self):
        # Update preview frame using qlineargradient
        # Convert angle for qlineargradient (0 is right to left, 90 is bottom to top in Qt)
        # However, for simplicity in styling, we can use qlineargradient with x1,y1 to x2,y2
        # Or standard QSS gradient syntax which accepts angle in QLinearGradient (spread:pad, x1, y1, x2, y2)
        import math
        rad = math.radians(self.angle - 90) # Adjust so 0 is top, 90 is right
        x2 = 0.5 + 0.5 * math.cos(rad)
        y2 = 0.5 + 0.5 * math.sin(rad)
        x1 = 0.5 - 0.5 * math.cos(rad)
        y1 = 0.5 - 0.5 * math.sin(rad)
        
        qss = f"background-color: qlineargradient(spread:pad, x1:{x1:.2f}, y1:{y1:.2f}, x2:{x2:.2f}, y2:{y2:.2f}, stop:0 {self.color1.name()}, stop:1 {self.color2.name()}); border-radius: 8px;"
        self.preview_frame.setStyleSheet(qss)
        
        # Update CSS text
        css = f"background: linear-gradient({self.angle}deg, {self.color1.name()}, {self.color2.name()});"
        self.css_output.setText(css)

    def _copy_css(self):
        QGuiApplication.clipboard().setText(self.css_output.text())
