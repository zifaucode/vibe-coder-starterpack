from PySide6.QtWidgets import QWidget, QVBoxLayout, QTabWidget, QLabel
from .tools.json_formatter import JsonFormatterTool
from .tools.lorem_ipsum import LoremIpsumTool
from .tools.regex_tester import RegexTesterTool
from .tools.shadow_generator import ShadowGeneratorTool
from .tools.border_radius import BorderRadiusTool
from .tools.css_generator import CSSGeneratorTool
from .tools.remove_background import RemoveBackgroundTool
from .tools.image_converter import ImageConverterTool
from .tools.image_compressor import ImageCompressorTool

class DeveloperModuleView(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 32, 32, 32)
        
        # Header
        header = QLabel("Developer Tools")
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

        # 1. JSON Formatter
        self.json_formatter = JsonFormatterTool()
        self.tabs.addTab(self.json_formatter, "JSON Formatter")

        # 2. Lorem Ipsum
        self.lorem_ipsum = LoremIpsumTool()
        self.tabs.addTab(self.lorem_ipsum, "Lorem Ipsum")

        # 3. Regex Tester
        self.regex_tester = RegexTesterTool()
        self.tabs.addTab(self.regex_tester, "Regex Tester")

        # 4. Shadow Generator
        self.shadow_gen = ShadowGeneratorTool()
        self.tabs.addTab(self.shadow_gen, "Shadow Generator")

        # 5. Border Radius Generator
        self.border_gen = BorderRadiusTool()
        self.tabs.addTab(self.border_gen, "Border Radius")

        # 6. CSS Generator
        self.css_gen = CSSGeneratorTool()
        self.tabs.addTab(self.css_gen, "CSS Generator")

        # 7. Remove Background
        self.remove_bg = RemoveBackgroundTool()
        self.tabs.addTab(self.remove_bg, "Remove BG")

        # 8. Image Converter
        self.img_conv = ImageConverterTool()
        self.tabs.addTab(self.img_conv, "Convert Image")

        # 9. Image Compressor
        self.img_comp = ImageCompressorTool()
        self.tabs.addTab(self.img_comp, "Compress Image")

        layout.addWidget(self.tabs)
