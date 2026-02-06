import React from 'react';
import { motion } from 'framer-motion';

const ResultsSkeleton = () => {
  // Shimmer animation variants
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  };

  const shimmerTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  };

  // Skeleton item component with shimmer effect
  const SkeletonItem = ({ className, delay = 0 }) => (
    <div className={`relative bg-neutral-200 dark:bg-gray-700 rounded overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        transition={{ ...shimmerTransition, delay }}
      />
    </div>
  );

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-card dark:shadow-gray-700/20 p-8 h-full transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Header Section Skeleton */}
        <div className="text-center mb-8">
          {/* Title skeleton */}
          <SkeletonItem className="h-8 w-3/4 mx-auto mb-4" delay={0.1} />
          
          {/* Subtitle skeleton */}
          <SkeletonItem className="h-4 w-1/2 mx-auto mb-2" delay={0.2} />
          <SkeletonItem className="h-4 w-2/3 mx-auto" delay={0.3} />
        </div>

        {/* Gauge Chart Skeleton */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="relative">
            {/* Main gauge circle */}
            <SkeletonItem className="w-48 h-48 rounded-full" delay={0.4} />
            
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SkeletonItem className="w-24 h-24 rounded-full" delay={0.5} />
            </div>
            
            {/* Score text skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <SkeletonItem className="h-6 w-16 mx-auto mb-2" delay={0.6} />
                <SkeletonItem className="h-4 w-12 mx-auto" delay={0.7} />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Level Badge Skeleton */}
        <div className="flex justify-center mb-6">
          <SkeletonItem className="h-8 w-32 rounded-full" delay={0.8} />
        </div>

        {/* Content Sections Skeleton */}
        <div className="space-y-6">
          {/* Key Factors Section */}
          <div>
            <SkeletonItem className="h-6 w-40 mb-4" delay={0.9} />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <SkeletonItem className="w-4 h-4 rounded-full" delay={1 + i * 0.1} />
                  <SkeletonItem className="h-4 flex-1" delay={1 + i * 0.1 + 0.05} />
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div>
            <SkeletonItem className="h-6 w-48 mb-4" delay={1.3} />
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonItem className="h-4 w-full" delay={1.4 + i * 0.1} />
                  <SkeletonItem className="h-4 w-4/5" delay={1.4 + i * 0.1 + 0.05} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-neutral-200 dark:border-gray-600">
          <SkeletonItem className="h-12 flex-1 rounded-lg" delay={1.6} />
          <SkeletonItem className="h-12 flex-1 rounded-lg" delay={1.7} />
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center mt-6">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress text */}
        <motion.p
          className="text-center text-sm text-neutral-500 dark:text-gray-400 mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyzing your health data...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ResultsSkeleton;
