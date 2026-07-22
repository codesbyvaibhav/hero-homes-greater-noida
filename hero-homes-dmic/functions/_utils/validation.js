/**
 * Sanitizes an input string to prevent XSS/HTML Injection
 * @param {string} val 
 * @returns {string}
 */
export function sanitizeString(val) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .trim();
}

/**
 * Validates a 10-digit phone number
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates an email format
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || email === 'N/A') return true; // Optional email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates the Math CAPTCHA answer
 * @param {string|number} n1 
 * @param {string|number} n2 
 * @param {string|number} ans 
 * @returns {boolean}
 */
export function isValidCaptcha(n1, n2, ans) {
  const num1 = parseInt(n1, 10);
  const num2 = parseInt(n2, 10);
  const userAns = parseInt(ans, 10);

  if (isNaN(num1) || isNaN(num2) || isNaN(userAns)) {
    return false;
  }
  return num1 + num2 === userAns;
}

/**
 * Main validation coordinator
 * @param {Object} data 
 * @returns {{isValid: boolean, errors: string[]}}
 */
export function validateLead(data) {
  const errors = [];

  const name = sanitizeString(data.name);
  const phone = sanitizeString(data.phone);
  const email = sanitizeString(data.email);

  if (!name || name.length < 3) {
    errors.push('Name must be at least 3 characters long.');
  }

  if (!isValidPhone(phone)) {
    errors.push('Phone number must be a valid 10-digit number.');
  }

  if (!isValidEmail(email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!isValidCaptcha(data.captcha_n1, data.captcha_n2, data.captcha_ans)) {
    errors.push('Incorrect answer to security question.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
