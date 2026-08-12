# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import copy_metadata

datas = [('assets', 'assets')]
datas += copy_metadata('pymatting')
datas += copy_metadata('rembg')
datas += copy_metadata('pooch')
datas += copy_metadata('onnxruntime')


a = Analysis(
    ['src\\main.py'],
    pathex=['src'],
    binaries=[],
    datas=datas,
    hiddenimports=['rembg', 'vtracer', 'onnxruntime', 'PIL'],
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
