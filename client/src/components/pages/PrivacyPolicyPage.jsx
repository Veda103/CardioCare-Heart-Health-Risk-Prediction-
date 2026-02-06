import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const PrivacyPolicyPage = () => {
  const { isDark } = useTheme();

  return (
    <motion.div 
      className="min-h-screen bg-neutral-50 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-card dark:shadow-gray-700/20 p-8 transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header */}
          <motion.h1 
            className="text-4xl font-bold text-neutral-800 dark:text-gray-100 mb-8 text-center transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Privacy Policy
          </motion.h1>
          
          {/* Legal Disclaimer */}
          <motion.div 
            className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded-r-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Legal Template Disclaimer</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  This is a template. Please consult with a legal professional to customize these documents for your specific needs and ensure legal compliance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div 
            className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Last updated: August 23, 2025
          </motion.div>

          {/* Content */}
          <motion.div 
            className="prose prose-neutral dark:prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  At Cardio Care, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our heart health prediction service.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Information We Collect</h2>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Account credentials (username, encrypted password)</li>
                  <li>Profile information (age, gender, demographic data)</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Health Information</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Medical history and health conditions</li>
                  <li>Lifestyle information (exercise habits, smoking status, diet)</li>
                  <li>Assessment results and risk predictions</li>
                  <li>Biometric data (blood pressure, cholesterol levels, BMI)</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">How We Use Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Provide heart health risk assessments and predictions</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Improve our algorithms and service quality</li>
                  <li>Conduct research and analysis (in anonymized form)</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations and regulations</li>
                </ul>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>End-to-end encryption for data transmission</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Limited access controls and employee training</li>
                  <li>HIPAA-compliant data handling procedures</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Retention</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We retain your information for as long as necessary to:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Provide ongoing services and support</li>
                  <li>Maintain accurate health records and history</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce agreements</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You may request deletion of your account and associated data at any time, subject to legal retention requirements.
                </p>
              </section>

              {/* User Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Rights</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Restriction:</strong> Limit how we process your information</li>
                  <li><strong>Objection:</strong> Opt-out of certain data processing activities</li>
                  <li><strong>Withdraw Consent:</strong> Revoke previously given consent</li>
                </ul>
              </section>

              {/* Cookie Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Cookie Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Types of Cookies</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand site usage</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  <li><strong>Analytics Cookies:</strong> Provide insights into user behavior</li>
                </ul>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You can manage cookie preferences through your browser settings or our cookie consent banner.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> privacy@cardiocare.com</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> 123 Health Street, Medical District, City, State 12345</p>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
