// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Capture campaign details & generate math security challenges
  captureUtmParameters();
  initializeAllCaptchas();

  // Initialize Lucide Icons after initial render (non-blocking)
  if (typeof lucide !== 'undefined') {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => lucide.createIcons());
    } else {
      setTimeout(() => lucide.createIcons(), 50);
    }
  }

  // Auto-reset CAPTCHA visibility and button text when any form is reset
  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('reset', () => {
      const captchaGroup = form.querySelector('.form-captcha-group');
      if (captchaGroup) {
        captchaGroup.classList.remove('visible');
        captchaGroup.style.setProperty('display', 'none', 'important'); // Reset inline display
      }
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn && submitBtn.dataset.originalText) {
        submitBtn.innerHTML = submitBtn.dataset.originalText;
      }
    });
  });
});

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

    // Setup Exit Intent Popup and defer non-critical features to free up main thread on load
    window.addEventListener("load", () => {
      initFaqModule();
      initExitIntent();
      
      // Defer calculators and scroll indicators slightly to avoid layout thrashing during parsing
      setTimeout(() => {
        initEmiCalculator();
        initInvestmentCalculator();
        initGalleryScrollIndicator();
      }, 50);
    });

  });

  function initGalleryScrollIndicator() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryThumb = document.getElementById('gallery-scrollbar-thumb');

    if (galleryContainer && galleryThumb) {
      const updateThumb = () => {
        const maxScroll = galleryContainer.scrollWidth - galleryContainer.clientWidth;
        if (maxScroll <= 0) return;
        const scrollRatio = galleryContainer.scrollLeft / maxScroll;
        // Thumb is 30% wide, so it moves between 0% and 70%
        const thumbLeft = scrollRatio * 70;
        galleryThumb.style.left = `${thumbLeft}%`;
      };

      galleryContainer.addEventListener('scroll', updateThumb, { passive: true });
      window.addEventListener('resize', updateThumb, { passive: true });
      updateThumb();
    }
  }

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
// TOAST ALERT NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-alert ${type}`;
  
  const icon = type === 'success' 
    ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${icon}
    <div class="toast-message">${message}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 4000);
}

// ==========================================
// STATELESS MATH CAPTCHA SECURITY
// ==========================================
function generateCaptchaForForm(form) {
  const labelSpan = form.querySelector('.math-question');
  const inputN1 = form.querySelector('input[name="captcha_n1"]');
  const inputN2 = form.querySelector('input[name="captcha_n2"]');
  const inputAns = form.querySelector('input[name="captcha_ans"]');

  if (!labelSpan || !inputN1 || !inputN2) return;

  const num1 = Math.floor(Math.random() * 8) + 2;
  const num2 = Math.floor(Math.random() * 9) + 1;

  labelSpan.innerText = `${num1} + ${num2}`;
  inputN1.value = num1;
  inputN2.value = num2;
  if (inputAns) inputAns.value = '';
}

function initializeAllCaptchas() {
  const forms = document.querySelectorAll('.enquiry-form');
  forms.forEach(form => generateCaptchaForForm(form));
}

// ==========================================
// UTM TRACKING DATA SYSTEM
// ==========================================
function captureUtmParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmFields.forEach(field => {
    const value = urlParams.get(field);
    if (value) {
      sessionStorage.setItem(`hh_${field}`, value);
    }
  });

  if (!sessionStorage.getItem('hh_landing_page')) {
    sessionStorage.setItem('hh_landing_page', window.location.href);
  }
}

function getStoredUtmData() {
  return {
    utm_source: sessionStorage.getItem('hh_utm_source') || '',
    utm_medium: sessionStorage.getItem('hh_utm_medium') || '',
    utm_campaign: sessionStorage.getItem('hh_utm_campaign') || '',
    source_url: sessionStorage.getItem('hh_landing_page') || window.location.href
  };
}

// ==========================================
// FORM SUBMISSION & VALIDATION
// ==========================================
let isSubmitting = false;

