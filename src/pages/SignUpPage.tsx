import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 px-4 py-12">
        <SignUpForm />
      </main>
      
      <AppFooter />
    </div>
  );
};

export default SignUpPage;