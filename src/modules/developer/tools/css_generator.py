from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QComboBox, QTextEdit, 
                               QStackedWidget, QFrame, QSplitter, QGridLayout, QGraphicsBlurEffect)
from PySide6.QtGui import QGuiApplication, QColor
from PySide6.QtCore import Qt

class CSSGeneratorTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()
        self._on_prop_change(0)

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("CSS Properties Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        main_splitter = QSplitter(Qt.Horizontal)

        # Left Column: Controls
        left_widget = QWidget()
        left_layout = QVBoxLayout(left_widget)
        left_layout.setContentsMargins(0,0,0,0)

        prop_layout = QHBoxLayout()
        prop_layout.addWidget(QLabel("Select Property:"))
        self.combo = QComboBox()
        self.combo.addItems(["Flexbox", "Grid", "Transform", "Filter"])
        self.combo.currentIndexChanged.connect(self._on_prop_change)
        prop_layout.addWidget(self.combo)
        prop_layout.addStretch()
        left_layout.addLayout(prop_layout)

        self.stack = QStackedWidget()
        
        # 1. Flexbox
        flex_w = QWidget()
        flex_l = QVBoxLayout(flex_w)
        self.flex_out = QTextEdit("display: flex;\nflex-direction: row;\njustify-content: center;\nalign-items: center;")
        flex_l.addWidget(QLabel("Common Flexbox Centering:"))
        flex_l.addWidget(self.flex_out)
        self.stack.addWidget(flex_w)
        
        # 2. Grid
        grid_w = QWidget()
        grid_l = QVBoxLayout(grid_w)
        self.grid_out = QTextEdit("display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 16px;")
        grid_l.addWidget(QLabel("Common Grid Layout:"))
        grid_l.addWidget(self.grid_out)
        self.stack.addWidget(grid_w)

        # 3. Transform
        trans_w = QWidget()
        trans_l = QVBoxLayout(trans_w)
        self.trans_out = QTextEdit("transform: scale(1.1) rotate(5deg);")
        trans_l.addWidget(QLabel("Hover Transform:"))
        trans_l.addWidget(self.trans_out)
        self.stack.addWidget(trans_w)

        # 4. Filter
        fil_w = QWidget()
        fil_l = QVBoxLayout(fil_w)
        self.fil_out = QTextEdit("filter: blur(2px) grayscale(50%);")
        fil_l.addWidget(QLabel("Filter Effect:"))
        fil_l.addWidget(self.fil_out)
        self.stack.addWidget(fil_w)

        left_layout.addWidget(self.stack)
        
        btn = QPushButton("Copy CSS")
        btn.clicked.connect(self._copy_css)
        left_layout.addWidget(btn)

        main_splitter.addWidget(left_widget)

        # Right Column: Live Preview Stack
        right_widget = QWidget()
        right_layout = QVBoxLayout(right_widget)
        right_layout.setContentsMargins(0,0,0,0)
        right_layout.addWidget(QLabel("Live Preview Simulation:"))
        
        self.preview_container = QFrame()
        self.preview_container.setStyleSheet("background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px;")
        pc_layout = QVBoxLayout(self.preview_container)
        
        self.preview_stack = QStackedWidget()
        pc_layout.addWidget(self.preview_stack)
        right_layout.addWidget(self.preview_container)

        self._build_previews()

        main_splitter.addWidget(right_widget)
        main_splitter.setStretchFactor(0, 1)
        main_splitter.setStretchFactor(1, 1)

        layout.addWidget(main_splitter)
        self._apply_styles()

    def _create_box(self, color, text=""):
        lbl = QLabel(text)
        lbl.setAlignment(Qt.AlignCenter)
        lbl.setFixedSize(60, 60)
        lbl.setStyleSheet(f"background-color: {color}; border-radius: 8px; color: white; font-weight: bold; font-size: 16px;")
        return lbl

    def _build_previews(self):
        # 1. Flexbox
        fw = QWidget()
        fl = QHBoxLayout(fw)
        fl.setAlignment(Qt.AlignCenter)
        fl.setSpacing(10)
        fl.addWidget(self._create_box("#3b82f6", "1"))
        fl.addWidget(self._create_box("#ef4444", "2"))
        fl.addWidget(self._create_box("#10b981", "3"))
        self.preview_stack.addWidget(fw)

        # 2. Grid
        gw = QWidget()
        gl = QGridLayout(gw)
        gl.setAlignment(Qt.AlignCenter)
        gl.setSpacing(16)
        colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]
        for i in range(6):
            gl.addWidget(self._create_box(colors[i], str(i+1)), i // 3, i % 3)
        self.preview_stack.addWidget(gw)

        # 3. Transform (Simulated by making one box larger and tilted text)
        tw = QWidget()
        tl = QVBoxLayout(tw)
        tl.setAlignment(Qt.AlignCenter)
        t_box = self._create_box("#8b5cf6", "")
        t_box.setFixedSize(100, 100)
        # Using rich text to simulate rotation and scale visually in Qt
        t_box.setText("<div style='font-size: 18px; color: white;'>scale(1.1)</div>")
        t_box.setStyleSheet("background-color: #8b5cf6; border-radius: 12px; border: 4px solid #c4b5fd;")
        tl.addWidget(t_box)
        self.preview_stack.addWidget(tw)

        # 4. Filter (Simulated with QGraphicsBlurEffect)
        fiw = QWidget()
        fil = QVBoxLayout(fiw)
        fil.setAlignment(Qt.AlignCenter)
        f_box = self._create_box("#ec4899", "blur(2px)")
        f_box.setFixedSize(100, 100)
        effect = QGraphicsBlurEffect()
        effect.setBlurRadius(4)
        f_box.setGraphicsEffect(effect)
        fil.addWidget(f_box)
        self.preview_stack.addWidget(fiw)

    def _apply_styles(self):
        self.setStyleSheet("""
            QTextEdit {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 10px;
                border-radius: 6px;
                color: #111827;
                font-family: Consolas, monospace;
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
            QComboBox {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 6px;
                border-radius: 4px;
                color: #111827;
            }
        """)

    def _on_prop_change(self, idx):
        self.stack.setCurrentIndex(idx)
        self.preview_stack.setCurrentIndex(idx)

    def _copy_css(self):
        idx = self.stack.currentIndex()
        if idx == 0: txt = self.flex_out.toPlainText()
        elif idx == 1: txt = self.grid_out.toPlainText()
        elif idx == 2: txt = self.trans_out.toPlainText()
        elif idx == 3: txt = self.fil_out.toPlainText()
        QGuiApplication.clipboard().setText(txt)
