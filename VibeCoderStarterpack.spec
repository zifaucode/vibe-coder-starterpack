# -*- mode: python ; coding: utf-8 -*-
# Satu berkas portable. Saat dijalankan, isinya diekstrak ke folder temp, sehingga DLL tidak
# membawa tanda "Mark of the Web" dari unduhan dan pythonnet bisa memuatnya di PC pengguna.

datas = [
    ('assets', 'assets'),
    ('ui/dist', 'ui/dist'),
    ('ui/public', 'ui/public')
]

a = Analysis(
    ['src/main.py'],
    pathex=['src'],
    binaries=[],
    datas=datas,
    hiddenimports=['webview', 'loguru'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='VibeCoderStarterpack_Portable',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['assets/app_icon.ico'],
)
