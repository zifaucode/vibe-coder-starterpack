@echo off
echo ====================================================
echo   Building Vibe Coder Starterpack (VCS) Executable
echo ====================================================

echo [1/3] Building React Frontend UI...
cd ui
call pnpm run build
cd ..

echo [2/3] Cleaning old build artifacts...
taskkill /F /IM VibeCoderStarterpack.exe /T 2>nul
rmdir /S /Q build 2>nul
rmdir /S /Q dist 2>nul

echo [3/3] Running PyInstaller with VCS Logo & Splash Screen...
.\venv\Scripts\pyinstaller.exe VibeCoderStarterpack.spec --noconfirm --clean

echo ====================================================
echo BUILD COMPLETE! 
echo Executable: dist\VibeCoderStarterpack\VibeCoderStarterpack.exe
echo Icon & Splash Screen applied successfully!
echo ====================================================
pause
