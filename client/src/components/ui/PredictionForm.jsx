import React, { useState } from 'react';

const PredictionForm = ({ onSubmit, disabled, initialData }) => {
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [showTooltips, setShowTooltips] = useState({});

  const tooltips = {
    // Tooltips will be added for new comprehensive health parameters
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation will be added for new comprehensive health parameters

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const showTooltip = (field) => {
    setShowTooltips(prev => ({ ...prev, [field]: true }));
  };

  const hideTooltip = (field) => {
    setShowTooltips(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-card p-8 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-neutral-700 dark:text-slate-200 mb-6 transition-colors duration-300">
        Your Health Metrics
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal & Biometric Section */}
        <fieldset className="border border-neutral-200 dark:border-slate-600 rounded-lg p-6 space-y-6">
          <legend className="text-lg font-semibold text-neutral-700 dark:text-slate-200 px-3 bg-white dark:bg-slate-800">
            Personal & Biometric
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Field */}
            <div className="relative">
              <label htmlFor="pf-age" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Age (years)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Please enter your current age in years. Age is a significant factor in cardiovascular risk assessment."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.age 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="Enter your age"
                min="18"
                max="120"
                disabled={disabled}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            {/* Gender Field */}
            <div className="relative">
              <label htmlFor="pf-gender" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Gender
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Biological sex assigned at birth. Gender affects cardiovascular risk patterns, with men typically having higher risk at younger ages."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-gender"
                value={formData.gender_Male || ''}
                onChange={(e) => handleInputChange('gender_Male', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.gender_Male 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender_Male && <p className="text-red-500 text-sm mt-1">{errors.gender_Male}</p>}
            </div>

            {/* Obesity Field */}
            <div className="relative">
              <label htmlFor="pf-obesity" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Obesity
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Indicates whether you are clinically classified as obese (BMI ≥30). Obesity is a major risk factor for heart disease."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-obesity"
                value={formData.obesity || ''}
                onChange={(e) => handleInputChange('obesity', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.obesity 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select obesity status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.obesity && <p className="text-red-500 text-sm mt-1">{errors.obesity}</p>}
            </div>

            {/* State Field */}
            <div className="relative">
              <label htmlFor="pf-state" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                State
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Your state of residence in India. Geographic location can influence health outcomes due to environmental factors and healthcare access."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-state"
                value={formData.state_name_encoded || ''}
                onChange={(e) => handleInputChange('state_name_encoded', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.state_name_encoded 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select your state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Ladakh">Ladakh</option>
              </select>
              {errors.state_name_encoded && <p className="text-red-500 text-sm mt-1">{errors.state_name_encoded}</p>}
            </div>
          </div>
        </fieldset>

        {/* Lifestyle Factors Section */}
        <fieldset className="border border-neutral-200 dark:border-slate-600 rounded-lg p-6 space-y-6">
          <legend className="text-lg font-semibold text-neutral-700 dark:text-slate-200 px-3 bg-white dark:bg-slate-800">
            Lifestyle Factors
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Smoking Field */}
            <div className="relative">
              <label htmlFor="pf-smoking" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Smoking
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Current or recent smoking status. Smoking significantly increases cardiovascular risk by damaging blood vessels and reducing oxygen in the blood."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-smoking"
                value={formData.smoking || ''}
                onChange={(e) => handleInputChange('smoking', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.smoking 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select smoking status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.smoking && <p className="text-red-500 text-sm mt-1">{errors.smoking}</p>}
            </div>

            {/* Alcohol Consumption Field */}
            <div className="relative">
              <label htmlFor="pf-alcohol" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Alcohol Consumption
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Regular alcohol consumption status. Excessive alcohol intake can lead to high blood pressure, heart failure, and increased cardiovascular risk."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-alcohol"
                value={formData.alcohol_consumption || ''}
                onChange={(e) => handleInputChange('alcohol_consumption', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.alcohol_consumption 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select alcohol consumption</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.alcohol_consumption && <p className="text-red-500 text-sm mt-1">{errors.alcohol_consumption}</p>}
            </div>

            {/* Physical Activity Field */}
            <div className="relative">
              <label htmlFor="pf-activity" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Physical Activity (hours per week)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Total hours of physical exercise per week. Regular physical activity strengthens the heart, improves circulation, and significantly reduces cardiovascular disease risk."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-activity"
                type="number"
                value={formData.physical_activity || ''}
                onChange={(e) => handleInputChange('physical_activity', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.physical_activity 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 5"
                min="0"
                max="168"
                step="0.5"
                disabled={disabled}
              />
              {errors.physical_activity && <p className="text-red-500 text-sm mt-1">{errors.physical_activity}</p>}
            </div>

            {/* Diet Score Field */}
            <div className="relative">
              <label htmlFor="pf-diet" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Diet Score (1-10)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Rate your diet quality from 1 (poor) to 10 (excellent). A heart-healthy diet rich in fruits, vegetables, whole grains, and lean proteins reduces cardiovascular risk."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-diet"
                type="number"
                value={formData.diet_score || ''}
                onChange={(e) => handleInputChange('diet_score', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.diet_score 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="Rate your diet (1-10)"
                min="1"
                max="10"
                disabled={disabled}
              />
              {errors.diet_score && <p className="text-red-500 text-sm mt-1">{errors.diet_score}</p>}
            </div>

            {/* Stress Level Field */}
            <div className="relative">
              <label htmlFor="pf-stress" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Stress Level (1-10)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Rate your average stress level from 1 (very low) to 10 (extremely high). Chronic stress can contribute to high blood pressure and heart disease."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-stress"
                type="number"
                value={formData.stress_level || ''}
                onChange={(e) => handleInputChange('stress_level', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.stress_level 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="Rate your stress (1-10)"
                min="1"
                max="10"
                disabled={disabled}
              />
              {errors.stress_level && <p className="text-red-500 text-sm mt-1">{errors.stress_level}</p>}
            </div>
          </div>
        </fieldset>

        {/* Vitals & Lab Results Section */}
        <fieldset className="border border-neutral-200 dark:border-slate-600 rounded-lg p-6 space-y-6">
          <legend className="text-lg font-semibold text-neutral-700 dark:text-slate-200 px-3 bg-white dark:bg-slate-800">
            Vitals & Lab Results
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cholesterol Level Field */}
            <div className="relative">
              <label htmlFor="pf-cholesterol" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Cholesterol Level (mg/dL)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Total cholesterol level in your blood. Normal: <200 mg/dL, Borderline: 200-239 mg/dL, High: ≥240 mg/dL. High cholesterol increases risk of heart disease and stroke."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-cholesterol"
                type="number"
                value={formData.cholesterol_level || ''}
                onChange={(e) => handleInputChange('cholesterol_level', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.cholesterol_level 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 200"
                min="100"
                max="600"
                disabled={disabled}
              />
              {errors.cholesterol_level && <p className="text-red-500 text-sm mt-1">{errors.cholesterol_level}</p>}
            </div>

            {/* Triglyceride Level Field */}
            <div className="relative">
              <label htmlFor="pf-triglyceride" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Triglyceride Level (mg/dL)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Triglycerides are a type of fat in your blood. Normal: <150 mg/dL, Borderline: 150-199 mg/dL, High: ≥200 mg/dL. High levels increase cardiovascular disease risk."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-triglyceride"
                type="number"
                value={formData.triglyceride_level || ''}
                onChange={(e) => handleInputChange('triglyceride_level', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.triglyceride_level 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 150"
                min="30"
                max="1000"
                disabled={disabled}
              />
              {errors.triglyceride_level && <p className="text-red-500 text-sm mt-1">{errors.triglyceride_level}</p>}
            </div>

            {/* LDL Level Field */}
            <div className="relative">
              <label htmlFor="pf-ldl" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                LDL Level (mg/dL)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Low-Density Lipoprotein or 'bad' cholesterol. Optimal: <100 mg/dL, Near optimal: 100-129 mg/dL, High: ≥160 mg/dL. LDL builds up in artery walls, causing blockages."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-ldl"
                type="number"
                value={formData.ldl_level || ''}
                onChange={(e) => handleInputChange('ldl_level', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.ldl_level 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 100"
                min="40"
                max="300"
                disabled={disabled}
              />
              {errors.ldl_level && <p className="text-red-500 text-sm mt-1">{errors.ldl_level}</p>}
            </div>

            {/* HDL Level Field */}
            <div className="relative">
              <label htmlFor="pf-hdl" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                HDL Level (mg/dL)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="High-Density Lipoprotein or 'good' cholesterol. Low risk: ≥60 mg/dL, Moderate: 40-59 mg/dL (men), 50-59 mg/dL (women). HDL helps remove bad cholesterol from arteries."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-hdl"
                type="number"
                value={formData.hdl_level || ''}
                onChange={(e) => handleInputChange('hdl_level', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.hdl_level 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 50"
                min="20"
                max="100"
                disabled={disabled}
              />
              {errors.hdl_level && <p className="text-red-500 text-sm mt-1">{errors.hdl_level}</p>}
            </div>

            {/* Systolic Blood Pressure Field */}
            <div className="relative">
              <label htmlFor="pf-systolic-bp" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Systolic Blood Pressure (mmHg)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="The top number in blood pressure reading (pressure when heart beats). Normal: <120 mmHg, Elevated: 120-129 mmHg, High: ≥130 mmHg. Measures force against artery walls."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-systolic-bp"
                type="number"
                value={formData.systolic_bp || ''}
                onChange={(e) => handleInputChange('systolic_bp', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.systolic_bp 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 120"
                min="70"
                max="250"
                disabled={disabled}
              />
              {errors.systolic_bp && <p className="text-red-500 text-sm mt-1">{errors.systolic_bp}</p>}
            </div>

            {/* Diastolic Blood Pressure Field */}
            <div className="relative">
              <label htmlFor="pf-diastolic-bp" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Diastolic Blood Pressure (mmHg)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="The bottom number in blood pressure reading (pressure when heart rests). Normal: <80 mmHg, Elevated: 80-89 mmHg, High: ≥90 mmHg. Measures resting pressure in arteries."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-diastolic-bp"
                type="number"
                value={formData.diastolic_bp || ''}
                onChange={(e) => handleInputChange('diastolic_bp', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.diastolic_bp 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 80"
                min="40"
                max="150"
                disabled={disabled}
              />
              {errors.diastolic_bp && <p className="text-red-500 text-sm mt-1">{errors.diastolic_bp}</p>}
            </div>
          </div>
        </fieldset>

        {/* Medical & Environmental Section */}
        <fieldset className="border border-neutral-200 dark:border-slate-600 rounded-lg p-6 space-y-6">
          <legend className="text-lg font-semibold text-neutral-700 dark:text-slate-200 px-3 bg-white dark:bg-slate-800">
            Medical & Environmental
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Family History Field */}
            <div className="relative">
              <label htmlFor="pf-family-history" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Family History of Heart Disease
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="History of heart disease in immediate family members (parents, siblings). Genetic factors can increase your cardiovascular risk by 2-3 times, especially if family members had early heart disease."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-family-history"
                value={formData.family_history || ''}
                onChange={(e) => handleInputChange('family_history', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.family_history 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select family history</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.family_history && <p className="text-red-500 text-sm mt-1">{errors.family_history}</p>}
            </div>

            {/* Air Pollution Exposure Field */}
            <div className="relative">
              <label htmlFor="pf-air-pollution" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Air Pollution Exposure (1-10)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Rate your exposure to air pollution from 1 (clean air) to 10 (heavily polluted). Long-term exposure to air pollution increases risk of heart disease, stroke, and cardiovascular mortality."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-air-pollution"
                type="number"
                value={formData.air_pollution_exposure || ''}
                onChange={(e) => handleInputChange('air_pollution_exposure', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.air_pollution_exposure 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="Rate exposure level (1-10)"
                min="1"
                max="10"
                disabled={disabled}
              />
              {errors.air_pollution_exposure && <p className="text-red-500 text-sm mt-1">{errors.air_pollution_exposure}</p>}
            </div>

            {/* Healthcare Access Field */}
            <div className="relative">
              <label htmlFor="pf-healthcare-access" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Healthcare Access
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Access to regular healthcare services and medical professionals. Good healthcare access enables early detection, prevention, and management of cardiovascular risk factors."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-healthcare-access"
                value={formData.healthcare_access || ''}
                onChange={(e) => handleInputChange('healthcare_access', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.healthcare_access 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select healthcare access</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.healthcare_access && <p className="text-red-500 text-sm mt-1">{errors.healthcare_access}</p>}
            </div>

            {/* Emergency Response Time Field */}
            <div className="relative">
              <label htmlFor="pf-emergency-response" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Emergency Response Time (minutes)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Average time for emergency medical services to reach your location. Faster response times (≤8 minutes) significantly improve survival rates for cardiac events."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-emergency-response"
                type="number"
                value={formData.emergency_response_time || ''}
                onChange={(e) => handleInputChange('emergency_response_time', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.emergency_response_time 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 15"
                min="1"
                max="120"
                disabled={disabled}
              />
              {errors.emergency_response_time && <p className="text-red-500 text-sm mt-1">{errors.emergency_response_time}</p>}
            </div>

            {/* Health Insurance Field */}
            <div className="relative">
              <label htmlFor="pf-health-insurance" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Health Insurance Status
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Health insurance coverage affects access to preventive care, medications, and medical procedures. Uninsured individuals have higher rates of cardiovascular disease complications."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <select
                id="pf-health-insurance"
                value={formData.health_insurance || ''}
                onChange={(e) => handleInputChange('health_insurance', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white transition-colors focus:outline-none ${
                  errors.health_insurance 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                disabled={disabled}
              >
                <option value="">Select insurance status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.health_insurance && <p className="text-red-500 text-sm mt-1">{errors.health_insurance}</p>}
            </div>

            {/* Annual Income Field */}
            <div className="relative">
              <label htmlFor="pf-annual-income" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                Annual Income (₹)
                <span 
                  data-tooltip-id="assessment-tooltip" 
                  data-tooltip-content="Annual household income affects access to healthy foods, exercise facilities, and healthcare services. Lower socioeconomic status is associated with increased cardiovascular risk."
                  className="cursor-help text-teal-500 ml-2 font-normal"
                >
                  (?)
                </span>
              </label>
              <input
                id="pf-annual-income"
                type="number"
                value={formData.annual_income || ''}
                onChange={(e) => handleInputChange('annual_income', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 transition-colors focus:outline-none ${
                  errors.annual_income 
                    ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
                    : 'border-neutral-200 dark:border-slate-600 focus:border-primary-500'
                }`}
                placeholder="e.g., 500000"
                min="0"
                max="100000000"
                disabled={disabled}
              />
              {errors.annual_income && <p className="text-red-500 text-sm mt-1">{errors.annual_income}</p>}
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={disabled}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
              disabled
                ? 'bg-neutral-300 dark:bg-slate-600 text-neutral-500 dark:text-slate-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {disabled ? 'Saving Assessment...' : 'Save Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
