import React from 'react';
import SignInForm from '../components/auth/SignInForm';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 px-4 py-12">
        <SignInForm />
      </main>
      
      <AppFooter />
    </div>
  );
};

export default SignInPage;