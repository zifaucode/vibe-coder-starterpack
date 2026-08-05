import os
import re

replacements = {
    "#0f172a": "#ffffff", # dark bg -> white
    "#1e293b": "#f8fafc", # slate-800 -> slate-50 (panel bg)
    "#334155": "#e2e8f0", # slate-700 -> slate-200 (borders/hover)
    "#475569": "#cbd5e1", # slate-600 -> slate-300 (disabled/border)
    "#94a3b8": "#64748b", # slate-400 -> slate-500 (muted text)
    "#cbd5e1": "#475569", # slate-300 -> slate-600 (subtext)
    "#e2e8f0": "#1f2937", # slate-200 -> gray-800
    "#f8fafc": "#111827", # slate-50 -> dark text
    "#2563eb": "#111827", # blue-600 -> dark button
    "#3b82f6": "#1f2937", # blue-500 -> dark button hover
    "#1d4ed8": "#030712", # blue-700 -> dark button active
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old_color, new_color in replacements.items():
        # Case insensitive replacement for hex codes
        content = re.sub(old_color, new_color, content, flags=re.IGNORECASE)
        
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.py'):
            process_file(os.path.join(root, file))
