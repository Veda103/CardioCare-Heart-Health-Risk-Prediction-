import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import PredictionForm from '../ui/PredictionForm';
import ResultsDisplay from '../ui/ResultsDisplay';
import { useUser } from '../../contexts/UserContext';

const PredictionPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  
  const [predictionState, setPredictionState] = useState('initial'); // 'initial', 'loading', 'results', 'error'
  const [results, setResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAssessmentSubmit = async (data) => {
    setFormData(data);
    setPredictionState('loading');
    setErrorMessage('');
    
    console.log('🔍 Assessment data being submitted:', data);
    console.log('📊 Number of parameters:', Object.keys(data).length);
    
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      // Make API call to backend - wrap the form data in assessment_data object
      const response = await axios.post('http://localhost:5000/api/assessments', {
        assessment_data: data
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Handle successful response
      if (response.data && response.data.assessmentId) {
        // Extract the assessment ID from the response
        const assessmentId = response.data.assessmentId;
        
        console.log('Assessment saved successfully with ID:', assessmentId);
        
        // Show results briefly before redirecting to specific report
        const mockResults = {
          riskLevel: 'Assessment Saved',
          riskPercentage: 0,
          contributingFactors: [
            { factor: 'Personal Info', impact: 'Recorded', value: data.age ? `Age: ${data.age}` : 'Complete' },
            { factor: 'Lifestyle', impact: 'Recorded', value: data.smoking ? 'Smoking status recorded' : 'Complete' },
            { factor: 'Lab Results', impact: 'Recorded', value: data.cholesterol_level ? `Cholesterol: ${data.cholesterol_level}` : 'Complete' },
            { factor: 'Medical History', impact: 'Recorded', value: data.family_history ? 'Family history recorded' : 'Complete' }
          ],
          recommendations: [
            'Comprehensive assessment successfully saved to your profile',
            `All ${Object.keys(data).length} health parameters recorded`,
            `Redirecting to your detailed report (ID: ${assessmentId})...`
          ]
        };
        
        setResults(mockResults);
        setPredictionState('results');
        
        // Redirect to specific report page after 2 seconds
        setTimeout(() => {
          navigate(`/report/${assessmentId}`);
        }, 2000);
      } else {
        throw new Error('Assessment submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Assessment submission error:', error);
      setPredictionState('error');
      
      if (error.response) {
        // Server responded with error status
        const errorMsg = error.response.data?.message || 'Server error occurred';
        setErrorMessage(`Failed to save assessment: ${errorMsg}`);
        
        // If unauthorized, redirect to login
        if (error.response.status === 401) {
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } else if (error.request) {
        // Network error
        setErrorMessage('Unable to connect to server. Please check your connection and try again.');
      } else {
        // Other error
        setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setPredictionState('initial');
    setResults(null);
    setErrorMessage('');
    setFormData({});
  };

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
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-700 dark:text-slate-200 mb-4">
            Heart Health Assessment
          </h1>
          <p className="text-lg text-neutral-600 dark:text-slate-300 max-w-2xl mx-auto">
            Enter your health metrics below to receive a personalized cardiovascular risk assessment
          </p>
        </div>

        {/* Single-Column Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Form Section */}
          <div className="w-full">
            <PredictionForm 
              onSubmit={handleAssessmentSubmit}
              disabled={predictionState === 'loading'}
              initialData={formData}
            />
          </div>

          {/* Error Message */}
          {predictionState === 'error' && errorMessage && (
            <div className="w-full">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 dark:text-red-300 font-medium">
                    {errorMessage}
                  </p>
                </div>
                <button 
                  onClick={handleReset}
                  className="mt-3 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="w-full">
            <ResultsDisplay 
              state={predictionState}
              results={results}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-neutral-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Medical Disclaimer:</strong> This tool provides educational information only and is not intended 
            to replace professional medical advice, diagnosis, or treatment. Always consult with a qualified 
            healthcare provider regarding any medical concerns or before making health-related decisions.
          </p>
        </div>

        {/* Tooltip Component */}
        <Tooltip id="assessment-tooltip" className="custom-tooltip" />
      </div>
    </motion.div>
  );
};

export default PredictionPage;
