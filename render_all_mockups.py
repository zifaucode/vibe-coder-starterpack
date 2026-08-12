import os, sys
from PySide6.QtWidgets import QApplication
from PySide6.QtGui import QImage, QPainter, QColor, QLinearGradient, QPainterPath
from PySide6.QtCore import Qt

# Import the mobile glossary tool
sys.path.insert(0, os.path.abspath("src"))
from modules.mobile.tools.mobile_glossary import MobileGlossaryTool

def draw_base_and_save(pixmap, output_path):
    width, height = 800, 800
    image = QImage(width, height, QImage.Format_ARGB32)
    image.fill(Qt.transparent)
    painter = QPainter(image)
    painter.setRenderHint(QPainter.Antialiasing)
    
    # Background
    bg_gradient = QLinearGradient(0, 0, width, height)
    bg_gradient.setColorAt(0.0, QColor("#f8fafc"))
    bg_gradient.setColorAt(1.0, QColor("#e2e8f0"))
    painter.fillRect(0, 0, width, height, bg_gradient)
    
    # Phone Body
    phone_width = 348 # the captured frame is 320 content + 14*2 border = 348
    phone_height = 668 # 640 + 28
    px = (width - phone_width) // 2
    py = (height - phone_height) // 2
    
    # Shadow
    shadow_path = QPainterPath()
    shadow_path.addRoundedRect(px + 10, py + 15, phone_width, phone_height, 40, 40)
    painter.fillPath(shadow_path, QColor(0, 0, 0, 40))
    
    # Draw the captured widget pixmap
    painter.drawPixmap(px, py, pixmap)
    
    # Draw notch on top of it
    notch_width = 120
    notch_height = 25
    notch_path = QPainterPath()
    notch_path.addRoundedRect(px + (phone_width - notch_width) // 2, py + 14, notch_width, notch_height, 12, 12)
    painter.fillPath(notch_path, QColor("#0f172a"))
    
    painter.end()
    
    png_path = output_path.replace(".webp", ".png")
    image.save(png_path)
    try:
        from PIL import Image
        with Image.open(png_path) as img:
            img.save(output_path, "WEBP", quality=85)
        os.remove(png_path)
    except Exception as e:
        print("Failed to use PIL:", e)
        os.rename(png_path, output_path.replace(".webp", ".png"))

def main():
    os.environ["GENERATING_MOCKUPS"] = "1"
    app = QApplication.instance() or QApplication(sys.argv)
    tool = MobileGlossaryTool()
    tool.show()
    
    os.makedirs("assets/mockups", exist_ok=True)
    
    for i, item in enumerate(tool.items):
        title = tool.menu.item(i).text()
        filename = title.lower().replace(" ", "_").replace("/", "_").replace("(", "").replace(")", "").replace("&", "")
        # replace multiple underscores with single
        import re
        filename = re.sub(r'_+', '_', filename).strip('_') + ".webp"
        
        # Select item
        tool.menu.setCurrentRow(i)
        app.processEvents()
        
        # Grab phone widget
        pixmap = item.phone.grab()
        draw_base_and_save(pixmap, f"assets/mockups/{filename}")
        print(f"Rendered {filename}")
        
if __name__ == "__main__":
    main()
