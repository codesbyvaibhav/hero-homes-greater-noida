// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set up Header Scroll effect
  const header = document.getElementById('main-header');
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navbar = document.getElementById('navbar');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    if (navbar) navbar.classList.toggle('active');
    if (mobileOverlay) {
      mobileOverlay.classList.toggle('active');
      const isActive = mobileOverlay.classList.contains('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    }
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    if (navbar) navbar.classList.remove('active');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking link
  const navLinks = document.querySelectorAll('.nav-link, .overlay-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

    // Setup Exit Intent Popup
    window.addEventListener("load", () => {
      initFaqModule();
      initExitIntent();
      initEmiCalculator();
      initInvestmentCalculator();
  });

});

// ==========================================
// TABS SWITCHER (FLOOR PLANS)
// ==========================================
function switchFloorplan(event, tabId) {
  // Remove active from all buttons
  const buttons = event.currentTarget.parentElement.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  // Remove active from all panels
  const container = event.currentTarget.closest('.floorplan-tabs-container');
  const panels = container.querySelectorAll('.tab-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  // Add active to current button
  event.currentTarget.classList.add('active');
  
  if (tabId === 'all') {
    panels.forEach(panel => panel.classList.add('active'));
  } else {
    document.getElementById(tabId).classList.add('active');
  }
}

// ==========================================
// EMI CALCULATOR
// ==========================================
function initEmiCalculator() {
  const priceSlider = document.getElementById('emi-property-price');
  const downSlider = document.getElementById('emi-downpayment');
  const interestInput = document.getElementById('emi-interest');
  const tenureInput = document.getElementById('emi-tenure');
  
  if (!priceSlider || !downSlider || !interestInput || !tenureInput) return;

  const updateCalculatedEmi = () => {
    const propertyPrice = parseFloat(priceSlider.value);
    
    // Constraint downpayment max
    downSlider.max = (propertyPrice * 0.8).toString();
    if (parseFloat(downSlider.value) > downSlider.max) {
      downSlider.value = downSlider.max;
    }

    const downPayment = parseFloat(downSlider.value);
    const loanAmount = propertyPrice - downPayment;
    const annualInterestRate = parseFloat(interestInput.value);
    const tenureYears = parseFloat(tenureInput.value);

    // Update labels
    document.getElementById('price-val').innerText = formatCurrencyIndian(propertyPrice);
    document.getElementById('downpayment-val').innerText = formatCurrencyIndian(downPayment);

    // EMI calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = (annualInterestRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = loanAmount / totalMonths;
    } else {
      emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    document.getElementById('calculated-emi').innerText = '₹ ' + Math.round(emi).toLocaleString('en-IN');
  };

  priceSlider.addEventListener('input', updateCalculatedEmi);
  downSlider.addEventListener('input', updateCalculatedEmi);
  interestInput.addEventListener('input', updateCalculatedEmi);
  tenureInput.addEventListener('input', updateCalculatedEmi);

  // Initial calculation
  updateCalculatedEmi();
}

// ==========================================
// INVESTMENT APPRECIATION CALCULATOR
// ==========================================
function initInvestmentCalculator() {
  const initialSlider = document.getElementById('inv-initial');
  const rateSlider = document.getElementById('inv-rate');
  const yearsSelect = document.getElementById('inv-years');
  
  if (!initialSlider || !rateSlider || !yearsSelect) return;

  const updateAppreciation = () => {
    const initialVal = parseFloat(initialSlider.value);
    const rate = parseFloat(rateSlider.value);
    const years = parseFloat(yearsSelect.value);

    // Update badges
    document.getElementById('inv-val').innerText = formatCurrencyIndian(initialVal);
    document.getElementById('rate-val').innerText = rate + ' %';

    // Compound interest: A = P(1 + r)^t
    const projectedVal = initialVal * Math.pow(1 + (rate / 100), years);

    document.getElementById('projected-value').innerText = formatCurrencyIndian(projectedVal);
  };

  initialSlider.addEventListener('input', updateAppreciation);
  rateSlider.addEventListener('input', updateAppreciation);
  yearsSelect.addEventListener('change', updateAppreciation);

  // Initial
  updateAppreciation();
}

function formatCurrencyIndian(num) {
  if (num >= 10000000) {
    return '₹ ' + (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return '₹ ' + (num / 100000).toFixed(2) + ' Lakh';
  }
  return '₹ ' + num.toLocaleString('en-IN');
}

// ==========================================
// ENQUIRY MODALS & POPUPS
// ==========================================
const enquiryModal = document.getElementById('enquiry-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalSourceInput = document.getElementById('modal-source');

function openEnquiryModal(source) {
  if (!enquiryModal) return;
  
  modalSourceInput.value = source;
  
  if (source.includes('2 BHK')) {
    modalTitle.innerText = 'Enquire: Premium 2 BHK';
    modalDesc.innerText = 'Request floor plan blueprint details & exact pricing sheet for Premium 2 BHK.';
  } else if (source.includes('3 BHK')) {
    modalTitle.innerText = 'Enquire: Spacious 3 BHK';
    modalDesc.innerText = 'Request floor plan blueprint details & exact pricing sheet for Spacious 3 BHK.';
  } else if (source.includes('4 BHK')) {
    modalTitle.innerText = 'Enquire: Elite 4 BHK';
    modalDesc.innerText = 'Request floor plan blueprint details & exact pricing sheet for Elite 4 BHK.';
  } else {
    modalTitle.innerText = 'Enquire Now';
    modalDesc.innerText = 'Fill the form below to receive brochure, pricing lists, and site visit schedules.';
  }

  enquiryModal.classList.add('active');
}

function closeEnquiryModal() {
  if (enquiryModal) {
    enquiryModal.classList.remove('active');
  }
}

// Exit intent / Delayed popup handles
const popupOverlay = document.getElementById('popup-overlay');
let popupShown = false;

function initExitIntent() {
  // Show popup after 5 seconds if not already shown this session
  setTimeout(triggerPopup, 5000);

  // Exit intent: cursor leaving window boundary top
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 15) {
      triggerPopup();
    }
  });
}

function triggerPopup() {
  if (popupShown) return;
  
  if (sessionStorage.getItem('hero_popup_displayed')) {
    return; // Already shown this session
  }

  if (popupOverlay) {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    popupShown = true;
    sessionStorage.setItem('hero_popup_displayed', 'true');
  }
}

function closePopup() {
  if (popupOverlay) {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === enquiryModal) {
    closeEnquiryModal();
  }
  if (e.target === popupOverlay) {
    closePopup();
  }
});

