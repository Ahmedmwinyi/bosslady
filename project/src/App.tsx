import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import ApplicationReview from './pages/ApplicationReview';
import UserManagement from './pages/UserManagement';
import './App.css';
import Guidelines from './pages/Guidelines';
import DepartmentApplication from './pages/DepartmentApplication';
import SchoolApplications from './pages/SchoolApplications';
import PendingReviews from './pages/PendingReviews';
import FinalDecisions from './pages/FinalDecisions';
import ApprovedApplications from './pages/ApprovedApplications';
import AllApplications from './pages/AllApplications';
import HRReports from './pages/HRReports';
import PromotionHistory from './pages/PromotionHistory';
import NotificationScreen from './pages/NotificationScreen';
import SchoolManagement from './pages/SchoolManagement';
import DepartmentManagement from './pages/DepartmentManagement';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header Spacer */}
        <div className="h-16 lg:hidden"></div>
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/review/:id" element={<ApplicationReview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/my-applications" element={<Dashboard />} />
            <Route path="/pending-reviews" element={<PendingReviews />} />
            <Route path="/department-applications" element={<DepartmentApplication />} />
            <Route path="/school-applications" element={<SchoolApplications />} />
            <Route path="/final-decisions" element={<FinalDecisions />} />
            <Route path="/approved-applications" element={<ApprovedApplications />} />
            <Route path="/all-applications" element={<AllApplications />} />
            <Route path="/reports" element={<HRReports />} />
            <Route path="/promotion-history" element={<PromotionHistory />} />
            <Route path="/notifications" element={<NotificationScreen />} />
            <Route path="/departments" element={<DepartmentManagement />} />
            <Route path="/schools" element={<SchoolManagement />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <Router>
          <AppContent />
        </Router>
      </ApplicationProvider>
    </AuthProvider>
  );
}

export default App;