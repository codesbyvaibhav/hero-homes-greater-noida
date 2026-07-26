import os
from build_child_pages import generate_child_page

# --------------------------------------------------------------------------
# 1. FLOOR-PLANS.HTML
# --------------------------------------------------------------------------
floor_main = """
<article class="content-block shadow-card rounded-large p-4 bg-white">
  <div class="aeo-direct-answer-box">
    <div class="aeo-box-title"><i data-lucide="zap" class="text-accent"></i> Quick Summary: Hero Homes Greater Noida Floor Plans</div>
    <p class="mb-0">Hero Homes Greater Noida features thoughtfully engineered 2, 3, and 4 BHK luxury floor plans ranging from 1,250 sq. ft. to 2,600+ sq. ft. Built around Vastu-compliant principles, every unit delivers ~80-85% carpet efficiency, zero dead-space corridors, 3-sided open ventilation, and panoramic double-height balconies overlooking 85%+ green landscapes.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Master Layout Philosophy &amp; Architectural Engineering</h2>
  <p class="seo-rich-paragraph">The floor plans at <strong>Hero Homes Greater Noida</strong> are the result of rigorous human-centric architectural design. Developed across 17.3 acres in the DMIC Integrated Industrial Township, Sector MU, Greater Noida, the master layout balances privacy, natural light, and green views. Unlike typical high-density developments where window views face adjacent concrete walls, Hero Homes towers are positioned along curvilinear axes that preserve 270-degree unhindered views of the surrounding manicured parks.</p>
  
  <p class="seo-rich-paragraph">Every residence is planned with dedicated functional zoning: distinct private sleeping quarters, expansive central living and dining areas, and extended balconies that act as outdoor living rooms. With high ceiling heights (3.1 meters floor-to-floor), floor-to-ceiling double-glazed windows, and premium vitrified tile flooring, the indoor environment offers unmatched spatial grandeur.</p>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Floor Plans &amp; Unit Layout Specifications</h2>

  <h3 class="content-subheading-md">1. 2 BHK Smart Luxury Apartments (1,250 – 1,350 Sq. Ft.)</h3>
  <p class="seo-rich-paragraph">Designed specifically for nuclear families, corporate executives, and smart investors, the 2 BHK floor plan prioritizes functional utility without compromising on luxury feel:</p>
  <ul class="seo-rich-paragraph">
    <li><strong>Living &amp; Dining Foyer:</strong> Expansive 14ft x 22ft open-plan living and dining area opening directly to a wide green-facing balcony.</li>
    <li><strong>Master Bedroom Suite:</strong> Includes attached wooden-floored master bathroom, space for king-size bedding, and built-in wardrobe recesses.</li>
    <li><strong>Guest Bedroom:</strong> Spacious secondary bedroom with adjacent powder/guest bathroom.</li>
    <li><strong>Modular Kitchen Nook:</strong> Parallel counter layout with attached dry utility balcony for washing machine and storage.</li>
  </ul>

  <h3 class="content-subheading-md">2. 3 BHK Premium Residences (1,650 Sq. Ft.)</h3>
  <p class="seo-rich-paragraph">Our most requested configuration, the 3 BHK layout is optimized for growing families requiring distinct private spaces and entertainment areas:</p>
  <ul class="seo-rich-paragraph">
    <li><strong>Grand Living Room:</strong> 16ft x 24ft living area with dual-aspect cross-ventilation windows.</li>
    <li><strong>Three Full Bedrooms:</strong> Master suite plus two children/guest rooms, each equipped with attached en-suite bathrooms.</li>
    <li><strong>Wide Running Balcony:</strong> 7ft wide continuous balcony connecting living room and primary bedrooms.</li>
  </ul>

  <h3 class="content-subheading-md">3. 3 BHK + Servant Suite (1,900 – 2,200 Sq. Ft.)</h3>
  <p class="seo-rich-paragraph">For families requiring live-in domestic support or dedicated home office space, this floor plan introduces an isolated servant room with a private service entrance:</p>

  <table class="seo-data-table">
    <thead>
      <tr>
        <th>Space Zone</th>
        <th>Dimensions (Approx. Feet)</th>
        <th>Key Architectural Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Living &amp; Dining Hall</td>
        <td>18' 0" x 26' 6"</td>
        <td>Double-glass sliding doors, Italian marble flooring option</td>
      </tr>
      <tr>
        <td>Master Bedroom</td>
        <td>14' 0" x 16' 0"</td>
        <td>Laminated wooden flooring, walk-in closet space, attached bath</td>
      </tr>
      <tr>
        <td>Bedroom 2 &amp; 3</td>
        <td>12' 0" x 14' 6"</td>
        <td>En-suite bathrooms, wide glass windows, AC ducting provision</td>
      </tr>
      <tr>
        <td>Servant Room &amp; Bath</td>
        <td>7' 6" x 9' 0"</td>
        <td>Separate service elevator corridor entrance</td>
      </tr>
      <tr>
        <td>Main Balcony</td>
        <td>8' 0" Wide</td>
        <td>Toughened glass railing, anti-skid ceramic deck tiles</td>
      </tr>
    </tbody>
  </table>

  <h3 class="content-subheading-md">4. 4 BHK Royal Pent-Residences (2,600+ Sq. Ft.)</h3>
  <p class="seo-rich-paragraph">Representing the pinnacle of luxury living in Greater Noida, the 4 BHK penthouse layout features private elevator entry lobbies, 4 master suites, family lounges, and 270-degree wrap-around sun decks.</p>

  <div class="geo-context-card">
    <h4><i data-lucide="compass" class="text-accent"></i> Vastu Shastra &amp; Environmental Orientation</h4>
    <p class="mb-0">All apartment entries at Hero Homes Greater Noida are aligned along North, East, and North-East cardinal directions to maximize positive energy flow. Kitchens are situated in the Agni (South-East) zone, while master bedrooms occupy the Nairrutya (South-West) corner for maximum stability and restful sleep.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Master Plan &amp; Tower Structure</h2>
  <p class="seo-rich-paragraph">Hero Homes Greater Noida features high-rise residential towers surrounded by over 85% open landscaped greens. The master layout isolates vehicular traffic to perimeter roads, creating a completely safe, pedestrian-friendly central green zone.</p>

  <h2 class="content-subheading-lg">Frequently Asked Questions About Hero Homes Floor Plans</h2>

  <div class="faq-accordion-list my-4">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the carpet area efficiency ratio of Hero Homes floor plans?</h3>
      <p>Hero Homes layouts deliver an industry-leading carpet area efficiency ratio of ~80% to 85%, ensuring zero dead space in corridors or unnecessary passage walls.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Are all apartments Vastu compliant?</h3>
      <p>Yes. All apartment entry doors, kitchen placements, and master bedroom locations strictly follow authentic Vastu Shastra orientation principles.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Are floor plan PDF blueprints available for download?</h3>
      <p>Yes. High-resolution 2D and 3D architectural floor plan blueprints for 2, 3, and 4 BHK layouts can be requested instantly in PDF format via our lead form.</p>
    </div>
  </div>
</article>
"""

