import os
from PySide6.QtGui import QImage, QPainter, QColor, QFont, QPen, QBrush, QLinearGradient, QFontDatabase
from PySide6.QtCore import Qt, QRectF

def generate_logo():
    # Size for high-quality icon
    size = 512
    image = QImage(size, size, QImage.Format_ARGB32)
    image.fill(Qt.transparent)

    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    painter.setRenderHint(QPainter.TextAntialiasing)

    # Clean white/light background with slight shadow/border
    margin = 32
    rect = QRectF(margin, margin, size - 2*margin, size - 2*margin)
    
    # White background with soft rounded corners
    bg_color = QColor("#ffffff")
    painter.setBrush(QBrush(bg_color))
    painter.setPen(Qt.NoPen)
    painter.drawRoundedRect(rect, 100, 100)

    # Dark Primary Gradient for the text/icon
    gradient = QLinearGradient(rect.topLeft(), rect.bottomRight())
    gradient.setColorAt(0, QColor("#334155"))
    gradient.setColorAt(1, QColor("#0f172a"))

    painter.setBrush(QBrush(gradient))
    
    # Let's draw an abstract minimalist shape or text. We'll use "VC" for Vibe Coder
    # But as requested: clean and minimalist
    font = QFont("Segoe UI", 130, QFont.Bold)
    painter.setFont(font)
    painter.setPen(QPen(gradient, 1))
    
    # Draw text centered
    painter.drawText(rect, Qt.AlignCenter, "VCS")

    # Add a subtle design accent (e.g., a small dot or line)
    accent_rect = QRectF(size/2 + 70, size/2 + 50, 24, 24)
    painter.setBrush(QBrush(QColor("#3b82f6"))) # A tiny blue accent
    painter.setPen(Qt.NoPen)
    painter.drawEllipse(accent_rect)

    painter.end()

    # Create assets folder if not exists
    os.makedirs("assets", exist_ok=True)
    
    # Save as PNG
    png_path = os.path.join("assets", "app_icon.png")
    image.save(png_path, "PNG")
    
    # Save as ICO (PySide6 QImage supports ICO format save directly if the plugin is available)
    ico_path = os.path.join("assets", "app_icon.ico")
    image.save(ico_path, "ICO")

    print(f"Generated logo successfully at {png_path} and {ico_path}")

if __name__ == "__main__":
    from PySide6.QtGui import QGuiApplication
    import sys
    app = QGuiApplication(sys.argv)
    generate_logo()
