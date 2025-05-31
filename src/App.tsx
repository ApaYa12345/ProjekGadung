import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import SplashPage from './pages/SplashPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import CampusSelectionPage from './pages/CampusSelectionPage';
import DashboardPage from './pages/DashboardPage';
import AccommodationsPage from './pages/AccommodationsPage';
import RestaurantsPage from './pages/RestaurantsPage';
import ClinicsPage from './pages/ClinicsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<PasswordRecoveryPage />} />
      <Route path="/campus-select" element={<CampusSelectionPage />} />
      <Route path="/dashboard/:campusId" element={<DashboardPage />} />
      <Route path="/accommodations/:campusId" element={<AccommodationsPage />} />
      <Route path="/restaurants/:campusId" element={<RestaurantsPage />} />
      <Route path="/clinics/:campusId" element={<ClinicsPage />} />
      
      {/* Redirect any unmatched routes to home */}
      <Route path="*" element={<Navigate to="/\" replace />} />
    </Routes>
  );
}

export default App;