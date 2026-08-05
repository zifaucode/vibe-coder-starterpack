from PySide6.QtWidgets import QWidget, QVBoxLayout, QTabWidget, QLabel
from .tools.device_frame import DeviceFrameTool
from .tools.safe_area import SafeAreaTool
from .tools.mobile_grid import MobileGridTool
from .tools.touch_target import TouchTargetTool
from .tools.bottom_nav import BottomNavTool
from .tools.mobile_glossary import MobileGlossaryTool

class MobileDesignModuleView(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 32, 32, 32)
        
        # Header
        header = QLabel("Mobile Design Tools")
        header.setStyleSheet("font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 16px;")
        layout.addWidget(header)

        # Tabs
        self.tabs = QTabWidget()
        self.tabs.setStyleSheet("""
            QTabWidget::pane {
                border: 1px solid #cbd5e1; background-color: #ffffff; border-radius: 4px;
            }
            QTabBar::tab {
                background: #f8fafc; border: 1px solid #cbd5e1; border-bottom: none;
                color: #64748b; padding: 10px 20px;
                border-top-left-radius: 4px; border-top-right-radius: 4px; margin-right: 2px;
            }
            QTabBar::tab:selected {
                background: #ffffff; color: #111827; font-weight: bold;
            }
            QTabBar::tab:hover:!selected {
                background: #f1f5f9; color: #475569;
            }
        """)

        # Add Tools
        self.glossary = MobileGlossaryTool()
        self.tabs.addTab(self.glossary, "Design Glossary")

        self.device_frame = DeviceFrameTool()
        self.tabs.addTab(self.device_frame, "Device Frame")

        self.safe_area = SafeAreaTool()
        self.tabs.addTab(self.safe_area, "Safe Area")

        self.mobile_grid = MobileGridTool()
        self.tabs.addTab(self.mobile_grid, "Mobile Grid")

        self.touch_target = TouchTargetTool()
        self.tabs.addTab(self.touch_target, "Touch Target")

        self.bottom_nav = BottomNavTool()
        self.tabs.addTab(self.bottom_nav, "Bottom Nav")

        layout.addWidget(self.tabs)
