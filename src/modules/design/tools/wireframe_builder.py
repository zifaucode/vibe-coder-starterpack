from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QComboBox, QTextEdit, QSplitter)
from PySide6.QtGui import QGuiApplication
from PySide6.QtCore import Qt

# Predefined templates for layouts
TEMPLATES = {
    "Holy Grail": {
        "html": '''<div class="container">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>Main Content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>''',
        "css": '''.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
header, footer {
  grid-column: 1 / -1;
}'''
    },
    "Sidebar + Content": {
        "html": '''<div class="container">
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content</main>
</div>''',
        "css": '''.container {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
}
.content {
  flex: 1;
}'''
    },
    "3-Column Grid": {
        "html": '''<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>''',
        "css": '''.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}'''
    },
    "Header & Centered Content": {
        "html": '''<header>Navbar</header>
<main class="centered">
  <div class="card">Content</div>
</main>''',
        "css": '''body {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.centered {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}'''
    }
}

class WireframeBuilderTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Wireframe Builder (Templates)")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)
        
        controls = QHBoxLayout()
        controls.addWidget(QLabel("Select Layout Template:"))
        self.combo = QComboBox()
        self.combo.addItems(list(TEMPLATES.keys()))
        self.combo.currentIndexChanged.connect(self._on_template_changed)
        controls.addWidget(self.combo)
        controls.addStretch()
        layout.addLayout(controls)

        from PySide6.QtWidgets import QStackedWidget, QFrame
        # Preview Area
        preview_label = QLabel("Visual Preview:")
        layout.addWidget(preview_label)
        
        self.preview_stack = QStackedWidget()
        self.preview_stack.setFixedHeight(200)
        self.preview_stack.setStyleSheet("QStackedWidget { border: 1px dashed #cbd5e1; border-radius: 8px; background-color: #f8fafc; }")
        
        # Helper to make blocks
        def make_block(text, color="#e2e8f0"):
            f = QFrame()
            f.setStyleSheet(f"background-color: {color}; border: 1px solid #cbd5e1; border-radius: 4px;")
            l = QVBoxLayout(f)
            l.setContentsMargins(2,2,2,2)
            lbl = QLabel(text)
            lbl.setAlignment(Qt.AlignCenter)
            lbl.setStyleSheet("color: #475569; font-weight: bold; border: none; background: transparent; font-size: 12px;")
            l.addWidget(lbl)
            return f
            
        # 1. Holy Grail
        hg_w = QWidget()
        hg_l = QVBoxLayout(hg_w)
        hg_l.setContentsMargins(8,8,8,8)
        header = make_block("Header", "#bae6fd")
        header.setFixedHeight(30)
        hg_l.addWidget(header)
        hg_mid = QHBoxLayout()
        nav = make_block("Nav")
        nav.setFixedWidth(60)
        main = make_block("Main Content", "#ffffff")
        aside = make_block("Aside")
        aside.setFixedWidth(60)
        hg_mid.addWidget(nav)
        hg_mid.addWidget(main, 1)
        hg_mid.addWidget(aside)
        hg_l.addLayout(hg_mid, 1)
        footer = make_block("Footer", "#bae6fd")
        footer.setFixedHeight(30)
        hg_l.addWidget(footer)
        self.preview_stack.addWidget(hg_w)
        
        # 2. Sidebar + Content
        sc_w = QWidget()
        sc_l = QHBoxLayout(sc_w)
        sc_l.setContentsMargins(8,8,8,8)
        sidebar = make_block("Sidebar")
        sidebar.setFixedWidth(80)
        content = make_block("Content", "#ffffff")
        sc_l.addWidget(sidebar)
        sc_l.addWidget(content, 1)
        self.preview_stack.addWidget(sc_w)
        
        # 3. 3-Column Grid
        grid_w = QWidget()
        grid_l = QHBoxLayout(grid_w)
        grid_l.setContentsMargins(8,8,8,8)
        for i in range(1, 4):
            grid_l.addWidget(make_block(f"Col {i}", "#ffffff"))
        self.preview_stack.addWidget(grid_w)
        
        # 4. Header & Centered
        hc_w = QWidget()
        hc_l = QVBoxLayout(hc_w)
        hc_l.setContentsMargins(8,8,8,8)
        hc_header = make_block("Navbar", "#bae6fd")
        hc_header.setFixedHeight(30)
        hc_l.addWidget(hc_header)
        hc_mid = QHBoxLayout()
        hc_mid.addStretch()
        hc_card = make_block("Card Content", "#ffffff")
        hc_card.setFixedSize(120, 80)
        hc_mid.addWidget(hc_card)
        hc_mid.addStretch()
        hc_l.addLayout(hc_mid, 1)
        self.preview_stack.addWidget(hc_w)

        layout.addWidget(self.preview_stack)

        # Splitter for HTML and CSS
        splitter = QSplitter(Qt.Horizontal)
        
        html_widget = QWidget()
        html_layout = QVBoxLayout(html_widget)
        html_layout.setContentsMargins(0, 0, 0, 0)
        html_layout.addWidget(QLabel("HTML Boilerplate:"))
        self.html_out = QTextEdit()
        self.html_out.setReadOnly(True)
        html_layout.addWidget(self.html_out)
        html_btn = QPushButton("Copy HTML")
        html_btn.clicked.connect(lambda: self._copy_text(self.html_out.toPlainText()))
        html_layout.addWidget(html_btn)
        splitter.addWidget(html_widget)

        css_widget = QWidget()
        css_layout = QVBoxLayout(css_widget)
        css_layout.setContentsMargins(0, 0, 0, 0)
        css_layout.addWidget(QLabel("CSS Boilerplate:"))
        self.css_out = QTextEdit()
        self.css_out.setReadOnly(True)
        css_layout.addWidget(self.css_out)
        css_btn = QPushButton("Copy CSS")
        css_btn.clicked.connect(lambda: self._copy_text(self.css_out.toPlainText()))
        css_layout.addWidget(css_btn)
        splitter.addWidget(css_widget)

        layout.addWidget(splitter, 1)
        self._apply_styles()
        
        # Load initial
        self._on_template_changed()

    def _on_template_changed(self):
        tmpl = self.combo.currentText()
        idx = self.combo.currentIndex()
        if hasattr(self, 'preview_stack'):
            self.preview_stack.setCurrentIndex(idx)
            
        data = TEMPLATES.get(tmpl, {})
        self.html_out.setPlainText(data.get("html", ""))
        self.css_out.setPlainText(data.get("css", ""))

    def _copy_text(self, text):
        QGuiApplication.clipboard().setText(text)

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
            QComboBox {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 6px;
                border-radius: 4px;
                color: #111827;
            }
            QSplitter::handle {
                background-color: #e2e8f0;
                width: 2px;
                margin: 0 8px;
            }
        """)