floor_schema = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the carpet area efficiency ratio of Hero Homes floor plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hero Homes layouts deliver an industry-leading carpet area efficiency ratio of ~80% to 85%."
      }
    },
    {
      "@type": "Question",
      "name": "Are all apartments Vastu compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All apartment entry doors, kitchen placements, and master bedroom locations follow Vastu principles."
      }
    }
  ]
}
</script>
"""

generate_child_page(
    filename='floor-plans.html',
    page_title='Hero Homes Greater Noida Floor Plans, Layouts & Master Plan',
    meta_desc='Explore detailed 2 BHK, 3 BHK & 4 BHK floor plans, master plan layout, unit dimensions, and architectural design at Hero Homes Greater Noida.',
    canonical_url='https://herohomenoida.com/floor-plans.html',
    h1_title='Hero Homes Greater Noida Floor Plans & Unit Layout Drawings',
    subtitle='Architectural excellence, Vastu compliance, and zero space wastage across 2, 3 & 4 BHK luxury layouts.',
    hero_img='images/floorplan_3bhk.webp',
    hero_img_alt='Hero Homes Greater Noida 3 BHK Luxury Apartment Floor Plan Blueprint',
    hero_img_caption='Hero Homes 3 BHK Master Layout Blueprint – Optimized Spatial Flow & Wide Balcony Access',
    nav_active_key='floorplans',
    main_content_html=floor_main,
    sidebar_title='Download HD Blueprints',
    sidebar_desc='Get high-resolution PDF blueprints and master plan layout directly on WhatsApp.',
    sidebar_btn_text='Download Layout PDF',
    faq_schema_json=floor_schema
)

# --------------------------------------------------------------------------
# 2. AMENITIES.HTML
# --------------------------------------------------------------------------
amenities_main = """
<article class="content-block shadow-card rounded-large p-4 bg-white">
  <div class="aeo-direct-answer-box">
    <div class="aeo-box-title"><i data-lucide="zap" class="text-accent"></i> Quick Summary: Hero Homes Greater Noida Amenities</div>
    <p class="mb-0">Hero Homes Greater Noida features over 30 world-class resort amenities spread across 17.3 acres, anchored by a magnificent 25,000 sq. ft. central luxury clubhouse. Highlights include an Olympic-size swimming pool, temperature-controlled indoor pool, fully equipped fitness center, tennis & squash courts, oxygen-rich gardens (85%+ green cover), solar power integration, and 3-tier RFID smart security.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Amenities &amp; Active Living Philosophy</h2>
  <p class="seo-rich-paragraph">At <strong>Hero Homes Greater Noida</strong>, amenities are not merely decorative additions—they form the core foundation of daily living. Grounded in Hero Realty's four core design pillars—Fitness, Sustainability, Community, and Security—the development is engineered to promote physical health, mental rejuvenation, and active social interaction for every age group.</p>
  
  <p class="seo-rich-paragraph">Spanning 17.3 acres inside the master-planned DMIC Integrated Industrial Township in Sector MU, Greater Noida, the community dedicates over 85% of its total land area to open landscapes, manicured lawns, botanical gardens, and sports arenas. Residents enjoy clean, oxygen-enriched micro-climates created by dense tree plantations and zero-emission vehicle-free central pods.</p>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Clubhouse &amp; Resort Facilities</h2>
  <p class="seo-rich-paragraph">The flagship attraction of Hero Homes is its multi-level 25,000 sq. ft. resort clubhouse. Designed with double-height glass facades, plush lounge seating, and indoor climate control, it serves as an exclusive hub for recreation, health, and family celebrations:</p>

  <table class="seo-data-table">
    <thead>
      <tr>
        <th>Clubhouse Zone</th>
        <th>Facility Description</th>
        <th>User Benefits</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Aquatic Complex</strong></td>
        <td>Olympic-length main pool, kids' splash pool, heated indoor pool &amp; sun deck</td>
        <td>Year-round swimming, aqua aerobics &amp; poolside relaxation</td>
      </tr>
      <tr>
        <td><strong>Fitness &amp; Gym Center</strong></td>
        <td>Imported TechnoGym cardio gear, free weights, crossfit station &amp; steam/sauna</td>
        <td>Professional fitness training without leaving the complex</td>
      </tr>
      <tr>
        <td><strong>Indoor Sports Lounge</strong></td>
        <td>Air-conditioned squash courts, badminton courts, billiards &amp; table tennis</td>
        <td>All-weather sports and competitive indoor gaming</td>
      </tr>
      <tr>
        <td><strong>Banquet &amp; Event Halls</strong></td>
        <td>Double-height celebratory hall with catering kitchen &amp; outdoor party lawn</td>
        <td>Seamless hosting of birthday parties, anniversaries &amp; community events</td>
      </tr>
      <tr>
        <td><strong>Wellness &amp; Yoga Deck</strong></td>
        <td>Tranquil outdoor wooden deck surrounded by lily ponds &amp; aromatic flora</td>
        <td>Morning yoga sessions, meditation &amp; stress relief</td>
      </tr>
    </tbody>
  </table>

  <h2 class="content-subheading-lg">Categorized Breakdown of 30+ Hero Homes Greater Noida Amenities</h2>

  <h3 class="content-subheading-md">1. Health, Fitness &amp; Outdoor Wellness</h3>
  <ul class="seo-rich-paragraph">
    <li><i data-lucide="check" class="text-accent"></i> <strong>Oxygen Parks &amp; Healing Gardens:</strong> Specially curated air-purifying plant species (Neem, Tulsi, Snake Plant) providing high oxygen concentration.</li>
    <li><i data-lucide="check" class="text-accent"></i> <strong>Rubberized Jogging &amp; Cycling Tracks:</strong> 1.5 km continuous perimeter track with shock-absorbing surfaces to protect joints.</li>
    <li><i data-lucide="check" class="text-accent"></i> <strong>Outdoor Fitness Station:</strong> Calisthenics equipment installed inside green courtyards.</li>
  </ul>

  <h3 class="content-subheading-md">2. Sports Arenas &amp; Active Games</h3>
  <ul class="seo-rich-paragraph">
    <li><i data-lucide="check" class="text-accent"></i> <strong>Lawn Tennis Court:</strong> Professional synthetic hard court with night floodlighting.</li>
    <li><i data-lucide="check" class="text-accent"></i> <strong>Half-Court Basketball &amp; Volleyball:</strong> Dedicated multi-sport court for youth and adults.</li>
    <li><i data-lucide="check" class="text-accent"></i> <strong>Cricket Practice Nets:</strong> Enclosed nets with automated bowling machines.</li>
  </ul>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida 3-Tier Security &amp; Smart Eco Amenities</h2>
  <p class="seo-rich-paragraph">Safety is paramount. Hero Homes integrates 24/7 HD CCTV coverage, RFID boom barriers for automated vehicle entry, smart mobile app visitor approvals, EV charging stations across all parking levels, solar-powered common area lighting, and rainwater harvesting structures.</p>

  <h2 class="content-subheading-lg">Frequently Asked Questions About Hero Homes Greater Noida Amenities</h2>

  <div class="faq-accordion-list my-4">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Is clubhouse membership included in the apartment purchase price?</h3>
      <p>Yes. Every apartment purchase at Hero Homes Greater Noida includes perpetual family membership access to the 25,000 sq. ft. luxury clubhouse and sports facilities.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Is the swimming pool operational year-round?</h3>
      <p>Yes. In addition to the main outdoor resort pool, the complex features a climate-controlled indoor pool usable during winter months.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Are there EV charging stations inside the complex?</h3>
      <p>Yes. Dedicated Electric Vehicle (EV) fast-charging ports are installed across basement parking levels for residents and visitors.</p>
    </div>
  </div>
