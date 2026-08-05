from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QSlider, QFrame, QLineEdit)
from PySide6.QtGui import QGuiApplication, QColor
from PySide6.QtCore import Qt

class ShadowGeneratorTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.x_off = 10
        self.y_off = 10
        self.blur = 15
        self.spread = -3
        self.opacity = 20
        self._setup_ui()
        self._update_preview()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("CSS Box Shadow Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        main = QHBoxLayout()
        main.setSpacing(32)
        main.setAlignment(Qt.AlignLeft)

        # Preview Area
        preview_container = QFrame()
        preview_container.setFixedSize(300, 300)
        preview_container.setStyleSheet("background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px;")
        pc_layout = QVBoxLayout(preview_container)
        pc_layout.setAlignment(Qt.AlignCenter)

        self.box = QLabel("Preview")
        self.box.setAlignment(Qt.AlignCenter)
        self.box.setFixedSize(150, 150)
        self.box.setStyleSheet("background-color: #ffffff; border-radius: 16px; font-weight: bold; font-size: 16px; color: #64748b;")
        
        from PySide6.QtWidgets import QGraphicsDropShadowEffect
        self.shadow_effect = QGraphicsDropShadowEffect()
        self.box.setGraphicsEffect(self.shadow_effect)
        
        pc_layout.addWidget(self.box)
        main.addWidget(preview_container)

        # Controls
        ctrl = QVBoxLayout()
        ctrl.setSpacing(16)

        def make_slider(label_text, min_val, max_val, default_val, callback):
            l = QHBoxLayout()
            l.addWidget(QLabel(label_text))
            val_lbl = QLabel(str(default_val))
            val_lbl.setFixedWidth(30)
            l.addWidget(val_lbl)
            
            s = QSlider(Qt.Horizontal)
            s.setRange(min_val, max_val)
            s.setValue(default_val)
            s.setMinimumWidth(200)
            
            def on_change(v):
                val_lbl.setText(str(v))
                callback(v)
                
            s.valueChanged.connect(on_change)
            l.addWidget(s)
            ctrl.addLayout(l)
            return s

        make_slider("X-Offset:", -50, 50, self.x_off, self._set_x)
        make_slider("Y-Offset:", -50, 50, self.y_off, self._set_y)
        make_slider("Blur:", 0, 100, self.blur, self._set_blur)
        make_slider("Spread:", -50, 50, self.spread, self._set_spread)
        make_slider("Opacity (%):", 0, 100, self.opacity, self._set_opacity)

        ctrl.addWidget(QLabel("CSS Output:"))
        self.css_out = QLineEdit()
        self.css_out.setReadOnly(True)
        ctrl.addWidget(self.css_out)

        btn = QPushButton("Copy CSS")
        btn.clicked.connect(lambda: QGuiApplication.clipboard().setText(self.css_out.text()))
        ctrl.addWidget(btn)
        
        main.addLayout(ctrl)
        layout.addLayout(main)
        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QLineEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 10px;
                border-radius: 6px;
                color: #111827;
                font-family: Consolas, monospace;
            }
            QPushButton {
                background-color: #111827;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                color: white;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #374151; }
        """)

    def _set_x(self, v): self.x_off = v; self._update_preview()
    def _set_y(self, v): self.y_off = v; self._update_preview()
    def _set_blur(self, v): self.blur = v; self._update_preview()
    def _set_spread(self, v): self.spread = v; self._update_preview()
    def _set_opacity(self, v): self.opacity = v; self._update_preview()

    def _update_preview(self):
        # Update effect parameters
        self.shadow_effect.setOffset(self.x_off, self.y_off)
        self.shadow_effect.setBlurRadius(self.blur)
        
        alpha = int((self.opacity / 100) * 255)
        self.shadow_effect.setColor(QColor(0, 0, 0, alpha))
        
        # Qt's DropShadowEffect doesn't support spread directly, but it's okay for preview
        self.box.update()

        # Update CSS string
        op = self.opacity / 100.0
        css = f"box-shadow: {self.x_off}px {self.y_off}px {self.blur}px {self.spread}px rgba(0, 0, 0, {op:.2f});"
        self.css_out.setText(css)
