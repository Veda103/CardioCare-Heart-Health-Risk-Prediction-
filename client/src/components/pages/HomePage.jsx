import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const { isDark } = useTheme();
  const { user, isAuthenticated } = useUser();

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const faqData = [
    {
      id: 1,
      question: "Is my health data safe?",
      answer: "Absolutely. We process your data in real-time and never store it. Our platform is built with privacy as a top priority."
    },
    {
      id: 2,
      question: "Is this a medical diagnosis?",
      answer: "No. This tool is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider."
    },
    {
      id: 3,
      question: "How accurate is the prediction?",
      answer: "Our model is built using established, anonymized datasets and proven machine learning techniques. While it provides a strong indication of risk, it is part of a broader picture of your health."
    }
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Contact form handlers
  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ email: '', subject: '', message: '' });
    setIsContactModalOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Modal a11y: focus trap + Esc close
  useEffect(() => {
    if (!isContactModalOpen) return;

    previouslyFocusedRef.current = document.activeElement;

    const dialog = modalRef.current;
    const focusableSelectors = [
      'a[href]', 'button', 'textarea', 'input', 'select',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const focusableEls = dialog ? Array.from(dialog.querySelectorAll(focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')) : [];

    // Focus the close button or first focusable
    const firstToFocus = closeButtonRef.current || focusableEls[0];
    if (firstToFocus) {
      firstToFocus.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeContactModal();
      } else if (e.key === 'Tab' && dialog) {
        // Trap focus within dialog
        const focusables = focusableEls.length ? focusableEls : Array.from(dialog.querySelectorAll(focusableSelectors));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isContactModalOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          {/* Organic flowing lines and pulse animations */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 1400 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true" focusable="false"
            >
              <defs>
                {/* Enhanced gradients for depth */}
                <linearGradient id="organic-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#008080" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFA07A" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#008080" stopOpacity="0.8" />
                </linearGradient>
                
                <linearGradient id="organic-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFA07A" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#008080" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFA07A" stopOpacity="0.7" />
                </linearGradient>

                <radialGradient id="pulse-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#008080" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#FFA07A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#008080" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              
              {/* Organic flowing curves */}
              <path
                d="M-100,300 Q200,150 500,300 T900,250 Q1200,200 1500,350 L1500,900 L-100,900 Z"
                fill="url(#organic-gradient-1)"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0;40,-20;0,0"
                  dur="25s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.9;0.6"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </path>
              
              {/* Secondary organic layer */}
              <path
                d="M-100,450 Q300,280 600,420 T1000,380 Q1300,340 1500,480 L1500,900 L-100,900 Z"
                fill="url(#organic-gradient-2)"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0;-35,15;0,0"
                  dur="30s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.4;0.7;0.4"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </path>
              
              {/* Gentle pulse circles */}
              <circle cx="200" cy="200" r="80" fill="url(#pulse-gradient)">
                <animate
                  attributeName="r"
                  values="80;120;80"
                  dur="15s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.1;0.3"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </circle>
              
              <circle cx="1100" cy="150" r="60" fill="url(#pulse-gradient)">
                <animate
                  attributeName="r"
                  values="60;100;60"
                  dur="18s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Flowing organic lines */}
              <path
                d="M100,100 Q400,200 700,150 T1200,200"
                stroke="url(#organic-gradient-1)"
                strokeWidth="3"
                fill="none"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,1000;0,1000"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </path>
              
              <path
                d="M1300,300 Q1000,400 700,350 T200,400"
                stroke="url(#organic-gradient-2)"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,800;800,800;0,800"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>

          {/* Enhanced floating particles with organic movement */}
          <div className="absolute inset-0 opacity-15" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full ${
                  i % 2 === 0 ? 'bg-primary-300' : 'bg-accent-300'
                }`}
                style={{
                  width: `${8 + Math.random() * 6}px`,
                  height: `${8 + Math.random() * 6}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `organic-float-${i % 3} ${8 + Math.random() * 4}s infinite ease-in-out`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-5 dark:bg-opacity-10 backdrop-blur-[0.5px]"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-gray-200 mb-6 leading-tight transition-colors duration-300">
              Predict Your Heart Health
              <span className="block text-primary-500 mt-2">
                with AI Precision
              </span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
              Gain valuable insights into your cardiovascular risk using our advanced, 
              data-driven prediction tool. Simple, secure, and takes only 2 minutes.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/assessment">
                <button className="btn-primary py-4 px-8 text-lg inline-flex items-center space-x-2">
                  <span>Start Assessment</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true" focusable="false"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
              
              {/* Conditional Dashboard Link */}
              {isAuthenticated() ? (
                <Link to="/dashboard">
                  <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300 inline-flex items-center space-x-2">
                    <span>Go to Your Dashboard</span>
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true" focusable="false"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
              ) : (
                <Link to="/demo-dashboard">
                  <button className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900 py-4 px-8 text-lg font-semibold rounded-xl transition-all duration-300 inline-flex items-center space-x-2">
                    <span>View Demo Dashboard</span>
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true" focusable="false"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Trust indicators */}
          <div
            className={`transition-all duration-1000 delay-700 transform ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mt-12 flex flex-wrap justify-center items-center space-x-8 text-neutral-500 dark:text-gray-400 text-sm transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Clinically Validated</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>2 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
              A Simple Path to Insight
            </h2>
            <p className="text-lg text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Get your heart health assessment in three easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-300">
                <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-gray-200 mb-3 transition-colors duration-300">
                1. Enter Your Metrics
              </h3>
              <p className="text-neutral-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                Provide a few key health indicators through our secure form. 
                All data is processed instantly and never stored.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 dark:group-hover:bg-accent-800 transition-colors duration-300">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-gray-200 mb-3 transition-colors duration-300">
                2. AI Analysis
              </h3>
              <p className="text-neutral-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                Our advanced machine learning model analyzes your data using 
                clinically validated algorithms in real-time.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors duration-300">
                <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-gray-200 mb-3 transition-colors duration-300">
                3. Get Results
              </h3>
              <p className="text-neutral-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                Receive your personalized risk assessment with actionable 
                insights to discuss with your healthcare provider.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-neutral-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
              Data-Driven, User-Focused
            </h2>
            <p className="text-lg text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Why thousands trust Cardio-AI for their heart health insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <motion.div 
              className="feature-card p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                Secure & Anonymous
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Your data is processed in real-time and never stored on our servers. 
                Your privacy is paramount.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="feature-card p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                Instant Results
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                No waiting. Our AI model provides your risk assessment immediately 
                after you submit your information.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="feature-card p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                Based on Research
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Our tool is built upon established medical research and validated 
                datasets for reliable insights.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              className="feature-card p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                Actionable Advice
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Understand the key factors influencing your score to facilitate 
                conversations with your doctor.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Find answers to common questions about our heart health prediction tool
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="border border-neutral-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-gray-700/20 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-gray-700 ${
                    activeAccordion === faq.id 
                      ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                      : 'bg-white dark:bg-gray-800 text-neutral-700 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-4 transition-colors duration-200 ${
                      activeAccordion === faq.id ? 'bg-primary-500' : 'bg-neutral-300'
                    }`}></div>
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </div>
                  <motion.svg
                    className="w-5 h-5 flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ 
                      rotate: activeAccordion === faq.id ? 180 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true" focusable="false"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </motion.svg>
                </button>

                {/* Answer Content */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeAccordion === faq.id ? "auto" : 0,
                    opacity: activeAccordion === faq.id ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="px-6 py-4 bg-neutral-50 border-t border-neutral-200"
                    initial={false}
                    animate={{
                      opacity: activeAccordion === faq.id ? 1 : 0
                    }}
                    transition={{ delay: activeAccordion === faq.id ? 0.1 : 0 }}
                  >
                    <p className="text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Help */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-neutral-600 mb-4">
              Still have questions? We're here to help.
            </p>
            <button 
              onClick={openContactModal}
              className="text-primary-500 hover:text-primary-600 font-semibold transition-colors duration-200 underline decoration-2 underline-offset-4"
            >
              Contact Our Support Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
              What Our Users Say
            </h2>
            <p className="text-lg text-neutral-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Hear from people who've already taken control of their heart health
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md dark:shadow-gray-700/20 transition-all duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              {/* Testimonial Content */}
              <div className="relative z-10">
                <p className="text-neutral-700 dark:text-gray-300 leading-relaxed mb-6 text-lg italic transition-colors duration-300">
                  "An incredibly insightful tool that made it easy to understand my health metrics. It's the perfect starting point for a conversation with my doctor."
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4 transition-colors duration-300">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-700 dark:text-gray-200 transition-colors duration-300">Priya S.</h4>
                    <p className="text-neutral-500 dark:text-gray-400 text-sm transition-colors duration-300">Ahmedabad</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md dark:shadow-gray-700/20 transition-all duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              {/* Testimonial Content */}
              <div className="relative z-10">
                <p className="text-neutral-700 dark:text-gray-300 leading-relaxed mb-6 text-lg italic transition-colors duration-300">
                  "Simple to use, fast, and secure. I appreciate the focus on data privacy while delivering such valuable information."
                </p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mr-4 transition-colors duration-300">
                    <span className="text-accent-600 dark:text-accent-400 font-semibold text-lg">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-700 dark:text-gray-200 transition-colors duration-300">Rohan M.</h4>
                    <p className="text-neutral-500 dark:text-gray-400 text-sm transition-colors duration-300">Surat</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-wrap justify-center items-center space-x-8 text-neutral-500 dark:text-gray-400 text-sm transition-colors duration-300">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Trusted by 10,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Data Privacy Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Us Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeContactModal}>
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 id="contact-modal-title" className="text-2xl font-bold text-neutral-800 dark:text-slate-200">
                Contact Support
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeContactModal}
                className="text-neutral-500 dark:text-slate-400 hover:text-neutral-700 dark:hover:text-slate-200 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                  Your Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleContactFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-slate-100 placeholder-neutral-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Subject Dropdown */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  value={contactForm.subject}
                  onChange={(e) => handleContactFormChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="technical-issue">Technical Issue</option>
                  <option value="general-question">General Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="account-issue">Account Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Text Area */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => handleContactFormChange('message', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-slate-100 placeholder-neutral-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Please describe your question or issue in detail..."
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="flex-1 px-6 py-3 border border-neutral-300 dark:border-slate-600 text-neutral-700 dark:text-slate-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default HomePage;