</article>
"""

amenities_schema = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is clubhouse membership included in the apartment purchase price?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every apartment purchase includes perpetual family membership access to the 25,000 sq. ft. luxury clubhouse."
      }
    },
    {
      "@type": "Question",
      "name": "Is the swimming pool operational year-round?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. In addition to the main outdoor pool, the complex features a climate-controlled indoor pool."
      }
    }
  ]
}
</script>
"""

generate_child_page(
    filename='amenities.html',
    page_title='Hero Homes Greater Noida Amenities, Clubhouse & Sports Facilities',
    meta_desc='Discover 30+ luxury amenities at Hero Homes Greater Noida, including a 25,000 sq. ft. clubhouse, swimming pool, sports courts, oxygen parks & 3-tier security.',
    canonical_url='https://herohomenoida.com/amenities.html',
    h1_title='30+ World-Class Lifestyle Amenities & Resort Clubhouse',
    subtitle='A 25,000 sq. ft. central luxury clubhouse, resort swimming pool, oxygen parks, and sports arenas designed for elevated family living.',
    hero_img='images/clubhouse_pool.webp',
    hero_img_alt='Hero Homes Greater Noida Luxury Swimming Pool & Clubhouse',
    hero_img_caption='Resort-Style Swimming Pool & Sun Deck Area at Hero Homes Greater Noida',
    nav_active_key='amenities',
    main_content_html=amenities_main,
    sidebar_title='Get Amenities Brochure',
    sidebar_desc='Get the complete 30+ amenities list & clubhouse brochure on WhatsApp.',
    sidebar_btn_text='Download Amenities Catalog',
    faq_schema_json=amenities_schema
)

