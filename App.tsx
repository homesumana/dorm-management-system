
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoomManagement from './components/RoomManagement';
import TenantManagement from './components/TenantManagement';
import Billing from './components/Billing';
import Maintenance from './components/Maintenance';
import { useDormData } from './hooks/useDormData';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const dormData = useDormData();

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard {...dormData} />;
      case View.Rooms:
        return <RoomManagement {...dormData} />;
      case View.Tenants:
        return <TenantManagement {...dormData} />;
      case View.Billing:
        return <Billing {...dormData} />;
      case View.Maintenance:
        return <Maintenance {...dormData} />;
      default:
        return <Dashboard {...dormData} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
