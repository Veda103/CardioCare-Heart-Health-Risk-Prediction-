import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <motion.footer 
      className="bg-neutral-700 dark:bg-gray-900 text-white mt-auto transition-colors duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Cardio Care
            </h3>
            <p className="text-neutral-300 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
              Your partner in proactive heart health.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/"
                className="text-left text-neutral-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200 text-sm"
              >
                Home
              </Link>
              <Link 
                to="/about"
                className="text-left text-neutral-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Legal
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/privacy-policy"
                className="text-left text-neutral-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service"
                className="text-left text-neutral-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section - Copyright & Disclaimer */}
        <div className="border-t border-neutral-600 dark:border-gray-700 pt-8 space-y-4 transition-colors duration-300">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-neutral-300 dark:text-gray-400 text-sm transition-colors duration-300">
              © {currentYear} Cardio-AI. All Rights Reserved.
            </p>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="text-center">
            <p className="text-neutral-400 dark:text-gray-500 text-xs max-w-4xl mx-auto leading-relaxed transition-colors duration-300">
              This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