# --------------------------------------------------------------------------
# 3. LOCATION.HTML
# --------------------------------------------------------------------------
location_main = """
<article class="content-block shadow-card rounded-large p-4 bg-white">
  <div class="aeo-direct-answer-box">
    <div class="aeo-box-title"><i data-lucide="zap" class="text-accent"></i> Quick Summary: Hero Homes Greater Noida Location</div>
    <p class="mb-0">Hero Homes Greater Noida is strategically located in Sector MU inside the master-planned 17.3-acre DMIC (Delhi-Mumbai Industrial Corridor) Integrated Industrial Township. Key commute distances: <strong>~25 mins to Noida International Airport (Jewar)</strong>, <strong>~5 mins to Yamuna &amp; Noida-Gr. Noida Expressways</strong>, <strong>~5 mins to Aqua Line Metro</strong>, and direct proximity to top universities like Gautam Buddha University &amp; Shiv Nadar University.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Location &amp; DMIC Township Advantage</h2>
  <p class="seo-rich-paragraph">Location is the single most important factor determining real estate appreciation and quality of life. <strong>Hero Homes Greater Noida</strong> commands a uniquely advantageous address inside Sector MU within the <strong>DMIC Integrated Industrial Township</strong>. The Delhi-Mumbai Industrial Corridor is India's most ambitious $100 Billion mega-infrastructure project, designed to create high-tech industrial, commercial, and smart residential zones connected by high-speed rail and freight corridors.</p>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Connectivity &amp; Distance Matrix</h2>
  <p class="seo-rich-paragraph">Whether traveling to international airports, commercial business districts, or premier educational hubs, Hero Homes offers unmatched regional mobility:</p>

  <table class="seo-data-table">
    <thead>
      <tr>
        <th>Infrastructure Landmark</th>
        <th>Commute Distance / Time</th>
        <th>Strategic Value &amp; Connectivity Impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Noida International Airport (Jewar)</strong></td>
        <td>~25 Minutes / 28 km</td>
        <td>Signal-free Yamuna Expressway access; major driver of rental demand &amp; capital appreciation</td>
      </tr>
      <tr>
        <td><strong>Yamuna Expressway Link</strong></td>
        <td>~5 Minutes / 3 km</td>
        <td>Direct gateway to Agra, Mathura, and upcoming Film City development</td>
      </tr>
      <tr>
        <td><strong>Noida-Greater Noida Expressway</strong></td>
        <td>~8 Minutes / 6 km</td>
        <td>Fast connectivity to Noida Sector 62, Sector 142 IT Hubs, and South Delhi</td>
      </tr>
      <tr>
        <td><strong>Aqua Line Metro Station</strong></td>
        <td>~5 Minutes / 2.5 km</td>
        <td>Rapid metro access connecting Greater Noida directly to Noida Sector 51 exchange</td>
      </tr>
      <tr>
        <td><strong>Eastern Peripheral Expressway (EPE)</strong></td>
        <td>~10 Minutes / 7 km</td>
        <td>Bypasses Delhi traffic to connect Kundli, Manesar, Palwal &amp; Ghaziabad</td>
      </tr>
    </tbody>
  </table>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Location Nearby Educational &amp; Medical Ecosystem</h2>

  <h3 class="content-subheading-md">1. Premier Educational Institutions</h3>
  <ul class="seo-rich-paragraph">
    <li><strong>Gautam Buddha University (GBU):</strong> Sprawling 511-acre university campus offering world-class higher education (~10 Mins).</li>
    <li><strong>Shiv Nadar University:</strong> Multi-disciplinary research institution located nearby (~15 Mins).</li>
    <li><strong>Top K-12 Schools:</strong> Delhi Public School (DPS Greater Noida), Ryan International School, and Somerville School (~10 Mins).</li>
  </ul>

  <h3 class="content-subheading-md">2. Multi-Specialty Hospitals &amp; Healthcare</h3>
  <ul class="seo-rich-paragraph">
    <li><strong>Yashoda Super Specialty Hospital:</strong> 24/7 advanced emergency &amp; critical care center (~12 Mins).</li>
    <li><strong>Jaypee Hospital:</strong> Tertiary care super-specialty medical facility (~15 Mins).</li>
  </ul>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Location Appreciation &amp; Growth Forecast</h2>
  <p class="seo-rich-paragraph">Real estate industry analysts project property values in the DMIC Greater Noida corridor to appreciate by 14-18% annually over the next 5 years. The commercial operationalization of Jewar Airport's Phase 1 makes Hero Homes a prime asset for high capital growth.</p>

  <h2 class="content-subheading-lg">Frequently Asked Questions About Hero Homes Greater Noida Location</h2>

  <div class="faq-accordion-list my-4">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Exactly which sector is Hero Homes Greater Noida located in?</h3>
      <p>Hero Homes Greater Noida is located in Sector MU within the DMIC Integrated Industrial Township, Greater Noida, Uttar Pradesh (Pincode: 201308).</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> How far is Jewar Airport from the project site?</h3>
      <p>Noida International Airport at Jewar is approximately 25 minutes (~28 km) away via the signal-free Yamuna Expressway corridor.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the nearest metro station to Hero Homes?</h3>
      <p>The nearest operational Aqua Line Metro Station is approximately 5 minutes away, with proposed metro expansions planned closer to the DMIC Township gate.</p>
    </div>
  </div>
</article>
"""

