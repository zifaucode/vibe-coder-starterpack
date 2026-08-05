from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QSlider, QFrame, QLineEdit, QCheckBox)
from PySide6.QtGui import QGuiApplication
from PySide6.QtCore import Qt

class BorderRadiusTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.tl = 20
        self.tr = 20
        self.bl = 20
        self.br = 20
        self.sync = True
        self._setup_ui()
        self._update_preview()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("Border Radius Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        main = QHBoxLayout()
        main.setSpacing(32)
        main.setAlignment(Qt.AlignLeft)

        # Preview Area
        preview_container = QFrame()
        preview_container.setFixedSize(300, 300)
        preview_container.setStyleSheet("background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;")
        pc_layout = QVBoxLayout(preview_container)
        pc_layout.setAlignment(Qt.AlignCenter)

        self.box = QFrame()
        self.box.setFixedSize(200, 200)
        pc_layout.addWidget(self.box)
        main.addWidget(preview_container)

        # Controls
        ctrl = QVBoxLayout()
        ctrl.setSpacing(16)
        
        self.sync_cb = QCheckBox("Sync All Corners")
        self.sync_cb.setChecked(True)
        self.sync_cb.toggled.connect(self._toggle_sync)
        ctrl.addWidget(self.sync_cb)

        self.sliders = {}
        def make_slider(key, label_text, default_val):
            l = QHBoxLayout()
            l.addWidget(QLabel(label_text))
            val_lbl = QLabel(f"{default_val}px")
            val_lbl.setFixedWidth(40)
            l.addWidget(val_lbl)
            
            s = QSlider(Qt.Horizontal)
            s.setRange(0, 150)
            s.setValue(default_val)
            s.setMinimumWidth(200)
            
            def on_change(v):
                if self.sync and self.sender() == self.sliders[key]:
                    # Update all others silently
                    for k, sl in self.sliders.items():
                        if sl != self.sender():
                            sl.blockSignals(True)
                            sl.setValue(v)
                            sl.blockSignals(False)
                            # update their labels...
                
                # set self value
                setattr(self, key, v)
                self._update_preview()
                
            s.valueChanged.connect(on_change)
            l.addWidget(s)
            ctrl.addLayout(l)
            self.sliders[key] = s
            return val_lbl

        self.tl_lbl = make_slider("tl", "Top Left:", self.tl)
        self.tr_lbl = make_slider("tr", "Top Right:", self.tr)
        self.bl_lbl = make_slider("bl", "Bottom Left:", self.bl)
        self.br_lbl = make_slider("br", "Bottom Right:", self.br)

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

    def _toggle_sync(self, checked):
        self.sync = checked
        if checked:
            v = self.tl
            for s in self.sliders.values():
                s.setValue(v)

    def _update_preview(self):
        # ensure labels match
        self.tl_lbl.setText(f"{self.tl}px")
        self.tr_lbl.setText(f"{self.tr}px")
        self.bl_lbl.setText(f"{self.bl}px")
        self.br_lbl.setText(f"{self.br}px")

        # Update box style
        qss = f"""
            background-color: #3b82f6;
            border-top-left-radius: {self.tl}px;
            border-top-right-radius: {self.tr}px;
            border-bottom-left-radius: {self.bl}px;
            border-bottom-right-radius: {self.br}px;
        """
        self.box.setStyleSheet(qss)

        # Update CSS string
        if self.sync:
            css = f"border-radius: {self.tl}px;"
        else:
            css = f"border-radius: {self.tl}px {self.tr}px {self.br}px {self.bl}px;"
        self.css_out.setText(css)
