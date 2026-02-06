import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ResultsSkeleton from './ResultsSkeleton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResultsDisplay = ({ state, results, onReset }) => {
  const { isDark } = useTheme();
  
  // State for sharing modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const shareDialogRef = useRef(null);
  const shareCloseBtnRef = useRef(null);
  const sharePrevFocusedRef = useRef(null);

  useEffect(() => {
    if (!isShareModalOpen) return;
    sharePrevFocusedRef.current = document.activeElement;

    const dialog = shareDialogRef.current;
    const focusableSelectors = [
      'a[href]', 'button', 'textarea', 'input', 'select',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    const getFocusable = () => Array.from(dialog.querySelectorAll(focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    const initialFocus = shareCloseBtnRef.current || getFocusable()[0];
    if (initialFocus) initialFocus.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsShareModalOpen(false);
      } else if (e.key === 'Tab' && dialog) {
        const focusables = getFocusable();
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
      if (sharePrevFocusedRef.current && sharePrevFocusedRef.current.focus) {
        sharePrevFocusedRef.current.focus();
      }
    };
  }, [isShareModalOpen]);
  
  // Enhanced Initial State Component
  const InitialState = () => (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-card dark:shadow-gray-700/20 p-8 h-full flex flex-col items-center justify-center text-center transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6 transition-colors duration-300"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </motion.div>
      <motion.h3 
        className="text-xl font-semibold text-neutral-700 dark:text-gray-200 mb-3 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Ready for Your Assessment
      </motion.h3>
      <motion.p 
        className="text-neutral-600 dark:text-gray-300 leading-relaxed max-w-sm transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Complete the form on the left and your personalized heart health results will appear here.
      </motion.p>
    </motion.div>
  );

  // Gauge Chart Component with animated needle
  const GaugeChart = ({ percentage, riskLevel }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;
    
    // Animate the gauge when component mounts
    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }, [percentage]);
    
    const getRiskColor = (level) => {
      switch(level.toLowerCase()) {
        case 'low risk': return '#10B981'; // green
        case 'moderate risk': return '#F59E0B'; // yellow
        case 'high risk': return '#EF4444'; // red
        default: return '#008080'; // primary teal
      }
    };

    return (
      <motion.div 
        className="relative w-48 h-48 mx-auto mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={getRiskColor(riskLevel)}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
        </svg>
        {/* Animated center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-3xl font-bold text-neutral-700 dark:text-gray-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {animatedPercentage}%
          </motion.span>
          <motion.span 
            className="text-sm text-neutral-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Risk Score
          </motion.span>
        </div>
      </motion.div>
    );
  };

  // Results State Component with enhanced animations
  const ResultsState = () => {
    if (!results) return null;

    const getRiskColorClass = (level) => {
      switch(level.toLowerCase()) {
        case 'low risk': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-200 dark:bg-green-900/20 dark:border-green-800';
        case 'moderate risk': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
        case 'high risk': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-900/20 dark:border-red-800';
        default: return 'text-primary-600 bg-primary-50 border-primary-200 dark:text-primary-200 dark:bg-primary-900/20 dark:border-primary-800';
      }
    };

    const getImpactColor = (impact) => {
      switch(impact.toLowerCase()) {
        case 'very low': return 'bg-green-100 text-green-800';
        case 'low': return 'bg-green-100 text-green-800';
        case 'moderate': return 'bg-yellow-100 text-yellow-800';
        case 'high': return 'bg-orange-100 text-orange-800';
        case 'very high': return 'bg-red-100 text-red-800';
        default: return 'bg-neutral-100 text-neutral-800';
      }
    };

    const handleGeneratePDF = () => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      let y = 20; // Initial y position for content
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Helper function to add page break if needed
      const checkPageBreak = (requiredSpace = 20) => {
        if (y + requiredSpace > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      // Helper function to add wrapped text
      const addText = (text, fontSize = 12, isBold = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) {
          pdf.setFont(undefined, 'bold');
        } else {
          pdf.setFont(undefined, 'normal');
        }
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
          checkPageBreak();
          pdf.text(line, margin, y);
          y += fontSize * 0.5; // Line height based on font size
        });
        y += 5; // Extra spacing after text block
      };

      // --- Page 1: Header and Results ---
      // Add header with logo space
      pdf.setFontSize(24);
      pdf.setFont(undefined, 'bold');
      pdf.text('Cardio Care', margin, y);
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'normal');
      pdf.text('AI-Powered Heart Health Report', margin, y + 8);
      y += 25;

      // Add assessment date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      addText(`Assessment Date: ${currentDate}`, 12);

      // Add divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 10;

      // Add main results
      addText('ASSESSMENT RESULTS', 18, true);
      
      if (results) {
        // Risk Level
        addText(`Risk Level: ${results.riskLevel || 'Not Available'}`, 14, true);
        addText(`Risk Score: ${results.riskScore || 'N/A'}/100`, 14);
        
        if (results.message) {
          addText('Assessment Summary:', 14, true);
          addText(results.message, 12);
        }
      }

      // Check if there's a chart to add
      const chartElement = document.getElementById('risk-history-chart');
      if (chartElement) {
        checkPageBreak(80); // Reserve space for chart
        
        html2canvas(chartElement, {
          scale: 2,
          backgroundColor: '#ffffff'
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = maxWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
          y += imgHeight + 15;
          
          continueWithRestOfPDF();
        });
      } else {
        continueWithRestOfPDF();
      }

      const continueWithRestOfPDF = () => {
        // --- Page 2: Recommendations and Next Steps ---
        checkPageBreak(40);
        addText('RECOMMENDATIONS & NEXT STEPS', 16, true);
        
        const recommendations = [
          'Schedule regular cardiovascular check-ups with your healthcare provider',
          'Maintain a balanced diet rich in fruits, vegetables, and whole grains',
          'Engage in regular physical activity (at least 150 minutes per week)',
          'Monitor your blood pressure and cholesterol levels regularly',
          'Avoid tobacco use and limit alcohol consumption',
          'Manage stress through relaxation techniques and adequate sleep'
        ];

        recommendations.forEach((rec, index) => {
          addText(`${index + 1}. ${rec}`, 11);
        });

        // --- Input Data Section ---
        checkPageBreak(40);
        addText('YOUR INPUT DATA', 16, true);
        
        // Get form data from results or use placeholder
        const inputData = results?.formData || {
          age: 'Not provided',
          gender: 'Not provided',
          systolicBP: 'Not provided',
          cholesterol: 'Not provided',
          maxHeartRate: 'Not provided',
          restingECG: 'Not provided'
        };

        Object.entries(inputData).forEach(([key, value]) => {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          addText(`${label}: ${value}`, 11);
        });

        // --- Medical Disclaimer ---
        checkPageBreak(60);
        addText('IMPORTANT MEDICAL DISCLAIMER', 14, true);
        
        const disclaimer = 'This assessment provides educational information only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding any medical concerns or before making health-related decisions. If you have concerns about your heart health, please contact your doctor immediately.';
        
        addText(disclaimer, 10);

        // Add footer
        y = pageHeight - 15;
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Generated by Cardio Care | ${currentDate}`, margin, y);
        pdf.text(`Page 1 of ${pdf.internal.getNumberOfPages()}`, pageWidth - margin - 20, y);

        // Save the PDF
        pdf.save('cardio-care-comprehensive-report.pdf');
      };
    };

    // Sharing functionality
    const handleShareWithDoctor = () => {
      setIsShareModalOpen(true);
      setShareLink('');
      setLinkCopied(false);
    };

    const handleGenerateSecureLink = async () => {
      setIsGeneratingLink(true);
      
      // Simulate API call to generate secure link
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock secure link with expiration
      const reportId = Math.random().toString(36).substring(2, 15);
      const secureLink = `https://cardiocare.app/secure-report/${reportId}?expires=72h`;
      
      setShareLink(secureLink);
      setIsGeneratingLink(false);
    };

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    };

    return (
      <motion.div 
        id="results-container"
        className="bg-white dark:bg-slate-800 rounded-xl shadow-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Risk Level Header */}
        <motion.div 
          className={`text-center p-4 rounded-lg border-2 mb-6 ${getRiskColorClass(results.riskLevel)}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-1"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Your Result: {results.riskLevel}
          </motion.h2>
          <motion.p 
            className="text-sm opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Based on your health metrics
          </motion.p>
        </motion.div>

        {/* Animated Gauge Chart */}
        <div id="risk-history-chart">
          <GaugeChart percentage={results.riskPercentage} riskLevel={results.riskLevel} />
        </div>

        {/* Animated Contributing Factors */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
            Contributing Factors
          </h3>
          <div className="space-y-3">
            {results.contributingFactors.map((factor, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 + (index * 0.1) }}
              >
                <div className="flex-1">
                  <span className="font-medium text-neutral-700 dark:text-gray-200 transition-colors duration-300">{factor.factor}</span>
                  <span className="text-sm text-neutral-500 dark:text-gray-400 ml-2 transition-colors duration-300">({factor.value})</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                  {factor.impact}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Recommendations */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-gray-200 mb-4 transition-colors duration-300">
            Recommendations
          </h3>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + (index * 0.1) }}
              >
                <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-600 dark:text-gray-300 text-sm transition-colors duration-300">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* New Recommendations & Next Steps Section */}
        <motion.div 
          className="mt-12 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          {/* Medical Disclaimer */}
          <motion.div
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.0 }}
          >
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-red-800 dark:text-red-200 font-bold text-sm mb-1 transition-colors duration-300">
                  Medical Disclaimer
                </p>
                <p className="text-slate-600 dark:text-red-300 text-sm leading-relaxed transition-colors duration-300">
                  <strong>This is not medical advice.</strong> Please consult with a healthcare professional to interpret these results and discuss your cardiovascular health.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section Header */}
          <motion.div
            className="flex items-center space-x-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 2.2 }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-blue-100 transition-colors duration-300">
              Recommendations & Next Steps
            </h3>
          </motion.div>

          {/* Content Area with Placeholder Recommendations */}
          <motion.div
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            <p className="text-slate-600 dark:text-blue-200 text-sm mb-4 transition-colors duration-300">
              Based on your assessment results, here are personalized next steps to help you maintain and improve your heart health:
            </p>
            
            <div className="space-y-3">
              {[
                {
                  icon: "🩺",
                  text: "Discuss your cholesterol and blood pressure levels with your doctor."
                },
                {
                  icon: "🥗",
                  text: "Explore resources on heart-healthy diets and lifestyle changes."
                },
                {
                  icon: "📅",
                  text: "Schedule a follow-up consultation to review your results."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 2.6 + (index * 0.1) }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-slate-600 dark:text-blue-100 text-sm font-medium transition-colors duration-300">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Export PDF Button */}
        </motion.div>

        {/* Enhanced Action Buttons with PDF Generation */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 mb-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.2 }}
        >
          <button
            onClick={onReset}
            className="flex-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-neutral-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            New Assessment
          </button>
          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Share Results
          </button>
        </motion.div>

        {/* Action Buttons - PDF and Share */}
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.4 }}
        >
          {/* PDF Export Button */}
          <button
            onClick={handleGeneratePDF}
            className="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export as PDF</span>
          </button>

          {/* Share with Doctor Button */}
          <button
            onClick={handleShareWithDoctor}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share with Doctor</span>
          </button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          className="mt-6 p-4 bg-neutral-50 dark:bg-gray-800 rounded-lg transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.6 }}
        >
          <p className="text-xs text-neutral-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
            <strong>Important:</strong> This assessment is for educational purposes only. 
            Please consult with your healthcare provider to discuss these results and your overall cardiovascular health.
          </p>
        </motion.div>

        {/* Share Modal */}
        <AnimatePresence>
          {isShareModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
            >
              <motion.div
                ref={shareDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-modal-title"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 id="share-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                    Share with Doctor
                  </h3>
                  <button
                    ref={shareCloseBtnRef}
                    onClick={() => setIsShareModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Generate a secure, private link to this report to share with your healthcare provider. 
                    The link will automatically expire in 72 hours.
                  </p>
                </div>

                {/* Generate Link Section */}
                {!shareLink ? (
                  <button
                    onClick={handleGenerateSecureLink}
                    disabled={isGeneratingLink}
                    className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isGeneratingLink ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Generating Secure Link...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span>Generate Secure Link</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Generated Link Display */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Secure Link (Expires in 72 hours):</p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 break-all font-mono">
                        {shareLink}
                      </p>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={handleCopyLink}
                      className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                        linkCopied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {linkCopied ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2z" />
                          </svg>
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Security Notice</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        This link is encrypted and will automatically expire. Only share with trusted healthcare providers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Render appropriate state with smooth transitions
  return (
    <AnimatePresence mode="wait">
      {state === 'loading' && (
        <motion.div key="loading" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
          <ResultsSkeleton />
        </motion.div>
      )}
      {state === 'results' && (
        <motion.div key="results" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
          <ResultsState />
        </motion.div>
      )}
      {state !== 'loading' && state !== 'results' && (
        <motion.div key="initial" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
          <InitialState />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsDisplay;
