import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProjectManagement } from './components/ProjectManagement';
import { PozList } from './components/PozList';
import { AutoMetrajCalculator } from './components/AutoMetrajCalculator';
import { ProgressTracking } from './components/ProgressTracking';
import { ProgressReports } from './components/ProgressReports';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectManagement />;
      case 'poz-list':
        return <PozList />;
      case 'auto-metraj':
        return <AutoMetrajCalculator />;
      case 'progress':
        return <ProgressTracking />;
      case 'reports':
        return <ProgressReports />;
      case 'settings':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900">Ayarlar</h2>
            <p className="text-gray-600 mt-4">Bu bölüm yakında gelecek...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;