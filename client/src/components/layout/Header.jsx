import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-neutral-200 dark:border-slate-700 shadow-sm transition-colors duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-neutral-700 dark:text-white transition-colors duration-300">
              Cardio Care
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                  : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated() ? (
              // Navigation for authenticated users
              <>
                <Link 
                  to="/dashboard"
                  className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isActive('/dashboard') 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                      : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/resources"
                  className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isActive('/resources') 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                      : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                >
                  Resources
                </Link>
              </>
            ) : (
              // Navigation for public users
              <Link 
                to="/about"
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/about') 
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                    : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                About Us
              </Link>
            )}
            
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-gray-700 hover:bg-neutral-200 dark:hover:bg-gray-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
            
            {/* Authentication Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated() ? (
                // Authenticated user menu
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block">{user?.full_name || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                  
                  {/* User dropdown menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-neutral-200 dark:border-gray-700 py-2 z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-neutral-700 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-2 border-neutral-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                // Unauthenticated user links
                <>
                  <Link 
                    to="/login"
                    className="text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup"
                    className="btn-primary py-2 px-6"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-gray-700 hover:bg-neutral-200 dark:hover:bg-gray-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
            
            {!isAuthenticated() && (
              // Mobile Authentication Links for public users only
              <>
                <Link 
                  to="/login"
                  className="text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-2 py-1 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  className="btn-primary py-2 px-4 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="text-neutral-600 dark:text-gray-300 hover:text-neutral-700 dark:hover:text-white focus:outline-none focus:text-neutral-700 dark:focus:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={closeMenu}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                    : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-gray-700'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated() ? (
                // Mobile navigation for authenticated users
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive('/dashboard') 
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                        : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/resources"
                    onClick={closeMenu}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive('/resources') 
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                        : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Resources
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                // Mobile navigation for public users
                <>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive('/about') 
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900 dark:text-primary-400' 
                        : 'text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