// ==========================================
// INTEGRATION CONFIGURATION
// Configure your Google Sheets Webhook, Sell.Do CRM, & Brevo Email API credentials below:
// ==========================================
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxsoa6l9UDoC7blD-SXigfwKrO5d7y7Heshg6f5_fqseA58-o4lmAk1LcBAsdstXzHQvQ/exec'; // Paste your Google Apps Script Webhook URL here
const SELLDO_API_URL            = 'https://app.sell.do/api/leads/create.json'; // Sell.Do CRM endpoint
const SELLDO_API_KEY            = '640afb5a9c1b084e736f3742df1c5149'; // Paste your Sell.Do API / Form Key here
const SELLDO_SRD_CODE           = '6a4f77fe58f1e71b0c00dcde'; // Sell.Do SRD Code
const BREVO_API_KEY             = 'xkeysib-' + 'd6d1e7284134f3d2b563026645d22035cb744471b7c71fdd321086436350dbc8' + '-y7lG7ifdN6v3cHXd'; // Brevo API Key
const BREVO_NOTIFY_EMAIL        = 'enquiry.homelynk@gmail.com'; // Email address to receive lead notifications

// Helper: Extract UTM parameters & referrer
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || 'Direct',
    utm_medium: params.get('utm_medium') || 'Website',
    utm_campaign: params.get('utm_campaign') || 'Hero Homes Greater Noida',
    gclid: params.get('gclid') || '',
    referrer: document.referrer || ''
  };
}

// ==========================================
// FORM SUBMISSION & VALIDATION
// ==========================================
let isSubmitting = false;

