from PySide6.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QFrame, QPushButton
from PySide6.QtCore import Qt

class TouchTargetTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        header = QLabel("Touch Target Guidelines")
        header.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(header)
        
        desc = QLabel("Human fingers are imprecise. A minimum touch target size is required to prevent accidental taps and ensure accessibility.")
        desc.setStyleSheet("color: #475569; font-size: 14px; margin-bottom: 16px;")
        desc.setWordWrap(True)
        layout.addWidget(desc)
        
        main_l = QHBoxLayout()
        main_l.setSpacing(32)
        
        # 1. Bad Example (Too Small)
        bad_card = self._create_example("Too Small (24x24)", 24, 24, "#ef4444", "Hard to tap accurately.\nFails accessibility guidelines.")
        main_l.addWidget(bad_card)
        
        # 2. Apple Standard (44pt)
        ios_card = self._create_example("iOS Standard (44x44 pt)", 44, 44, "#3b82f6", "Apple's Human Interface Guidelines\nminimum recommended size.")
        main_l.addWidget(ios_card)
        
        # 3. Android Standard (48dp)
        android_card = self._create_example("Android Standard (48x48 dp)", 48, 48, "#10b981", "Google Material Design\nminimum recommended size.")
        main_l.addWidget(android_card)
        
        main_l.addStretch()
        layout.addLayout(main_l)
        
        info = QLabel(
            "<b>Visual Size vs Touch Target</b><br><br>"
            "An icon doesn't need to be 48x48 visibly. The icon itself can be 24x24, but the <i>invisible padding</i> around it (the hitbox) should expand to at least 44x44 or 48x48. "
            "This allows the UI to look clean while still being highly accessible and easy to tap."
        )
        info.setStyleSheet("color: #334155; font-size: 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 24px;")
        info.setWordWrap(True)
        layout.addWidget(info)
        layout.addStretch()

    def _create_example(self, title, w, h, color, desc_text):
        card = QFrame()
        card.setFixedSize(280, 250)
        card.setStyleSheet("background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;")
        
        l = QVBoxLayout(card)
        l.setAlignment(Qt.AlignCenter)
        
        t = QLabel(f"<b>{title}</b>")
        t.setAlignment(Qt.AlignCenter)
        t.setStyleSheet(f"color: {color}; font-size: 16px; border: none;")
        l.addWidget(t)
        
        # Hitbox visual container (using a large frame to center the target)
        stage = QFrame()
        stage.setFixedSize(120, 120)
        stage.setStyleSheet("background-color: transparent; border: 1px dashed #cbd5e1;")
        stage_l = QVBoxLayout(stage)
        stage_l.setAlignment(Qt.AlignCenter)
        
        target = QPushButton()
        target.setFixedSize(w, h)
        target.setCursor(Qt.PointingHandCursor)
        target.setStyleSheet(f"""
            QPushButton {{
                background-color: {color}; 
                border-radius: {w//2}px;
                border: none;
            }}
            QPushButton:hover {{
                background-color: #111827;
            }}
        """)
        stage_l.addWidget(target)
        l.addWidget(stage, alignment=Qt.AlignCenter)
        
        d = QLabel(desc_text)
        d.setAlignment(Qt.AlignCenter)
        d.setStyleSheet("color: #64748b; font-size: 12px; border: none;")
        l.addWidget(d)
        
        return card
