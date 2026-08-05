import json
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QTextEdit, 
                               QSplitter, QMessageBox, QSizePolicy)
from PySide6.QtCore import Qt
from PySide6.QtGui import QGuiApplication

class JsonFormatterTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("JSON Formatter")
        title.setStyleSheet("font-size: 20px; font-weight: bold;")
        layout.addWidget(title)

        # Actions
        actions_layout = QHBoxLayout()
        
        format_btn = QPushButton("Format / Beautify")
        format_btn.clicked.connect(self._format_json)
        actions_layout.addWidget(format_btn)

        minify_btn = QPushButton("Minify")
        minify_btn.clicked.connect(self._minify_json)
        actions_layout.addWidget(minify_btn)

        clear_btn = QPushButton("Clear")
        clear_btn.clicked.connect(self._clear_editors)
        actions_layout.addWidget(clear_btn)
        
        copy_btn = QPushButton("Copy Output")
        copy_btn.clicked.connect(self._copy_output)
        actions_layout.addWidget(copy_btn)

        actions_layout.addStretch()
        layout.addLayout(actions_layout)

        # Editors Splitter
        splitter = QSplitter(Qt.Horizontal)
        
        # Input Editor
        input_widget = QWidget()
        input_layout = QVBoxLayout(input_widget)
        input_layout.setContentsMargins(0,0,0,0)
        input_layout.addWidget(QLabel("Input JSON:"))
        self.input_editor = QTextEdit()
        self.input_editor.setPlaceholderText("Paste your JSON here...")
        input_layout.addWidget(self.input_editor)
        
        # Output Editor
        output_widget = QWidget()
        output_layout = QVBoxLayout(output_widget)
        output_layout.setContentsMargins(0,0,0,0)
        output_layout.addWidget(QLabel("Output:"))
        self.output_editor = QTextEdit()
        self.output_editor.setReadOnly(True)
        self.output_editor.setPlaceholderText("Formatted JSON will appear here...")
        output_layout.addWidget(self.output_editor)

        splitter.addWidget(input_widget)
        splitter.addWidget(output_widget)
        
        # Ensure splitter takes up all remaining vertical space
        splitter.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)
        layout.addWidget(splitter)
        layout.setStretch(2, 1) # Give the splitter layout stretch priority
        
        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QTextEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 12px;
                border-radius: 8px;
                color: #111827;
                font-family: Consolas, 'Courier New', monospace;
                font-size: 14px;
            }
            QPushButton {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 8px 16px;
                border-radius: 4px;
                color: #111827;
            }
            QPushButton:hover {
                background-color: #f8fafc;
            }
            QSplitter::handle {
                background-color: #e2e8f0;
                width: 2px;
                margin: 0 8px;
            }
        """)

    def _get_json_data(self):
        text = self.input_editor.toPlainText().strip()
        if not text:
            return None
        try:
            return json.loads(text)
        except json.JSONDecodeError as e:
            self.output_editor.setStyleSheet("QTextEdit { border: 1px solid #ef4444; color: #ef4444; }")
            self.output_editor.setText(f"Invalid JSON:\n{str(e)}")
            return None

    def _format_json(self):
        self.output_editor.setStyleSheet("") # reset error style
        data = self._get_json_data()
        if data is not None:
            formatted = json.dumps(data, indent=4, ensure_ascii=False)
            self.output_editor.setText(formatted)

    def _minify_json(self):
        self.output_editor.setStyleSheet("") # reset error style
        data = self._get_json_data()
        if data is not None:
            minified = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
            self.output_editor.setText(minified)

    def _clear_editors(self):
        self.input_editor.clear()
        self.output_editor.clear()
        self.output_editor.setStyleSheet("")

    def _copy_output(self):
        text = self.output_editor.toPlainText()
        if text:
            clipboard = QGuiApplication.clipboard()
            clipboard.setText(text)
