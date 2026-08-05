from PySide6.QtWidgets import QWidget, QVBoxLayout, QTabWidget, QLabel
from .tools.color_picker import ColorPickerTool
from .tools.gradient_generator import GradientGeneratorTool
from .tools.wireframe_builder import WireframeBuilderTool
from .tools.design_doctor import DesignDoctorTool

class DesignModuleView(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 32, 32, 32)
        
        # Header
        header = QLabel("Design Tools")
        header.setStyleSheet("font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 16px;")
        layout.addWidget(header)

        # Tabs for Tools
        self.tabs = QTabWidget()
        self.tabs.setStyleSheet("""
            QTabWidget::pane {
                border: 1px solid #cbd5e1;
                background-color: #ffffff;
                border-radius: 4px;
            }
            QTabBar::tab {
                background: #f8fafc;
                border: 1px solid #cbd5e1;
                border-bottom: none;
                color: #64748b;
                padding: 10px 20px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                margin-right: 2px;
            }
            QTabBar::tab:selected {
                background: #ffffff;
                color: #111827;
                font-weight: bold;
            }
            QTabBar::tab:hover:!selected {
                background: #f1f5f9;
                color: #475569;
            }
        """)

        # Add Tools
        self.color_picker = ColorPickerTool()
        self.tabs.addTab(self.color_picker, "Color Picker")

        # Add Gradient Generator
        self.gradient_gen = GradientGeneratorTool()
        self.tabs.addTab(self.gradient_gen, "Gradient Generator")
        
        # Add Wireframe Builder
        self.wireframe_builder = WireframeBuilderTool()
        self.tabs.addTab(self.wireframe_builder, "Wireframe Builder")

        # Add Design Doctor
        self.design_doctor = DesignDoctorTool()
        self.tabs.addTab(self.design_doctor, "Design Doctor")

        layout.addWidget(self.tabs)
