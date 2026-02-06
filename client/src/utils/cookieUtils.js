// Cookie Consent Utilities
// This file provides utility functions for managing cookie consent

/**
 * Clears the cookie consent from localStorage
 * Useful for testing or if user wants to reset their preference
 */
export const clearCookieConsent = () => {
  localStorage.removeItem('cookieConsent');
  console.log('Cookie consent cleared. Refresh the page to see the banner again.');
};

/**
 * Checks if user has given cookie consent
 * @returns {boolean} true if consent has been given, false otherwise
 */
export const hasCookieConsent = () => {
  return localStorage.getItem('cookieConsent') === 'accepted';
};

/**
 * Sets cookie consent to accepted
 */
export const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'accepted');
};

/**
 * Gets the current cookie consent status
 * @returns {string|null} 'accepted' if accepted, null if no choice made
 */
export const getCookieConsentStatus = () => {
  return localStorage.getItem('cookieConsent');
};

// For development/testing - add to window object
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.clearCookieConsent = clearCookieConsent;
  window.hasCookieConsent = hasCookieConsent;
}
