import os

# Helper template to build consistent, theme-matching child pages
def generate_child_page(
    filename,
    page_title,
    meta_desc,
    canonical_url,
    h1_title,
    subtitle,
    hero_img,
    hero_img_alt,
    hero_img_caption,
    nav_active_key,
    main_content_html,
    sidebar_title,
    sidebar_desc,
    sidebar_btn_text,
    faq_schema_json
):
    nav_keys = {
        'overview': 'index.html',
        'pricing': 'pricing.html',
        'floorplans': 'floor-plans.html',
        'amenities': 'amenities.html',
        'location': 'location.html',
        'developer': 'developer.html',
        'faqs': 'faqs.html'
    }

    nav_menu_items = []
    labels = {
        'overview': 'Overview',
        'pricing': 'Pricing',
        'floorplans': 'Floor Plans',
        'amenities': 'Amenities',
        'location': 'Location',
        'developer': 'Developer',
        'faqs': 'FAQs'
    }

    for k, v in nav_keys.items():
        active_cls = ' class="nav-link active"' if k == nav_active_key else ' class="nav-link"'
        nav_menu_items.append(f'<li><a href="{v}"{active_cls}>{labels[k]}</a></li>')

    nav_menu_html = "\n          ".join(nav_menu_items)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Canonical, Robots, X-Robots & Publisher Tags -->
  <title>{page_title}</title>
  <meta name="description" content="{meta_desc}">
  <meta name="keywords" content="Hero Homes Greater Noida, Hero Realty Greater Noida, DMIC Integrated Industrial Township, Jewar Airport Real Estate, Greater Noida 3 BHK Price, Hero Homes Floor Plans">
  <link rel="canonical" href="{canonical_url}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta http-equiv="X-Robots-Tag" content="index, follow">
  <link rel="publisher" href="https://www.herohomenoida.com/">

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:title" content="{page_title}">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:image" content="https://herohomenoida.com/{hero_img}">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="images/favicon.png">

  <!-- Preload Fonts & Styles -->
  <link rel="preload" href="/fonts/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/plus-jakarta-sans-700.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="style-v19.css" as="style">

  <script>
    (function() {{
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'style-v19.css';
      link.onload = function() {{
        document.body.classList.add('css-loaded');
      }};
      document.head.appendChild(link);
    }})();
  </script>
  <noscript>
    <link rel="stylesheet" href="style-v19.css">
  </noscript>

  <style>
    :root {{
      --nav-offset: 120px;
    }}
    body {{ opacity: 0; }}
    body.css-loaded {{ opacity: 1; transition: opacity 0.15s ease-in; }}

    /* Layout Spacing Fix: EXACT FIRST VIEW FIT */
    .main-layout-container {{
      padding-top: calc(var(--nav-offset) - 24px) !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }}
    .main-content-column {{
      gap: 4px !important;
    }}
    .page-layout-grid {{
      align-items: flex-start;
      gap: 28px !important;
    }}
    .single-hero-image-wrapper {{
      margin: 0 0 4px 0 !important;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      position: relative;
    }}
    .single-hero-image-wrapper img {{
      width: 100%;
      height: 330px !important;
      max-height: 330px !important;
      object-fit: cover;
      display: block;
    }}
    .single-hero-caption {{
      background: rgba(12, 25, 43, 0.95);
      color: #ffffff;
      padding: 4px 12px;
      font-size: 0.75rem;
      font-weight: 500;
      display: block;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }}

    /* Ultra-tight H1 block styling */
    .page-h1-header-block {{
      margin: 4px 0 16px 0 !important;
      padding-bottom: 6px !important;
      border-bottom: 2px solid rgba(227, 24, 55, 0.15);
    }}
    .page-h1-header-block .page-title {{
      font-size: 1.45rem !important;
      font-weight: 800;
      color: var(--color-primary);
      line-height: 1.2;
      margin-bottom: 4px !important;
      font-family: var(--font-heading);
    }}
    .page-h1-header-block .page-subtitle {{
      font-size: 0.86rem !important;
      color: var(--color-text-muted);
      line-height: 1.35;
      margin-bottom: 0 !important;
    }}

    /* Article Card Padding Fix */
    .content-block {{
      padding: 28px 32px !important;
      margin-top: 0 !important;
    }}

    /* Quick Answer Box */
    .aeo-direct-answer-box {{
      background: linear-gradient(135deg, rgba(227, 24, 55, 0.05) 0%, rgba(223, 178, 71, 0.08) 100%);
      border-left: 4px solid var(--color-accent);
      border-radius: 10px;
      padding: 14px 18px !important;
      margin: 8px 0 28px 0 !important;
    }}
    .aeo-box-title {{
      font-size: 0.98rem !important;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 6px !important;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    .aeo-direct-answer-box p {{
      font-size: 0.92rem !important;
      line-height: 1.55 !important;
    }}

    .geo-context-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 32px 0 !important;
    }}
    .seo-rich-paragraph {{
      font-size: 0.96rem;
      line-height: 1.7;
      color: #334155;
      margin-bottom: 24px !important;
    }}

    /* CONSISTENT SECTION HEADING SPACING (24-40px Gaps) */
    .content-subheading-lg {{
      font-size: 1.28rem;
      font-weight: 700;
      color: var(--color-primary);
      margin: 36px 0 16px 0 !important;
      padding-bottom: 6px;
      border-bottom: 2px solid rgba(227, 24, 55, 0.15);
    }}
    .content-subheading-lg:first-of-type {{
      margin-top: 16px !important;
    }}
    .content-subheading-md {{
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 28px 0 12px 0 !important;
    }}

    /* TABLE CONTAINER WRAPPER SPACING */
    .table-responsive {{
      width: 100% !important;
      margin: 28px 0 32px 0 !important;
      overflow-x: auto;
    }}

    /* BROCHURE-QUALITY TABLE LAYOUT (FULL WIDTH ALIGNMENT & 50-60px ROW HEIGHTS) */
    .table-domain-theme,
    .seo-data-table {{
      width: 100% !important;
      max-width: 100% !important;
      border-collapse: separate;
      border-spacing: 0;
      background-color: var(--color-bg-white);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-large);
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      margin: 0 !important;
    }}

    /* HEADER ROW (52px HEIGHT, VERTICALLY CENTERED, EQUAL EDGE PADDING) */
    .table-domain-theme th,
    .seo-data-table th {{
      background-color: var(--color-primary);
      color: #ffffff;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.84rem;
      padding: 14px 24px !important;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 3px solid var(--color-accent);
      text-align: left;
      vertical-align: middle !important;
      height: 52px;
      box-sizing: border-box;
    }}
    .table-domain-theme th:last-child,
    .seo-data-table th:last-child {{
      text-align: right !important;
    }}

    /* BODY ROWS (54px HEIGHT, VERTICALLY CENTERED, RIGHT-ALIGNED LAST COLUMN) */
    .table-domain-theme td,
    .seo-data-table td {{
      padding: 14px 24px !important;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.92rem;
      color: var(--color-text-dark);
      vertical-align: middle !important;
      height: 54px;
      box-sizing: border-box;
    }}
    .table-domain-theme td:last-child,
    .seo-data-table td:last-child {{
      text-align: right !important;
    }}
    .table-domain-theme tr:last-child td,
    .seo-data-table tr:last-child td {{
      border-bottom: none;
    }}
    .table-domain-theme tr:nth-child(even) td,
    .seo-data-table tr:nth-child(even) td {{
      background-color: #f8fafc;
    }}
    .table-domain-theme tr:hover td,
    .seo-data-table tr:hover td {{
      background-color: rgba(227, 24, 55, 0.03);
    }}

    /* 2-COLUMN TABLE COLUMN WIDTH BALANCING (55% LEFT / 45% RIGHT) */
    .table-compact-2col th:first-child,
    .table-compact-2col td:first-child {{
      width: 55% !important;
    }}
    .table-compact-2col th:last-child,
    .table-compact-2col td:last-child {{
      width: 45% !important;
      text-align: right !important;
    }}

    .price-highlight-pill {{
      display: inline-block;
      background: rgba(227, 24, 55, 0.1);
      color: var(--color-accent);
      font-weight: 800;
      font-size: 0.86rem;
      padding: 4px 12px;
      border-radius: 50px;
      border: 1px solid rgba(227, 24, 55, 0.2);
    }}

    /* BULLETPROOF INTERACTIVE FAQ ACCORDION STYLES */
    details.faq-accordion-item {{
      background: #ffffff;
      border: 1px solid var(--color-border);
      border-radius: 10px;
      margin-bottom: 12px;
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }}
    details.faq-accordion-item[open] {{
      border-color: var(--color-accent);
      box-shadow: 0 4px 16px rgba(194, 34, 41, 0.1);
    }}
    details.faq-accordion-item summary {{
      padding: 16px 20px !important;
      font-size: 0.98rem !important;
      font-weight: 700 !important;
      color: var(--color-primary) !important;
      cursor: pointer !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      list-style: none !important;
      user-select: none !important;
    }}
    details.faq-accordion-item summary::-webkit-details-marker,
    details.faq-accordion-item summary::marker {{
      display: none !important;
    }}
    details.faq-accordion-item summary * {{
      pointer-events: none !important;
    }}
    details.faq-accordion-item summary::after {{
      content: '+';
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--color-accent);
      transition: transform 0.2s ease;
      margin-left: 12px;
      flex-shrink: 0;
    }}
    details.faq-accordion-item[open] summary::after {{
      content: '−';
    }}
    details.faq-accordion-item:not([open]) .faq-answer {{
      display: none !important;
    }}
    details.faq-accordion-item[open] .faq-answer {{
      display: block !important;
      padding: 14px 20px 18px 20px !important;
      font-size: 0.94rem !important;
      line-height: 1.65 !important;
      color: var(--color-text-dark) !important;
      border-top: 1px solid var(--color-border) !important;
      background: #FCF9F4 !important;
    }}
    .faq-icon {{
      width: 16px;
      height: 16px;
      color: var(--color-accent);
      margin-right: 8px;
    }}

    /* RESPONSIVE LAYOUT BALANCING (DESKTOP, TABLET & MOBILE) */
    @media (max-width: 768px) {{
      .main-layout-container {{
        padding-top: calc(var(--nav-offset) - 50px) !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }}
      .single-hero-image-wrapper {{
        margin: 0 !important;
        border-radius: 8px !important;
        background-color: #0c192b !important;
      }}
      .single-hero-image-wrapper img {{
        height: auto !important;
        max-height: 165px !important;
        object-fit: contain !important;
        background-color: #0c192b !important;
      }}
      .single-hero-caption {{
        padding: 3px 6px !important;
        font-size: 0.65rem !important;
        line-height: 1.2 !important;
      }}

      /* Force H1 onto a single line without wrapping */
      .page-h1-header-block {{
        margin: 4px 0 12px 0 !important;
        padding-bottom: 2px !important;
      }}
      .page-h1-header-block .page-title {{
        font-size: clamp(0.78rem, 3.8vw, 1.1rem) !important;
        font-weight: 800 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        line-height: 1.2 !important;
        margin-bottom: 2px !important;
      }}
      .page-h1-header-block .page-subtitle {{
        font-size: 0.78rem !important;
        line-height: 1.25 !important;
      }}

      .content-block {{
        padding: 16px 14px !important;
      }}

      .content-subheading-lg {{
        margin: 28px 0 12px 0 !important;
      }}

      .seo-rich-paragraph {{
        margin-bottom: 16px !important;
      }}

      .table-responsive {{
        margin: 20px 0 24px 0 !important;
      }}

      /* RESPONSIVE MOBILE CARD TABLES (EQUAL EDGE PADDING & 50px ROW HEIGHT) */
      .table-domain-theme,
      .table-domain-theme tbody,
      .table-domain-theme tr,
      .table-domain-theme td,
      .seo-data-table,
      .seo-data-table tbody,
      .seo-data-table tr,
      .seo-data-table td {{
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }}
      .table-domain-theme thead,
      .seo-data-table thead {{
        display: none !important;
      }}
      .table-domain-theme tr,
      .seo-data-table tr {{
        background: #ffffff !important;
        border: 1px solid var(--color-border) !important;
        border-radius: 10px !important;
        margin-bottom: 12px !important;
        padding: 8px 14px !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.04) !important;
      }}
      .table-domain-theme td,
      .seo-data-table td {{
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 8px 0 !important;
        min-height: 48px !important;
        border-bottom: 1px dashed #e2e8f0 !important;
        font-size: 0.86rem !important;
        text-align: right !important;
        word-break: break-word !important;
      }}
      .table-domain-theme td:last-child,
      .seo-data-table td:last-child {{
        border-bottom: none !important;
      }}
      .table-domain-theme td[data-label]::before,
      .seo-data-table td[data-label]::before {{
        content: attr(data-label) !important;
        font-weight: 700 !important;
        color: var(--color-primary) !important;
        text-align: left !important;
        padding-right: 12px !important;
        flex-shrink: 0;
      }}
    }}
  </style>

  <!-- Dynamic Header Offset Calculation Script -->
  <script>
    function updateNavOffset() {{
      const header = document.querySelector('.site-header');
      const topBar = document.querySelector('.top-announcement');
      let offset = 0;
      if (header) {{
        offset += header.offsetHeight;
      }}
      if (topBar && window.getComputedStyle(topBar).display !== 'none') {{
        offset += topBar.offsetHeight;
      }}
      document.documentElement.style.setProperty('--nav-offset', offset + 'px');
    }}
    window.addEventListener('DOMContentLoaded', updateNavOffset);
    window.addEventListener('load', updateNavOffset);
    window.addEventListener('resize', updateNavOffset);
  </script>

  <!-- Schema.org JSON-LD Structured Data with Publisher -->
  {faq_schema_json}
