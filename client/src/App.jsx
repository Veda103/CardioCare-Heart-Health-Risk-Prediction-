import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
const HomePage = lazy(() => import('./components/pages/HomePage'));
const AssessmentPage = lazy(() => import('./components/pages/AssessmentPage'));
const PredictionPage = lazy(() => import('./components/pages/PredictionPage'));
const RealDashboardPage = lazy(() => import('./components/pages/RealDashboardPage'));
const DemoDashboardPage = lazy(() => import('./components/pages/DemoDashboardPage'));
const DetailedReportPage = lazy(() => import('./components/pages/DetailedReportPage'));
const ResourcesPage = lazy(() => import('./components/pages/ResourcesPage'));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage'));
const SignUpPage = lazy(() => import('./components/pages/SignUpPage'));
const AboutUsPage = lazy(() => import('./components/pages/AboutUsPage'));
const PrivacyPolicyPage = lazy(() => import('./components/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./components/pages/TermsOfServicePage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));
import CookieConsent from './components/ui/CookieConsent';

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="py-16 flex items-center justify-center"><div className="animate-spin h-8 w-8 rounded-full border-2 border-neutral-300 border-t-primary-500"></div></div>}>
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/demo-dashboard" element={<DemoDashboardPage />} />
              
              {/* Protected Routes */}
              <Route path="/assessment" element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              } />
              <Route path="/prediction" element={
                <ProtectedRoute>
                  <PredictionPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <RealDashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/report/:id" element={
                <ProtectedRoute>
                  <DetailedReportPage />
                </ProtectedRoute>
              } />
              <Route path="/report" element={
                <ProtectedRoute>
                  <DetailedReportPage />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;