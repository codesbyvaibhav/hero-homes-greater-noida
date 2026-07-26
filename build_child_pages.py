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
  <!-- SEO Meta Tags -->
  <title>{page_title}</title>
  <meta name="description" content="{meta_desc}">
  <meta name="keywords" content="Hero Homes Greater Noida, Hero Realty Greater Noida, DMIC Integrated Industrial Township, Jewar Airport Real Estate, Greater Noida 3 BHK Price, Hero Homes Floor Plans">
  <link rel="canonical" href="{canonical_url}">
  <meta name="robots" content="index, follow">

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

    /* Layout Spacing Fix: Top padding directly on main container below fixed navbar */
    .main-layout-container {{
      padding-top: calc(var(--nav-offset) + 16px) !important;
      margin-top: 0 !important;
    }}
    .single-hero-image-wrapper {{
      margin: 0 0 24px 0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0,0,0,0.12);
      position: relative;
    }}
    .single-hero-image-wrapper img {{
      width: 100%;
      max-height: 480px;
      object-fit: cover;
      display: block;
    }}
    .single-hero-caption {{
      background: rgba(12, 25, 43, 0.95);
      color: #ffffff;
      padding: 10px 18px;
      font-size: 0.85rem;
      font-weight: 500;
      display: block;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }}
    .page-h1-header-block {{
      margin: 24px 0 28px 0;
      padding-bottom: 16px;
      border-bottom: 2px solid rgba(227, 24, 55, 0.15);
    }}
    .page-h1-header-block .page-title {{
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-primary);
      line-height: 1.25;
      margin-bottom: 8px;
      font-family: var(--font-heading);
    }}
    .page-h1-header-block .page-subtitle {{
      font-size: 1.05rem;
      color: var(--color-text-muted);
      line-height: 1.5;
    }}
    .aeo-direct-answer-box {{
      background: linear-gradient(135deg, rgba(227, 24, 55, 0.05) 0%, rgba(223, 178, 71, 0.08) 100%);
      border-left: 4px solid var(--color-accent);
      border-radius: 12px;
      padding: 20px 24px;
      margin: 24px 0;
    }}
    .aeo-box-title {{
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .geo-context-card {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    }}
    .seo-rich-paragraph {{
      font-size: 1.02rem;
      line-height: 1.8;
      color: #334155;
      margin-bottom: 20px;
    }}
    .content-subheading-lg {{
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--color-primary);
      margin: 32px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid rgba(227, 24, 55, 0.15);
    }}
    .content-subheading-md {{
      font-size: 1.22rem;
      font-weight: 700;
      color: #1e293b;
      margin: 24px 0 12px 0;
    }}
    .seo-data-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }}
    .seo-data-table th {{
      background: var(--color-primary);
      color: #ffffff;
      padding: 12px 16px;
      text-align: left;
      font-size: 0.95rem;
    }}
    .seo-data-table td {{
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 0.92rem;
      color: #334155;
    }}
    .seo-data-table tr:nth-child(even) {{
      background: #f8fafc;
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

  <!-- Schema.org JSON-LD Structured Data -->
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
      <div class="logo-wrapper">
        <a href="index.html" class="brand-logo">
          <img src="images/logo.png" alt="Hero Homes Greater Noida Logo" class="logo-img" width="170" height="63">
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
  </script>
</body>
</html>
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated {filename} ({len(html)} chars)")

print("build_child_pages.py template updated.")