</head>
<body>

  <!-- Top Announcement Bar -->
  <div class="top-announcement">
    <div class="container announcement-content">
      <span class="badge badge-accent">Pre-Launch Advantage</span>
      <span class="announcement-text">Book Early &amp; Secure Pre-Launch Pricing at Hero Homes Greater Noida!</span>
      <a href="tel:+919686897597" class="announcement-phone"><i data-lucide="phone"></i> +91 96868 97597</a>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header sticky-header">
    <div class="container header-container">
      <div class="logo">
        <a href="index.html" class="logo-link">
          <img src="images/logo.webp" alt="Hero Homes Logo" class="logo-img" width="170" height="63">
        </a>
        <span class="location-badge">Greater Noida</span>
      </div>
      
      <nav id="navbar" class="site-navigation">
        <ul class="nav-menu">
          {nav_menu_html}
        </ul>
      </nav>
      
      <div class="header-actions">
        <a href="tel:+919686897597" class="btn btn-phone btn-outline">
          <i data-lucide="phone"></i> <span>+91 96868 97597</span>
        </a>
        <button class="btn btn-primary" onclick="openEnquiryModal('{sidebar_title}')">
          <i data-lucide="download"></i> Download Brochure
        </button>
      </div>

      <button id="mobile-menu-toggle" class="mobile-toggle" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>

  <!-- Main Body Content -->
  <div class="container main-layout-container">
    <div class="page-layout-grid">
      <main class="main-content-column">

        <!-- Single Hero Image Section -->
        <div class="single-hero-image-wrapper">
          <img src="{hero_img}" alt="{hero_img_alt}" loading="eager" fetchpriority="high">
          <span class="single-hero-caption">{hero_img_caption}</span>
        </div>

        <!-- H1 Header Block Below Hero Image -->
        <div class="page-h1-header-block">
          <h1 class="page-title">{h1_title}</h1>
          <p class="page-subtitle">{subtitle}</p>
        </div>

        {main_content_html}

      </main>

      <!-- Sticky Sidebar Lead Form Widget -->
      <aside class="sidebar-column">
        <div class="sticky-sidebar-widget glass-card p-4 rounded-large shadow-card">
          <h3 class="widget-title">{sidebar_title}</h3>
          <p class="widget-desc">{sidebar_desc}</p>
          
          <form class="enquiry-form" onsubmit="handleFormSubmit(event, '{sidebar_title}')">
            <div class="form-group">
              <input type="text" name="name" placeholder="Full Name" required minlength="3" class="form-control">
            </div>
            <div class="form-group">
              <input type="tel" name="phone" placeholder="10-Digit Mobile Number" required pattern="[0-9]{{10}}" class="form-control">
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Email Address" required class="form-control">
            </div>
            <div class="form-group">
              <select name="configuration" class="form-control">
                <option value="" disabled selected>Interested Configuration</option>
                <option value="2 BHK">2 BHK Luxury</option>
                <option value="3 BHK 1650 sq ft">3 BHK (1650 Sq. Ft.)</option>
                <option value="3 BHK + Servant">3 BHK + Servant (2200 Sq. Ft.)</option>
                <option value="4 BHK">4 BHK Ultra Luxury</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              <i data-lucide="file-text"></i> {sidebar_btn_text}
            </button>
          </form>
        </div>
      </aside>
    </div>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <img src="images/logo.png" alt="Hero Homes Logo" class="footer-logo" width="160">
        <p>Hero Homes Greater Noida is a landmark 17.3-acre premium residential development inside the DMIC Integrated Industrial Township by Hero Realty.</p>
      </div>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Overview</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="floor-plans.html">Floor Plans</a></li>
          <li><a href="amenities.html">Amenities</a></li>
          <li><a href="location.html">Location</a></li>
          <li><a href="developer.html">Developer</a></li>
          <li><a href="faqs.html">FAQs</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact Us</h4>
        <p><i data-lucide="map-pin"></i> Sector MU, DMIC Township, Greater Noida, UP</p>
        <p><i data-lucide="phone"></i> +91 96868 97597</p>
        <p><i data-lucide="mail"></i> sales@herohomenoida.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container text-center">
        <p class="copyright">&copy; 2026 Hero Homes Greater Noida. Authorized Channel Partner. All Rights Reserved.</p>
        <p class="publisher-info" style="font-size: 0.72rem; color: #94A3B8; margin-top: 4px;">Published by Hero Homes Greater Noida | Official Partner Portal (Hero Realty)</p>
      </div>
    </div>
  </footer>

  <!-- Mobile Drawer -->
  <div id="mobile-menu-drawer" class="mobile-drawer">
    <div class="mobile-drawer-header">
      <div class="logo"><span class="logo-accent">HERO</span> HOMES</div>
      <button id="mobile-menu-close" class="menu-close-btn" aria-label="Close menu">&times;</button>
    </div>
    <nav class="overlay-navigation">
      <ul class="overlay-nav-menu">
        <li><a href="index.html" class="overlay-nav-link">Overview</a></li>
        <li><a href="pricing.html" class="overlay-nav-link">Pricing</a></li>
        <li><a href="floor-plans.html" class="overlay-nav-link">Floor Plans</a></li>
        <li><a href="amenities.html" class="overlay-nav-link">Amenities</a></li>
        <li><a href="location.html" class="overlay-nav-link">Location</a></li>
        <li><a href="developer.html" class="overlay-nav-link">Developer</a></li>
        <li><a href="faqs.html" class="overlay-nav-link">FAQs</a></li>
      </ul>
    </nav>
  </div>

  <!-- Modal Lead Form -->
  <div id="enquiry-modal" class="modal-overlay">
    <div class="modal-card glass-card">
      <button class="modal-close" onclick="closeEnquiryModal()">&times;</button>
      <h3 id="modal-title">Request Official Information</h3>
      <p class="modal-subtitle">Leave your phone number to receive instant brochure &amp; price list on WhatsApp.</p>
      <form onsubmit="handleFormSubmit(event, 'Page Modal Form')">
        <div class="form-group"><input type="text" name="name" placeholder="Your Name" required class="form-control"></div>
        <div class="form-group"><input type="tel" name="phone" placeholder="Mobile Number" required pattern="[0-9]{{10}}" class="form-control"></div>
        <div class="form-group"><input type="email" name="email" placeholder="Email Address" required class="form-control"></div>
        <button type="submit" class="btn btn-primary btn-block">Submit Request</button>
      </form>
    </div>
  </div>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    lucide.createIcons();
    function openEnquiryModal(title) {{
      document.getElementById('modal-title').innerText = title || 'Request Information';
      document.getElementById('enquiry-modal').style.display = 'flex';
    }}
    function closeEnquiryModal() {{
      document.getElementById('enquiry-modal').style.display = 'none';
    }}
    function handleFormSubmit(e, source) {{
      e.preventDefault();
      window.location.href = 'thankyou.html';
    }}

    /* Bulletproof Accordion Toggle Handler for Mobile & Desktop */
    document.addEventListener('DOMContentLoaded', function() {{
      document.querySelectorAll('details.faq-accordion-item summary').forEach(function(summary) {{
        summary.addEventListener('click', function(e) {{
          const details = summary.parentElement;
          if (details.hasAttribute('open')) {{
            details.removeAttribute('open');
          }} else {{
            details.setAttribute('open', '');
          }}
          e.preventDefault();
        }});
      }});
    }});
  </script>
</body>
</html>
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated {filename} ({len(html)} chars)")

print("build_child_pages.py updated with premium brochure layout spacing!")
