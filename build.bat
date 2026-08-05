@echo off
echo Cleaning old builds...
taskkill /F /IM VibeCoderStarterpack.exe /T 2>nul
rmdir /S /Q build
rmdir /S /Q dist

echo Building Vibe Coder Starterpack (VCS)...
.\venv\Scripts\pyinstaller.exe --name "VibeCoderStarterpack" --windowed --noconfirm --clean --paths src src\main.py

echo Build complete! Executable is in the dist/ folder.
pause