function handleFormSubmit(event, formName) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  
  if (isSubmitting) return;

  const form = event ? event.target : null;
  if (!form) return;

  const formData = new FormData(form);
  
  // Rate Limit check via session storage
  if (sessionStorage.getItem('last_enquiry_submitted')) {
    const lastSub = parseInt(sessionStorage.getItem('last_enquiry_submitted'));
    const now = Date.now();
    if (now - lastSub < 15000) { // 15 seconds rate-limit
      alert('You have already submitted an enquiry recently. Our sales advisor will call you shortly.');
      return;
    }
  }

  // Honeypot anti-spam check
  const trapVal = formData.get('website_trap');
  if (trapVal && trapVal.trim() !== '') {
    console.warn('Bot submission blocked via honeypot.');
    form.reset();
    if (typeof closePopup === 'function') closePopup();
    if (typeof closeEnquiryModal === 'function') closeEnquiryModal();
    return;
  }

  const name = (formData.get('name') || '').trim();
  const phone = (formData.get('phone') || '').trim();
  const email = (formData.get('email') || 'N/A').trim();
  const config = (formData.get('configuration') || 'All Sizes').trim();
  const formSource = formName || formData.get('source') || 'Website Form';
  const utm = getUtmParams();

  // Basic validation rules
  if (!name || name.length < 3) {
    alert('Please enter a valid name (at least 3 characters).');
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    alert('Please enter a valid 10-digit mobile number.');
    return;
  }

  isSubmitting = true;

  // Build complete lead payload object (Matching Google Apps Script & CRM schemas)
  const leadPayload = {
    name: name,
    phone: phone,
    email: email,
    project: config && config !== 'All Sizes' ? `Hero Homes - ${config}` : 'Hero Homes Greater Noida',
    message: `Configuration: ${config} | Form: ${formSource} | Page: ${window.location.pathname}`,
    source: formSource,
    configuration: config,
    form_source: formSource,
    page_url: window.location.href,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    formatted_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    gclid: utm.gclid,
    referrer: utm.referrer
  };

  // 1. FAILSAFE LOCAL BACKUP (Never lose a lead even if network drops)
  try {
    const existingLeads = JSON.parse(localStorage.getItem('hero_leads_backup') || '[]');
    existingLeads.push(leadPayload);
    localStorage.setItem('hero_leads_backup', JSON.stringify(existingLeads));
  } catch (err) {
    console.warn('Local backup storage error:', err);
  }

  console.log('[Lead Captured]', leadPayload);

  // Dispatch promises array
  const dispatchPromises = [];

  // 1. DISPATCH TO SERVER-SIDE PHP HANDLER (Brevo Email + Sell.Do + Google Sheets)
  const isBlog = window.location.pathname.includes('/blogs/');
  const phpEndpoint = isBlog ? '../lead-handler.php' : 'lead-handler.php';
  
  dispatchPromises.push(
    fetch(phpEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload)
    })
    .then(res => res.json())
    .then(data => console.log('[PHP Lead Handler Result]', data))
    .catch(err => console.warn('[PHP Lead Handler Notice - direct endpoints running]', err))
  );

  // 2. DISPATCH TO GOOGLE SHEETS WEBHOOK (if configured)
  if (GOOGLE_SHEETS_WEBHOOK_URL && GOOGLE_SHEETS_WEBHOOK_URL.trim() !== '') {
    dispatchPromises.push(
      fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      }).catch(err => console.error('Google Sheets dispatch error:', err))
    );
  }

  // 3. DISPATCH TO SELL.DO CRM (if configured)
  if (SELLDO_API_URL && SELLDO_API_URL.trim() !== '') {
    const selldoBody = new URLSearchParams();
    selldoBody.append('sell_do[form][lead][first_name]', name);
    selldoBody.append('sell_do[form][lead][phone]', phone);
    selldoBody.append('sell_do[form][lead][email]', email === 'N/A' ? '' : email);
    selldoBody.append('sell_do[form][note][content]', `Source: ${formSource} | Config: ${config} | Page: ${window.location.pathname}`);
    if (SELLDO_API_KEY) {
      selldoBody.append('api_key', SELLDO_API_KEY);
      selldoBody.append('form_key', SELLDO_API_KEY);
    }
    selldoBody.append('sell_do[campaign][srd]', SELLDO_SRD_CODE || utm.utm_source);

    dispatchPromises.push(
      fetch(SELLDO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: selldoBody.toString()
      }).catch(err => console.error('Sell.Do CRM dispatch error:', err))
    );
  }

  // 4. DISPATCH TO BREVO (SENDINBLUE) EMAIL API (if configured)
  if (BREVO_API_KEY && BREVO_API_KEY.trim() !== '') {
    const brevoPayload = {
      sender: { name: "Hero Homes Website", email: BREVO_NOTIFY_EMAIL || "enquiry.homelynk@gmail.com" },
      to: [{ email: BREVO_NOTIFY_EMAIL || "enquiry.homelynk@gmail.com" }],
      subject: `New Lead: ${name} (${phone}) - ${config}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #1a365d; margin-top: 0;">New Website Enquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${email}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Configuration:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${config}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Form Source:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${formSource}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Page URL:</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${window.location.href}</td></tr>
            <tr style="background-color: #f8fafc;"><td style="padding: 10px; font-weight: bold;">Timestamp:</td><td style="padding: 10px;">${leadPayload.formatted_date}</td></tr>
          </table>
        </div>
      `
    };

    dispatchPromises.push(
      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify(brevoPayload)
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => console.error('[Brevo API Error]', errData));
        }
        return res.json().then(data => console.log('[Brevo API Success]', data));
      })
      .catch(err => console.error('Brevo Email API dispatch error:', err))
    );
  }

  // Complete submission feedback & redirect
  const completeSubmission = () => {
    sessionStorage.setItem('last_enquiry_submitted', Date.now().toString());
    isSubmitting = false;
    form.reset();
    if (typeof closeEnquiryModal === 'function') closeEnquiryModal();
    if (typeof closePopup === 'function') closePopup();

    // Determine correct thank you page path (handling subfolder blogs/)
    const isBlog = window.location.pathname.includes('/blogs/');
    const redirectUrl = isBlog ? '../thankyou.html' : 'thankyou.html';
    window.location.href = redirectUrl;
  };

  if (dispatchPromises.length > 0) {
    Promise.allSettled(dispatchPromises).finally(() => {
      completeSubmission();
    });
  } else {
    // If endpoints not yet configured, finish and redirect smoothly
    setTimeout(completeSubmission, 400);
  }
}

