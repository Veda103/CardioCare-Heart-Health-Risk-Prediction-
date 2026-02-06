import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const AboutUsPage = () => {
  const { isDark } = useTheme();

  // Animation variants
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

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      bio: "Passionate about leveraging technology's transformative potential to improve lives and democratize access to critical health insights.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "Dr. A. Sharma",
      role: "Medical Advisor",
      bio: "With over 20 years of experience in cardiology, Dr. Sharma ensures our platform aligns with the highest standards of medical integrity and relevance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: "R. Patel",
      role: "Lead Data Scientist",
      bio: "R. Patel is the architect of our predictive model, specializing in machine learning for healthcare applications with a focus on accuracy and reliability.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const commitments = [
    {
      title: "Anonymity",
      description: "We process your health data in real-time to provide your assessment and do not store personally identifiable health information on our servers.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Transparency",
      description: "We believe in being open about how our technology works and its limitations, ensuring you understand exactly what our assessments can and cannot do.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "We are committed to providing a responsible and ethical tool that genuinely supports your health and well-being with the highest standards of medical integrity.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-neutral-50 dark:bg-slate-900 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-card dark:shadow-slate-700/20 p-8 transition-colors duration-300"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-neutral-800 dark:text-slate-200 mb-12 text-center transition-colors duration-300"
          >
            About Cardio Care
          </motion.h1>
          
          {/* Our Mission Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6 transition-colors duration-300">
              Our Mission: Empowering Proactive Heart Health
            </h2>
            <p className="text-lg text-neutral-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              At Cardio Care, our mission is simple yet profound: to empower individuals with the knowledge and insights 
              needed to take control of their cardiovascular health. We believe that the future of healthcare is proactive, 
              not just reactive. By leveraging the power of data and artificial intelligence, we provide an accessible tool 
              that helps you understand your heart health risks, facilitating more informed and meaningful conversations 
              with your healthcare provider.
            </p>
          </motion.section>

          {/* Our Vision Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6 transition-colors duration-300">
              Our Vision for a Healthier Tomorrow
            </h2>
            <p className="text-lg text-neutral-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              We envision a future where preventable heart disease is a thing of the past. Our goal is to be a trusted 
              partner in your health journey, offering a platform that not only predicts risk but also educates and 
              motivates positive lifestyle changes. We are committed to making advanced health insights simple, secure, 
              and available to everyone.
            </p>
          </motion.section>

          {/* The Technology Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6 transition-colors duration-300">
              The Technology Behind Cardio Care
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-neutral-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                Cardio Care is built upon a sophisticated machine learning model trained on a comprehensive, anonymized 
                dataset reflecting a wide range of health indicators. Our model analyzes key factors—from cholesterol 
                levels and blood pressure to lifestyle choices—to provide a personalized risk assessment.
              </p>
              
              {/* Important Disclaimer */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Important Disclaimer
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                      <strong>Cardio Care is an informational tool and is not a substitute for a medical diagnosis.</strong> 
                      The predictions provided are for educational purposes only. Always consult with a qualified healthcare 
                      professional for any health concerns or before making any decisions related to your health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Meet the Team Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-8 transition-colors duration-300">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-50 dark:bg-slate-700 rounded-xl p-6 text-center border border-neutral-200 dark:border-slate-600 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-slate-200 mb-2 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Our Commitment Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-slate-200 mb-6 transition-colors duration-300">
              Our Commitment to You
            </h2>
            <p className="text-lg text-neutral-600 dark:text-slate-300 leading-relaxed mb-8 transition-colors duration-300">
              Your privacy and the security of your data are the cornerstones of our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4 text-white">
                      {commitment.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 transition-colors duration-300">
                      {commitment.title}
                    </h3>
                  </div>
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed transition-colors duration-300">
                    {commitment.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUsPage;
