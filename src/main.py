import sys
import os
import time
import base64
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

def get_base64_logo():
    """Load VCS logo as base64 string for standalone splash screen"""
    logo_path = os.path.join("ui", "public", "vcs-logo.png")
    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
        logo_path = os.path.join(base_path, "ui", "public", "vcs-logo.png")
    
    if os.path.exists(logo_path):
        try:
            with open(logo_path, "rb") as f:
                return base64.b64encode(f.read()).decode("utf-8")
        except Exception as e:
            logger.warning(f"Could not encode logo: {e}")
    return ""

def create_splash_html():
    logo_b64 = get_base64_logo()
    img_tag = f'<img src="data:image/png;base64,{logo_b64}" class="logo" />' if logo_b64 else '<div class="logo">VCS</div>'
    
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>VCS Loading...</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }}
        body {{
            background-color: #000000;
            color: #ffffff;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            user-select: none;
            overflow: hidden;
        }}
        .splash-card {{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 20px;
        }}
        .logo {{
            width: 84px;
            height: 84px;
            border-radius: 20px;
            border: 1px solid #333333;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            object-fit: cover;
        }}
        .title {{
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #ffffff;
        }}
        .subtitle {{
            font-size: 11px;
            font-weight: 600;
            font-family: monospace;
            color: #888888;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 4px;
        }}
        .progress-container {{
            width: 240px;
            height: 4px;
            background-color: #1a1a1a;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 16px;
        }}
        .progress-bar {{
            height: 100%;
            width: 0%;
            background-color: #ffffff;
            border-radius: 4px;
            animation: fillProgress 1.6s ease-in-out forwards;
        }}
        @keyframes fillProgress {{
            0% {{ width: 0%; }}
            50% {{ width: 70%; }}
            100% {{ width: 100%; }}
        }}
    </style>
</head>
<body>
    <div class="splash-card">
        {img_tag}
        <div>
            <div class="title">VCS</div>
            <div class="subtitle">Initializing Application...</div>
        </div>
        <div class="progress-container">
            <div class="progress-bar"></div>
        </div>
    </div>
</body>
</html>"""

def start_app_flow(window, app_url):
    """Sequence: show splash screen for 1.8s, then load main React app"""
    time.sleep(1.8)
    window.load_url(app_url)

def main():
    os.makedirs("logs", exist_ok=True)
    setup_logging()
    
    logger.info(f"Starting {settings.app_name} v{settings.version} with PyWebView")
    
    api = Api()
    is_prod = getattr(sys, 'frozen', False)
    
    if not is_prod:
        url = "http://localhost:5173"
        window = webview.create_window(
            title=f"{settings.app_name}",
            url=url,
            js_api=api,
            width=1200,
            height=800,
            min_size=(900, 600),
            background_color='#FFFFFF'
        )
        webview.start(debug=True)
    else:
        base_path = sys._MEIPASS
        index_path = os.path.abspath(os.path.join(base_path, 'ui', 'dist', 'index.html'))
        # Ensure path format is file:///C:/path/to/index.html
        formatted_path = index_path.replace('\\', '/')
        if not formatted_path.startswith('/'):
            formatted_path = '/' + formatted_path
        app_url = f"file://{formatted_path}"
        
        logger.info(f"Loading production URL: {app_url}")
        
        window = webview.create_window(
            title=f"{settings.app_name}",
            html=create_splash_html(),
            js_api=api,
            width=1200,
            height=800,
            min_size=(900, 600),
            background_color='#000000'
        )
        webview.start(start_app_flow, (window, app_url), debug=False)

if __name__ == "__main__":
    main()
