from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QLabel, QSlider, QFrame)
from PySide6.QtGui import QPainter, QColor
from PySide6.QtCore import Qt

class MobileGridTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.cols = 4
        self.margin = 16
        self.gutter = 16
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)
        
        title = QLabel("Mobile Grid Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        main = QHBoxLayout()
        
        # Grid Preview (Mock Mobile Screen)
        self.preview = QFrame()
        self.preview.setFixedSize(375, 667) # iPhone 8 size
        self.preview.setStyleSheet("background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 16px;")
        
        # Override paintEvent dynamically for simplicity
        self.preview.paintEvent = self._paint_grid
        main.addWidget(self.preview)

        # Controls
        ctrl = QVBoxLayout()
        ctrl.setSpacing(16)
        ctrl.setAlignment(Qt.AlignTop)

        def make_slider(lbl, min_v, max_v, def_v, callback):
            bx = QHBoxLayout()
            bx.addWidget(QLabel(lbl))
            v_lbl = QLabel(str(def_v))
            v_lbl.setFixedWidth(30)
            bx.addWidget(v_lbl)
            s = QSlider(Qt.Horizontal)
            s.setRange(min_v, max_v)
            s.setValue(def_v)
            s.setMinimumWidth(200)
            def on_c(v):
                v_lbl.setText(str(v))
                callback(v)
            s.valueChanged.connect(on_c)
            bx.addWidget(s)
            ctrl.addLayout(bx)
        
        make_slider("Columns:", 1, 12, self.cols, self._set_cols)
        make_slider("Margin (px):", 0, 100, self.margin, self._set_margin)
        make_slider("Gutter (px):", 0, 50, self.gutter, self._set_gutter)

        main.addLayout(ctrl)
        layout.addLayout(main)

    def _set_cols(self, v): self.cols = v; self.preview.update()
    def _set_margin(self, v): self.margin = v; self.preview.update()
    def _set_gutter(self, v): self.gutter = v; self.preview.update()

    def _paint_grid(self, event):
        # Draw the grid overlay
        painter = QPainter(self.preview)
        painter.setRenderHint(QPainter.Antialiasing)
        
        w = self.preview.width()
        h = self.preview.height()
        
        available_w = w - (self.margin * 2)
        total_gutter_w = (self.cols - 1) * self.gutter
        col_w = (available_w - total_gutter_w) / max(1, self.cols)
        
        # Draw columns (light red translucent)
        painter.setPen(Qt.NoPen)
        painter.setBrush(QColor(255, 0, 0, 50))
        
        x = self.margin
        for i in range(self.cols):
            painter.drawRect(x, 0, col_w, h)
            x += col_w + self.gutter
            
        painter.end()
