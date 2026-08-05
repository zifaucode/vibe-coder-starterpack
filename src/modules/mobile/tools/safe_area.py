from PySide6.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QFrame, QPushButton, QCheckBox
from PySide6.QtCore import Qt

class SafeAreaTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.show_danger = False
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        header = QLabel("Safe Area Simulator")
        header.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(header)
        
        desc = QLabel("Visualize the safe areas of modern smartphones. Avoid placing critical interactive elements in the danger zones.")
        desc.setStyleSheet("color: #475569; font-size: 14px; margin-bottom: 16px;")
        desc.setWordWrap(True)
        layout.addWidget(desc)
        
        main_layout = QHBoxLayout()
        
        # Phone Simulator
        self.phone = QFrame()
        self.phone.setFixedSize(300, 600)
        self.phone.setStyleSheet("background-color: #ffffff; border: 12px solid #1e293b; border-radius: 36px;")
        
        p_layout = QVBoxLayout(self.phone)
        p_layout.setContentsMargins(0, 0, 0, 0)
        
        # Top Notch/Status Bar
        self.top_zone = QFrame()
        self.top_zone.setFixedHeight(44)
        self.top_zone.setStyleSheet("background-color: transparent;")
        
        # Notch visual
        notch = QFrame(self.top_zone)
        notch.setFixedSize(120, 30)
        notch.setStyleSheet("background-color: #1e293b; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border-top-left-radius: 0; border-top-right-radius: 0;")
        notch.move(90, 0) # (300 - 120)/2 - 12 (border) = 90 approx
        
        # Safe Area Content
        self.content_zone = QFrame()
        self.content_zone.setStyleSheet("background-color: #f8fafc;")
        content_l = QVBoxLayout(self.content_zone)
        content_l.setAlignment(Qt.AlignCenter)
        self.content_lbl = QLabel("Safe Area\nPlace your content here")
        self.content_lbl.setAlignment(Qt.AlignCenter)
        self.content_lbl.setStyleSheet("color: #10b981; font-weight: bold; font-size: 16px;")
        content_l.addWidget(self.content_lbl)
        
        # Bottom Home Indicator
        self.bottom_zone = QFrame()
        self.bottom_zone.setFixedHeight(34)
        self.bottom_zone.setStyleSheet("background-color: transparent;")
        
        indicator = QFrame(self.bottom_zone)
        indicator.setFixedSize(100, 4)
        indicator.setStyleSheet("background-color: #1e293b; border-radius: 2px;")
        indicator.move(100, 20)
        
        p_layout.addWidget(self.top_zone)
        p_layout.addWidget(self.content_zone)
        p_layout.addWidget(self.bottom_zone)
        
        main_layout.addWidget(self.phone, alignment=Qt.AlignCenter)
        
        # Controls & Info
        ctrl_panel = QVBoxLayout()
        ctrl_panel.setAlignment(Qt.AlignTop)
        
        self.toggle_btn = QCheckBox("Show Danger Zones (Red)")
        self.toggle_btn.setStyleSheet("font-size: 16px; font-weight: bold; color: #ef4444;")
        self.toggle_btn.stateChanged.connect(self._toggle_danger)
        ctrl_panel.addWidget(self.toggle_btn)
        
        info = QLabel(
            "<b>Why do we need Safe Areas?</b><br><br>"
            "1. <b>Status Bar / Notch:</b> Hardware cameras and system icons (time, battery) occupy the top edge. Content placed here will be obscured.<br><br>"
            "2. <b>Home Indicator:</b> Modern phones use gestures. Swiping from the bottom goes Home. If you place buttons too close to the bottom edge, users might accidentally trigger system gestures instead of your app's button.<br><br>"
            "<i>Recommendation: Always add at least 34pt padding at the bottom and 44pt padding at the top of your full-screen designs.</i>"
        )
        info.setStyleSheet("color: #334155; font-size: 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px;")
        info.setWordWrap(True)
        info.setFixedWidth(350)
        ctrl_panel.addWidget(info)
        
        main_layout.addLayout(ctrl_panel)
        main_layout.addStretch()
        
        layout.addLayout(main_layout)

    def _toggle_danger(self, state):
        if state == Qt.Checked:
            self.top_zone.setStyleSheet("background-color: rgba(239, 68, 68, 0.4); border: 1px dashed red;")
            self.bottom_zone.setStyleSheet("background-color: rgba(239, 68, 68, 0.4); border: 1px dashed red;")
        else:
            self.top_zone.setStyleSheet("background-color: transparent;")
            self.bottom_zone.setStyleSheet("background-color: transparent;")
