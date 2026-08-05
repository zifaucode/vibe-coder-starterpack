from PySide6.QtWidgets import (QWidget, QVBoxLayout, QLabel, 
                               QHBoxLayout, QPushButton, QGridLayout, QFrame)
from PySide6.QtCore import Qt, Signal

class ToolCard(QFrame):
    clicked = Signal(str)

    def __init__(self, title, description, icon, target_module, parent=None):
        super().__init__(parent)
        self.target_module = target_module
        
        self.setCursor(Qt.PointingHandCursor)
        self.setStyleSheet("""
            QFrame {
                background-color: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
            }
            QFrame:hover {
                background-color: #f8fafc;
                border-color: #cbd5e1;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
        """)
        
        layout = QVBoxLayout(self)
        layout.setContentsMargins(20, 20, 20, 20)
        
        icon_lbl = QLabel(icon)
        icon_lbl.setStyleSheet("font-size: 32px; border: none; background: transparent;")
        layout.addWidget(icon_lbl)
        
        title_lbl = QLabel(title)
        title_lbl.setStyleSheet("font-size: 18px; font-weight: bold; color: #111827; margin-top: 12px; border: none; background: transparent;")
        layout.addWidget(title_lbl)
        
        desc_lbl = QLabel(description)
        desc_lbl.setStyleSheet("font-size: 14px; color: #64748b; border: none; background: transparent;")
        desc_lbl.setWordWrap(True)
        layout.addWidget(desc_lbl)
        
        layout.addStretch()

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.clicked.emit(self.target_module)
            super().mousePressEvent(event)

class DashboardWidget(QWidget):
    request_search = Signal()
    request_navigate = Signal(str)

    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 32, 32, 32)
        layout.setSpacing(24)

        # Welcome Section
        welcome_label = QLabel("Welcome to Vibe Coder Starterpack")
        welcome_label.setStyleSheet("font-size: 28px; font-weight: bold; color: #111827;")
        layout.addWidget(welcome_label)

        subtitle_label = QLabel("One App. Less Browser Tabs. Faster Workflow.")
        subtitle_label.setStyleSheet("font-size: 16px; color: #64748b;")
        layout.addWidget(subtitle_label)

        # Quick Actions
        actions_layout = QHBoxLayout()
        search_btn = QPushButton("Search Tools (Ctrl + K)")
        search_btn.setObjectName("quick_action_btn")
        search_btn.setFixedHeight(48)
        search_btn.setCursor(Qt.PointingHandCursor)
        search_btn.setStyleSheet("""
            QPushButton#quick_action_btn {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                color: #475569;
                font-size: 14px;
                padding: 0 16px;
                text-align: left;
            }
            QPushButton#quick_action_btn:hover {
                background-color: #f8fafc;
                border-color: #94a3b8;
            }
        """)
        search_btn.clicked.connect(self.request_search.emit)
        actions_layout.addWidget(search_btn)
        actions_layout.addStretch()
        layout.addLayout(actions_layout)

        # Available Tools Grid
        tools_label = QLabel("Available Tools")
        tools_label.setStyleSheet("font-size: 18px; font-weight: bold; color: #111827; margin-top: 16px;")
        layout.addWidget(tools_label)

        grid_layout = QGridLayout()
        grid_layout.setSpacing(20)
        
        # Tool Cards
        design_card = ToolCard("🎨 Design Tools", "Access color palettes, typography, icons, and layout utilities.", "🎨", "Design Tools")
        design_card.clicked.connect(self.request_navigate.emit)
        grid_layout.addWidget(design_card, 0, 0)
        
        dev_card = ToolCard("💻 Developer Tools", "JSON formatters, regex testers, and base64 encoders.", "💻", "Developer Tools")
        dev_card.clicked.connect(self.request_navigate.emit)
        grid_layout.addWidget(dev_card, 0, 1)
        
        mobile_card = ToolCard("📱 Mobile Design", "Interactive glossary of native mobile UI design patterns.", "📱", "Mobile Design")
        mobile_card.clicked.connect(self.request_navigate.emit)
        grid_layout.addWidget(mobile_card, 1, 0)
        
        settings_card = ToolCard("⚙️ Settings", "Configure your application preferences and themes.", "⚙️", "Settings")
        settings_card.clicked.connect(self.request_navigate.emit)
        grid_layout.addWidget(settings_card, 1, 1)

        layout.addLayout(grid_layout)
        layout.addStretch()
