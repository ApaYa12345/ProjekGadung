import React from 'react';
import CampusSelector from '../components/campus/CampusSelector';
import AppHeader from '../components/layout/AppHeader';

const CampusSelectionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 px-4 py-12">
        <CampusSelector />
      </main>
    </div>
  );
};

export default CampusSelectionPage;