function handleFormSubmit(event, formName) {
  event.preventDefault();
  
  if (isSubmitting) return;

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);
  
  if (sessionStorage.getItem('last_enquiry_submitted')) {
    const lastSub = parseInt(sessionStorage.getItem('last_enquiry_submitted'), 10);
    const now = Date.now();
    if (now - lastSub < 30000) {
      showToast('You have already submitted an enquiry recently. Our agent will call you shortly.', 'error');
      return;
    }
  }

  const trapVal = formData.get('website_trap');
  if (trapVal && trapVal.trim() !== '') {
    console.warn('Bot submission blocked.');
    form.reset();
    closePopup();
    closeEnquiryModal();
    return;
  }

  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email') || 'N/A';
  const config = formData.get('configuration') || 'All Sizes';
  const message = formData.get('message') || '';

  const captchaN1 = formData.get('captcha_n1');
  const captchaN2 = formData.get('captcha_n2');
  const captchaAns = formData.get('captcha_ans');

  if (!name || name.trim().length < 3) {
    showToast('Please enter a valid name (at least 3 characters).', 'error');
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    showToast('Please enter a valid 10-digit mobile number.', 'error');
    return;
  }

  // Trigger CAPTCHA check on submit click
  const captchaGroup = form.querySelector('.form-captcha-group');
  if (captchaGroup && (!captchaGroup.classList.contains('visible') || captchaGroup.style.display === 'none')) {
    // Make security challenge visible first
    captchaGroup.classList.add('visible');
    captchaGroup.style.setProperty('display', 'flex', 'important'); // Force inline display: flex
    
    // Focus captcha input
    const captchaInput = captchaGroup.querySelector('.captcha-input');
    if (captchaInput) {
      captchaInput.focus();
    }

    // Update submit button text to guide user
    if (submitBtn) {
      if (!submitBtn.dataset.originalText) {
        submitBtn.dataset.originalText = submitBtn.innerHTML;
      }
      submitBtn.innerHTML = '<i data-lucide="check-square"></i> Verify &amp; Submit';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({
          attrs: { class: 'lucide' },
          nameAttr: 'data-lucide',
          node: submitBtn
        });
      }
    }
    return; // Halt and wait for user's entry
  }

  if (parseInt(captchaN1, 10) + parseInt(captchaN2, 10) !== parseInt(captchaAns, 10)) {
    showToast('Incorrect security question answer. Please try again.', 'error');
    generateCaptchaForForm(form);
    return;
  }

  const utm = getStoredUtmData();

  isSubmitting = true;
  if (submitBtn) {
    submitBtn.classList.add('submitting');
    submitBtn.disabled = true;
  }

  fetch('/api/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      config: config,
      message: message,
      source: formName,
      captcha_n1: captchaN1,
      captcha_n2: captchaN2,
      captcha_ans: captchaAns,
      source_url: utm.source_url,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errData => {
        throw new Error(errData.message || `API error ${response.status}`);
      });
    }
    return response.json();
  })
  .then(data => {
    sessionStorage.setItem('last_enquiry_submitted', Date.now().toString());
    showToast(data.message || 'Details submitted successfully.', 'success');
    form.reset();
    
    setTimeout(() => {
      closeEnquiryModal();
      closePopup();
      if (typeof closeBottomSheetForm === 'function') {
        closeBottomSheetForm();
      }
      window.location.href = 'thankyou.html';
    }, 1500);
  })
  .catch(error => {
    console.error('Failed to send lead:', error);
    showToast(error.message || 'There was a problem submitting your request. Please try again.', 'error');
    generateCaptchaForForm(form);
  })
  .finally(() => {
    isSubmitting = false;
    if (submitBtn) {
      submitBtn.classList.remove('submitting');
      submitBtn.disabled = false;
    }
  });
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

// Global gallery scroll function for mobile arrow buttons
function scrollGallery(direction) {
  const container = document.querySelector('.gallery-container');
  if (container) {
    // Scroll by roughly one item width (280px + 16px gap)
    const cardWidth = 296; 
    container.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
  }
}
