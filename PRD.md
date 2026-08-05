# Product Requirements Document (PRD)

# VCS (Vibe Coder Starterpack)

> **One App. Less Browser Tabs. Faster Workflow.**

-   **Version:** 0.1 (MVP)
-   **Platform:** Windows Desktop (.exe)
-   **Primary Stack:** Python + PySide6 (Qt)

------------------------------------------------------------------------

# 1. Overview

VCS (Vibe Coder Starterpack) adalah aplikasi desktop modern yang
menggabungkan utility untuk developer, UI/UX designer, dan mobile
developer ke dalam satu aplikasi offline. Tujuannya adalah mengurangi
kebutuhan membuka banyak website utility dan menyediakan pengalaman
kerja yang cepat, konsisten, dan modern.

Inspirasi desain:

-   shadcn/ui
-   Linear
-   Raycast
-   VS Code
-   Obsidian

------------------------------------------------------------------------

# 2. Vision

Menjadi **Developer Toolbox Desktop** yang menyediakan utility penting
untuk proses desain, coding, dan prototyping dalam satu aplikasi ringan,
cepat, dan offline.

------------------------------------------------------------------------

# 3. Goals

-   Mengurangi kebutuhan membuka banyak website utility.
-   Menyatukan workflow developer dalam satu aplikasi.
-   Mendukung frontend, backend, UI designer, dan mobile developer.
-   Bekerja 100% offline.
-   Arsitektur modular agar mudah dikembangkan.

------------------------------------------------------------------------

# 4. Target Users

## Primary

-   Frontend Developer
-   Backend Developer
-   Full Stack Developer
-   Mobile Developer
-   UI/UX Designer
-   Freelancer
-   Indie Hacker

## Secondary

-   Mahasiswa
-   Bootcamp Student
-   Startup
-   Software House

------------------------------------------------------------------------

# 5. Navigation

-   Dashboard
-   Design
-   Developer
-   Mobile Design
-   Settings
-   About

------------------------------------------------------------------------

# 6. Dashboard

Dashboard menyediakan:

-   Recent Tools
-   Favorite Tools
-   Search Tool
-   Quick Actions
-   Pinned Tools

------------------------------------------------------------------------

# 7. Modules

## 🎨 Design

### Color Picker

-   Eyedropper
-   HEX / RGB / RGBA / HSL / HSV
-   Opacity
-   Favorite & Recent Color
-   Export CSS, Tailwind, SCSS

### Color Palette

-   Palette Generator
-   Complementary
-   Analogous
-   Triadic
-   Monochrome
-   Random Palette
-   Export JSON, CSS Variables, Tailwind Config

### Gradient Generator

-   Linear
-   Radial
-   Conic
-   Multi Stop
-   Angle
-   Random Gradient
-   Export CSS, SVG, PNG

### Wireframe Builder

Components: - Button - Input - Card - Image - Avatar - Navbar -
Sidebar - Table - Badge - Text

Features: - Drag & Drop - Resize - Snap Grid - Undo / Redo - Layer
Panel - Alignment Tools

Export: - PNG - SVG - JSON

### Icon Browser

Libraries: - Lucide - Heroicons - Tabler

Features: - Search - Preview - Favorite - Copy SVG / JSX / HTML

### SVG Viewer

-   Preview
-   Zoom
-   Pan
-   Optimize
-   Minify
-   Color Editor
-   Export PNG / SVG

### Grid Generator

-   Desktop
-   Tablet
-   Mobile
-   Custom Grid
-   Export CSS Grid, Tailwind, SCSS

------------------------------------------------------------------------

## 💻 Developer

### Lorem Ipsum

-   Word
-   Sentence
-   Paragraph
-   English & Indonesian

### JSON Formatter

-   Beautify
-   Minify
-   Tree View
-   Validate
-   Error Highlight

### Regex Tester

-   Live Match
-   Replace
-   Groups
-   Regex Flags

### Shadow Generator

-   Box Shadow
-   Text Shadow
-   Multiple Shadow
-   Export CSS & Tailwind

### Border Radius Generator

-   Individual Corner
-   Sync Corner
-   Preview
-   Export CSS & Tailwind

### CSS Generator

-   Flexbox
-   Grid
-   Transform
-   Transition
-   Animation
-   Filter
-   Position

------------------------------------------------------------------------

## 📱 Mobile Design

-   Device Frame Preview
-   Responsive Preview
-   Safe Area Generator
-   Mobile Grid Generator
-   Spacing System
-   Touch Target Checker
-   Icon Size Guide
-   Typography Scale
-   Color Accessibility
-   Status Bar Preview
-   Bottom Navigation Builder
-   Mobile Wireframe Kit
-   Splash Screen Generator
-   App Icon Preview
-   Mockup Generator
-   Material Design Reference
-   Apple Human Interface Reference
-   Screenshot Builder
-   App Theme Builder
-   Mobile UI Inspector

------------------------------------------------------------------------

# 8. Global Features

-   Universal Search
-   Command Palette (Ctrl + K)
-   Favorites
-   Recent
-   Copy to Clipboard
-   Import / Export
-   Keyboard Shortcuts
-   Undo / Redo
-   Toast Notification
-   Auto Save
-   Dark / Light Theme

------------------------------------------------------------------------

# 9. Design System

-   Dark Theme
-   Light Theme
-   Auto Theme
-   Border Radius: 12px
-   Font: Inter / Geist
-   Animation: 150--200ms
-   Fixed Sidebar
-   Dynamic Workspace

------------------------------------------------------------------------

# 10. Technology Stack

  Layer          Technology
  -------------- ----------------------
  Language       Python 3.13+
  GUI            PySide6
  Architecture   MVVM + Modular
  Styling        QSS
  Icons          Lucide SVG
  SVG            QtSvg
  Storage        SQLite + JSON
  Logging        Loguru
  Config         Pydantic Settings
  Packaging      Nuitka / PyInstaller

------------------------------------------------------------------------

# 11. Project Structure

``` text
vibe-coder-starterpack/
├── src/
│   ├── app/
│   ├── core/
│   ├── ui/
│   ├── modules/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── main.py
├── assets/
├── docs/
├── tests/
├── build/
├── README.md
└── PRD.md
```

------------------------------------------------------------------------

# 12. Non-Functional Requirements

-   Startup \< 1 second
-   RAM idle \< 150 MB
-   Offline-first
-   Windows 10 & 11
-   High DPI Support
-   Modular Architecture

------------------------------------------------------------------------

# 13. Roadmap V1

## Design

-   7 Tools

## Developer

-   6 Tools

## Mobile Design

-   20 Tools

Total: **33 Utilities**.

Future roadmap: - AI Tools - API Tools - Database Tools - Image Tools -
Plugin Marketplace
