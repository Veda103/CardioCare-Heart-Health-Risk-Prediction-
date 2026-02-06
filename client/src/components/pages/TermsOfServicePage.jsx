import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const TermsOfServicePage = () => {
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
            Terms of Service
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
                  Welcome to Cardio Care. These Terms of Service ("Terms") govern your use of our heart health prediction platform and services. 
                  By accessing or using our service, you agree to be bound by these Terms.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By creating an account, accessing, or using the Cardio Care platform, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Eligibility</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>You must be at least 18 years old to use this service</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You must have the legal capacity to enter into this agreement</li>
                  <li>Your use must comply with all applicable laws and regulations</li>
                </ul>
              </section>

              {/* Description of Service */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Description of Service</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Cardio Care provides an AI-powered heart health risk assessment platform that:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Analyzes user-provided health data and lifestyle factors</li>
                  <li>Generates personalized cardiovascular risk predictions</li>
                  <li>Provides educational content and health recommendations</li>
                  <li>Enables secure sharing with healthcare providers</li>
                  <li>Maintains user health history and progress tracking</li>
                </ul>

                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Important Medical Disclaimer</h4>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    This service is for informational and educational purposes only. It is not intended to diagnose, treat, cure, 
                    or prevent any disease. Always consult with qualified healthcare professionals for medical advice.
                  </p>
                </div>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">User Responsibilities</h2>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Account Security</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Use strong passwords and enable two-factor authentication</li>
                  <li>Log out from shared or public computers</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Data Accuracy</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Provide accurate and truthful health information</li>
                  <li>Update your profile when circumstances change</li>
                  <li>Understand that inaccurate data affects prediction quality</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Prohibited Uses</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Use the service for any unlawful purposes</li>
                  <li>Attempt to reverse engineer or access our algorithms</li>
                  <li>Share your account with others or create multiple accounts</li>
                  <li>Interfere with the service's security or functionality</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Use automated tools to access the platform</li>
                </ul>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Disclaimers</h2>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Medical Disclaimers</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Risk predictions are estimates based on statistical models</li>
                  <li>Results should not replace professional medical evaluation</li>
                  <li>Individual health outcomes may vary significantly</li>
                  <li>Emergency medical situations require immediate professional care</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Service Availability</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We strive to maintain service availability but cannot guarantee uninterrupted access. 
                  The service is provided "as is" and "as available" without warranties of any kind.
                </p>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Third-Party Content</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may include links to third-party websites or services. We are not responsible for 
                  the content, privacy practices, or availability of external sites.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  To the fullest extent permitted by law, Cardio Care and its affiliates shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Medical decisions made based on our risk assessments</li>
                  <li>Delays in seeking medical care due to service predictions</li>
                  <li>Data loss, system downtime, or technical failures</li>
                  <li>Actions taken by third-party healthcare providers</li>
                </ul>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Maximum Liability:</strong> Our total liability shall not exceed the amount paid for the service in the 12 months preceding the claim.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Governing Law</h2>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Jurisdiction</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of [State/Country], 
                  without regard to its conflict of law provisions.
                </p>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Dispute Resolution</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Disputes will first be addressed through good faith negotiations</li>
                  <li>Unresolved disputes may be subject to binding arbitration</li>
                  <li>Class action lawsuits are waived to the extent permitted by law</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Severability</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated through:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  <li>Email notification to registered users</li>
                  <li>Prominent notice on our platform</li>
                  <li>Updated "Last Modified" date</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Continued use of the service after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> legal@cardiocare.com</p>
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

export default TermsOfServicePage;
