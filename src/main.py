import sys
import os
from PySide6.QtWidgets import QApplication
from app.main_window import MainWindow
from core.logger import setup_logging
from core.config import settings
from ui.theme import get_base_stylesheet
from loguru import logger

def main():
    # Ensure logs directory exists
    os.makedirs("logs", exist_ok=True)
    setup_logging()
    
    logger.info(f"Starting {settings.app_name} v{settings.version}")
    
    app = QApplication(sys.argv)
    
    # Set global style
    app.setStyleSheet(get_base_stylesheet())
    
    window = MainWindow()
    window.show()
    
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
