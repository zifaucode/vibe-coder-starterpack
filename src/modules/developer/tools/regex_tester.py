import re
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QLineEdit, QTextEdit, QCheckBox)
from PySide6.QtGui import QTextCharFormat, QColor
from PySide6.QtCore import Qt

class RegexTesterTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("Regex Tester")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        # Pattern Input
        layout.addWidget(QLabel("Regular Expression:"))
        pattern_layout = QHBoxLayout()
        self.pattern_input = QLineEdit()
        self.pattern_input.setPlaceholderText("e.g. \\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b")
        self.pattern_input.textChanged.connect(self._run_regex)
        pattern_layout.addWidget(self.pattern_input)
        layout.addLayout(pattern_layout)

        # Flags
        flags_layout = QHBoxLayout()
        self.flag_g = QCheckBox("Global (g)")
        self.flag_g.setChecked(True)
        self.flag_g.toggled.connect(self._run_regex)
        
        self.flag_i = QCheckBox("Case Insensitive (i)")
        self.flag_i.toggled.connect(self._run_regex)
        
        self.flag_m = QCheckBox("Multiline (m)")
        self.flag_m.toggled.connect(self._run_regex)
        
        flags_layout.addWidget(self.flag_g)
        flags_layout.addWidget(self.flag_i)
        flags_layout.addWidget(self.flag_m)
        flags_layout.addStretch()
        layout.addLayout(flags_layout)

        # Test String Input
        layout.addWidget(QLabel("Test String:"))
        self.test_input = QTextEdit()
        self.test_input.setPlaceholderText("Enter text to test your regex against...")
        self.test_input.textChanged.connect(self._run_regex)
        self.test_input.setMinimumHeight(150)
        layout.addWidget(self.test_input)

        # Match Result
        self.result_lbl = QLabel("Matches: 0")
        self.result_lbl.setStyleSheet("font-weight: bold; color: #3b82f6;")
        layout.addWidget(self.result_lbl)

        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QLineEdit, QTextEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 10px;
                border-radius: 6px;
                color: #111827;
                font-family: Consolas, monospace;
            }
            QLineEdit:focus, QTextEdit:focus {
                border-color: #3b82f6;
            }
            QCheckBox { color: #475569; }
        """)

    def _run_regex(self):
        pattern_str = self.pattern_input.text()
        text = self.test_input.toPlainText()

        # Clear formatting
        cursor = self.test_input.textCursor()
        cursor.select(cursor.Document)
        fmt = QTextCharFormat()
        fmt.setBackground(Qt.transparent)
        cursor.setCharFormat(fmt)

        if not pattern_str or not text:
            self.result_lbl.setText("Matches: 0")
            self.result_lbl.setStyleSheet("font-weight: bold; color: #94a3b8;")
            return

        flags = 0
        if self.flag_i.isChecked():
            flags |= re.IGNORECASE
        if self.flag_m.isChecked():
            flags |= re.MULTILINE

        try:
            pattern = re.compile(pattern_str, flags)
        except re.error as e:
            self.result_lbl.setText(f"Regex Error: {e}")
            self.result_lbl.setStyleSheet("font-weight: bold; color: #ef4444;")
            return

        # Find matches and highlight
        match_count = 0
        fmt_match = QTextCharFormat()
        fmt_match.setBackground(QColor("#bfdbfe")) # light blue

        cursor.beginEditBlock()
        
        if self.flag_g.isChecked():
            for m in pattern.finditer(text):
                if m.start() == m.end(): continue
                cursor.setPosition(m.start())
                cursor.setPosition(m.end(), cursor.KeepAnchor)
                cursor.setCharFormat(fmt_match)
                match_count += 1
        else:
            m = pattern.search(text)
            if m and m.start() != m.end():
                cursor.setPosition(m.start())
                cursor.setPosition(m.end(), cursor.KeepAnchor)
                cursor.setCharFormat(fmt_match)
                match_count = 1

        cursor.endEditBlock()
        self.result_lbl.setText(f"Matches: {match_count}")
        self.result_lbl.setStyleSheet("font-weight: bold; color: #22c55e;" if match_count > 0 else "font-weight: bold; color: #f59e0b;")
