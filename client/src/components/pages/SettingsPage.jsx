import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../contexts/UserContext';

const SettingsPage = () => {
  const { user, updateUserProfile } = useUser();
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  // Update form when user data changes
  React.useEffect(() => {
    if (user) {
      setProfileForm({
        full_name: user.full_name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleProfileChange = (field, value) => {
    setProfileForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user starts typing
    setUpdateMessage('');
    setUpdateError('');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMessage('');
    setUpdateError('');

    try {
      await updateUserProfile(profileForm);
      setUpdateMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      setUpdateError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-slate-200 mb-4">
            Settings
          </h1>
          <p className="text-neutral-600 dark:text-slate-300 text-lg">
            Customize your Cardio Care experience and manage your preferences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          
          {/* Profile Information Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
                Profile Information
              </h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Success Message */}
                {updateMessage && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        {updateMessage}
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {updateError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-700 dark:text-red-300 font-medium">
                        {updateError}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="full_name"
                      type="text"
                      value={profileForm.full_name}
                      onChange={(e) => handleProfileChange('full_name', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 border-neutral-200 dark:border-slate-600 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                      required
                      disabled={isUpdating}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-400 border-neutral-200 dark:border-slate-600 focus:border-primary-500 focus:outline-none transition-colors"
                      placeholder="Enter your email address"
                      required
                      disabled={isUpdating}
                    />
                  </div>
                </div>

                {/* Update Button */}
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={isUpdating || (!profileForm.full_name.trim() || !profileForm.email.trim())}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isUpdating || (!profileForm.full_name.trim() || !profileForm.email.trim())
                        ? 'bg-neutral-300 dark:bg-slate-600 text-neutral-500 dark:text-slate-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                    whileHover={!isUpdating ? { scale: 1.02 } : {}}
                    whileTap={!isUpdating ? { scale: 0.98 } : {}}
                  >
                    {isUpdating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      'Update Profile'
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.section>
          
          {/* Notification Settings */}
          <motion.section variants={itemVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                      Assessment Reminders
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm">
                      Get reminded to take regular health assessments
                    </p>
                  </div>
                  
                  <button role="switch" aria-checked={true} className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors duration-200" onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                      Health Tips
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm">
                      Receive personalized health tips and insights
                    </p>
                  </div>
                  
                  <button role="switch" aria-checked={false} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200" onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Privacy Settings */}
          <motion.section variants={itemVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
                Privacy & Data
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                      Data Sharing
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm">
                      Share anonymized data to improve our services
                    </p>
                  </div>
                  
                  <button role="switch" aria-checked={false} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200" onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-1" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                      Analytics
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm">
                      Help us improve the app with usage analytics
                    </p>
                  </div>
                  
                  <button role="switch" aria-checked={true} className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600 transition-colors duration-200" onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); }}>
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Account Settings */}
          <motion.section variants={itemVariants}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-neutral-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6">
                Account
              </h2>
              
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-neutral-50 dark:bg-slate-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                    Export Data
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 text-sm">
                    Download a copy of your health data
                  </p>
                </button>

                <button className="w-full text-left p-4 bg-neutral-50 dark:bg-slate-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <h3 className="text-lg font-medium text-neutral-800 dark:text-slate-200">
                    Delete Account
                  </h3>
                  <p className="text-neutral-600 dark:text-slate-300 text-sm">
                    Permanently delete your account and all data
                  </p>
                </button>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
