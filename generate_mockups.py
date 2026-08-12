import os
import sys
from PySide6.QtGui import QImage, QPainter, QColor, QFont, QPen, QBrush, QLinearGradient, QFontDatabase, QPainterPath, QGuiApplication
from PySide6.QtCore import Qt, QRectF

def draw_base_phone(painter, width, height):
    phone_width = 360
    phone_height = 720
    px = (width - phone_width) // 2
    py = (height - phone_height) // 2
    
    # Shadow
    shadow_path = QPainterPath()
    shadow_path.addRoundedRect(px + 10, py + 15, phone_width, phone_height, 40, 40)
    painter.fillPath(shadow_path, QColor(0, 0, 0, 40))
    
    # Outer Frame
    frame_path = QPainterPath()
    frame_path.addRoundedRect(px, py, phone_width, phone_height, 40, 40)
    painter.fillPath(frame_path, QColor("#1e293b"))
    
    # Screen background
    screen_path = QPainterPath()
    screen_path.addRoundedRect(px + 10, py + 10, phone_width - 20, phone_height - 20, 32, 32)
    screen_gradient = QLinearGradient(px, py, px, py + phone_height)
    screen_gradient.setColorAt(0.0, QColor("#ffffff"))
    screen_gradient.setColorAt(1.0, QColor("#f1f5f9"))
    painter.fillPath(screen_path, screen_gradient)
    
    # Notch/Camera
    notch_width = 120
    notch_height = 25
    notch_path = QPainterPath()
    notch_path.addRoundedRect(px + (phone_width - notch_width) // 2, py + 10, notch_width, notch_height, 12, 12)
    painter.fillPath(notch_path, QColor("#0f172a"))
    
    return px, py, phone_width, phone_height

def save_and_convert(image, output_path):
    png_path = output_path.replace(".webp", ".png")
    image.save(png_path)
    try:
        from PIL import Image
        with Image.open(png_path) as img:
            img.save(output_path, "WEBP", quality=85)
        os.remove(png_path)
        print(f"Successfully generated {output_path}")
    except ImportError:
        print("Pillow not found, leaving as PNG")
        os.rename(png_path, output_path.replace(".webp", ".png"))

def generate_splash_screen(output_path):
    app = QGuiApplication.instance() or QGuiApplication(sys.argv)
    width, height = 800, 800
    image = QImage(width, height, QImage.Format_ARGB32)
    image.fill(Qt.transparent)
    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    
    px, py, phone_width, phone_height = draw_base_phone(painter, width, height)
    
    # Splash Screen Elements
    logo_size = 80
    lx = px + (phone_width - logo_size) // 2
    ly = py + (phone_height - logo_size) // 2 - 40
    
    logo_bg = QPainterPath()
    logo_bg.addRoundedRect(lx, ly, logo_size, logo_size, 20, 20)
    painter.fillPath(logo_bg, QColor("#0f172a"))
    
    painter.setPen(Qt.NoPen)
    painter.setBrush(QColor("#3b82f6"))
    painter.drawRoundedRect(lx + 15, ly + 15, 50, 50, 10, 10)
    painter.setBrush(QColor("#ffffff"))
    painter.drawEllipse(lx + 35, ly + 35, 10, 10)
    
    font = QFont("Segoe UI", 24, QFont.Bold)
    painter.setFont(font)
    painter.setPen(QColor("#0f172a"))
    text = "VibeApp"
    text_rect = painter.boundingRect(px, ly + logo_size + 20, phone_width, 50, Qt.AlignCenter, text)
    painter.drawText(text_rect, Qt.AlignCenter, text)
    
    painter.end()
    save_and_convert(image, output_path)

def generate_onboarding(output_path):
    app = QGuiApplication.instance() or QGuiApplication(sys.argv)
    width, height = 800, 800
    image = QImage(width, height, QImage.Format_ARGB32)
    image.fill(Qt.transparent)
    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    
    px, py, phone_width, phone_height = draw_base_phone(painter, width, height)
    
    # Onboarding image circle
    cx = px + phone_width // 2
    cy = py + phone_height // 2 - 80
    
    painter.setPen(QPen(QColor("#cbd5e1"), 2, Qt.DashLine))
    painter.setBrush(QColor("#f1f5f9"))
    painter.drawEllipse(cx - 100, cy - 100, 200, 200)
    
    # Title
    font = QFont("Segoe UI", 20, QFont.Bold)
    painter.setFont(font)
    painter.setPen(QColor("#0f172a"))
    text_rect = painter.boundingRect(px, cy + 120, phone_width, 40, Qt.AlignCenter, "Welcome to Vibe")
    painter.drawText(text_rect, Qt.AlignCenter, "Welcome to Vibe")
    
    # Subtitle
    font_sub = QFont("Segoe UI", 14)
    painter.setFont(font_sub)
    painter.setPen(QColor("#64748b"))
    sub_rect = painter.boundingRect(px, cy + 160, phone_width, 30, Qt.AlignCenter, "Discover the best UI design patterns.")
    painter.drawText(sub_rect, Qt.AlignCenter, "Discover the best UI design patterns.")
    
    # Dots
    painter.setPen(Qt.NoPen)
    painter.setBrush(QColor("#3b82f6"))
    painter.drawRoundedRect(cx - 24, cy + 220, 24, 8, 4, 4)
    painter.setBrush(QColor("#e2e8f0"))
    painter.drawRoundedRect(cx + 8, cy + 220, 8, 8, 4, 4)
    painter.drawRoundedRect(cx + 24, cy + 220, 8, 8, 4, 4)
    
    painter.end()
    save_and_convert(image, output_path)

def generate_hero(output_path):
    app = QGuiApplication.instance() or QGuiApplication(sys.argv)
    width, height = 800, 800
    image = QImage(width, height, QImage.Format_ARGB32)
    image.fill(Qt.transparent)
    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    
    px, py, phone_width, phone_height = draw_base_phone(painter, width, height)
    
    # Hero image area
    hero_path = QPainterPath()
    hero_path.addRoundedRect(px + 10, py + 10, phone_width - 20, 240, 32, 32)
    hero_grad = QLinearGradient(px, py, px, py + 240)
    hero_grad.setColorAt(0.0, QColor("#10b981"))
    hero_grad.setColorAt(1.0, QColor("#047857"))
    painter.fillPath(hero_path, hero_grad)
    
    # Redraw notch so it's above hero image
    notch_width = 120
    notch_height = 25
    notch_path = QPainterPath()
    notch_path.addRoundedRect(px + (phone_width - notch_width) // 2, py + 10, notch_width, notch_height, 12, 12)
    painter.fillPath(notch_path, QColor("#0f172a"))
    
    # Hero Text
    font = QFont("Segoe UI", 28, QFont.Bold)
    painter.setFont(font)
    painter.setPen(QColor("#ffffff"))
    painter.drawText(px, py + 100, phone_width, 50, Qt.AlignCenter, "Explore Nature")
    
    font_sub = QFont("Segoe UI", 14)
    painter.setFont(font_sub)
    painter.setPen(QColor("#d1fae5"))
    painter.drawText(px, py + 150, phone_width, 30, Qt.AlignCenter, "Find your next adventure")
    
    painter.end()
    save_and_convert(image, output_path)

def generate_bottomnav(output_path):
    app = QGuiApplication.instance() or QGuiApplication(sys.argv)
    width, height = 800, 800
    image = QImage(width, height, QImage.Format_ARGB32)
    image.fill(Qt.transparent)
    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    
    px, py, phone_width, phone_height = draw_base_phone(painter, width, height)
    
    # Bottom Navigation Bar
    nav_h = 80
    nav_path = QPainterPath()
    nav_path.addRoundedRect(px + 10, py + phone_height - 10 - nav_h, phone_width - 20, nav_h, 32, 32)
    
    # We want top corners to be sharp or slightly rounded, but bottom to be 32
    painter.setPen(Qt.NoPen)
    painter.setBrush(QColor("#ffffff"))
    painter.drawRoundedRect(px + 10, py + phone_height - 10 - nav_h, phone_width - 20, nav_h, 32, 32)
    # Fill upper part of nav bar so it's not rounded
    painter.drawRect(px + 10, py + phone_height - 10 - nav_h, phone_width - 20, nav_h // 2)
    
    # Top border of nav
    painter.setPen(QPen(QColor("#e2e8f0"), 1))
    painter.drawLine(px + 10, py + phone_height - 10 - nav_h, px + phone_width - 10, py + phone_height - 10 - nav_h)
    
    # Nav Items
    painter.setPen(Qt.NoPen)
    items = [("Home", True), ("Search", False), ("Profile", False)]
    item_w = (phone_width - 20) // 3
    for i, (label, active) in enumerate(items):
        cx = px + 10 + i * item_w + item_w // 2
        cy = py + phone_height - 10 - nav_h + 30
        
        # Draw fake icon
        painter.setBrush(QColor("#3b82f6") if active else QColor("#94a3b8"))
        painter.drawEllipse(cx - 12, cy - 12, 24, 24)
        
        # Label
        font = QFont("Segoe UI", 10, QFont.Bold if active else QFont.Normal)
        painter.setFont(font)
        painter.setPen(QColor("#3b82f6") if active else QColor("#94a3b8"))
        painter.drawText(cx - 30, cy + 20, 60, 20, Qt.AlignCenter, label)
    
    painter.end()
    save_and_convert(image, output_path)

if __name__ == "__main__":
    os.makedirs("assets/mockups", exist_ok=True)
    generate_splash_screen("assets/mockups/splash_screen.webp")
    generate_onboarding("assets/mockups/onboarding.webp")
    generate_hero("assets/mockups/hero.webp")
    generate_bottomnav("assets/mockups/bottomnav.webp")
