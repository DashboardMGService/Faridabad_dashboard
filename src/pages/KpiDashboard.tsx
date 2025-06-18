import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';
import { 
  TrendingUp,
  Calendar, 
  Target,
  Activity,
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';

import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { kpiDataByYear, type MonthlyKpi } from '../data/kpiDashboardData';
import MultivariateChart from '../components/MultivariateChart';
import PredictionsSection, { TransformedPredictionDataForChart } from '../components/PredictionsSection'; // Import the new component and its data type
import { yearOnYearComparisonData as predictionSourceData, PredictedMonthlyComparisonData } from '../data/kpiCardData'; // Import prediction data source and its original type

const KpiDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [activeAnalysis, setActiveAnalysis] = useState(0);

  const availableYears = useMemo(() => {
    return Object.keys(kpiDataByYear).map(Number).sort((a, b) => b - a);
  }, []);

  const { dataForSelectedYear, availableMonths } = useMemo(() => {
    const yearlyData = kpiDataByYear[selectedYear] || [];
    const months = ['All', ...yearlyData.map(d => d.month)];
    return { dataForSelectedYear: yearlyData, availableMonths: months };
  }, [selectedYear]);

  const filteredData = useMemo(() => {
    if (selectedMonth === 'All') {
      return dataForSelectedYear;
    }
    return dataForSelectedYear.filter(d => d.month === selectedMonth);
  }, [selectedMonth, dataForSelectedYear]);

  // Get latest month data for the selected year
  const latestMonth = filteredData.length > 0 ? filteredData[filteredData.length - 1] : (dataForSelectedYear.length > 0 ? dataForSelectedYear[dataForSelectedYear.length - 1] : { month: '', mechRo: 0, bpRo: 0, accessoriesRo: 0, partsRevenue: 0, labourRevenue: 0, csi: 0});

  
  // Calculate achievement percentages
  const mechRoAchievement = (latestMonth.mechRo / 1200) * 100;
  const bpRoAchievement = (latestMonth.bpRo / 200) * 100;
  const accessoriesRoAchievement = (latestMonth.accessoriesRo / 50) * 100;
  const partsRevenueAchievement = ((latestMonth.partsRevenue || 0) / 170) * 100;
  const labourRevenueAchievement = ((latestMonth.labourRevenue || 0) / 65) * 100;

  // New Revenue Target Calculations
  const partsRevenueTarget = 170;
  const labourRevenueTarget = 65;
  const totalRevenueTarget = partsRevenueTarget + labourRevenueTarget;
  const currentTotalRevenue = (latestMonth.partsRevenue || 0) + (latestMonth.labourRevenue || 0);
  const totalRevenueAchievement = totalRevenueTarget > 0 ? (currentTotalRevenue / totalRevenueTarget) * 100 : 0;
  const revenueGap = totalRevenueTarget - currentTotalRevenue;
  const dailyRunRate = revenueGap > 0 ? revenueGap / 30 : 0;
  
  // Prepare data for the charts
  const kpiTimeframeData = filteredData.map(month => ({
    date: month.month,
    mechRo: month.mechRo,
    mechTarget: 1200,
    bpRo: month.bpRo,
    bpTarget: 200,
    accessoriesRo: month.accessoriesRo,
    accessoriesTarget: 50,
  }));
  
  // Prepare data for CSI trend chart
  const csiTrendData = filteredData.map(month => ({
    date: month.month,
    csi: month.csi,
    target: 875,
  }));
  

  
  const analyses = [
    { title: 'RO Performance Analysis', x: 'mechRo', y: 'bpRo', z: 'accessoriesRo' },
    { title: 'Revenue vs. CSI Analysis', x: 'partsRevenue', y: 'labourRevenue', z: 'csi' },
    { title: 'Customer Metrics Analysis', x: 'csi', y: 'mgNps', z: 'mechRo' },
  ];
  
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

  // Transform prediction data for the PredictionsSection chart
  const transformedPredictionData = useMemo((): TransformedPredictionDataForChart[] => {
    // Filter for months from April to September for a focused view including predictions
    const relevantMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    return predictionSourceData
      .filter(item => relevantMonths.includes(item.month))
      .map((item: PredictedMonthlyComparisonData) => ({
        month: item.month,
        mechRo_actual: item.mechRo['2025'],
        mechRo_predicted: item.mechRoPredicted,
        bpRo_actual: item.bpRo['2025'],
        bpRo_predicted: item.bpRoPredicted,
        partsRevenue_actual: item.partsRevenue['2025'],
        partsRevenue_predicted: item.partsRevenuePredicted,
        labourRevenue_actual: item.labourRevenue['2025'],
        labourRevenue_predicted: item.labourRevenuePredicted,
      }));
  }, []);

  return (
    <motion.div 
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-6">KPI Tracker / Report</h1>
      </motion.div>
      
      {/* Year Selector */}
      <motion.div variants={itemVariants} className="flex justify-end mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="year-select" className="text-sm font-medium text-gray-700">Year:</label>
          <select 
            id="year-select"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setSelectedMonth('All'); // Reset month on year change
            }}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <label htmlFor="month-select" className="text-sm font-medium text-gray-700">Month:</label>
          <select 
            id="month-select"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {availableMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </motion.div>
      
      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Mechanical RO" 
          value={latestMonth.mechRo} 
          subValue={`${mechRoAchievement.toFixed(0)}% of Target`}
          icon={<TrendingUp className="text-primary-500" />}
          color="primary"
        />
        <StatCard 
          title="BP RO" 
          value={latestMonth.bpRo} 
          subValue={`${bpRoAchievement.toFixed(0)}% of Target`}
          icon={<TrendingUp className="text-success-500" />}
          color="success"
        />
        <StatCard 
          title="Accessories RO" 
          value={latestMonth.accessoriesRo} 
          subValue={`${accessoriesRoAchievement.toFixed(0)}% of Target`}
          icon={<TrendingUp className="text-warning-500" />}
          color="warning"
        />
        <StatCard 
          title="CSI Score" 
          value={latestMonth.csi} 
          subValue={latestMonth.csi >= 875 ? 'On Target' : 'Below Target'}
          icon={<Activity className="text-secondary-500" />}
          color="secondary"
        />
      </motion.div>
      
      {/* Progress Bars */}
      <motion.div variants={itemVariants} className="card mb-6">
        <div className="flex items-center mb-4">
          <Target className="text-primary-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Target Achievement</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <ProgressBar 
              label="Mechanical RO" 
              value={mechRoAchievement} 
              max={100} 
              color="primary" 
            />
            <ProgressBar 
              label="BP RO" 
              value={bpRoAchievement} 
              max={100} 
              color="secondary" 
            />
          </div>
          <div className="space-y-4">
            <ProgressBar 
              label="Accessories RO" 
              value={accessoriesRoAchievement} 
              max={100} 
              color="success" 
            />
            <ProgressBar 
              label="Parts Revenue" 
              value={partsRevenueAchievement} 
              max={100} 
              color="warning" 
            />
          </div>
          <div className="space-y-4">
            <ProgressBar 
              label="Labour Revenue" 
              value={labourRevenueAchievement} 
              max={100} 
              color="danger" 
            />

          </div>
        </div>
      </motion.div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">RO Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={kpiTimeframeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mechRo" name="Mechanical RO" fill="#8884d8" />
                <Bar dataKey="bpRo" name="BP RO" fill="#82ca9d" />
                <Bar dataKey="accessoriesRo" name="Accessories RO" fill="#ffc658" />
                  <Line
                    type="monotone"
                    dataKey="mechTarget"
                    name="Mech Target"
                    stroke="#ff7300"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">CSI Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={csiTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[800, 900]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="csi" 
                  name="CSI Score" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="Target" 
                  stroke="#ff7300" 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Revenue vs Target and Multivariate Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Revenue vs Target</h2>
          <div className="space-y-6 p-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total Revenue Requirement</span>
                <span className="text-sm font-bold">₹{totalRevenueTarget.toFixed(2)} Lac</span>
              </div>
              <ProgressBar 
                value={currentTotalRevenue} 
                max={totalRevenueTarget} 
                color="primary" 
                size="lg"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">Current Achievement</span>
                <span className="text-xs font-medium">
                  ₹{currentTotalRevenue.toFixed(2)} Lac ({totalRevenueAchievement.toFixed(1)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Labour Revenue</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">₹{(latestMonth.labourRevenue || 0)} Lac</span>
                  <div className="flex items-center">
                    <TrendingUp className="text-success-500 mr-1" size={16} />
                    <span className="text-sm text-success-500">{labourRevenueAchievement.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Target: ₹{labourRevenueTarget} Lac</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Parts Revenue</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">₹{(latestMonth.partsRevenue || 0)} Lac</span>
                  <div className="flex items-center">
                    <TrendingUp className="text-success-500 mr-1" size={16} />
                    <span className="text-sm text-success-500">{partsRevenueAchievement.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Target: ₹{partsRevenueTarget} Lac</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Gap Analysis</h3>
              <div className="flex items-center justify-between">
                <span className="text-base">Gap to Target:</span>
                <span className="text-lg font-bold text-danger-500">₹{revenueGap > 0 ? revenueGap.toFixed(2) : '0.00'} Lac</span>
              </div>
              <div className="flex items-center justify-end mt-2">
                <CheckCircle2 className="text-gray-400 mr-2" size={16} />
                <span className="text-sm text-gray-600">
                  Required Daily Run Rate: ₹{dailyRunRate.toFixed(2)} Lac
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <BrainCircuit className="text-primary-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold">Multivariate Analysis</h2>
            </div>
            <div className="flex space-x-2">
              {analyses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveAnalysis(index)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeAnalysis === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Analysis {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="h-96">
            <MultivariateChart
              key={activeAnalysis} // Re-mounts the component when analysis changes
              data={filteredData}
              xVar={analyses[activeAnalysis].x as keyof MonthlyKpi}
              yVar={analyses[activeAnalysis].y as keyof MonthlyKpi}
              zVar={analyses[activeAnalysis].z as keyof MonthlyKpi}
              title={analyses[activeAnalysis].title}
            />
          </div>
        </motion.div>
      </div>

      {/* Predictions Section Card */}
      <motion.div variants={itemVariants} className="mb-6 w-full">
        <PredictionsSection dataForChart={transformedPredictionData} />
      </motion.div>

      {/* Monthly KPI Summary */}
      <motion.div variants={itemVariants} className="card">
        <div className="flex items-center mb-4">
          <Calendar className="text-primary-500 mr-2" size={20} />
        <h2 className="text-xl font-semibold mb-4">Monthly KPI Summary</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                {dataForSelectedYear.map((month) => (
                  <th key={month.month} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {month.month}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  YTD {selectedYear}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">Mechanical RO</td>
                <td className="px-4 py-4 whitespace-nowrap">1200</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className="px-4 py-4 whitespace-nowrap">{month.mechRo}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + month.mechRo, 0)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">BP RO</td>
                <td className="px-4 py-4 whitespace-nowrap">200</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className="px-4 py-4 whitespace-nowrap">{month.bpRo}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + month.bpRo, 0)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">Accessories RO</td>
                <td className="px-4 py-4 whitespace-nowrap">50</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className="px-4 py-4 whitespace-nowrap">{month.accessoriesRo}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + month.accessoriesRo, 0)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">Parts Revenue (Lac)</td>
                <td className="px-4 py-4 whitespace-nowrap">170</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className="px-4 py-4 whitespace-nowrap">{month.partsRevenue || 0}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + (month.partsRevenue || 0), 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">Labour Revenue (Lac)</td>
                <td className="px-4 py-4 whitespace-nowrap">65</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className="px-4 py-4 whitespace-nowrap">{month.labourRevenue || 0}</td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + (month.labourRevenue || 0), 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">CSI</td>
                <td className="px-4 py-4 whitespace-nowrap">≥875</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className={`px-4 py-4 whitespace-nowrap ${month.csi >= 875 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}`}>
                    {month.csi}
                  </td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.length > 0 ? Math.round(dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + month.csi, 0) / dataForSelectedYear.length) : 0}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap">MG NPS</td>
                <td className="px-4 py-4 whitespace-nowrap">≥70</td>
                {dataForSelectedYear.map((month: MonthlyKpi) => (
                  <td key={month.month} className={`px-4 py-4 whitespace-nowrap ${month.mgNps >= 70 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}`}>
                    {month.mgNps}
                  </td>
                ))}
                <td className="px-4 py-4 whitespace-nowrap font-bold">
                  {dataForSelectedYear.length > 0 ? Math.round(dataForSelectedYear.reduce((sum: number, month: MonthlyKpi) => sum + month.mgNps, 0) / dataForSelectedYear.length) : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KpiDashboard;