from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QLabel, QSpinBox, QComboBox, QTableWidget, 
                               QTableWidgetItem, QHeaderView)
from PySide6.QtCore import Qt

class TypographyScaleTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self._setup_ui()
        self._calculate_scale()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Typography Scale Generator")
        title.setStyleSheet("font-size: 20px; font-weight: bold;")
        layout.addWidget(title)

        # Controls Layout
        controls_layout = QHBoxLayout()
        
        # Base Size
        controls_layout.addWidget(QLabel("Base Size (px):"))
        self.base_size_spin = QSpinBox()
        self.base_size_spin.setRange(8, 32)
        self.base_size_spin.setValue(16)
        self.base_size_spin.valueChanged.connect(self._calculate_scale)
        controls_layout.addWidget(self.base_size_spin)

        # Scale Ratio
        controls_layout.addWidget(QLabel("Scale Ratio:"))
        self.ratio_combo = QComboBox()
        self.ratio_combo.addItems([
            "1.125 - Major Second",
            "1.200 - Minor Third",
            "1.250 - Major Third",
            "1.333 - Perfect Fourth",
            "1.414 - Augmented Fourth",
            "1.500 - Perfect Fifth",
            "1.618 - Golden Ratio"
        ])
        self.ratio_combo.setCurrentIndex(2) # Major Third
        self.ratio_combo.currentIndexChanged.connect(self._calculate_scale)
        controls_layout.addWidget(self.ratio_combo)
        
        controls_layout.addStretch()
        layout.addLayout(controls_layout)

        # Table for Results
        self.table = QTableWidget(7, 4)
        self.table.setHorizontalHeaderLabels(["Level", "Size (px)", "Size (rem)", "Preview"])
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        self.table.verticalHeader().setVisible(False)
        self.table.setEditTriggers(QTableWidget.NoEditTriggers)
        self.table.setSelectionBehavior(QTableWidget.SelectRows)
        self.table.setShowGrid(False)
        layout.addWidget(self.table)
        
        self._apply_styles()

    def _apply_styles(self):
        self.setStyleSheet("""
            QSpinBox, QComboBox {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                padding: 6px;
                border-radius: 4px;
                color: #111827;
            }
            QTableWidget {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                color: #111827;
            }
            QHeaderView::section {
                background-color: #f8fafc;
                color: #475569;
                padding: 8px;
                border: none;
                font-weight: bold;
            }
        """)

    def _calculate_scale(self):
        base_size = self.base_size_spin.value()
        ratio_str = self.ratio_combo.currentText()
        ratio = float(ratio_str.split(" - ")[0])
        
        levels = ["h1", "h2", "h3", "h4", "h5", "h6", "p"]
        # p is base size, h6 is 1 step up, h1 is 6 steps up.
        
        for i, level in enumerate(levels):
            step = 6 - i if level != "p" else 0
            size_px = base_size * (ratio ** step)
            size_rem = size_px / 16.0
            
            # Level Column
            level_item = QTableWidgetItem(level)
            level_item.setTextAlignment(Qt.AlignCenter)
            self.table.setItem(i, 0, level_item)
            
            # Size px Column
            px_item = QTableWidgetItem(f"{size_px:.2f}px")
            px_item.setTextAlignment(Qt.AlignCenter)
            self.table.setItem(i, 1, px_item)

            # Size rem Column
            rem_item = QTableWidgetItem(f"{size_rem:.3f}rem")
            rem_item.setTextAlignment(Qt.AlignCenter)
            self.table.setItem(i, 2, rem_item)
            
            # Preview Column
            preview_label = QLabel("Ag")
            preview_label.setStyleSheet(f"font-size: {int(size_px)}px; color: #111827; font-weight: bold;")
            preview_label.setAlignment(Qt.AlignCenter)
            self.table.setCellWidget(i, 3, preview_label)
            self.table.setRowHeight(i, int(size_px) + 20)
