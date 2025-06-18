import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  UserCheck, 
  AlertCircle, 
  Users, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import type { DashboardView } from '../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  activeView, 
  setActiveView 
}) => {
  const sidebarVariants = {
    open: { width: '250px', transition: { duration: 0.3 } },
    closed: { width: '64px', transition: { duration: 0.3 } }
  };

  const textVariants = {
    open: { opacity: 1, display: 'block', transition: { delay: 0.1 } },
    closed: { opacity: 0, display: 'none', transition: { duration: 0.1 } }
  };

  const navItems = [
    { 
      id: 'revenue', 
      label: 'Revenue Dashboard', 
      icon: <BarChart3 size={20} />, 
      view: 'revenue' as DashboardView 
    },
    { 
      id: 'csi', 
      label: 'CSI & CCPT', 
      icon: <UserCheck size={20} />, 
      view: 'csi' as DashboardView 
    },
    { 
      id: 'complaints', 
      label: 'PSF Complaints', 
      icon: <AlertCircle size={20} />, 
      view: 'complaints' as DashboardView 
    },
    { 
      id: 'advisor-performance', 
      label: 'Advisor Performance', 
      icon: <Users size={20} />, 
      view: 'advisor-performance' as DashboardView 
    },
    { 
      id: 'kpi', 
      label: 'KPI Tracker', 
      icon: <LayoutDashboard size={20} />, 
      view: 'kpi' as DashboardView 
    }
  ];

  return (
    <motion.div 
      className="h-screen bg-white shadow-md flex flex-col"
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      initial={isOpen ? 'open' : 'closed'}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2" 
          variants={textVariants}
          animate={isOpen ? 'open' : 'closed'}
          initial={isOpen ? 'open' : 'closed'}
        >
          <span className="font-semibold text-lg">Service Center</span>
        </motion.div>
        <button 
          className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="flex flex-col p-2 gap-1 flex-1">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.view ? 'active' : ''}`}
            onClick={() => setActiveView(item.view)}
          >
            {item.icon}
            <motion.span
              variants={textVariants}
              animate={isOpen ? 'open' : 'closed'}
              initial={isOpen ? 'open' : 'closed'}
            >
              {item.label}
            </motion.span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <motion.div
          variants={textVariants}
          animate={isOpen ? 'open' : 'closed'}
          initial={isOpen ? 'open' : 'closed'}
          className="text-xs text-gray-500"
        >
          MG Service Dashboard v1.0
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;