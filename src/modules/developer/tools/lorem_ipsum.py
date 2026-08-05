from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QComboBox, QSpinBox, QTextEdit)
from PySide6.QtGui import QGuiApplication
from PySide6.QtCore import Qt

LOREM_EN = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

LOREM_ID = "Ini adalah teks contoh (dummy text) yang digunakan untuk mendemonstrasikan bentuk visual dari sebuah dokumen atau jenis huruf. Teks ini tidak memiliki arti yang sebenarnya, namun dibuat sedemikian rupa sehingga terlihat menyerupai tata letak bahasa aslinya. Penggunaan teks ini ditujukan agar pembaca atau desainer tidak terdistraksi oleh makna kata, dan dapat berfokus sepenuhnya pada aspek estetika, tipografi, serta struktur komposisi halaman secara keseluruhan."

class LoremIpsumTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()
        self._generate()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(24)
        layout.setAlignment(Qt.AlignTop)

        title = QLabel("Lorem Ipsum Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        controls = QHBoxLayout()
        controls.setSpacing(16)
        
        # Type
        controls.addWidget(QLabel("Type:"))
        self.type_combo = QComboBox()
        self.type_combo.addItems(["Paragraphs", "Sentences", "Words"])
        self.type_combo.currentIndexChanged.connect(self._generate)
        controls.addWidget(self.type_combo)

        # Count
        controls.addWidget(QLabel("Count:"))
        self.count_spin = QSpinBox()
        self.count_spin.setRange(1, 100)
        self.count_spin.setValue(3)
        self.count_spin.valueChanged.connect(self._generate)
        controls.addWidget(self.count_spin)

        # Language
        controls.addWidget(QLabel("Language:"))
        self.lang_combo = QComboBox()
        self.lang_combo.addItems(["English (Classical)", "Indonesian (Modern)"])
        self.lang_combo.currentIndexChanged.connect(self._generate)
        controls.addWidget(self.lang_combo)

        controls.addStretch()
        layout.addLayout(controls)

        self.text_out = QTextEdit()
        self.text_out.setReadOnly(True)
        self.text_out.setMinimumHeight(300)
        layout.addWidget(self.text_out)

        btn_copy = QPushButton("Copy Text")
        btn_copy.setFixedWidth(200)
        btn_copy.clicked.connect(self._copy_text)
        layout.addWidget(btn_copy, 0, Qt.AlignLeft)

        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QTextEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 12px;
                border-radius: 8px;
                color: #111827;
                font-size: 14px;
                line-height: 1.5;
            }
            QPushButton {
                background-color: #111827;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                color: white;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #374151; }
            QComboBox, QSpinBox {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 6px;
                border-radius: 4px;
                color: #111827;
            }
        """)

    def _generate(self):
        base_text = LOREM_ID if self.lang_combo.currentIndex() == 1 else LOREM_EN
        t_type = self.type_combo.currentText()
        count = self.count_spin.value()

        if t_type == "Words":
            words = base_text.replace(".", "").replace(",", "").split()
            # repeat words if needed
            while len(words) < count:
                words.extend(words)
            res = " ".join(words[:count]).capitalize() + "."
        elif t_type == "Sentences":
            sentences = [s.strip() + "." for s in base_text.split(".") if s.strip()]
            while len(sentences) < count:
                sentences.extend(sentences)
            res = " ".join(sentences[:count])
        else: # Paragraphs
            res = "\n\n".join([base_text] * count)

        self.text_out.setPlainText(res)

    def _copy_text(self):
        QGuiApplication.clipboard().setText(self.text_out.toPlainText())