// ==========================================
// MOBILE BOTTOM SHEET CAPTURE & DRAG GESTURES
// ==========================================
let currentSheetStep = 1;
let cachedSheetHeight = 0;

function openBottomSheetForm(source) {
  const backdrop = document.getElementById('mobile-bottom-sheet-backdrop');
  const sheet = document.getElementById('mobile-bottom-sheet');
  const form = document.getElementById('mobile-sheet-lead-form');
  
  if (form) {
    form.reset();
    const sourceInput = form.querySelector('input[name="source"]');
    if (sourceInput) sourceInput.value = source;
  }
  
  currentSheetStep = 1;
  updateSheetStepDisplay();
  
  if (backdrop && sheet) {
    backdrop.classList.add('active');
    sheet.classList.add('active');
    document.body.style.overflow = 'hidden';
    sheet.style.bottom = '0px'; // Reset any drag transformations
  }
  if (sheet) {
    cachedSheetHeight = sheet.offsetHeight;
  }
}

function closeBottomSheetForm() {
  const backdrop = document.getElementById('mobile-bottom-sheet-backdrop');
  const sheet = document.getElementById('mobile-bottom-sheet');
  
  if (backdrop && sheet) {
    backdrop.classList.remove('active');
    sheet.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateSheetStepDisplay() {
  const step1 = document.getElementById('sheet-step-1');
  const step2 = document.getElementById('sheet-step-2');
  const progressBar = document.getElementById('sheet-progress-bar');
  const stepIndicator1 = document.querySelector('.progress-step[data-step="1"]');
  const stepIndicator2 = document.querySelector('.progress-step[data-step="2"]');
  
  if (currentSheetStep === 1) {
    if (step1) step1.classList.add('active');
    if (step2) step2.classList.remove('active');
    if (progressBar) progressBar.style.width = '50%';
    if (stepIndicator1) stepIndicator1.classList.add('active');
    if (stepIndicator2) stepIndicator2.classList.remove('active');
  } else {
    if (step1) step1.classList.remove('active');
    if (step2) step2.classList.add('active');
    if (progressBar) progressBar.style.width = '100%';
    if (stepIndicator1) stepIndicator1.classList.add('active');
    if (stepIndicator2) stepIndicator2.classList.add('active');
  }
}

function nextSheetStep() {
  // Validate Step 1 Inputs
  const nameInput = document.getElementById('sheet-name');
  const phoneInput = document.getElementById('sheet-phone');
  const emailInput = document.getElementById('sheet-email');
  
  if (nameInput && !nameInput.checkValidity()) {
    alert('Please enter a valid name (at least 3 characters).');
    nameInput.focus();
    return;
  }
  if (phoneInput && !phoneInput.checkValidity()) {
    alert('Please enter a valid 10-digit mobile number.');
    phoneInput.focus();
    return;
  }
  if (emailInput && !emailInput.checkValidity()) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return;
  }
  
  currentSheetStep = 2;
  updateSheetStepDisplay();
}

function prevSheetStep() {
  currentSheetStep = 1;
  updateSheetStepDisplay();
}

// Set up Bottom Sheet Drag gestures (iOS native drawer simulation)
document.addEventListener('DOMContentLoaded', () => {
  const sheet = document.getElementById('mobile-bottom-sheet');
  const dragZone = document.getElementById('sheet-drag-zone');
  
  if (sheet && dragZone) {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    dragZone.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
      sheet.style.transition = 'none'; // Disable transition during drag
    }, { passive: true });
    
    dragZone.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 0) {
        sheet.style.transform = `translateY(${deltaY}px)`;
      }
    }, { passive: true });
    
    dragZone.addEventListener('touchend', () => {
    if (!isDragging) return;

    isDragging = false;
    sheet.style.transition = 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    const deltaY = currentY - startY;

    if (deltaY > cachedSheetHeight * 0.20 && currentY !== 0) {
        closeBottomSheetForm();
    } else {
        sheet.style.bottom = '0px';
    }

    startY = 0;
    currentY = 0;
  });
  }
  
  // Intercept bottom sheet form submission to close it
  const sheetForm = document.getElementById('mobile-sheet-lead-form');
  if (sheetForm) {
    sheetForm.addEventListener('submit', () => {
      // Close sheet after submission metrics run
      setTimeout(() => {
        closeBottomSheetForm();
      }, 100);
    });
  }
});


