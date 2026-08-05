# Vibe Coder Starterpack 🚀

![Python Version](https://img.shields.io/badge/python-3.9%2B-blue.svg)
![PySide6](https://img.shields.io/badge/UI-PySide6-green.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)

**Vibe Coder Starterpack (VCS)** is a modern, high-performance desktop application built with Python and PySide6 (Qt). Designed to be a central hub for developers and UI/UX designers, it brings essential daily tools into one seamless, unified native application—reducing browser tab clutter and accelerating your workflow.

With a meticulously crafted **Tailwind CSS-inspired** styling architecture, VCS feels native, fluid, and visually stunning.

---

## 🌟 Features

- **🎨 Design Tools:** Access integrated color palettes, typography guidelines, icon libraries, and layout utilities.
- **💻 Developer Tools:** Built-in JSON formatters, Regular Expression (Regex) testers, and Base64 encoders/decoders.
- **📱 Mobile Design Glossary:** An interactive visual glossary of over 35 mobile UI patterns (from Splash Screens to Modals and Snackbars), fully rendered natively.
- **⚙️ Preferences Engine:** Save your configuration (Theme, Default View Mode) persistently using local system storage (`QSettings`).
- **⚡ Command Palette:** Hit `Ctrl+K` from anywhere in the app to quickly search and launch tools instantly.

---

## 📸 Screenshots

*(Add screenshots of your Dashboard and Mobile Design components here!)*

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Python 3.9** or higher
- **Git** (for version control)

---

## 🚀 Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vibe-coder-starterpack.git
   cd vibe-coder-starterpack
   ```

2. **Set up a Virtual Environment (Recommended)**
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**
   If you don't have a `requirements.txt` yet, install the core packages manually:
   ```bash
   pip install PySide6 loguru pyinstaller
   ```

5. **Run the Application**
   ```bash
   python src/main.py
   ```

---

## 📦 How to Build (Create Executable)

To distribute the app to users who do not have Python installed, you can compile the application into a standalone executable (`.exe`).

### Building on Windows

We have provided a batch script for automatic compilation. Make sure your virtual environment is active!

1. **Run the build script:**
   ```bash
   .\build.bat
   ```
2. **Retrieve the Executable:**
   Once the process finishes successfully, your standalone application will be located in the newly created `dist/` folder:
   ```text
   dist/VibeCoderStarterpack.exe
   ```

*(Behind the scenes, the build script uses PyInstaller and standardizes the include hooks for PySide6).*

---

## 📁 Project Structure

```text
vibe-coder-starterpack/
│
├── src/
│   ├── app/                    # Core application logic and main window
│   ├── modules/                # Specialized feature modules
│   │   ├── design/             # Design Tools
│   │   ├── developer/          # Dev Tools (JSON, Regex, etc.)
│   │   └── mobile/             # Mobile UI Glossary
│   ├── ui/                     # Reusable UI components
│   │   └── components/         # Dashboard, Settings, Command Palette, etc.
│   └── main.py                 # Application entry point
│
├── build.bat                   # Windows compilation script
├── VibeCoderStarterpack.spec   # PyInstaller build spec
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ to make development workflows faster and more elegant.*
