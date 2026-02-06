import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

// Process assessments data for the risk history chart
const processChartData = (assessments) => {
  if (!assessments || assessments.length === 0) return [];
  
  return assessments
    .filter(assessment => assessment.prediction_result && assessment.prediction_result.risk_score !== undefined)
    .map(assessment => ({
      date: new Date(assessment.created_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      }),
      score: Math.round(assessment.prediction_result.risk_score * 100), // Convert to percentage
      originalDate: assessment.created_at
    }))
    .sort((a, b) => new Date(a.originalDate) - new Date(b.originalDate)); // Sort by date
};

const RealDashboardPage = () => {
  const { user } = useUser();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user assessments on component mount
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:5000/api/assessments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setAssessments(response.data.assessments);
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setError('Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  // Get the latest assessment for display
  const latestAssessment = assessments.length > 0 ? assessments[0] : null;
  
  // Create risk history data from assessments
  const riskHistoryData = useMemo(() => {
    if (assessments.length === 0) {
      // Fallback placeholder data
      return [
        { date: 'Jan 2024', score: 35 },
        { date: 'Feb 2024', score: 32 },
        { date: 'Mar 2024', score: 34 },
        { date: 'Apr 2024', score: 28 },
        { date: 'May 2024', score: 25 },
      ];
    }

    return assessments
      .slice(0, 5) // Last 5 assessments
      .reverse() // Show chronologically
      .map((assessment, index) => ({
        date: new Date(assessment.created_at).toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        }),
        score: assessment.prediction_result.risk_score || 25
      }));
  }, [assessments]);

  const userName = user?.full_name || user?.name || "User";
  
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
    
    // Process the assessments data for the chart
    const chartData = processChartData(assessments);
    
    return function ChartInner() {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
              labelFormatter={(label) => `Assessment: ${label}`}
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
  }, [recharts, assessments]);

  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2">
            Welcome Back, {userName}!
          </h1>
          <p className="text-neutral-600 dark:text-gray-300 text-lg">
            Track your heart health journey and stay on top of your wellness goals.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          
          {/* Start New Assessment - Primary Action */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">
                  Ready for your next assessment?
                </h2>
                <p className="text-primary-100 mb-6">
                  Take a quick assessment to monitor your heart health and get personalized insights.
                </p>
                <Link to="/predict">
                  <motion.button
                    className="bg-white text-primary-600 hover:bg-gray-50 py-3 px-8 text-lg font-semibold rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start New Assessment
                  </motion.button>
                </Link>
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
                  Latest Result
                </h3>
                <div className={`w-3 h-3 rounded-full ${latestAssessment ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              ) : latestAssessment ? (
                <div className="space-y-4">
                  {/* Risk Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-gray-300">Risk Level:</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        latestAssessment.prediction_result.risk_level === 'Low' 
                          ? 'bg-green-500'
                          : latestAssessment.prediction_result.risk_level === 'Moderate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}></div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        latestAssessment.prediction_result.risk_level === 'Low' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : latestAssessment.prediction_result.risk_level === 'Moderate'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {latestAssessment.prediction_result.risk_level} Risk
                      </span>
                    </div>
                  </div>
                  
                  {/* Risk Score */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-gray-300">Risk Score:</span>
                    <span className="text-neutral-800 dark:text-white font-medium">
                      {latestAssessment.prediction_result.risk_score}%
                    </span>
                  </div>
                  
                  {/* Assessment Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-gray-300">Assessment Date:</span>
                    <span className="text-neutral-800 dark:text-white font-medium">
                      {new Date(latestAssessment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-neutral-600 dark:text-gray-300 text-sm mb-4">No assessments yet</p>
                  <Link to="/assessment">
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                      Take Your First Assessment
                    </button>
                  </Link>
                </div>
              )}
              
              {latestAssessment && (
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-gray-700">
                  <Link to="/report" className="w-full text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 flex items-center justify-center">
                    <span>View Detailed Report</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Location-Based Environmental Factors Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-gray-700 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">
                  Environmental Factors for Gujarat
                </h3>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {/* Air Pollution Exposure */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600 dark:text-gray-300">Air Pollution Exposure:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                      Moderate
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-gray-700">
                <p className="text-sm text-neutral-600 dark:text-gray-300 leading-relaxed">
                  Air quality can be a significant factor in cardiovascular health. Learn more about local initiatives in our Resource Hub.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Risk History Chart - Main Feature */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-neutral-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">
                  Your Risk History
                </h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-gray-300">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <span>Risk Score Trend</span>
                </div>
              </div>
              
              {riskHistoryData && riskHistoryData.length > 0 ? (
                <div className="h-80">
                  {Chart ? <Chart /> : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500 dark:text-gray-400">
                      Loading chart...
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-primary-600 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                      Track Your Health Journey
                    </h4>
                    <p className="text-neutral-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Complete multiple assessments to see your risk trends over time and monitor your cardiovascular health progress.
                    </p>
                    <Link to="/assessment">
                      <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white font-medium rounded-xl hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                        <span>Take Assessment</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default RealDashboardPage;
