# -*- mode: python ; coding: utf-8 -*-

datas = [
    ('assets', 'assets'),
    ('ui/dist', 'ui/dist'),
    ('ui/public', 'ui/public')
]

a = Analysis(
    ['src\\main.py'],
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
    [],
    exclude_binaries=True,
    name='VibeCoderStarterpack',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['assets\\app_icon.ico'],
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='VibeCoderStarterpack',
)
