import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import RevenueDashboard from './pages/RevenueDashboard';
import CsiDashboard from './pages/CsiDashboard';
import ComplaintsDashboard from './pages/ComplaintsDashboard';
import AdvisorPerformanceDashboard from './pages/AdvisorPerformanceDashboard';
import KpiDashboard from './pages/KpiDashboard';
import type { DashboardView } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<DashboardView>('revenue');

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render the active dashboard view
  const renderDashboard = () => {
    switch (activeView) {
      case 'revenue':
        return <RevenueDashboard />;
      case 'csi':
        return <CsiDashboard />;
      case 'complaints':
        return <ComplaintsDashboard />;
      case 'advisor-performance':
        return <AdvisorPerformanceDashboard />;
      case 'kpi':
        return <KpiDashboard />;
      default:
        return <RevenueDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <motion.main 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderDashboard()}
      </motion.main>
    </div>
  );
}

export default App;