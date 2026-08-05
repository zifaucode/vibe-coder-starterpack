from PySide6.QtWidgets import QWidget, QHBoxLayout, QLabel, QGraphicsOpacityEffect
from PySide6.QtCore import Qt, QTimer, QPropertyAnimation, QEasingCurve
from PySide6.QtGui import QIcon

class Toast(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setWindowFlags(Qt.FramelessWindowHint | Qt.ToolTip)
        self.setAttribute(Qt.WA_TranslucentBackground)
        self.setAttribute(Qt.WA_TransparentForMouseEvents)
        self.setFixedHeight(48)
        
        # Opacity Effect for fade animation
        self.opacity_effect = QGraphicsOpacityEffect(self)
        self.setGraphicsEffect(self.opacity_effect)
        self.opacity_effect.setOpacity(0.0)

        # UI Setup
        self._setup_ui()

        # Animation setup
        self.fade_anim = QPropertyAnimation(self.opacity_effect, b"opacity")
        self.fade_anim.setEasingCurve(QEasingCurve.InOutQuad)
        self.fade_anim.setDuration(300)

        # Timer for hiding
        self.hide_timer = QTimer(self)
        self.hide_timer.setSingleShot(True)
        self.hide_timer.timeout.connect(self.hide_toast)

    def _setup_ui(self):
        self.layout = QHBoxLayout(self)
        self.layout.setContentsMargins(16, 8, 16, 8)

        self.container = QWidget()
        self.container.setObjectName("toast_container")
        self.container.setStyleSheet("""
            QWidget#toast_container {
                background-color: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
            }
        """)
        
        container_layout = QHBoxLayout(self.container)
        container_layout.setContentsMargins(16, 0, 16, 0)

        self.icon_label = QLabel()
        self.icon_label.setText("i")
        
        self.message_label = QLabel("Notification")
        self.message_label.setStyleSheet("color: #111827; font-size: 14px; font-weight: 500;")
        
        container_layout.addWidget(self.icon_label)
        container_layout.addWidget(self.message_label)
        
        self.layout.addWidget(self.container)

    def show_toast(self, message: str, duration: int = 3000):
        self.message_label.setText(message)
        self.adjustSize()
        
        # Position at the bottom center of parent
        if self.parent():
            parent_rect = self.parent().rect()
            x = (parent_rect.width() - self.width()) // 2
            y = parent_rect.height() - self.height() - 32
            self.move(x, y)

        self.show()
        self.raise_()

        # Stop existing animations/timers
        self.fade_anim.stop()
        self.hide_timer.stop()

        # Fade in
        self.fade_anim.setStartValue(self.opacity_effect.opacity())
        self.fade_anim.setEndValue(1.0)
        self.fade_anim.start()

        self.hide_timer.start(duration)

    def hide_toast(self):
        self.fade_anim.stop()
        self.fade_anim.setStartValue(self.opacity_effect.opacity())
        self.fade_anim.setEndValue(0.0)
        self.fade_anim.finished.connect(self._on_hide_finished)
        self.fade_anim.start()

    def _on_hide_finished(self):
        self.fade_anim.finished.disconnect(self._on_hide_finished)
        self.hide()
