import React from 'react';
import { motion } from 'framer-motion';

const ResourcesPage = () => {
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

  const resources = {
    articles: [
      {
        title: "Understanding Heart Disease Risk Factors",
        description: "Learn about the key factors that contribute to cardiovascular disease and how to manage them.",
        category: "Prevention",
        readTime: "8 min read",
        url: "#"
      },
      {
        title: "Heart-Healthy Diet Guidelines",
        description: "Comprehensive guide to nutrition for optimal heart health and disease prevention.",
        category: "Nutrition",
        readTime: "12 min read",
        url: "#"
      },
      {
        title: "Exercise and Cardiovascular Health",
        description: "Evidence-based recommendations for physical activity to improve heart health.",
        category: "Exercise",
        readTime: "10 min read",
        url: "#"
      }
    ],
    videos: [
      {
        title: "Heart Health Basics Explained",
        description: "An easy-to-understand overview of how your heart works and stays healthy.",
        duration: "15:30",
        category: "Education"
      },
      {
        title: "Simple Heart-Healthy Exercises",
        description: "Follow-along workout designed specifically for cardiovascular health.",
        duration: "22:45",
        category: "Exercise"
      },
      {
        title: "Cooking for Heart Health",
        description: "Learn to prepare delicious, heart-healthy meals with a professional chef.",
        duration: "18:20",
        category: "Nutrition"
      }
    ],
    tools: [
      {
        title: "Blood Pressure Tracker",
        description: "Monitor and track your blood pressure readings over time.",
        type: "Interactive Tool"
      },
      {
        title: "Heart Rate Calculator",
        description: "Calculate your target heart rate zones for optimal exercise.",
        type: "Calculator"
      },
      {
        title: "Risk Assessment Quiz",
        description: "Quick assessment to understand your cardiovascular risk level.",
        type: "Assessment"
      }
    ]
  };

  const externalLinks = [
    {
      title: "American Heart Association",
      description: "Leading organization for heart disease and stroke prevention",
      url: "https://www.heart.org"
    },
    {
      title: "Mayo Clinic - Heart Disease",
      description: "Comprehensive medical information about heart conditions",
      url: "https://www.mayoclinic.org/diseases-conditions/heart-disease"
    },
    {
      title: "CDC Heart Disease Resources",
      description: "Government resources for heart disease prevention and management",
      url: "https://www.cdc.gov/heartdisease"
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-slate-900 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-slate-200 mb-4">
            Heart Health Resources
          </h1>
          <p className="text-neutral-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
            Explore our comprehensive collection of articles, videos, tools, and expert resources 
            to help you maintain optimal cardiovascular health.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          
          {/* Educational Articles */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
              Educational Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.articles.map((article, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-slate-200 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-slate-400 text-xs">
                      {article.readTime}
                    </span>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Video Resources */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
              Video Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video bg-neutral-200 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-neutral-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-slate-200 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 text-sm mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-slate-400 text-xs">
                      {video.duration}
                    </span>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold text-sm">
                      Watch Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Interactive Tools */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
              Interactive Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.tools.map((tool, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {tool.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-slate-200 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 text-sm mb-4">
                    {tool.description}
                  </p>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                    Use Tool
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* External Resources */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
              Trusted External Resources
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
              <div className="space-y-4">
                {externalLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-neutral-800 dark:text-slate-200">
                        {link.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-slate-300 text-sm">
                        {link.description}
                      </p>
                    </div>
                    <button className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold">
                      Visit
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResourcesPage;
