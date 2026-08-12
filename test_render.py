import os, sys
from PySide6.QtWidgets import QApplication
from PySide6.QtGui import QPixmap, QImage, QPainter, QColor
from PySide6.QtCore import Qt

sys.path.insert(0, os.path.abspath("src"))
from modules.mobile.tools.mobile_glossary import MobileGlossaryTool

def main():
    os.environ["GENERATING_MOCKUPS"] = "1"
    app = QApplication.instance() or QApplication(sys.argv)
    tool = MobileGlossaryTool()
    tool.show()
    
    item = tool.items[0] # Splash Screen
    
    app.processEvents()
    
    # Try render() instead of grab()
    pixmap = QPixmap(item.phone.size())
    pixmap.fill(Qt.transparent) # Fill with transparent
    item.phone.render(pixmap)
    
    pixmap.save("test_splash_render.png")

if __name__ == "__main__":
    main()
