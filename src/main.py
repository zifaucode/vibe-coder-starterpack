import sys
import os
import webview
from core.logger import setup_logging
from core.config import settings
from loguru import logger

class Api:
    """API Bridge between Python and React UI"""
    
    def get_system_info(self):
        return {
            "app_name": settings.app_name,
            "version": settings.version,
            "status": "Ready",
            "message": "Python Backend is connected!"
        }
    
    def log_message(self, message):
        logger.info(f"Frontend log: {message}")
        return "Message received by Python"

def main():
    # Setup directories
    os.makedirs("logs", exist_ok=True)
    setup_logging()
    
    logger.info(f"Starting {settings.app_name} v{settings.version} with PyWebView")
    
    api = Api()
    
    # In development, we connect to the Vite dev server
    # In production, we load the built static HTML file
    is_prod = getattr(sys, 'frozen', False)
    
    if not is_prod:
        # Dev server URL
        url = "http://localhost:5173"
        debug_mode = True
    else:
        base_path = sys._MEIPASS
        # Built React output
        url = f"file://{os.path.join(base_path, 'ui', 'dist', 'index.html')}"
        debug_mode = False
    
    window = webview.create_window(
        title=f"{settings.app_name}",
        url=url,
        js_api=api,
        width=1200,
        height=800,
        min_size=(900, 600),
        # You can set frameless=True later to build a custom titlebar in React!
        frameless=False, 
        background_color='#FFFFFF'
    )
    
    webview.start(debug=debug_mode)

if __name__ == "__main__":
    main()
