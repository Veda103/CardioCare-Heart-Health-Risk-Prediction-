import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const DetailedReportPage = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('🔍 DetailedReportPage mounted with ID:', id);

  const parameterLabels = {
    age: 'Age',
    obesity: 'Obesity',
    smoking: 'Smoking',
    alcohol_consumption: 'Alcohol Consumption',
    physical_activity: 'Physical Activity (Hours/Week)',
    diet_score: 'Diet Score (1-10)',
    cholesterol_level: 'Cholesterol Level (mg/dL)',
    triglyceride_level: 'Triglyceride Level (mg/dL)',
    ldl_level: 'LDL Level (mg/dL)',
    hdl_level: 'HDL Level (mg/dL)',
    systolic_bp: 'Systolic BP (mmHg)',
    diastolic_bp: 'Diastolic BP (mmHg)',
    air_pollution_exposure: 'Air Pollution Exposure (1-10)',
    family_history: 'Family History of Heart Disease',
    stress_level: 'Stress Level (1-10)',
    healthcare_access: 'Healthcare Access',
    emergency_response_time: 'Emergency Response Time (Minutes)',
    annual_income: 'Annual Income',
    health_insurance: 'Health Insurance',
    state_name_encoded: 'State',
    gender_Male: 'Gender'
  };

  useEffect(() => {
    const fetchReport = async () => {
      // Use test ID if no ID provided (for debugging)
      const assessmentId = id || '1';
      
      if (!assessmentId) {
        console.log('❌ No ID provided in URL');
        setError('No assessment ID provided');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem('token');
        console.log('🔑 Token found:', !!token);
        console.log('🌐 Fetching assessment ID:', assessmentId);
        
        if (!token) {
          setError('No authentication token found. Please log in first.');
          setIsLoading(false);
          return;
        }
        
        const response = await axios.get(`http://localhost:5000/api/assessments/${assessmentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📋 Response received:', response.data);
        console.log('🔍 Assessment data:', response.data.assessment);
        
        if (response.data && response.data.assessment) {
          setReportData(response.data.assessment);
        } else {
          setError('Invalid response structure');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Error fetching report:', error);
        console.error('❌ Error details:', error.response?.data);
        
        if (error.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (error.response?.status === 404) {
          setError('Assessment not found. Please check the ID or create a new assessment.');
        } else if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_FAILED')) {
          setError('Server is not running. Please start the backend server on port 5000.');
        } else {
          setError(error.response?.data?.message || error.message || 'Failed to fetch report');
        }
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Report</h1>
          <p className="text-gray-600 dark:text-slate-300 mb-4">{error}</p>
          <div className="text-sm text-gray-500 dark:text-slate-400">
            <p>Report ID: {id || 'Not provided'}</p>
            <p>Check browser console for details</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">Loading Report</h2>
            <p className="text-gray-600 dark:text-slate-300">Please wait while we fetch your assessment data...</p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-4">Report ID: {id}</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">Check browser console for details</p>
          </div>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">Report Not Found</h1>
          <p className="text-gray-600 dark:text-slate-300">The requested assessment report could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-12">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Detailed Health Assessment Report
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive analysis of your health parameters and risk assessment
          </p>
        </div>

        {/* Key Metric Breakdown Section */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-6 border-b border-gray-200 dark:border-slate-700 pb-3">
            Key Metric Breakdown
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cholesterol Level */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                Total Cholesterol
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                {reportData.assessment_data?.cholesterol_level ? `${reportData.assessment_data.cholesterol_level} mg/dL` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-blue-500"
                  style={{ 
                    width: reportData.assessment_data?.cholesterol_level 
                      ? `${Math.min((reportData.assessment_data.cholesterol_level / 300) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300">
                Normal: &lt;200 mg/dL
              </div>
            </motion.div>

            {/* Triglyceride Level */}
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">
                Triglycerides
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                {reportData.assessment_data?.triglyceride_level ? `${reportData.assessment_data.triglyceride_level} mg/dL` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-purple-500"
                  style={{ 
                    width: reportData.assessment_data?.triglyceride_level 
                      ? `${Math.min((reportData.assessment_data.triglyceride_level / 400) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-300">
                Normal: &lt;150 mg/dL
              </div>
            </motion.div>

            {/* LDL Level */}
            <motion.div
              className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                LDL (Bad Cholesterol)
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100 mb-3">
                {reportData.assessment_data?.ldl_level ? `${reportData.assessment_data.ldl_level} mg/dL` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-red-500"
                  style={{ 
                    width: reportData.assessment_data?.ldl_level 
                      ? `${Math.min((reportData.assessment_data.ldl_level / 200) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-red-700 dark:text-red-300">
                Optimal: &lt;100 mg/dL
              </div>
            </motion.div>

            {/* HDL Level */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                HDL (Good Cholesterol)
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 mb-3">
                {reportData.assessment_data?.hdl_level ? `${reportData.assessment_data.hdl_level} mg/dL` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-green-500"
                  style={{ 
                    width: reportData.assessment_data?.hdl_level 
                      ? `${Math.min((reportData.assessment_data.hdl_level / 80) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                Good: &gt;40 mg/dL (M), &gt;50 mg/dL (F)
              </div>
            </motion.div>

            {/* Systolic BP */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="text-sm font-medium text-orange-800 dark:text-orange-300 mb-2">
                Systolic Blood Pressure
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3">
                {reportData.assessment_data?.systolic_bp ? `${reportData.assessment_data.systolic_bp} mmHg` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-orange-500"
                  style={{ 
                    width: reportData.assessment_data?.systolic_bp 
                      ? `${Math.min(((reportData.assessment_data.systolic_bp - 80) / 100) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-orange-700 dark:text-orange-300">
                Normal: &lt;120 mmHg
              </div>
            </motion.div>

            {/* Diastolic BP */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                Diastolic Blood Pressure
              </div>
              <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-3">
                {reportData.assessment_data?.diastolic_bp ? `${reportData.assessment_data.diastolic_bp} mmHg` : 'N/A'}
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mb-2">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-indigo-500"
                  style={{ 
                    width: reportData.assessment_data?.diastolic_bp 
                      ? `${Math.min(((reportData.assessment_data.diastolic_bp - 40) / 80) * 100, 100)}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <div className="text-xs text-indigo-700 dark:text-indigo-300">
                Normal: &lt;80 mmHg
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-6 border-b border-gray-200 dark:border-slate-700 pb-3">
            Risk Assessment Results
          </h2>
          
          {/* Responsive Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card A: Prediction Score with Visual Gauge */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-6 text-center">
                Cardiovascular Risk Assessment
              </h3>
              
              {/* Risk Category Badge */}
              <div className="flex justify-center mb-6">
                <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-md">
                  Moderate Risk
                </span>
              </div>
              
              {/* Visual Gauge Chart - Simplified Circular Progress */}
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  {/* Background Circle */}
                  <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-gray-200 dark:text-gray-600"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="35, 100"
                      className="text-orange-500"
                    />
                  </svg>
                  {/* Percentage Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-slate-200">
                      {reportData?.prediction_result ? 
                        `${(reportData.prediction_result.risk_score * 100).toFixed(0)}%` : 
                        '35%'
                      }
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Risk Score Label */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Prediction Score
              </p>
            </div>
            
            {/* Card B: Top 5 Influential Factors */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200 mb-6 text-center">
                Top 5 Influential Factors
              </h3>
              
              {/* Ranked List of Factors */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900 dark:text-slate-200">Smoking</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">High impact factor</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900 dark:text-slate-200">High Cholesterol</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Elevated levels detected</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900 dark:text-slate-200">Systolic BP</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Above normal range</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900 dark:text-slate-200">Age</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Age-related risk factor</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900 dark:text-slate-200">Family History</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Genetic predisposition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200 mb-6 border-b border-gray-200 dark:border-slate-700 pb-3">
            Report Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
                Assessment Date
              </div>
              <div className="text-lg text-gray-900 dark:text-slate-100">
                {reportData.created_at ? new Date(reportData.created_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
                Report ID
              </div>
              <div className="text-lg text-gray-900 dark:text-slate-100 font-mono">
                {reportData.assessment_id || 'N/A'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proceed to Dashboard Button */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link to="/dashboard">
            <motion.button
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Proceed to Dashboard</span>
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DetailedReportPage;