import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Static demo data for the risk history chart
const demoRiskHistoryData = [
  { date: 'Jan 2024', score: 35 },
  { date: 'Feb 2024', score: 32 },
  { date: 'Mar 2024', score: 34 },
  { date: 'Apr 2024', score: 28 },
  { date: 'May 2024', score: 25 },
];

// Static demo assessment data
const demoLatestAssessment = {
  prediction_result: {
    risk_level: 'Low',
    risk_score: 25
  },
  created_at: '2024-11-15T10:30:00Z'
};

const DemoDashboardPage = () => {
  const demoUserName = "Demo User";
  const [loading, setLoading] = useState(false); // No loading for demo
  const [error, setError] = useState(null);
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Dynamically import Recharts only when needed
  const [recharts, setRecharts] = useState(null);
  useEffect(() => {
    let isMounted = true;
    // Import after mount to avoid adding to initial bundle
    import('recharts').then(mod => {
      if (isMounted) setRecharts(mod);
    }).catch(() => {/* no-op */});
    return () => { isMounted = false; };
  }, []);

  const Chart = useMemo(() => {
    if (!recharts) return null;
    const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } = recharts;
    return function ChartInner() {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={demoRiskHistoryData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="opacity-30"
              stroke="currentColor"
            />
            <XAxis 
              dataKey="date" 
              className="text-neutral-600 dark:text-gray-300"
              stroke="currentColor"
            />
            <YAxis 
              className="text-neutral-600 dark:text-gray-300"
              stroke="currentColor"
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelStyle={{ color: '#374151' }}
              formatter={(value, name) => [`${value}%`, 'Risk Score']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#008080"
              strokeWidth={3}
              dot={{ fill: '#008080', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#008080', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    };
  }, [recharts]);

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                Demo Dashboard - This is a preview with sample data
              </p>
            </div>
            <Link 
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium underline"
            >
              Sign Up for Full Access
            </Link>
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-2">
            Welcome back, {demoUserName}!
          </h1>
          <p className="text-neutral-600 dark:text-gray-300">
            Here's an overview of your heart health journey.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          {/* Quick Actions Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-gray-700 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
                  Quick Actions
                </h3>
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-neutral-50 dark:bg-gray-700 rounded-lg p-4 opacity-50">
                  <p className="text-sm text-neutral-600 dark:text-gray-300 mb-3">
                    Take a new heart health assessment
                  </p>
                  <motion.button 
                    className="w-full btn-primary py-3 cursor-not-allowed opacity-50"
                    disabled
                  >
                    Start New Assessment (Demo)
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Latest Result Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-gray-700 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
                  Latest Result (Demo)
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {/* Risk Level */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Risk Level:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    {demoLatestAssessment.prediction_result.risk_level} Risk
                  </span>
                </div>
                
                {/* Risk Score */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Risk Score:</span>
                  <span className="text-neutral-800 dark:text-white font-medium">
                    {demoLatestAssessment.prediction_result.risk_score}%
                  </span>
                </div>
                
                {/* Assessment Date */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Assessment Date:</span>
                  <span className="text-neutral-800 dark:text-white font-medium">
                    {new Date(demoLatestAssessment.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-gray-700">
                <div className="w-full text-neutral-400 dark:text-gray-500 font-medium text-center cursor-not-allowed">
                  <span>Detailed Report (Demo Only)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Environmental Factors Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-gray-700 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
                  Environmental Factors
                </h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Air Quality:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    Moderate
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Pollen Count:</span>
                  <span className="text-neutral-800 dark:text-white font-medium">
                    Medium
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Temperature:</span>
                  <span className="text-neutral-800 dark:text-white font-medium">
                    24°C
                  </span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-orange-700 dark:text-orange-300 text-sm">
                  💡 Consider indoor activities during high pollution days
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Risk History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
              Risk History (Demo Data)
            </h3>
            <span className="text-sm text-neutral-500 dark:text-gray-400">
              Last 5 assessments
            </span>
          </div>
          
          <div className="h-80 w-full">
            {Chart ? <Chart /> : (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Create your account to access personalized health assessments and track your progress over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button 
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DemoDashboardPage;