location_schema = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Exactly which sector is Hero Homes Greater Noida located in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hero Homes Greater Noida is located in Sector MU within the DMIC Integrated Industrial Township."
      }
    },
    {
      "@type": "Question",
      "name": "How far is Jewar Airport from the project site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Noida International Airport at Jewar is approximately 25 minutes away via Yamuna Expressway."
      }
    }
  ]
}
</script>
"""

generate_child_page(
    filename='location.html',
    page_title='Hero Homes Greater Noida Location, Connectivity & Distance Map',
    meta_desc='Explore the strategic location of Hero Homes in DMIC Township, Greater Noida. Minutes from Noida International Airport (Jewar), Yamuna Expressway & Metro.',
    canonical_url='https://herohomenoida.com/location.html',
    h1_title='Strategic Location & Regional Connectivity Advantage',
    subtitle='Positioned inside the DMIC Integrated Industrial Township with effortless access to Jewar Airport, Yamuna Expressway & Metro corridors.',
    hero_img='images/exterior_sunset.webp',
    hero_img_alt='Hero Homes Greater Noida Regional Infrastructure & Sunset Skyline',
    hero_img_caption='Hero Homes Greater Noida – Aerial Skyline Overview of DMIC Infrastructure Corridors',
    nav_active_key='location',
    main_content_html=location_main,
    sidebar_title='Get Location Map PDF',
    sidebar_desc='Request the high-resolution location map & site routing guide on WhatsApp.',
    sidebar_btn_text='Download Location Map',
    faq_schema_json=location_schema
)

# --------------------------------------------------------------------------
# 4. DEVELOPER.HTML
# --------------------------------------------------------------------------
developer_main = """
<article class="content-block shadow-card rounded-large p-4 bg-white">
  <div class="aeo-direct-answer-box">
    <div class="aeo-box-title"><i data-lucide="zap" class="text-accent"></i> Quick Summary: Hero Realty Background</div>
    <p class="mb-0">Hero Realty Private Limited is the flagship real estate development arm of Hero Enterprise, chaired by Mr. Sunil Kant Munjal. Backed by the multi-billion dollar Hero Group legacy of over 40+ years, Hero Realty has successfully delivered millions of square feet of landmark residential communities across Gurgaon, Mohali, Ludhiana, and Greater Noida with 100% legal compliances and financial transparency.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Realty – Hero Homes Developer Profile &amp; Hero Group Legacy</h2>
  <p class="seo-rich-paragraph">The name 'Hero' is synonymous with Indian manufacturing excellence, consumer trust, and industrial leadership. For over four decades, the Hero Group conglomerate has pioneered world-class engineering, building an iconic global brand valued at over $50 Billion. <strong>Hero Realty Private Limited</strong> carries this prestigious heritage into Indian real estate, setting new standards for construction quality, timely delivery, and customer-first governance.</p>

  <h2 class="content-subheading-lg">Hero Realty Developer Pillars &amp; Construction Excellence</h2>

  <div class="developer-pillars-grid my-4">
    <div class="pillar-card glass-card p-3 my-2">
      <h4><i data-lucide="heart" class="text-accent"></i> 1. Fitness &amp; Active Living</h4>
      <p class="mb-0">Creating living spaces that encourage physical wellness, outdoor sports, clean oxygen parks, and active community interaction for all age groups.</p>
    </div>

    <div class="pillar-card glass-card p-3 my-2">
      <h4><i data-lucide="leaf" class="text-accent"></i> 2. Environmental Stewardship</h4>
      <p class="mb-0">Integrating solar power generation, rainwater harvesting, zero-liquid discharge water recycling, and IGBC green building standards across all developments.</p>
    </div>

    <div class="pillar-card glass-card p-3 my-2">
      <h4><i data-lucide="shield-check" class="text-accent"></i> 3. Consumer Trust &amp; Transparency</h4>
      <p class="mb-0">Transparent pricing cost sheets, clear land titles, bank subvention tie-ups, and adherence to strict project completion timelines.</p>
    </div>
  </div>

  <h2 class="content-subheading-lg">Hero Realty Portfolio of Delivered Hero Homes Projects</h2>
  <p class="seo-rich-paragraph">Hero Realty has built an impressive track record across major real estate growth corridors in North India:</p>

  <table class="seo-data-table">
    <thead>
      <tr>
        <th>Project Name</th>
        <th>Location</th>
        <th>Land Area &amp; Scale</th>
        <th>Key Highlights &amp; Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Hero Homes Gurgaon</strong></td>
        <td>Sector 104, Dwarka Expressway</td>
        <td>9.0 Acres / High-Rise</td>
        <td>Smart connected homes, 75%+ greens, delivered landmark community</td>
      </tr>
      <tr>
        <td><strong>Hero Homes Mohali</strong></td>
        <td>Sector 88, Mohali (Punjab)</td>
        <td>18.4 Acres / High-Rise</td>
        <td>Grand clubhouse, resort amenities, highly successful delivered project</td>
      </tr>
      <tr>
        <td><strong>Hero Homes Ludhiana</strong></td>
        <td>Sidhwan Canal Road, Ludhiana</td>
        <td>16.4 Acres / Integrated</td>
        <td>First climate-controlled smart township in Punjab</td>
      </tr>
      <tr>
        <td><strong>Hero Homes Greater Noida</strong></td>
        <td>Sector MU, DMIC Township</td>
        <td>17.3 Acres / 6M Sq. Ft.</td>
        <td>Flagship NCR pre-launch development inside DMIC Corridor</td>
      </tr>
    </tbody>
  </table>

  <h2 class="content-subheading-lg">Frequently Asked Questions About Hero Realty Developer Track Record</h2>

  <div class="faq-accordion-list my-4">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Who is the parent company behind Hero Realty?</h3>
      <p>Hero Realty Private Limited is part of Hero Enterprise, chaired by Mr. Sunil Kant Munjal, belonging to the renowned Hero Group conglomerate.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Has Hero Realty delivered previous residential projects on time?</h3>
      <p>Yes. Hero Realty has a proven track record of timely delivery across flagship projects in Gurgaon (Sector 104), Mohali (Sector 88), and Ludhiana.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What construction technology is used in Hero Homes projects?</h3>
      <p>Hero Homes utilizes advanced Mivan aluminum formwork monolithic concrete casting technology, ensuring superior structural durability, earthquake resistance, and flawless wall finishes.</p>
    </div>
  </div>
