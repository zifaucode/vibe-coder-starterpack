from PySide6.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QFrame, QScrollArea, QGridLayout
from PySide6.QtCore import Qt

class DeviceFrameTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        header = QLabel("Device Viewport Reference")
        header.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(header)
        
        desc = QLabel("Standard viewport sizes for mobile design. Use these dimensions as your artboard sizes in Figma/XD.")
        desc.setStyleSheet("color: #475569; font-size: 14px; margin-bottom: 16px;")
        desc.setWordWrap(True)
        layout.addWidget(desc)

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        
        container = QWidget()
        container.setStyleSheet("background: transparent;")
        grid = QGridLayout(container)
        grid.setSpacing(24)

        devices = [
            ("iPhone 14/15", 390, 844, "iOS Base"),
            ("iPhone Pro Max", 430, 932, "iOS Large"),
            ("Android Small", 360, 800, "Material Base"),
            ("Android Large", 412, 915, "Material Large"),
            ("iPad Mini", 744, 1133, "Tablet"),
        ]

        row, col = 0, 0
        for name, w, h, category in devices:
            card = self._create_device_card(name, w, h, category)
            grid.addWidget(card, row, col)
            col += 1
            if col > 2:
                col = 0
                row += 1
                
        # Fill empty space
        grid.setRowStretch(row + 1, 1)

        scroll.setWidget(container)
        layout.addWidget(scroll)

    def _create_device_card(self, name, w, h, category):
        card = QFrame()
        card.setStyleSheet("background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;")
        card.setFixedSize(220, 300)
        
        cl = QVBoxLayout(card)
        cl.setAlignment(Qt.AlignCenter)
        
        # Draw a visual proportional representation
        # scale down by a factor to fit in 200x200
        scale = 180 / max(w, h)
        dw = int(w * scale)
        dh = int(h * scale)
        
        mock = QFrame()
        mock.setFixedSize(dw, dh)
        mock.setStyleSheet("background-color: #f1f5f9; border: 2px solid #94a3b8; border-radius: 12px;")
        
        cl.addWidget(mock, alignment=Qt.AlignCenter)
        
        info = QLabel(f"<b>{name}</b><br><span style='color:#64748b; font-size:12px;'>{category}</span><br><br><span style='color:#3b82f6; font-size:16px;'><b>{w} &times; {h}</b></span>")
        info.setAlignment(Qt.AlignCenter)
        cl.addWidget(info)
        
        return card
