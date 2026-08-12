import os, sys, time
from PySide6.QtWidgets import QApplication
from PySide6.QtGui import QPixmap, QImage, QPainter, QColor
from PySide6.QtCore import Qt, QTimer

sys.path.insert(0, os.path.abspath("src"))
from modules.mobile.tools.mobile_glossary import MobileGlossaryTool

def main():
    os.environ["GENERATING_MOCKUPS"] = "1"
    app = QApplication.instance() or QApplication(sys.argv)
    tool = MobileGlossaryTool()
    tool.show()
    
    item = tool.items[1] # Onboarding
    tool.stack.setCurrentWidget(item.widget)
    
    # Let it fully render
    for _ in range(10):
        app.processEvents()
        time.sleep(0.05)
        
    pixmap = item.phone.grab()
    pixmap.save("test_onboarding_grab.png")
    
    # Try render
    pixmap2 = QPixmap(item.phone.size())
    pixmap2.fill(Qt.white)
    item.phone.render(pixmap2)
    pixmap2.save("test_onboarding_render.png")
    
    # Check pixels programmatically to see if black box is there
    img = pixmap.toImage()
    # The text "Welcome to Vibe" is in a label. The parent container has white bg.
    # If the label has a black bg, the area around the text will have black pixels.
    # The phone frame is 360x720, scaled.
    # Let's count completely black pixels (0,0,0) in the middle area
    black_count_grab = 0
    black_count_render = 0
    
    img1 = pixmap.toImage()
    img2 = pixmap2.toImage()
    for y in range(img1.height()):
        for x in range(img1.width()):
            if img1.pixelColor(x, y).name() == "#000000":
                black_count_grab += 1
            if img2.pixelColor(x, y).name() == "#000000":
                black_count_render += 1
                
    print(f"Black pixels in grab: {black_count_grab}")
    print(f"Black pixels in render: {black_count_render}")

if __name__ == "__main__":
    main()