</article>
"""

developer_schema = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is the parent company behind Hero Realty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hero Realty Private Limited is part of Hero Enterprise, chaired by Mr. Sunil Kant Munjal."
      }
    },
    {
      "@type": "Question",
      "name": "Has Hero Realty delivered previous residential projects on time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Hero Realty has a proven track record of timely delivery across Gurgaon, Mohali, and Ludhiana."
      }
    }
  ]
}
</script>
"""

generate_child_page(
    filename='developer.html',
    page_title='Hero Realty – Developer Profile, Track Record & Legacy',
    meta_desc='Learn about Hero Realty, the flagship real estate arm of the $50 Billion+ Hero Group. Explore developer track record, delivered projects, and quality promise.',
    canonical_url='https://herohomenoida.com/developer.html',
    h1_title='Hero Realty – Corporate Heritage, Trust & Track Record',
    subtitle='Building sustainable, modern, and wellness-focused residential communities backed by the $50 Billion+ Hero Group conglomerate.',
    hero_img='images/exterior_daytime.webp',
    hero_img_alt='Hero Realty Flagship Architectural Architecture',
    hero_img_caption='Hero Homes – High-Rise Architectural Excellence & Quality Construction',
    nav_active_key='developer',
    main_content_html=developer_main,
    sidebar_title='Developer Profile',
    sidebar_desc='Speak directly with official Hero Realty representatives for pre-launch consultation.',
    sidebar_btn_text='Request Consultation',
    faq_schema_json=developer_schema
)

