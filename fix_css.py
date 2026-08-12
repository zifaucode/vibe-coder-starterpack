import re

def fix():
    with open('src/modules/mobile/tools/mobile_glossary.py', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace:
    # c = QWidget()
    # c.setStyleSheet("background-color: ...;")
    # with:
    # c = QWidget()
    # c.setObjectName("cont")
    # c.setStyleSheet("#cont { background-color: ...; }")
    
    def replacer(match):
        prefix = match.group(1)
        style = match.group(2)
        # Avoid double replacing
        if "#cont" in style:
            return match.group(0)
        return f'{prefix}c.setObjectName("cont")\n            c.setStyleSheet("#cont {{ {style} }}")'
        
    new_content = re.sub(r'(c = QWidget\(\)\s*\n\s*)c\.setStyleSheet\(\"(.*?)\"\)', replacer, content)
    
    with open('src/modules/mobile/tools/mobile_glossary.py', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    fix()
