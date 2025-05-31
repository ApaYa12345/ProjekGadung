import React from 'react';
import PasswordRecoveryForm from '../components/auth/PasswordRecoveryForm';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';

const PasswordRecoveryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 px-4 py-12">
        <PasswordRecoveryForm />
      </main>
      
      <AppFooter />
    </div>
  );
};

export default PasswordRecoveryPage;