import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
} from 'recharts';
import { 
  Users, 
  Award, 
  TrendingUp, 
  BarChart2 
} from 'lucide-react';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { advisorPerformanceData } from '../data';

const AdvisorPerformanceDashboard: React.FC = () => {
  // Calculate averages
  const avgRsa = advisorPerformanceData.reduce((sum, advisor) => sum + advisor.rsa, 0) / advisorPerformanceData.length;
  const avgEw = advisorPerformanceData.reduce((sum, advisor) => sum + advisor.ew, 0) / advisorPerformanceData.length;
  const avgAlignment = advisorPerformanceData.reduce((sum, advisor) => sum + advisor.wheelAlignment, 0) / advisorPerformanceData.length;
  const avgBalancing = advisorPerformanceData.reduce((sum, advisor) => sum + advisor.balancing, 0) / advisorPerformanceData.length;
  
  // Sort advisors by performance
  const sortedByRsa = [...advisorPerformanceData].sort((a, b) => b.rsa - a.rsa);
  const sortedByEw = [...advisorPerformanceData].sort((a, b) => b.ew - a.ew);
  const sortedByAlignment = [...advisorPerformanceData].sort((a, b) => b.wheelAlignment - a.wheelAlignment);
  
  // Prepare data for radar chart
  const radarChartData = advisorPerformanceData.map(advisor => ({
    advisor: advisor.name.split(' ')[0], // First name only for chart clarity
    rsa: advisor.rsa,
    ew: advisor.ew,
    wheelAlignment: advisor.wheelAlignment / 10, // Scale down for better visualization
    balancing: advisor.balancing / 10, // Scale down for better visualization
    upselling: advisor.upselling / 20, // Scale down for better visualization
    satisfaction: advisor.customerSatisfaction / 20, // Scale down for better visualization
  }));
  
  // Prepare data for RSA & EW bar chart
  const rsaEwData = advisorPerformanceData.map(advisor => ({
    name: advisor.name.split(' ')[0], // First name only for chart clarity
    rsa: advisor.rsa,
    ew: advisor.ew,
  }));
  
  // Prepare data for wheel services chart
  const wheelServicesData = advisorPerformanceData.map(advisor => ({
    name: advisor.name.split(' ')[0], // First name only for chart clarity
    alignment: advisor.wheelAlignment,
    balancing: advisor.balancing,
  }));
  
  // Prepare data for customer satisfaction vs upselling chart
  const satisfactionUpsellData = advisorPerformanceData.map(advisor => ({
    name: advisor.name.split(' ')[0], // First name only for chart clarity
    satisfaction: advisor.customerSatisfaction,
    upselling: advisor.upselling,
  }));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-6">Service Advisor Performance</h1>
      </motion.div>
      
      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Service Advisors" 
          value={advisorPerformanceData.length} 
          icon={<Users className="text-primary-500" />}
          color="primary"
        />
        <StatCard 
          title="Avg. RSA Per Advisor" 
          value={avgRsa.toFixed(1)} 
          icon={<Award className="text-secondary-500" />}
          color="secondary"
        />
        <StatCard 
          title="Avg. EW Per Advisor" 
          value={avgEw.toFixed(1)} 
          icon={<TrendingUp className="text-success-500" />}
          color="success"
        />
        <StatCard 
          title="Avg. Wheel Alignment" 
          value={avgAlignment.toFixed(1)} 
          icon={<BarChart2 className="text-accent-500" />}
          color="accent"
        />
      </motion.div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">RSA & EW Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rsaEwData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rsa" name="RSA" fill="#8884d8" />
                <Bar dataKey="ew" name="EW" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Wheel Services Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={wheelServicesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="alignment" name="Wheel Alignment" fill="#8884d8" />
                <Bar dataKey="balancing" name="Wheel Balancing" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* More Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Advisor Performance Radar</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData[0]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                {advisorPerformanceData.slice(0, 4).map((advisor, index) => (
                  <Radar
                    key={advisor.name}
                    name={advisor.name.split(' ')[0]}
                    dataKey={(value, key) => {
                      const data = radarChartData[index];
                      return key === 'subject' ? key : data[key as keyof typeof data] as number;
                    }}
                    stroke={`hsl(${index * 45}, 70%, 50%)`}
                    fill={`hsl(${index * 45}, 70%, 50%)`}
                    fillOpacity={0.3}
                  />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Customer Satisfaction vs Upselling</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={satisfactionUpsellData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" domain={[60, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="right" dataKey="upselling" name="Upselling %" fill="#8884d8" />
                <Line yAxisId="left" type="monotone" dataKey="satisfaction" name="Customer Satisfaction" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Advisor Performance Table */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Service Advisor Performance Details</h2>
          <div className="flex items-center">
            <TrendingUp className="text-success-500 mr-2" size={18} />
            <span className="text-sm font-medium">Performance Metrics</span>
          </div>
        </div>
        
        <DataTable
          data={advisorPerformanceData}
          columns={[
            { header: 'Service Advisor', accessor: 'name' },
            { 
              header: 'RSA', 
              accessor: 'rsa',
              className: 'text-center'
            },
            { 
              header: 'EW', 
              accessor: 'ew',
              className: 'text-center'
            },
            { 
              header: 'Wheel Alignment', 
              accessor: 'wheelAlignment',
              className: 'text-center'
            },
            { 
              header: 'Wheel Balancing', 
              accessor: 'balancing',
              className: 'text-center'
            },
            { 
              header: 'Upselling %', 
              accessor: 'upselling',
              className: 'text-center'
            },
            { 
              header: 'Customer Satisfaction', 
              accessor: (row) => (
                <div className="flex items-center">
                  <span className={`font-medium ${
                    row.customerSatisfaction >= 90 ? 'text-success-500' :
                    row.customerSatisfaction >= 80 ? 'text-warning-500' : 'text-danger-500'
                  }`}>
                    {row.customerSatisfaction}%
                  </span>
                </div>
              ),
              className: 'text-center'
            },
          ]}
        />
      </motion.div>
    </motion.div>
  );
};

export default AdvisorPerformanceDashboard;