# --------------------------------------------------------------------------
# 5. FAQS.HTML
# --------------------------------------------------------------------------
faqs_main = """
<article class="content-block shadow-card rounded-large p-4 bg-white">
  <div class="aeo-direct-answer-box">
    <div class="aeo-box-title"><i data-lucide="zap" class="text-accent"></i> Quick Help Center Summary</div>
    <p class="mb-0">Hero Homes Greater Noida is a 17.3-acre premium pre-launch residential development inside Sector MU, DMIC Township. Pre-launch prices start at <strong>₹2.22 Cr*</strong> for 3 BHK luxury residences (1650 sq ft). Located ~25 mins from Jewar International Airport and ~5 mins from Yamuna Expressway, the project offers 30+ resort amenities and pre-approved home loans from SBI, HDFC, ICICI, and Axis Bank.</p>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida FAQs &amp; Comprehensive Buyer Help Center</h2>
  <p class="seo-rich-paragraph">Welcome to the official <strong>Hero Homes Greater Noida Help Center &amp; FAQ Repository</strong>. Whether you are a first-time homebuyer or an experienced real estate investor, this knowledge base provides immediate, transparent answers to all essential questions regarding pricing, floor plans, RERA approvals, location advantages, payment schedules, and developer track record.</p>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Price &amp; Cost FAQs</h2>

  <div class="faq-accordion-list my-3">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the starting price of Hero Homes Greater Noida?</h3>
      <p>The starting price is ₹2.22 Cr* for the 3 BHK + 2 Toilets configuration (1,650 sq. ft. super built-up area).</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the price for the largest configuration?</h3>
      <p>The 3 BHK + Servant Room configuration (2,200 sq. ft.) starts from ₹2.97 Cr*.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the price per square foot?</h3>
      <p>Approximately ₹13,500 per sq. ft.* on super built-up area, based on current pre-launch pricing across all configurations.</p>
    </div>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Floor Plan &amp; Layout FAQs</h2>

  <div class="faq-accordion-list my-3">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What configurations does Hero Homes Sector MU offer?</h3>
      <p>Three 3 BHK configurations: 1,650 sq. ft. (2 toilets), 1,900 sq. ft. (3 toilets), and 2,200 sq. ft. (with servant room).</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Are all floor plans Vastu compliant?</h3>
      <p>Yes. All entry doors, kitchen positions, and master bedroom suites follow Vastu Shastra orientation principles.</p>
    </div>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida RERA &amp; Possession FAQs</h2>

  <div class="faq-accordion-list my-3">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Is Hero Homes Greater Noida RERA registered?</h3>
      <p>RERA registration for Hero Homes Greater Noida is currently under process and listed as "Coming Soon".</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> What is the possession timeline?</h3>
      <p>Possession is currently indicated as 2031 onwards, executed in phased tower handovers.</p>
    </div>
  </div>

  <h2 class="content-subheading-lg">Hero Homes Greater Noida Location &amp; Connectivity FAQs</h2>

  <div class="faq-accordion-list my-3">
    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> How far is Jewar International Airport from the site?</h3>
      <p>Noida International Airport at Jewar is located approximately 25 to 35 minutes away via the Yamuna Expressway corridor.</p>
    </div>

    <div class="faq-item-card glass-card p-3 my-3">
      <h3><i data-lucide="help-circle" class="text-accent"></i> Which sector is the project situated in?</h3>
      <p>Hero Homes Greater Noida is located in Sector MU inside the DMIC Integrated Industrial Township.</p>
    </div>
  </div>
</article>
"""