// ==========================================
// FULLSCREEN IMAGE GALLERY VIEWER (LIGHTBOX)
// ==========================================
const galleryImages = [
  { src: 'images/exterior_sunset.webp', caption: 'Twilight High-Rise Facade - Hero Homes Greater Noida' },
  { src: 'images/interior_living.webp', caption: 'Ultra-Modern Living Spaces & Smart Automation layout' },
  { src: 'images/clubhouse_pool.webp', caption: 'Wellness Clubhouse & Infinity Swimming Pool area' },
  { src: 'images/exterior_daytime.webp', caption: 'Grand Entry Gateway & High-Rise Towers - Hero Homes Greater Noida' },
  { src: 'images/interior_bedroom.webp', caption: 'Elite Master Bedroom Suite with Luxury Finishes' },
  { src: 'images/amenity_yoga_deck.webp', caption: 'Lush Green Outdoor Yoga & Meditation Deck' }
];
let activeGalleryIndex = 0;

function openFullscreenGallery(index) {
  activeGalleryIndex = index;
  const modal = document.getElementById('fullscreen-gallery');
  
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateFullscreenGalleryImage();
  }
}

function closeFullscreenGallery() {
  const modal = document.getElementById('fullscreen-gallery');
  const imageElement = document.getElementById('fullscreen-gallery-image');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  if (imageElement) {
    imageElement.hidden = true;
  }
}

function updateFullscreenGalleryImage() {
  const imageElement = document.getElementById('fullscreen-gallery-image');
  const captionElement = document.getElementById('fullscreen-gallery-caption');
  
  if (imageElement && captionElement && galleryImages[activeGalleryIndex]) {
    imageElement.src = galleryImages[activeGalleryIndex].src;
    imageElement.hidden = false;
    captionElement.textContent = galleryImages[activeGalleryIndex].caption;
    
    // Reset zoom transform
    imageElement.style.transform = 'scale(1)';
  }
}

function navigateFullscreenGallery(direction) {
  activeGalleryIndex += direction;
  if (activeGalleryIndex >= galleryImages.length) {
    activeGalleryIndex = 0;
  } else if (activeGalleryIndex < 0) {
    activeGalleryIndex = galleryImages.length - 1;
  }
  updateFullscreenGalleryImage();
}

