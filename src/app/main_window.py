from PySide6.QtWidgets import (QMainWindow, QWidget, QHBoxLayout, QVBoxLayout, 
                               QLabel, QStackedWidget, QListWidget, QListWidgetItem, 
                               QSizePolicy)
from PySide6.QtCore import Qt, QSize, QSettings
from PySide6.QtGui import QShortcut, QKeySequence
from loguru import logger

from ui.components.dashboard import DashboardWidget
from ui.components.settings_widget import SettingsWidget
from ui.components.command_palette import CommandPalette
from ui.components.toast import Toast
from modules.design.views import DesignModuleView
from modules.design.views import DesignModuleView
from modules.developer.views import DeveloperModuleView
from modules.mobile.views import MobileDesignModuleView

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("VCS - Vibe Coder Starterpack")
        self.resize(1200, 800)
        
        # Init Settings
        self.settings = QSettings("VibeCoder", "VCS")
        
        # Initialize Phase 2 Global Utilities
        self.toast = Toast(self)
        self.command_palette = CommandPalette(self)
        
        self._setup_ui()
        self._setup_shortcuts()
        self._load_settings()

    def _setup_shortcuts(self):
        # Global Shortcut Ctrl + K for Command Palette
        self.shortcut_cmd_palette = QShortcut(QKeySequence("Ctrl+K"), self)
        self.shortcut_cmd_palette.activated.connect(self._show_command_palette)
        
    def _show_command_palette(self):
        self.command_palette.exec()
        self.toast.show_toast("Command executed!", 2000)

    def _setup_ui(self):
        # Central Widget
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        # Main Layout
        self.main_layout = QHBoxLayout(self.central_widget)
        self.main_layout.setContentsMargins(0, 0, 0, 0)
        self.main_layout.setSpacing(0)

        # Content Area (QStackedWidget)
        self.content_area = QStackedWidget()
        self.content_area.setObjectName("content_area")
        
        # --- Sidebar Setup ---
        self.sidebar = QWidget()
        self.sidebar.setFixedWidth(250)
        self.sidebar.setObjectName("sidebar")
        
        self.sidebar_layout = QVBoxLayout(self.sidebar)
        self.sidebar_layout.setContentsMargins(0, 0, 0, 0)
        
        # Sidebar Title
        self.sidebar_title = QLabel("Navigation")
        self.sidebar_title.setObjectName("sidebar_title")
        self.sidebar_title.setContentsMargins(16, 16, 16, 16)
        self.sidebar_layout.addWidget(self.sidebar_title)
        
        # Sidebar List
        self.sidebar_list = QListWidget()
        self.sidebar_list.setObjectName("sidebar_list")
        self.sidebar_list.setFrameShape(QListWidget.NoFrame)
        self.sidebar_list.itemClicked.connect(self._on_sidebar_item_clicked)
        self.sidebar_layout.addWidget(self.sidebar_list)
        
        # Add to Main Layout
        self.main_layout.addWidget(self.sidebar)
        self.main_layout.addWidget(self.content_area)

        # Initialize pages
        self.pages = {}
        
        # Inject Dashboard
        dashboard = DashboardWidget()
        dashboard.request_search.connect(self._show_command_palette)
        dashboard.request_navigate.connect(self.navigate_to)
        self.content_area.addWidget(dashboard)
        
        item = QListWidgetItem("Dashboard")
        item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(item)
        self.pages["Dashboard"] = dashboard

        # Inject Design Module
        design_view = DesignModuleView()
        self.content_area.addWidget(design_view)
        
        design_item = QListWidgetItem("Design Tools")
        design_item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(design_item)
        self.pages["Design Tools"] = design_view

        # Inject Developer Module
        dev_view = DeveloperModuleView()
        self.content_area.addWidget(dev_view)
        
        dev_item = QListWidgetItem("Developer Tools")
        dev_item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(dev_item)
        self.pages["Developer Tools"] = dev_view

        # Inject Mobile Design Module
        mobile_view = MobileDesignModuleView()
        self.content_area.addWidget(mobile_view)
        
        mobile_item = QListWidgetItem("Mobile Design")
        mobile_item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(mobile_item)
        self.pages["Mobile Design"] = mobile_view

        # Inject Settings Module
        settings_view = SettingsWidget()
        self.content_area.addWidget(settings_view)
        
        settings_item = QListWidgetItem("Settings")
        settings_item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(settings_item)
        self.pages["Settings"] = settings_view

        # Select first item by default
        if self.sidebar_list.count() > 0:
            self.sidebar_list.setCurrentRow(0)

    def _add_page(self, name: str, title: str):
        # Create Widget for Page
        page = QWidget()
        layout = QVBoxLayout(page)
        
        # Title Label
        title_label = QLabel(title)
        title_label.setObjectName("content_title")
        layout.addWidget(title_label)
        
        # Placeholder Content
        content_label = QLabel(f"{name} content goes here...")
        content_label.setAlignment(Qt.AlignTop | Qt.AlignLeft)
        content_label.setStyleSheet("color: #64748b; padding: 24px;")
        layout.addWidget(content_label)
        layout.addStretch()
        
        # Add to QStackedWidget
        self.content_area.addWidget(page)
        
        # Add to Sidebar List
        item = QListWidgetItem(name)
        item.setSizeHint(QSize(0, 48))
        self.sidebar_list.addItem(item)
        
        self.pages[name] = page

    def _on_sidebar_item_clicked(self, item: QListWidgetItem):
        page_name = item.text()
        self.navigate_to(page_name)

    def navigate_to(self, page_name: str):
        if page_name in self.pages:
            self.content_area.setCurrentWidget(self.pages[page_name])
            logger.debug(f"Navigated to {page_name}")
            
            # Sync sidebar selection
            for i in range(self.sidebar_list.count()):
                item = self.sidebar_list.item(i)
                if item.text() == page_name:
                    self.sidebar_list.setCurrentRow(i)
                    break
            
    def _load_settings(self):
        geom = self.settings.value("geometry")
        if geom:
            self.restoreGeometry(geom)
            
        default_mode = self.settings.value("default_view_mode", "Dashboard")
        self.navigate_to(default_mode)

    def closeEvent(self, event):
        self.settings.setValue("geometry", self.saveGeometry())
        logger.info("Saved local settings and closing app.")
        super().closeEvent(event)
