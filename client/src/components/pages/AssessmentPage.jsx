import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AssessmentPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-slate-900 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-slate-200 mb-4">
            Heart Health Assessment
          </h1>
          <p className="text-neutral-600 dark:text-slate-300 text-lg">
            Take a comprehensive assessment to understand your cardiovascular health status.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          
          {/* Assessment Options */}
          <motion.section variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Quick Assessment */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-slate-200 mb-2">
                    Quick Assessment
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 mb-6">
                    Get a rapid heart health evaluation in just 5 minutes.
                  </p>
                  
                  <Link to="/prediction">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                      Start Quick Assessment
                    </button>
                  </Link>
                </div>
              </div>

              {/* Comprehensive Assessment */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-slate-200 mb-2">
                    Comprehensive Assessment
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 mb-6">
                    Complete detailed evaluation with lifestyle factors.
                  </p>
                  
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Assessment Info */}
          <motion.section variants={itemVariants}>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                What to Expect
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Answer Questions</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Provide information about your health metrics and lifestyle
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">AI Analysis</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Our AI analyzes your data using advanced algorithms
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Get Results</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Receive personalized insights and recommendations
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default AssessmentPage;
