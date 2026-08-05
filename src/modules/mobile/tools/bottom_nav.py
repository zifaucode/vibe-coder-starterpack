from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QFrame)
from PySide6.QtCore import Qt

class BottomNavTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.tabs = ["Home", "Search", "Profile"]
        self.active_idx = 0
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        
        header = QLabel("Bottom Nav Simulator & Insights")
        header.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(header)
        
        main_layout = QHBoxLayout()
        
        # Phone Simulator
        self.phone = QFrame()
        self.phone.setFixedSize(300, 600)
        self.phone.setStyleSheet("background-color: #f8fafc; border: 12px solid #1e293b; border-radius: 36px;")
        
        p_layout = QVBoxLayout(self.phone)
        p_layout.setContentsMargins(0, 0, 0, 0)
        
        # Screen Content
        self.screen = QLabel("App Content")
        self.screen.setAlignment(Qt.AlignCenter)
        self.screen.setStyleSheet("font-size: 24px; color: #94a3b8; font-weight: bold; border: none;")
        p_layout.addWidget(self.screen)
        
        # Bottom Nav Container
        self.nav_container = QFrame()
        self.nav_container.setFixedHeight(80) # 56px content + 24px safe area padding
        self.nav_container.setStyleSheet("background-color: #ffffff; border-top: 1px solid #e2e8f0; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;")
        self.nav_layout = QHBoxLayout(self.nav_container)
        self.nav_layout.setContentsMargins(8, 8, 8, 24) # Bottom padding for home indicator
        self.nav_layout.setSpacing(0)
        
        p_layout.addWidget(self.nav_container)
        main_layout.addWidget(self.phone, alignment=Qt.AlignCenter)
        
        # Control Panel
        ctrl_panel = QVBoxLayout()
        ctrl_panel.setAlignment(Qt.AlignTop)
        
        btn_add = QPushButton("Add Tab")
        btn_add.clicked.connect(self._add_tab)
        btn_remove = QPushButton("Remove Tab")
        btn_remove.clicked.connect(self._remove_tab)
        btn_cycle = QPushButton("Cycle Active Tab")
        btn_cycle.clicked.connect(self._cycle_tab)
        
        for b in [btn_add, btn_remove, btn_cycle]:
            b.setStyleSheet("background-color: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px;")
            ctrl_panel.addWidget(b)
            
        info = QLabel(
            "<b>Design Guidelines: Bottom Navigation</b><br><br>"
            "• <b>Height:</b> Standard is 56dp (Android) or 49pt (iOS) for the content area, plus safe area padding at the bottom.<br><br>"
            "• <b>Quantity:</b> 3 to 5 destinations. More than 5 makes tap targets too small.<br><br>"
            "• <b>Contrast:</b> The active tab should clearly stand out. Use a filled icon or primary color. Inactive tabs should be grayed out or outlined.<br><br>"
            "• <b>Text Labels:</b> Highly recommended for clarity, size ~10-12px."
        )
        info.setStyleSheet("color: #334155; font-size: 14px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-top: 24px;")
        info.setWordWrap(True)
        info.setFixedWidth(350)
        ctrl_panel.addWidget(info)
        
        main_layout.addLayout(ctrl_panel)
        main_layout.addStretch()
        
        layout.addLayout(main_layout)
        self._render_tabs()

    def _render_tabs(self):
        # Clear existing
        while self.nav_layout.count():
            child = self.nav_layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()
                
        for i, text in enumerate(self.tabs):
            tab = QFrame()
            tab.setStyleSheet("background: transparent; border: none;")
            tab_l = QVBoxLayout(tab)
            tab_l.setContentsMargins(0,0,0,0)
            tab_l.setSpacing(4)
            tab_l.setAlignment(Qt.AlignCenter)
            
            icon = QFrame()
            icon.setFixedSize(24, 24)
            
            lbl = QLabel(text)
            lbl.setAlignment(Qt.AlignCenter)
            lbl.setStyleSheet("font-size: 10px; border: none;")
            
            if i == self.active_idx:
                icon.setStyleSheet("background-color: #3b82f6; border-radius: 12px;") # Active (Blue)
                lbl.setStyleSheet("font-size: 11px; font-weight: bold; color: #3b82f6; border: none;")
            else:
                icon.setStyleSheet("background-color: transparent; border: 2px solid #94a3b8; border-radius: 12px;") # Inactive (Outline)
                lbl.setStyleSheet("font-size: 11px; font-weight: normal; color: #64748b; border: none;")
                
            tab_l.addWidget(icon, alignment=Qt.AlignCenter)
            tab_l.addWidget(lbl, alignment=Qt.AlignCenter)
            
            self.nav_layout.addWidget(tab)

    def _add_tab(self):
        if len(self.tabs) < 5:
            self.tabs.append(f"Tab {len(self.tabs)+1}")
            self._render_tabs()

    def _remove_tab(self):
        if len(self.tabs) > 3:
            self.tabs.pop()
            if self.active_idx >= len(self.tabs):
                self.active_idx = len(self.tabs) - 1
            self._render_tabs()

    def _cycle_tab(self):
        self.active_idx = (self.active_idx + 1) % len(self.tabs)
        self._render_tabs()
