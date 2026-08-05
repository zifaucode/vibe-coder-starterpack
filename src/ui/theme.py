def get_base_stylesheet() -> str:
    return """
    /* Global Settings */
    * {
        font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    
    QMainWindow {
        background-color: #ffffff; /* pure white */
        color: #111827; /* dark gray */
    }
    
    #sidebar {
        background-color: #f8fafc; /* very light gray */
        border-right: 1px solid #e2e8f0; /* light border */
    }
    
    #content_area {
        background-color: #ffffff;
    }
    
    QLabel {
        color: #111827;
    }
    
    #sidebar_title {
        color: #64748b; /* slate-500 */
        font-size: 14px;
        font-weight: bold;
        padding: 16px;
    }
    
    QListWidget {
        background-color: transparent;
        outline: none;
        border: none;
    }
    
    QListWidget::item {
        color: #475569; /* slate-600 */
        padding: 12px 16px;
        border-radius: 6px;
        margin: 4px 12px;
    }
    
    QListWidget::item:hover {
        background-color: #f1f5f9; /* slate-100 */
        color: #0f172a; /* slate-900 */
    }
    
    QListWidget::item:selected {
        background-color: #111827; /* dark button/selection */
        color: #ffffff; /* white text */
        font-weight: bold;
    }
    
    #content_title {
        color: #111827;
        font-size: 24px;
        font-weight: bold;
        padding: 24px;
    }
    """

