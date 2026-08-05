from PySide6.QtWidgets import (QDialog, QVBoxLayout, QLineEdit, QListWidget, 
                               QListWidgetItem, QGraphicsDropShadowEffect, QWidget)
from PySide6.QtCore import Qt, QSize
from PySide6.QtGui import QColor

class CommandPalette(QDialog):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.Popup)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.resize(600, 400)
        self._setup_ui()
        self._center_on_parent()

    def _setup_ui(self):
        # Main Container
        self.container = QWidget(self)
        self.container.setObjectName("cmd_container")
        self.container.setStyleSheet("""
            QWidget#cmd_container {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 12px;
            }
        """)
        
        # Shadow effect
        shadow = QGraphicsDropShadowEffect()
        shadow.setBlurRadius(20)
        shadow.setColor(QColor(0, 0, 0, 80))
        shadow.setOffset(0, 4)
        self.container.setGraphicsEffect(shadow)

        layout = QVBoxLayout(self)
        layout.setContentsMargins(10, 10, 10, 10)
        layout.addWidget(self.container)

        container_layout = QVBoxLayout(self.container)
        container_layout.setContentsMargins(0, 0, 0, 0)
        container_layout.setSpacing(0)

        # Search Input
        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search tools... (e.g. Color Picker, Regex Tester)")
        self.search_input.setFixedHeight(56)
        self.search_input.setStyleSheet("""
            QLineEdit {
                background-color: transparent;
                border: none;
                border-bottom: 1px solid #cbd5e1;
                color: #111827;
                font-size: 16px;
                padding: 0 20px;
            }
        """)
        self.search_input.textChanged.connect(self._on_search)
        container_layout.addWidget(self.search_input)

        # Results List
        self.results_list = QListWidget()
        self.results_list.setFrameShape(QListWidget.NoFrame)
        self.results_list.setStyleSheet("""
            QListWidget {
                background-color: transparent;
                outline: none;
                padding: 8px;
                border: none;
            }
            QListWidget::item {
                color: #475569;
                padding: 12px 16px;
                border-radius: 6px;
            }
            QListWidget::item:hover {
                background-color: #f1f5f9;
                color: #0f172a;
            }
            QListWidget::item:selected {
                background-color: #111827;
                color: #ffffff;
            }
        """)
        self.results_list.itemClicked.connect(self._on_item_clicked)
        container_layout.addWidget(self.results_list)

        self._populate_mock_tools()

    def _populate_mock_tools(self):
        tools = ["Color Picker", "Palette Generator", "Regex Tester", "JSON Formatter", "Lorem Ipsum Generator", "Shadow Generator", "Grid Generator"]
        for tool in tools:
            item = QListWidgetItem(tool)
            self.results_list.addItem(item)

    def _on_search(self, text):
        for i in range(self.results_list.count()):
            item = self.results_list.item(i)
            item.setHidden(text.lower() not in item.text().lower())

    def _on_item_clicked(self, item):
        # Emit signal or handle navigation here
        self.accept()

    def _center_on_parent(self):
        if self.parent():
            parent_geom = self.parent().geometry()
            x = parent_geom.x() + (parent_geom.width() - self.width()) // 2
            y = parent_geom.y() + (parent_geom.height() - self.height()) // 2
            self.move(x, y)
        
    def showEvent(self, event):
        super().showEvent(event)
        self._center_on_parent()
        self.search_input.setFocus()
        self.search_input.clear()
