from PySide6.QtWidgets import (QWidget, QVBoxLayout, QLabel, 
                               QHBoxLayout, QPushButton, QComboBox, QFrame)
from PySide6.QtCore import Qt, Signal, QSettings

class SettingsWidget(QWidget):
    settings_changed = Signal()

    def __init__(self, parent=None):
        super().__init__(parent)
        self.settings = QSettings("VibeCoder", "VCS")
        self._setup_ui()
        self._load_current_settings()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 32, 32, 32)
        layout.setSpacing(24)

        # Title
        title_label = QLabel("Settings")
        title_label.setStyleSheet("font-size: 28px; font-weight: bold; color: #111827;")
        layout.addWidget(title_label)

        # Container
        container = QFrame()
        container.setStyleSheet("background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;")
        form_layout = QVBoxLayout(container)
        form_layout.setContentsMargins(24, 24, 24, 24)
        form_layout.setSpacing(20)

        # Theme Setting
        theme_layout = QHBoxLayout()
        theme_label = QLabel("Application Theme")
        theme_label.setStyleSheet("font-size: 16px; font-weight: bold; color: #1f2937;")
        
        self.theme_combo = QComboBox()
        self.theme_combo.addItems(["System", "Light", "Dark"])
        self.theme_combo.setStyleSheet("""
            QComboBox {
                padding: 8px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 6px;
                background: #f8fafc;
                min-width: 150px;
            }
        """)
        theme_layout.addWidget(theme_label)
        theme_layout.addStretch()
        theme_layout.addWidget(self.theme_combo)
        
        form_layout.addLayout(theme_layout)
        
        # Divider
        div = QFrame()
        div.setFixedHeight(1)
        div.setStyleSheet("background-color: #e2e8f0;")
        form_layout.addWidget(div)

        # Mode Setting
        mode_layout = QHBoxLayout()
        mode_label = QLabel("Default View Mode")
        mode_label.setStyleSheet("font-size: 16px; font-weight: bold; color: #1f2937;")
        
        self.mode_combo = QComboBox()
        self.mode_combo.addItems(["Dashboard", "Design Tools", "Developer Tools", "Mobile Design"])
        self.mode_combo.setStyleSheet("""
            QComboBox {
                padding: 8px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 6px;
                background: #f8fafc;
                min-width: 150px;
            }
        """)
        mode_layout.addWidget(mode_label)
        mode_layout.addStretch()
        mode_layout.addWidget(self.mode_combo)
        
        form_layout.addLayout(mode_layout)

        layout.addWidget(container)

        # Save Button
        btn_layout = QHBoxLayout()
        self.save_btn = QPushButton("Save Settings")
        self.save_btn.setCursor(Qt.PointingHandCursor)
        self.save_btn.setStyleSheet("""
            QPushButton {
                background-color: #2563eb;
                color: white;
                font-weight: bold;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
            }
            QPushButton:hover {
                background-color: #1d4ed8;
            }
        """)
        self.save_btn.clicked.connect(self._save_settings)
        
        btn_layout.addStretch()
        btn_layout.addWidget(self.save_btn)
        
        layout.addLayout(btn_layout)
        layout.addStretch()

    def _load_current_settings(self):
        saved_theme = self.settings.value("app_theme", "System")
        index = self.theme_combo.findText(saved_theme)
        if index >= 0:
            self.theme_combo.setCurrentIndex(index)
            
        saved_mode = self.settings.value("default_view_mode", "Dashboard")
        mode_idx = self.mode_combo.findText(saved_mode)
        if mode_idx >= 0:
            self.mode_combo.setCurrentIndex(mode_idx)

    def _save_settings(self):
        self.settings.setValue("app_theme", self.theme_combo.currentText())
        self.settings.setValue("default_view_mode", self.mode_combo.currentText())
        
        # Change button text temporarily
        original_text = self.save_btn.text()
        self.save_btn.setText("Saved!")
        self.save_btn.setStyleSheet(self.save_btn.styleSheet().replace("#2563eb", "#10b981").replace("#1d4ed8", "#059669"))
        
        import threading
        def restore():
            self.save_btn.setText(original_text)
            self.save_btn.setStyleSheet(self.save_btn.styleSheet().replace("#10b981", "#2563eb").replace("#059669", "#1d4ed8"))
        
        threading.Timer(2.0, restore).start()
        self.settings_changed.emit()