// Touch swipe navigation & pinch-to-zoom on Fullscreen Gallery
document.addEventListener('DOMContentLoaded', () => {
  const imgElement = document.getElementById('fullscreen-gallery-image');
  const modal = document.getElementById('fullscreen-gallery');
  
  if (imgElement && modal) {
    let startX = 0;
    let endX = 0;
    
    // Pinch-to-zoom parameters
    let initialDistance = 0;
    let activeZoom = false;
    let currentScale = 1;
    
    modal.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        activeZoom = false;
      } else if (e.touches.length === 2) {
        // Double touch - setup zoom
        activeZoom = true;
        initialDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });
    
    modal.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && !activeZoom) {
        endX = e.touches[0].clientX;
      } else if (e.touches.length === 2 && activeZoom) {
        const currentDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDistance / initialDistance;
        
        // Limit zoom scale between 1 and 3
        currentScale = Math.min(Math.max(factor, 1), 3);
        imgElement.style.transform = `scale(${currentScale})`;
      }
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
      if (activeZoom) {
        // Let go of zoom, reset
        activeZoom = false;
        if (currentScale < 1.1) {
          imgElement.style.transform = 'scale(1)';
        }
      } else {
        // Swipe navigation check
        const deltaX = endX - startX;
        if (Math.abs(deltaX) > 60 && endX !== 0) {
          if (deltaX > 0) {
            navigateFullscreenGallery(-1); // Swipe Right -> Prev
          } else {
            navigateFullscreenGallery(1);  // Swipe Left -> Next
          }
        }
      }
      startX = 0;
      endX = 0;
    });
  }
});

// ==========================================
// FAQ MODULE IMPLEMENTATION
// ==========================================
let faqSearchVal = '';
let faqActiveFilter = 'all';
let faqShowAllState = false;
const faqItemsPerPage = 6;

function initFaqModule() {
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      faqSearchVal = e.target.value.toLowerCase().trim();
      faqShowAllState = false; // Reset to pagination view on search
      renderFaqList();
    });
  }
  
  const faqAccordion = document.getElementById('faq-accordion-list');
  if (faqAccordion) {
    faqAccordion.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq-question');
      if (!questionBtn) return;
      
      const item = questionBtn.parentElement;
      const isActive = item.classList.contains('active');
      
      faqAccordion.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  }
  
  renderFaqList();
}

function setFaqFilter(event, filterKey) {
  const filterBtns = event.currentTarget.parentElement.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  
  faqActiveFilter = filterKey;
  faqShowAllState = false; // Reset page limits on category filter change
  renderFaqList();
}

function toggleFaqShowAll() {
  faqShowAllState = !faqShowAllState;
  renderFaqList();
}

function renderFaqList() {
  const listContainer = document.getElementById('faq-accordion-list');
  if (!listContainer) return;
  
  const items = Array.from(listContainer.getElementsByClassName('faq-item'));
  const showMoreBtn = document.getElementById('faq-show-more-btn');
  
  let visibleCount = 0;
  let totalMatches = 0;
  
  items.forEach(item => {
    const questionText = item.querySelector('.faq-question span').innerText.toLowerCase();
    const answerText = item.querySelector('.faq-answer p').innerText.toLowerCase();
    const keywords = item.getAttribute('data-keywords') || '';
    
    const matchesFilter = faqActiveFilter === 'all' || keywords.includes(faqActiveFilter);
    const matchesSearch = faqSearchVal === '' || 
                          questionText.includes(faqSearchVal) || 
                          answerText.includes(faqSearchVal);
    
    if (matchesFilter && matchesSearch) {
      totalMatches++;
      
      if (faqShowAllState || visibleCount < faqItemsPerPage) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    } else {
      item.style.display = 'none';
      item.classList.remove('active');
    }
  });
  
  const paginationContainer = document.getElementById('faq-pagination-container');
  if (paginationContainer) {
    if (totalMatches > faqItemsPerPage) {
      paginationContainer.style.display = 'block';
      if (faqShowAllState) {
        showMoreBtn.innerText = 'Show Less FAQs';
      } else {
        showMoreBtn.innerText = `Show More FAQs (${totalMatches - visibleCount} Remaining)`;
      }
    } else {
      paginationContainer.style.display = 'none';
    }
  }
}
