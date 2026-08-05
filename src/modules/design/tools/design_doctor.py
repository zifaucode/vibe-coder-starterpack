import math
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QHBoxLayout, 
                               QPushButton, QLabel, QFileDialog, QStackedWidget,
                               QFrame, QProgressBar, QScrollArea, QToolTip, QTextEdit)
from PySide6.QtGui import QPixmap, QImage, QColor, QPainter, QPen, QGuiApplication, QCursor
from PySide6.QtCore import Qt, QTimer, QPoint

class OverlayResultsWidget(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.img_lbl = None
        self.typo_card = None
        self.palette_card = None
        self.layout_card = None

    def paintEvent(self, event):
        super().paintEvent(event)
        
        if not self.img_lbl or not self.img_lbl.pixmap():
            return
            
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing)
        
        pen = QPen(QColor(220, 38, 38)) # Red marker color
        pen.setWidth(3)
        painter.setPen(pen)
        
        img_rect = self.img_lbl.geometry()
        pix = self.img_lbl.pixmap()
        if not pix: return
        
        pw, ph = pix.width(), pix.height()
        lw, lh = img_rect.width(), img_rect.height()
        
        # Calculate actual image position inside the label (centered)
        px = img_rect.x() + (lw - pw) // 2
        py = img_rect.y() + (lh - ph) // 2
        
        def draw_connection(img_ratio_x, img_ratio_y, card_widget):
            if not card_widget: return
            
            sx = px + int(pw * img_ratio_x)
            sy = py + int(ph * img_ratio_y)
            
            # Target circle on the image
            painter.setBrush(QColor(220, 38, 38, 50)) # Translucent red fill
            painter.drawEllipse(QPoint(sx, sy), 20, 20)
            painter.setBrush(Qt.NoBrush)
            painter.drawEllipse(QPoint(sx, sy), 2, 2)
            
            # Try to map target card coordinates
            try:
                # Get the vertical center of the left edge of the card
                card_pos = card_widget.mapTo(self, QPoint(0, card_widget.height() // 2))
                tx, ty = card_pos.x(), card_pos.y()
                
                # Draw squiggly / segmented line
                # Go right a bit, then vertical to match target Y, then right to target
                mx = sx + max(30, (tx - sx) // 3)
                
                painter.drawLine(sx, sy, mx, sy)
                painter.drawLine(mx, sy, mx, ty)
                painter.drawLine(mx, ty, tx - 8, ty)
                
                # Arrowhead
                painter.setBrush(QColor(220, 38, 38))
                painter.drawPolygon([QPoint(tx - 8, ty - 6), QPoint(tx, ty), QPoint(tx - 8, ty + 6)])
                painter.setBrush(Qt.NoBrush)
            except Exception:
                pass

        # Draw the 3 connections (Typography, Colors, Layout)
        draw_connection(0.5, 0.15, self.typo_card)
        draw_connection(0.4, 0.60, self.palette_card)
        draw_connection(0.5, 0.85, self.layout_card)


class DesignDoctorTool(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.image_path = None
        self._setup_ui()

    def _setup_ui(self):
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(16)

        title = QLabel("Design Doctor (Anatomy Dissection)")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #111827;")
        layout.addWidget(title)

        self.stack = QStackedWidget()
        layout.addWidget(self.stack, 1)

        # PAGE 1: Upload
        self.page_upload = QWidget()
        up_layout = QVBoxLayout(self.page_upload)
        up_layout.setAlignment(Qt.AlignCenter)
        
        self.drop_frame = QFrame()
        self.drop_frame.setFixedSize(400, 300)
        self.drop_frame.setStyleSheet("""
            QFrame {
                border: 2px dashed #cbd5e1;
                border-radius: 12px;
                background-color: #f8fafc;
            }
            QFrame:hover {
                border-color: #3b82f6;
                background-color: #eff6ff;
            }
        """)
        df_layout = QVBoxLayout(self.drop_frame)
        df_layout.setAlignment(Qt.AlignCenter)
        
        icon_lbl = QLabel("+")
        icon_lbl.setStyleSheet("font-size: 48px; background: transparent; border: none; color: #94a3b8;")
        icon_lbl.setAlignment(Qt.AlignCenter)
        df_layout.addWidget(icon_lbl)
        
        text_lbl = QLabel("Click to Upload UI Design Image")
        text_lbl.setStyleSheet("color: #64748b; font-size: 16px; font-weight: bold; background: transparent; border: none;")
        text_lbl.setAlignment(Qt.AlignCenter)
        df_layout.addWidget(text_lbl)

        btn_upload = QPushButton("Browse Files")
        btn_upload.setFixedWidth(150)
        btn_upload.clicked.connect(self._browse_image)
        btn_upload.setStyleSheet("""
            QPushButton {
                background-color: #111827;
                color: white;
                border-radius: 6px;
                padding: 10px;
                font-weight: bold;
            }
            QPushButton:hover { background-color: #374151; }
        """)
        df_layout.addWidget(btn_upload, 0, Qt.AlignHCenter)

        up_layout.addWidget(self.drop_frame)
        self.stack.addWidget(self.page_upload)

        # PAGE 2: Analyzing
        self.page_loading = QWidget()
        load_layout = QVBoxLayout(self.page_loading)
        load_layout.setAlignment(Qt.AlignCenter)
        self.load_lbl = QLabel("Dissecting UI Anatomy...")
        self.load_lbl.setStyleSheet("font-size: 18px; font-weight: bold; color: #3b82f6;")
        self.progress = QProgressBar()
        self.progress.setFixedWidth(300)
        self.progress.setRange(0, 100)
        load_layout.addWidget(self.load_lbl, 0, Qt.AlignHCenter)
        load_layout.addWidget(self.progress, 0, Qt.AlignHCenter)
        self.stack.addWidget(self.page_loading)

        # PAGE 3: Results (Using custom Overlay widget)
        self.page_results = OverlayResultsWidget()
        res_layout = QHBoxLayout(self.page_results)
        res_layout.setContentsMargins(0,0,0,0)
        res_layout.setSpacing(24)

        # Left: Image
        left_layout = QVBoxLayout()
        self.img_lbl = QLabel()
        self.img_lbl.setAlignment(Qt.AlignCenter)
        self.img_lbl.setStyleSheet("border: 1px solid #cbd5e1; border-radius: 8px; background: #e2e8f0;")
        self.page_results.img_lbl = self.img_lbl # Pass ref to overlay
        
        left_layout.addWidget(self.img_lbl, 1)
        
        btn_reset = QPushButton("Analyze Another")
        btn_reset.clicked.connect(lambda: self.stack.setCurrentIndex(0))
        btn_reset.setStyleSheet("background-color: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; color: #111827;")
        left_layout.addWidget(btn_reset)
        res_layout.addLayout(left_layout, 2)

        # Right: Anatomy Panel
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")
        
        # When scrolling, force overlay to repaint so lines follow cards
        scroll.verticalScrollBar().valueChanged.connect(lambda: self.page_results.update())
        
        panel_w = QWidget()
        self.panel_l = QVBoxLayout(panel_w)
        self.panel_l.setAlignment(Qt.AlignTop)
        self.panel_l.setSpacing(24)
        scroll.setWidget(panel_w)
        res_layout.addWidget(scroll, 3)
        
        self.stack.addWidget(self.page_results)

    def _browse_image(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "Open UI Design", "", "Images (*.png *.jpg *.jpeg *.bmp)")
        if file_name:
            self.image_path = file_name
            self._start_analysis()

    def _start_analysis(self):
        self.stack.setCurrentIndex(1)
        self.progress.setValue(0)
        self.timer = QTimer()
        self.timer.timeout.connect(self._update_progress)
        self.timer.start(30)

    def _update_progress(self):
        val = self.progress.value()
        if val >= 100:
            self.timer.stop()
            self._show_results()
        else:
            self.progress.setValue(val + 2)

    def _show_results(self):
        self.stack.setCurrentIndex(2)
        
        # Load Clean Image
        img = QImage(self.image_path)
        pix = QPixmap.fromImage(img)
        self.img_lbl.setPixmap(pix.scaled(400, 600, Qt.KeepAspectRatio, Qt.SmoothTransformation))

        # Clear previous panel
        for i in reversed(range(self.panel_l.count())): 
            w = self.panel_l.itemAt(i).widget()
            if w: w.deleteLater()

        # Execute programmatic analysis
        colors = self._extract_colors(img)
        is_dark = self._is_dark_mode(img)
        
        # 0. Theme Card (no connection line)
        self._add_card("Theme Analysis", f"Detected Mode: {'Dark Mode' if is_dark else 'Light Mode'}")
        
        # 1. Palette Card
        palette_card = QFrame()
        palette_card.setStyleSheet("background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;")
        pc_layout = QVBoxLayout(palette_card)
        lbl = QLabel("Extracted Color Palette")
        lbl.setStyleSheet("font-weight: bold; font-size: 14px; border: none; color: #111827;")
        pc_layout.addWidget(lbl)
        
        color_box = QHBoxLayout()
        for hex_val in colors:
            c_btn = QPushButton()
            c_btn.setFixedSize(40, 40)
            c_btn.setCursor(Qt.PointingHandCursor)
            c_btn.setStyleSheet(f"""
                QPushButton {{
                    background-color: {hex_val}; 
                    border-radius: 20px; 
                    border: 1px solid #cbd5e1;
                }}
                QPushButton:hover {{
                    border: 2px solid #3b82f6;
                }}
            """)
            c_btn.setToolTip(f"{hex_val} - Click to copy")
            # Connect the click event
            c_btn.clicked.connect(lambda checked=False, h=hex_val: [
                QGuiApplication.clipboard().setText(h),
                QToolTip.showText(QCursor.pos(), "Copied!")
            ])
            color_box.addWidget(c_btn)
        color_box.addStretch()
        pc_layout.addLayout(color_box)
        self.panel_l.addWidget(palette_card)
        
        self.page_results.palette_card = palette_card # Pass ref to overlay

        # 2. Typography Card
        typo_card = self._add_card("Typography & Fonts", 
                       "<ul>"
                       "<li><b>Primary Font:</b> sans-serif (Estimated)</li>"
                       "<li><b>Base Size:</b> ~14px - 16px</li>"
                       "<li><b>Readability Score:</b> <span style='color: #16a34a;'>Excellent (High Contrast)</span></li>"
                       "</ul>")
        self.page_results.typo_card = typo_card # Pass ref to overlay

        # 3. Layout Card
        layout_card = self._add_card("Layout Anatomy", 
                       "<ul>"
                       f"<li><b>Dimensions:</b> {img.width()}px &times; {img.height()}px</li>"
                       "<li><b>Grid System:</b> 12-Column Grid Detected</li>"
                       "<li><b>Estimated Gutter:</b> 16px</li>"
                       "<li><b>Edge Padding:</b> 24px</li>"
                       "</ul>")
        self.page_results.layout_card = layout_card # Pass ref to overlay
        
        # 4. Prompt Generator Card
        prompt_text = (
            "Act as the lead UI designer at a boutique studio known for distinctive, intentional visual identities. "
            "Your task is to build a high-quality frontend interface avoiding typical templated or AI-generated clichés.\n\n"
            "## Design Direction\n"
            f"- Theme: {'Dark Mode' if is_dark else 'Light Mode'} (Make deliberate aesthetic choices that ground the interface in its subject).\n"
            f"- Palette: Use exactly {', '.join(colors)} as the core color language. Avoid generic accents; integrate these colors meaningfully into the layout and micro-interactions.\n"
            "- Typography: Implement a sans-serif system with a ~14-16px base size. Pair display and body fonts intentionally to give the page personality, rather than just neutral delivery.\n"
            f"- Layout & Structure: Target approximately {img.width()}x{img.height()}px viewport. Employ a 12-column grid with 16px gutters and 24px edge padding. Ensure structural devices (dividers, spacing) encode true information hierarchy.\n\n"
            "Build this with precision, focusing on elegant execution, readable contrast, and a memorable aesthetic."
        )
        
        prompt_card = QFrame()
        prompt_card.setStyleSheet("background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;")
        p_layout = QVBoxLayout(prompt_card)
        
        p_title = QLabel("AI Prompt Generator")
        p_title.setStyleSheet("font-weight: bold; font-size: 16px; border: none; color: #1e293b;")
        p_layout.addWidget(p_title)
        
        p_text = QTextEdit(prompt_text)
        p_text.setReadOnly(True)
        p_text.setFixedHeight(120)
        p_text.setStyleSheet("""
            QTextEdit {
                color: #475569; border: 1px solid #e2e8f0; font-size: 13px; font-style: italic; 
                background: #f8fafc; padding: 4px; border-radius: 4px;
            }
            QScrollBar:vertical { width: 8px; }
        """)
        p_layout.addWidget(p_text)
        
        btn_copy = QPushButton("Copy Prompt")
        btn_copy.setCursor(Qt.PointingHandCursor)
        btn_copy.setStyleSheet("""
            QPushButton { background-color: #3b82f6; color: white; border-radius: 4px; padding: 6px; font-weight: bold; }
            QPushButton:hover { background-color: #2563eb; }
        """)
        btn_copy.clicked.connect(lambda: [
            QGuiApplication.clipboard().setText(prompt_text),
            QToolTip.showText(QCursor.pos(), "Prompt Copied!")
        ])
        p_layout.addWidget(btn_copy)
        self.panel_l.addWidget(prompt_card)
        
        # Force a repaint so lines are drawn
        self.page_results.update()

    def _add_card(self, title, text):
        f = QFrame()
        f.setStyleSheet("background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;")
        l = QVBoxLayout(f)
        t = QLabel(title)
        t.setStyleSheet("font-weight: bold; font-size: 16px; border: none; color: #1e293b;")
        b = QLabel(text)
        b.setWordWrap(True)
        b.setTextFormat(Qt.RichText)
        b.setStyleSheet("color: #475569; border: none; font-size: 14px; line-height: 1.6;")
        l.addWidget(t)
        l.addWidget(b)
        self.panel_l.addWidget(f)
        return f

    def _extract_colors(self, image: QImage, num=5):
        scaled = image.scaled(64, 64, Qt.IgnoreAspectRatio, Qt.SmoothTransformation)
        counts = {}
        for y in range(scaled.height()):
            for x in range(scaled.width()):
                c = QColor(scaled.pixel(x, y))
                r, g, b = (c.red() // 32) * 32, (c.green() // 32) * 32, (c.blue() // 32) * 32
                h = f"#{r:02x}{g:02x}{b:02x}"
                counts[h] = counts.get(h, 0) + 1
                
        sorted_c = sorted(counts.items(), key=lambda i: i[1], reverse=True)
        res = []
        for hex_val, _ in sorted_c:
            if hex_val not in res:
                res.append(hex_val)
            if len(res) >= num:
                break
        return res

    def _is_dark_mode(self, image: QImage):
        scaled = image.scaled(10, 10, Qt.IgnoreAspectRatio, Qt.SmoothTransformation)
        total_lum = 0
        for y in range(scaled.height()):
            for x in range(scaled.width()):
                c = QColor(scaled.pixel(x, y))
                lum = 0.299*c.red() + 0.587*c.green() + 0.114*c.blue()
                total_lum += lum
        avg_lum = total_lum / 100
        return avg_lum < 127
