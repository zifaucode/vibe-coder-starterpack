@echo off
echo Cleaning old builds...
taskkill /F /IM VibeCoderStarterpack.exe /T 2>nul
rmdir /S /Q build
rmdir /S /Q dist

echo Building Vibe Coder Starterpack (VCS)...
.\venv\Scripts\pyinstaller.exe --name "VibeCoderStarterpack" --windowed --noconfirm --clean --icon=assets\app_icon.ico --add-data "assets;assets" --hidden-import rembg --hidden-import vtracer --hidden-import onnxruntime --hidden-import PIL --copy-metadata pymatting --copy-metadata rembg --copy-metadata pooch --copy-metadata onnxruntime --paths src src\main.py

echo Build complete! Executable is in the dist/ folder.
pause