faqs_schema = """
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Hero Homes Greater Noida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hero Homes Greater Noida is a landmark 17.3-acre premium residential development by Hero Realty inside DMIC Township."
      }
    },
    {
      "@type": "Question",
      "name": "What is the starting price for 3 BHK apartments?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The starting pre-launch price for a 3 BHK luxury residence is ₹2.22 Cr*."
      }
    },
    {
      "@type": "Question",
      "name": "How far is Jewar International Airport from the site?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Noida International Airport at Jewar is located approximately 25 to 35 minutes away via Yamuna Expressway."
      }
    }
  ]
}
</script>
"""

generate_child_page(
    filename='faqs.html',
    page_title='Hero Homes Greater Noida FAQs – Booking, RERA, Price & Possession',
    meta_desc='Get answers to all frequently asked questions about Hero Homes Greater Noida, including RERA status, location, pricing, payment plans, and possession timeline.',
    canonical_url='https://herohomenoida.com/faqs.html',
    h1_title='Frequently Asked Questions (FAQs) & Help Center',
    subtitle='Get instant, transparent answers regarding pricing, RERA status, location advantages, payment plans, and booking procedures.',
    hero_img='images/hero_homes_overview_poster.webp',
    hero_img_alt='Hero Homes Greater Noida Comprehensive Project Infographic Poster',
    hero_img_caption='Hero Homes Greater Noida – Complete 17.3-Acre Development Overview & Blueprint Stats',
    nav_active_key='faqs',
    main_content_html=faqs_main,
    sidebar_title='Ask a Custom Question',
    sidebar_desc='Speak directly with our official investment team for detailed project consultation.',
    sidebar_btn_text='Submit Question',
    faq_schema_json=faqs_schema
)

print("Other 5 pages updated.")
