import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { 
  UserCheck,
  MessageSquare,
  Award,
  ClipboardCheck,
} from 'lucide-react';

import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { csiDetailedData, YearlyKpiDataset, KpiDataEntry, MonthlyKpiValues } from '../data/csiDashboardDetailedData';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'; // Replaced with HTML select

const CsiDashboard: React.FC = () => {
  const availableYears = csiDetailedData.map(d => d.year).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = React.useState<number>(availableYears[0] || new Date().getFullYear());
  const monthOptions = ['YTD', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectedMonth, setSelectedMonth] = React.useState<string>(monthOptions[0]);

  const currentYearData = React.useMemo(() => csiDetailedData.find(d => d.year === selectedYear), [selectedYear]);
  const previousYearDataForCalc = React.useMemo(() => csiDetailedData.find(d => d.year === selectedYear - 1), [selectedYear]);

  // Helper function to get KPI data safely
  const getKpiData = (
    yearData: YearlyKpiDataset | undefined,
    kpiName: string,
    alternateKpiName?: string // For cases like 'Fix Right First Time'
  ): KpiDataEntry | undefined => {
    if (!yearData) return undefined;
    let kpi = yearData.kpis.find(k => k.kpiName.toLowerCase() === kpiName.toLowerCase());
    if (!kpi && alternateKpiName) {
      kpi = yearData.kpis.find(k => k.kpiName.toLowerCase() === alternateKpiName.toLowerCase());
    }
    return kpi;
  };

  const getKpiValue = (
    kpiEntry: KpiDataEntry | undefined,
    valueType: 'ytd' | 'latestMonthValue' | 'targetNumeric' | 'unit' | 'targetString'
  ) => {
    if (!kpiEntry) return undefined;
    switch (valueType) {
      case 'ytd':
        return kpiEntry.ytdValue;
      case 'latestMonthValue': {
        if (selectedMonth === 'YTD') {
          return kpiEntry.ytdValue;
        }
        const monthKey = selectedMonth.toLowerCase() as keyof MonthlyKpiValues;
        const monthlyValue = kpiEntry.monthlyValues ? kpiEntry.monthlyValues[monthKey] : undefined;
        // Fallback to YTD if specific month's data is null/undefined or doesn't exist
        return (monthlyValue !== null && monthlyValue !== undefined) ? monthlyValue : kpiEntry.ytdValue;
      }
      case 'targetNumeric':
        return kpiEntry.targetNumeric;
      case 'unit':
        return kpiEntry.unit;
      case 'targetString':
        return kpiEntry.targetString;
      default:
        return undefined;
    }
  };

  const csiKpi = getKpiData(currentYearData, 'CSI');
  const prevCsiKpi = getKpiData(previousYearDataForCalc, 'CSI');

  const currentCsiYtd = getKpiValue(csiKpi, 'ytd') as number || 0;
  const prevCsiYtd = getKpiValue(prevCsiKpi, 'ytd') as number || 0;
  
  const csiPercentChange = prevCsiYtd !== 0 ? ((currentCsiYtd - prevCsiYtd) / prevCsiYtd) * 100 : 0;

  const csiChartData = React.useMemo(() => {
    const kpi = getKpiData(currentYearData, 'CSI');
    const mgNpsKpi = getKpiData(currentYearData, 'MG NPS');
    const dealerNpsKpi = getKpiData(currentYearData, 'Dealer NPS');
    if (!kpi?.monthlyValues) return [];
    
    const months: (keyof MonthlyKpiValues)[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return months.map(monthKey => ({
      month: monthKey.charAt(0).toUpperCase() + monthKey.slice(1),
      csi: kpi.monthlyValues[monthKey],
      mgNps: mgNpsKpi?.monthlyValues[monthKey],
      dealerNps: dealerNpsKpi?.monthlyValues[monthKey],
      target: getKpiValue(kpi, 'targetNumeric')
    })).filter(d => d.csi !== null && d.csi !== 0); // Filter out months with no or zero CSI data
  }, [currentYearData]);

  const radarData = React.useMemo(() => {
    const kpisForRadar = [
      { name: 'CSI', targetDivisor: 10, defaultTarget: 87.5 },
      { name: 'MG NPS', targetDivisor: 1, defaultTarget: 70 },
      { name: 'Dealer NPS', targetDivisor: 1, defaultTarget: 70 },
      { name: 'Service Advisor', targetDivisor: 10, defaultTarget: 85 },
      { name: 'Handover and delivery', altName: 'Handover & Delivery', targetDivisor: 10, defaultTarget: 85 },
    ];
    return kpisForRadar.map(item => {
      const kpi = getKpiData(currentYearData, item.name, item.altName);
      const currentValue = getKpiValue(kpi, 'latestMonthValue') as number || 0;
      const targetValue = getKpiValue(kpi, 'targetNumeric') as number | undefined;
      return {
        subject: kpi?.kpiName || item.name,
        current: currentValue / item.targetDivisor,
        target: targetValue !== undefined ? (targetValue / item.targetDivisor) : item.defaultTarget,
        fullMark: 100, // Assuming full mark is 100 for radar scale
      };
    });
  }, [currentYearData, selectedMonth]);

  const ccptData = React.useMemo(() => {
    const ccptvKpi = getKpiData(currentYearData, 'CCPTV (CC/1000 Vehicles)');
    const ccrMechKpi = getKpiData(currentYearData, 'CCR% <= 3 days (Mech)');
    const ccrBpKpi = getKpiData(currentYearData, 'CCR% <= 7 days (BP)');
    const psfContactKpi = getKpiData(currentYearData, '3rd Day PSF Contact %age');

    if (!ccptvKpi?.monthlyValues) return []; // Basic check

    const months: (keyof MonthlyKpiValues)[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return months.map(monthKey => ({
      month: monthKey.charAt(0).toUpperCase() + monthKey.slice(1),
      ccptv: ccptvKpi.monthlyValues[monthKey],
      ccrMech: ccrMechKpi?.monthlyValues[monthKey],
      ccrBp: ccrBpKpi?.monthlyValues[monthKey],
      psfContact: psfContactKpi?.monthlyValues[monthKey],
    })).filter(d => d.ccptv !== null && d.ccptv !== 0); // Filter out months with no or zero CCPTV data
  }, [currentYearData]);
  
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
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CSI & CCPT Dashboard</h1>
        <div className="flex space-x-4">
          <div className="w-32">
            <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
            <select
              id="year-select"
              value={selectedYear.toString()}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedYear(parseInt(e.target.value));
                setSelectedMonth(monthOptions[0]); // Reset to YTD when year changes
              }}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
          <div className="w-48">
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Month</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMonth(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {monthOptions.map(month => (
                <option key={month} value={month.toLowerCase() === 'ytd' ? 'YTD' : month}>{month === 'YTD' ? 'YTD' : month}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
      
      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="CSI Score" 
          value={getKpiValue(getKpiData(currentYearData, 'CSI'), 'latestMonthValue') ?? 'N/A'}
          subValue={`Target: ${getKpiValue(getKpiData(currentYearData, 'CSI'), 'targetNumeric') || 'N/A'}`}
          percentChange={csiPercentChange}
          icon={<UserCheck className="text-primary-500" />}
          color="primary"
        />
        <StatCard 
          title="MG NPS" 
          value={`${getKpiValue(getKpiData(currentYearData, 'MG NPS'), 'latestMonthValue') ?? 'N/A'}%`}
          subValue={`Target: ${getKpiValue(getKpiData(currentYearData, 'MG NPS'), 'targetNumeric') || 'N/A'}%`}
          icon={<Award className="text-success-500" />}
          color="success"
        />
        <StatCard 
          title="Dealer NPS" 
          value={`${getKpiValue(getKpiData(currentYearData, 'Dealer NPS'), 'latestMonthValue') ?? 'N/A'}%`}
          subValue={`Target: ${getKpiValue(getKpiData(currentYearData, 'Dealer NPS'), 'targetNumeric') || 'N/A'}%`}
          icon={<Award className="text-secondary-500" />}
          color="secondary"
        />
        <StatCard 
          title="CCPTV" 
          value={getKpiValue(getKpiData(currentYearData, 'CCPTV (CC/1000 Vehicles)'), 'latestMonthValue') ?? 'N/A'}
          subValue={`Target: ${getKpiValue(getKpiData(currentYearData, 'CCPTV (CC/1000 Vehicles)'), 'targetNumeric') || 'N/A'} CC/1k Veh`}
          icon={<MessageSquare className="text-warning-500" />}
          color="warning"
        />
      </motion.div>
      
      {/* Progress Bars */}
      <motion.div variants={itemVariants} className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">CSI Components Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProgressBar 
              label="Service Advisor" 
              value={getKpiValue(getKpiData(currentYearData, 'Service Advisor'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, 'Service Advisor'), 'targetNumeric') as number || 1000} 
              unit={getKpiValue(getKpiData(currentYearData, 'Service Advisor'), 'unit') as string || ''}
              color="primary" 
            />
            <ProgressBar 
              label="Handover & Delivery" 
              value={getKpiValue(getKpiData(currentYearData, 'Handover and delivery', 'Handover & Delivery'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, 'Handover and delivery', 'Handover & Delivery'), 'targetNumeric') as number || 1000} 
              unit={getKpiValue(getKpiData(currentYearData, 'Handover and delivery', 'Handover & Delivery'), 'unit') as string || ''}
              color="secondary" 
            />
            <ProgressBar 
              label="SOP - Work & Charges Explained" 
              value={getKpiValue(getKpiData(currentYearData, 'SOP- Work & Charges explained'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, 'SOP- Work & Charges explained'), 'targetNumeric') as number || 100} 
              unit={getKpiValue(getKpiData(currentYearData, 'SOP- Work & Charges explained'), 'unit') as string || '%'}
              color="success" 
            />
          </div>
          <div className="space-y-4">
            <ProgressBar 
              label="Fix Right First Time" 
              value={getKpiValue(getKpiData(currentYearData, 'Fix Right First Time', 'SOP- Fix Right First Time'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, 'Fix Right First Time', 'SOP- Fix Right First Time'), 'targetNumeric') as number || 100} 
              unit={getKpiValue(getKpiData(currentYearData, 'Fix Right First Time', 'SOP- Fix Right First Time'), 'unit') as string || '%'}
              color="warning" 
            />
            <ProgressBar 
              label="CCR% <= 3 days (Mech)" 
              value={getKpiValue(getKpiData(currentYearData, 'CCR% <= 3 days (Mech)'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, 'CCR% <= 3 days (Mech)'), 'targetNumeric') as number || 100} 
              unit="%"
              color="danger" 
            />
            <ProgressBar 
              label="3rd Day PSF Contact %age" 
              value={getKpiValue(getKpiData(currentYearData, '3rd Day PSF Contact %age'), 'latestMonthValue') as number || 0}
              max={getKpiValue(getKpiData(currentYearData, '3rd Day PSF Contact %age'), 'targetNumeric') as number || 100} 
              unit="%"
              color="accent" 
            />
          </div>
        </div>
      </motion.div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">CSI Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={csiChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[820, 900]} />
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
        
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">NPS Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={csiChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mgNps" name="MG NPS" fill="#8884d8" />
                <Bar dataKey="dealerNps" name="Dealer NPS" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* More Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">CSI Radar Analysis</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Target"
                  dataKey="target"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">CCPT & Resolution Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ccptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ccptv" 
                  name="CCPTV" 
                  stroke="#8884d8" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="ccrMech" 
                  name="CCR% Mech" 
                  stroke="#82ca9d" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="ccrBp" 
                  name="CCR% BP" 
                  stroke="#ffc658" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="psfContact" 
                  name="PSF Contact %" 
                  stroke="#ff7300" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div> {/* Closes h-72 div for CCPT chart */}
        </motion.div> {/* Closes CCPT chart card (motion.div variants={itemVariants} className="card") */}
      </div> {/* Closes the grid (grid-cols-1 lg:grid-cols-2 gap-6 mb-6) that holds CSI Trend and CCPT Trend charts */}

      {/* Customer Satisfaction KPI Summary */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
        <div className="flex items-center mb-4">
          <ClipboardCheck className="text-primary-500 mr-2" size={20} />
          <h2 className="text-lg font-semibold">Customer Satisfaction KPI Summary</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            const kpiDefs = [
              { groupTitle: 'CSI Scores', kpis: [
                { name: 'CSI', displayName: 'CSI Overall', unitSuffix: ' / 1000', defaultTarget: 875, compare: (val: number, target: number) => val >= target },
                { name: 'Service Advisor', unitSuffix: ' / 1000', defaultTarget: 850, compare: (val: number, target: number) => val >= target },
                { name: 'Handover and delivery', altName: 'Handover & Delivery', unitSuffix: ' / 1000', defaultTarget: 850, compare: (val: number, target: number) => val >= target },
              ]},
              { groupTitle: 'NPS Metrics', kpis: [
                { name: 'MG NPS', unitSuffix: '%', defaultTarget: 70, compare: (val: number, target: number) => val >= target },
                { name: 'Dealer NPS', unitSuffix: '%', defaultTarget: 70, compare: (val: number, target: number) => val >= target },
                { name: 'SOP- Work & Charges explained', altName: 'SOP - Work & Charges', unitSuffix: '%', defaultTarget: 100, compare: (val: number, target: number) => val >= target },
              ]},
              { groupTitle: 'Complaint Resolution', kpis: [
                { name: 'CCPTV (CC/1000 Vehicles)', displayName: 'CCPTV', unitSuffix: '', defaultTarget: 27, compare: (val: number, target: number) => val <= target }, // Lower is better
                { name: 'CCR% <= 3 days (Mech)', displayName: 'CCR% Mech (≤ 3 days)', unitSuffix: '%', defaultTarget: 90, compare: (val: number, target: number) => val >= target },
                { name: '3rd Day PSF Contact %age', displayName: 'PSF Contact %', unitSuffix: '%', defaultTarget: 90, compare: (val: number, target: number) => val >= target },
              ]},
            ];

            return kpiDefs.map(group => (
              <div className="space-y-2" key={group.groupTitle}>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{group.groupTitle}</h3>
                {group.kpis.map(kpiItem => {
                  const kpiEntry = getKpiData(currentYearData, kpiItem.name, kpiItem.altName);
                  const currentValue = getKpiValue(kpiEntry, 'latestMonthValue') as number | undefined;
                  const targetValue = getKpiValue(kpiEntry, 'targetNumeric') as number | undefined;
                  const displayValue = currentValue !== undefined ? `${currentValue}${kpiItem.unitSuffix}` : 'N/A';
                  const meetsTarget = currentValue !== undefined && kpiItem.compare(currentValue, targetValue ?? kpiItem.defaultTarget);
                  
                  return (
                    <div className="flex justify-between" key={kpiItem.name}>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{kpiItem.displayName || kpiItem.name}</span>
                      <span className={`text-sm font-medium ${currentValue === undefined ? 'text-gray-500' : meetsTarget ? 'text-success-500' : 'text-danger-500'}`}>
                        {displayValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CsiDashboard;