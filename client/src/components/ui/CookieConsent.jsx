import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clearCookieConsent, acceptCookies } from '../../utils/cookieUtils';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    acceptCookies();
    setIsVisible(false);
  };

  const handleLearnMore = () => {
    // For now, we'll just log - later this can link to privacy policy
    console.log('Learn More clicked - will link to privacy policy');
    // Future: navigate to privacy policy page
    // onNavigate?.('privacy-policy');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-gray-700 text-white rounded-lg shadow-lg p-4 z-50"
          style={{ backgroundColor: '#2D3748' }}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.4 
          }}
          role="dialog"
          aria-label="Cookie consent banner"
          aria-describedby="cookie-description"
        >
          {/* Cookie Icon */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <svg 
                className="w-5 h-5 text-amber-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029C10.792 13.807 10.304 14 10 14c-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H9a1 1 0 110-2h-.013a7.78 7.78 0 010-1H9a1 1 0 010-2h-.528c.04-.184.125-.357.264-.521z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1">
              {/* Content */}
              <p className="text-sm text-gray-200 leading-relaxed mb-4" id="cookie-description">
                This website uses cookies to enhance your user experience. By continuing to use this site, you agree to our use of cookies.
              </p>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                {/* Accept Button */}
                <motion.button
                  onClick={handleAccept}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                  style={{ backgroundColor: '#008080' }}
                  whileHover={{ 
                    backgroundColor: '#006666',
                    scale: 1.02 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Accept</span>
                </motion.button>
                
                {/* Learn More Link */}
                <button
                  onClick={handleLearnMore}
                  className="text-gray-300 hover:text-white text-sm underline underline-offset-2 transition-colors duration-200 ml-3"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Close Button */}
            <motion.button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close cookie banner"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Progress Bar Animation */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-teal-600 rounded-b-lg"
            style={{ backgroundColor: '#008080' }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
