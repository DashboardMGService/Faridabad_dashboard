import React, { useState } from 'react';
import { FaTools, FaHardHat, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Area,
  ReferenceArea,
  Scatter,
  LabelList,
  Sector,
  PolarGrid,
  LegendType
} from 'recharts';
import { 
  BarChart2, 
  Car, 
  IndianRupee, 
  Coins, 
  Users,
  Briefcase // Added Briefcase icon
} from 'lucide-react';

// Define types for the new state variables
interface TopAdvisorData {
  advisorName: string;
  totalRevenue: number;
}

// Using AdvisorMonthlyPerformance directly for table data, will add calculated totalRevenue to it
interface ProcessedAdvisorPerformance extends AdvisorMonthlyPerformance {
  calculatedTotalRevenue: number;
}

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import PeriodComparisonCharts from '../components/PeriodComparisonCharts';
import {
  // previousYearData, // Corrected: From ../data/index.ts
} from '../data';
import { yearOnYearComparisonData, MonthlyComparisonData as YearOnYearMonthlyData } from '../data/yearOnYearComparisonData';
import { yearOnYearComparisonData as kpiSourceData, raw2024Data, raw2025Data } from '../data/kpiCardData.ts';
import { tillDateComparisonData } from '../data/tillDateComparisonData';
import { detailedRevenueBreakdownData, MonthlyRevenueBreakdownEntry } from '../data/revenueInsightsData';
import { allServiceAdvisorYearlyPerformance, AdvisorMonthlyPerformance } from '../data/advisorPerformanceData';
import { formatIndianCurrency } from '../utils/formatting';




interface MonthlyTrendItem {
  month: string;
  partsRevenue: number;
  labourRevenue: number;
  accessoriesRevenue: number;
  vasRevenue: number;
  lubricantsRevenue: number;
  throughput: number;
  totalRevenue: number;
}

interface KpiValue {
  current: number;
  previous: number;
  percentChange?: number;
}

const RevenueDashboard: React.FC = () => {
  const monthMap: { [key: string]: string } = {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
  };
  const [comparisonMetric, setComparisonMetric] = useState<string>('mechRo');
  const [selectedMonth, setSelectedMonth] = useState<'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec'>('jun'); 
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // State for Top Advisors by Revenue chart
  const [topAdvisorsData, setTopAdvisorsData] = useState<TopAdvisorData[]>([]);
  // State for Service Advisor Performance Table
  const [advisorPerformanceTableData, setAdvisorPerformanceTableData] = useState<ProcessedAdvisorPerformance[]>([]);
  const [quarterlyTrendsChartData, setQuarterlyTrendsChartData] = useState<any[]>([]);
  const [selectedTrendMetricKey, setSelectedTrendMetricKey] = useState<keyof MonthlyTrendItem>('totalRevenue');
  const [isComparisonExpanded, setIsComparisonExpanded] = useState<boolean>(false);
  const [radialChartData, setRadialChartData] = useState<any[]>([]);

  const comparisonOptions = [
    { key: 'mechRo', label: 'Mechanical', fullLabel: 'Mechanical Throughput', icon: <Car size={14} /> },
    { key: 'bpRo', label: 'Body & Paint', fullLabel: 'Body & Paint Throughput', icon: <Briefcase size={14} /> },
    { key: 'accessoriesRo', label: 'Accessories', fullLabel: 'Accessories Revenue', icon: <Coins size={14} /> },
    { key: 'partsRevenue', label: 'Parts', fullLabel: 'Parts Revenue', icon: <BarChart2 size={14} /> },
    { key: 'labourRevenue', label: 'Labour', fullLabel: 'Labour Revenue', icon: <IndianRupee size={14} /> },
  ];

  
  // State for KPI card values derived from kpiSourceData
  const [kpiCardValues, setKpiCardValues] = useState<{
    throughput: KpiValue;
    labourRevenue: KpiValue;
    partsRevenue: KpiValue;
    totalRevenue: KpiValue;
  }>({
    throughput: { current: 0, previous: 0, percentChange: 0 },
    labourRevenue: { current: 0, previous: 0, percentChange: 0 },
    partsRevenue: { current: 0, previous: 0, percentChange: 0 },
    totalRevenue: { current: 0, previous: 0, percentChange: 0 },
  });

  const [kpiBreakdownValues, setKpiBreakdownValues] = useState({
    throughput: { mech: 0, bp: 0 },
    labourRevenue: { mech: 0, bp: 0 },
    partsRevenue: { mech: 0, bp: 0 },
    totalRevenue: { mech: 0, bp: 0 },
  });

  // State for other charts that previously used 'totals', 'mechData', 'bodyData'
  const [chartDataSource, setChartDataSource] = useState({
    throughput: 0,
    labour: 0,
    parts: 0,
    accessories: 0,
    lubricant: 0, // Added for pie chart
    vas: 0, // Placeholder, as kpiSourceData doesn't have explicit VAS
    totalRevenue: 0,
    serviceAdvisorCount: 0 // Placeholder for mechData.length + bodyData.length
  });

  // New useEffect for processing allServiceAdvisorYearlyPerformance
  React.useEffect(() => {
    const currentYearData = allServiceAdvisorYearlyPerformance.find(yearData => yearData.year === selectedYear);
    if (!currentYearData) {
      setTopAdvisorsData([]);
      setAdvisorPerformanceTableData([]);
      return;
    }

    const monthMap: { [key: string]: string } = {
      jan: "January", feb: "February", mar: "March", apr: "April", may: "May", jun: "June",
      jul: "July", aug: "August", sep: "September", oct: "October", nov: "November", dec: "December"
    };
    const currentMonthStr = monthMap[selectedMonth];
    const currentMonthPerformance = currentYearData.monthlyBreakdown.find(monthData => monthData.month === currentMonthStr);

    if (!currentMonthPerformance || !currentMonthPerformance.advisors) {
      setTopAdvisorsData([]);
      setAdvisorPerformanceTableData([]);
      return;
    }

    const processedAdvisors: ProcessedAdvisorPerformance[] = currentMonthPerformance.advisors.map(advisor => {
      const revenueItems = advisor.revenueItems;
      const calculatedTotalRevenue = (
        (revenueItems["VAS (INR)"] || 0) +
        (revenueItems["LAB"] || 0) +
        (revenueItems["ACCES"] || 0) +
        (revenueItems["LUB"] || 0) +
        (revenueItems["Brake Pad (INR)"] || 0) +
        (revenueItems["Wiper Blade (INR)"] || 0) +
        (revenueItems["Washer Fluid (INR)"] || 0) +
        (revenueItems["Wheel Alignment (INR)"] || 0) +
        (revenueItems["BAT (INR)"] || 0) +
        (revenueItems["TYRE (INR)"] || 0) +
        (revenueItems["Parts (INR)"] || 0)
      );
      return {
        ...advisor,
        calculatedTotalRevenue
      };
    });

    // Prepare data for Top Advisors chart (e.g., top 5)
    const sortedAdvisors = [...processedAdvisors].sort((a, b) => b.calculatedTotalRevenue - a.calculatedTotalRevenue);
    setTopAdvisorsData(sortedAdvisors.slice(0, 5).map(adv => ({ advisorName: adv.advisorName, totalRevenue: adv.calculatedTotalRevenue })));

    // Set data for the performance table
    setAdvisorPerformanceTableData(processedAdvisors);

  }, [selectedMonth, selectedYear, allServiceAdvisorYearlyPerformance]);

  // Effect to calculate quarterly performance trends for 2024 vs 2025
  React.useEffect(() => {
    if (!allServiceAdvisorYearlyPerformance) return;

    const processYearData = (year: number) => {
      const yearData = allServiceAdvisorYearlyPerformance.find(item => item.year === year);
      if (!yearData) return [];

      const monthNameMapping: { [key: string]: string } = {
        "January": "Jan", "February": "Feb", "March": "Mar", "April": "Apr",
        "May": "May", "June": "Jun", "July": "Jul", "August": "Aug",
        "September": "Sep", "October": "Oct", "November": "Nov", "December": "Dec"
      };

      return yearData.monthlyBreakdown.map(monthEntry => {
        let totalPartsRevenue = 0;
        let totalLabourRevenue = 0;
        let totalAccessoriesRevenue = 0;
        let totalVasRevenue = 0;
        let totalLubricantsRevenue = 0;
        let totalThroughput = 0;
        let overallTotalRevenue = 0;

        monthEntry.advisors.forEach(advisorPerf => {
          const items = advisorPerf.revenueItems;
          const advisorTotal = Object.values(items).reduce((sum, val) => sum + (val || 0), 0);
          
          totalPartsRevenue += items["Parts (INR)"] || 0;
          totalLabourRevenue += items["LAB"] || 0;
          totalAccessoriesRevenue += items["ACCES"] || 0;
          totalVasRevenue += items["VAS (INR)"] || 0;
          totalLubricantsRevenue += items["LUB"] || 0;
          totalThroughput += advisorPerf.throughput || 0;
          overallTotalRevenue += advisorTotal;
        });

        return {
          month: monthNameMapping[monthEntry.month] || '',
          partsRevenue: totalPartsRevenue,
          labourRevenue: totalLabourRevenue,
          accessoriesRevenue: totalAccessoriesRevenue,
          vasRevenue: totalVasRevenue,
          lubricantsRevenue: totalLubricantsRevenue,
          throughput: totalThroughput,
          totalRevenue: overallTotalRevenue,
        };
      });
    };

    const monthlyData2024 = processYearData(2024);
    const monthlyData2025 = processYearData(2025);

    const quarters = {
      Q1: ["Jan", "Feb", "Mar"],
      Q2: ["Apr", "May", "Jun"],
      Q3: ["Jul", "Aug", "Sep"],
      Q4: ["Oct", "Nov", "Dec"],
    };

    const quarterlyComparisonData = Object.entries(quarters).map(([qName, months]) => {
      const aggregateForYear = (data: any[]) => {
        return data
          .filter(m => months.includes(m.month))
          .reduce((total, month) => total + (month[selectedTrendMetricKey] || 0), 0);
      };

      return {
        quarter: qName,
        '2024': aggregateForYear(monthlyData2024),
        '2025': aggregateForYear(monthlyData2025),
      };
    });

    setQuarterlyTrendsChartData(quarterlyComparisonData);

  }, [selectedTrendMetricKey, allServiceAdvisorYearlyPerformance]);

  const trendMetricsOptions: { value: keyof MonthlyTrendItem; label: string; isCurrency: boolean }[] = [
    { value: 'totalRevenue', label: 'Total Revenue', isCurrency: true },
    { value: 'partsRevenue', label: 'Parts Revenue', isCurrency: true },
    { value: 'labourRevenue', label: 'Labour Revenue', isCurrency: true },
    { value: 'accessoriesRevenue', label: 'Accessories Revenue', isCurrency: true },
    { value: 'vasRevenue', label: 'VAS Revenue', isCurrency: true },
    { value: 'lubricantsRevenue', label: 'Lubricants Revenue', isCurrency: true },
    { value: 'throughput', label: 'Throughput (Nos)', isCurrency: false },
  ];

  // Effect to update KPI card values when selectedMonth or selectedYear changes
  React.useEffect(() => {
    const monthMap: { [key: string]: string } = {
      jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
      jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec"
    };
    const currentMonthStr = monthMap[selectedMonth];
    
    const dataForMonth = kpiSourceData.find(d => d.month === currentMonthStr);

    if (dataForMonth) {
      const yearKey = selectedYear.toString() as '2024' | '2025';

      const currentThroughput = dataForMonth.throughput[yearKey] || 0;
      const currentLabourRevenue = dataForMonth.labourRevenue[yearKey] || 0;
      const currentPartsRevenue = dataForMonth.partsRevenue[yearKey] || 0;
      const currentAccessoriesRevenue = dataForMonth.accessoriesRo[yearKey] || 0;
      const currentTotalRevenue = currentPartsRevenue + currentLabourRevenue + currentAccessoriesRevenue;

      let prevThroughput = 0;
      let prevLabourRevenue = 0;
      let prevPartsRevenue = 0;
      let prevAccessoriesRevenue = 0;
      let prevTotalRevenue = 0;

      if (selectedYear === 2025 && dataForMonth.throughput['2024'] !== undefined) { 
        prevThroughput = dataForMonth.throughput['2024'] || 0;
        prevLabourRevenue = dataForMonth.labourRevenue['2024'] || 0;
        prevPartsRevenue = dataForMonth.partsRevenue['2024'] || 0;
        prevAccessoriesRevenue = dataForMonth.accessoriesRo['2024'] || 0;
        prevTotalRevenue = prevPartsRevenue + prevLabourRevenue + prevAccessoriesRevenue;
      }
      
      setKpiCardValues({
        throughput: { current: currentThroughput, previous: prevThroughput, percentChange: dataForMonth.throughput?.percentChange },
        labourRevenue: { current: currentLabourRevenue, previous: prevLabourRevenue, percentChange: dataForMonth?.labourRevenue?.percentChange },
        partsRevenue: { current: currentPartsRevenue, previous: prevPartsRevenue, percentChange: dataForMonth?.partsRevenue?.percentChange },
        totalRevenue: { current: currentTotalRevenue, previous: prevTotalRevenue, percentChange: (prevTotalRevenue === 0) ? (currentTotalRevenue > 0 ? undefined : 0) : parseFloat((((currentTotalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100).toFixed(2)) }
      });

      // Calculate and set breakdown values
      const rawData = selectedYear === 2025 ? raw2025Data : raw2024Data;
      const monthRawData = rawData.find(d => d.month === currentMonthStr);

      if (monthRawData) {
        const mechThroughput = monthRawData.mechRo?.total || 0;
        const bpThroughput = monthRawData.bpRo?.total || 0;
        const mechLabour = monthRawData.mechLaborRevenue || 0;
        const bpLabour = monthRawData.bpLaborRevenue || 0;
        const mechParts = monthRawData.mechParts || 0;
        const bpParts = monthRawData.bpParts || 0;
        const mechAccessories = monthRawData.mechAccessories || 0;
        const bpAccessories = monthRawData.bpAccessories || 0;
        const mechTotalRevenue = mechLabour + mechParts + mechAccessories;
        const bpTotalRevenue = bpLabour + bpParts + bpAccessories;

        setKpiBreakdownValues({
          throughput: { mech: mechThroughput, bp: bpThroughput },
          labourRevenue: { mech: mechLabour, bp: bpLabour },
          partsRevenue: { mech: mechParts, bp: bpParts },
          totalRevenue: { mech: mechTotalRevenue, bp: bpTotalRevenue },
        });
      } else {
        setKpiBreakdownValues({ throughput: { mech: 0, bp: 0 }, labourRevenue: { mech: 0, bp: 0 }, partsRevenue: { mech: 0, bp: 0 }, totalRevenue: { mech: 0, bp: 0 } });
      }

      // Fetch data for pie chart from detailedRevenueBreakdownData
      const insightsEntry = detailedRevenueBreakdownData.find(
        (entry: MonthlyRevenueBreakdownEntry) => entry.month === currentMonthStr
      );

      let pieLabour = 0, pieParts = 0, pieAccessories = 0, pieLubricant = 0;

      if (insightsEntry) {
        const yearStr = selectedYear.toString() as '2024' | '2025';
        const yearData = insightsEntry.data[yearStr];
        if (yearData) {
          pieLabour = yearData.labour?.actual || 0;
          pieParts = yearData.parts?.actual || 0;
          pieAccessories = yearData.accessories?.actual || 0;
          pieLubricant = yearData.lubricant?.actual || 0;

          const newRadialData = [
            { name: 'Throughput', value: (yearData.throughput.actual / (yearData.throughput.target || 1)) * 100, target: yearData.throughput.target, actual: yearData.throughput.actual, fill: '#4361ee' },
            { name: 'Labour', value: (yearData.labour.actual / (yearData.labour.target || 1)) * 100, target: yearData.labour.target, actual: yearData.labour.actual, fill: '#7209b7' },
            { name: 'Parts', value: (yearData.parts.actual / (yearData.parts.target || 1)) * 100, target: yearData.parts.target, actual: yearData.parts.actual, fill: '#f72585' },
            { name: 'Accessories', value: (yearData.accessories.actual / (yearData.accessories.target || 1)) * 100, target: yearData.accessories.target, actual: yearData.accessories.actual, fill: '#fb8500' },
          ].filter(item => item.target !== undefined);

          const cappedRadialData = newRadialData.map(item => ({...item, value: Math.min(item.value, 150)}));
          setRadialChartData(cappedRadialData);
        } else {
          setRadialChartData([]);
        }
      } else {
        setRadialChartData([]);
      }

      setChartDataSource({
        throughput: currentThroughput,
        labour: pieLabour,
        parts: pieParts,
        accessories: pieAccessories,
        lubricant: pieLubricant,
        vas: 0,
        totalRevenue: currentTotalRevenue,
        serviceAdvisorCount: currentThroughput
      });

    } else {
      setKpiCardValues({ throughput: { current: 0, previous: 0, percentChange: 0 }, labourRevenue: { current: 0, previous: 0, percentChange: 0 }, partsRevenue: { current: 0, previous: 0, percentChange: 0 }, totalRevenue: { current: 0, previous: 0, percentChange: 0 } });
      setKpiBreakdownValues({ throughput: { mech: 0, bp: 0 }, labourRevenue: { mech: 0, bp: 0 }, partsRevenue: { mech: 0, bp: 0 }, totalRevenue: { mech: 0, bp: 0 } });
      setChartDataSource({ throughput: 0, labour: 0, parts: 0, accessories: 0, lubricant: 0, vas: 0, totalRevenue: 0, serviceAdvisorCount: 0 });
    }
  }, [selectedMonth, selectedYear]);

  // Prepare data for year-on-year comparison chart using the new yearOnYearComparisonData.ts
  const displayComparisonData = yearOnYearComparisonData.map((monthlyData: YearOnYearMonthlyData) => {
    let data2024 = 0;
    let data2025 = 0;
    let target = 0;

    switch (comparisonMetric) {
      case 'mechRo':
        data2024 = monthlyData.mechRo['2024'];
        data2025 = monthlyData.mechRo['2025'];
        target = monthlyData.mechRo.target;
        break;
      case 'bpRo':
        data2024 = monthlyData.bpRo['2024'];
        data2025 = monthlyData.bpRo['2025'];
        target = monthlyData.bpRo.target;
        break;
      case 'accessoriesRo':
        data2024 = monthlyData.accessoriesRo['2024'];
        data2025 = monthlyData.accessoriesRo['2025'];
        target = monthlyData.accessoriesRo.target;
        break;
      case 'partsRevenue':
        data2024 = monthlyData.partsRevenue['2024'];
        data2025 = monthlyData.partsRevenue['2025'];
        target = monthlyData.partsRevenue.target;
        break;
      case 'labourRevenue':
        data2024 = monthlyData.labourRevenue['2024'];
        data2025 = monthlyData.labourRevenue['2025'];
        target = monthlyData.labourRevenue.target;
        break;
      default:
        break;
    }

    return {
      month: monthlyData.month,
      '2024': data2024,
      '2025': data2025,
      target: target,
    };
  });
  
  // Get all service advisors for the selected month and year
  
  // Prepare data for the radial bar chart - using the new data structure
  // const radialData = [
  //   { name: 'Throughput', value: chartDataSource.throughput, fill: '#4361ee' },
  //   { name: 'RO Count', value: chartDataSource.serviceAdvisorCount, fill: '#7209b7' }, // Changed label from 'Service Advisors'
  //   { name: 'Revenue (Lakhs)', value: Math.round(chartDataSource.totalRevenue / 100000), fill: '#f72585' },
  // ];
  
  // Prepare data for the revenue breakdown pie chart using the new data structure
  const revenueBreakdown = [
    { name: 'Labor', value: chartDataSource.labour, color: '#4361ee' },
    { name: 'Parts', value: chartDataSource.parts, color: '#7209b7' },
    { name: 'Accessories', value: chartDataSource.accessories, color: '#fb8500' },
    { name: 'Lubricant', value: chartDataSource.lubricant, color: '#ffc658' }, // Added Lubricant
  ];
  

  // Data for the radial bar chart is now calculated in the useEffect hook and stored in radialChartData state.
  
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

  const legendPayload: { value: string; type: LegendType; id: string; color: string; }[] = [
    { value: 'Target', type: 'circle', id: 'ID01', color: '#2ec4b6' },
    { value: '2024', type: 'circle', id: 'ID02', color: '#4361ee' },
    { value: '2025', type: 'circle', id: 'ID03', color: '#f72585' },
  ];

  // Custom tooltip for the comparison chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Filter for unique payload entries by name to avoid duplicates (e.g. from Area + Line)
      const uniquePayloadEntries = payload.reduce((acc: any[], current: any) => {
        if (!acc.find(item => item.name === current.name)) {
          acc.push(current);
        }
        return acc;
      }, []);

      // Define the desired display order and labels
      const displayOrder = [
        { key: '2025', label: '2025' },
        { key: '2024', label: '2024' },
        { key: 'Target', label: 'Target' }, // 'Target' is the name prop for the target Line series
      ];

      return (
        <div className="custom-tooltip bg-white p-3 rounded-md shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          {displayOrder.map(item => {
            const entry = uniquePayloadEntries.find((p: any) => p.name === item.key);
            if (entry) {
              return (
                <p key={item.key} style={{ color: entry.color }} className="text-sm text-gray-700">
                  {item.label}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Professional Header with Logo */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-t-xl shadow-xl border border-white/40 p-4 overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full shadow-md">
              <Car size={24} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Narsinghpur Service Dashboard</h1>
              <p className="text-xs text-white/80">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>
          {/* Navigation buttons removed as requested */}
        </div>
      </div>

      {/* Month and Year Selector - Compact Sticky at the top */}
      <motion.div 
        variants={itemVariants} 
        className="sticky top-0 z-10 w-auto max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-primary-100 py-2 px-4 mb-4 transform transition-all duration-300 hover:shadow-xl"
        style={{ boxShadow: '0 4px 20px rgba(67, 97, 238, 0.15)' }}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-primary-600 whitespace-nowrap">Month:</label>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value as any)}
              className="text-sm px-2 py-1 bg-primary-50 border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-primary-700"
            >
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-primary-600 whitespace-nowrap">Year:</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-sm px-2 py-1 bg-primary-50 border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-primary-700"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      <div className="bg-white/60 backdrop-blur-sm rounded-b-xl shadow-xl border-x border-b border-white/40 p-6 overflow-hidden">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Revenue</h1>
        </div>
      </div>
      
      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Throughput"
            value={kpiCardValues.throughput.current.toString()}
            percentChange={kpiCardValues.throughput.percentChange}
            icon={<FaTools className="text-accent" size={24} />}
            color="accent"
            mechValue={kpiBreakdownValues.throughput.mech}
            bpValue={kpiBreakdownValues.throughput.bp}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Labour Revenue"
            value={formatIndianCurrency(kpiCardValues.labourRevenue.current)}
            percentChange={kpiCardValues.labourRevenue.percentChange}
            icon={<FaHardHat className="text-success" size={24} />}
            color="success"
            mechValue={kpiBreakdownValues.labourRevenue.mech}
            bpValue={kpiBreakdownValues.labourRevenue.bp}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Parts Revenue"
            value={formatIndianCurrency(kpiCardValues.partsRevenue.current)}
            percentChange={kpiCardValues.partsRevenue.percentChange}
            icon={<FaCog className="text-warning" size={24} />}
            color="warning"
            mechValue={kpiBreakdownValues.partsRevenue.mech}
            bpValue={kpiBreakdownValues.partsRevenue.bp}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title="Total Revenue"
            value={formatIndianCurrency(kpiCardValues.totalRevenue.current)}
            percentChange={kpiCardValues.totalRevenue.percentChange}
            icon={<IndianRupee className="text-primary" size={24} />}
            color="primary"
            mechValue={kpiBreakdownValues.totalRevenue.mech}
            bpValue={kpiBreakdownValues.totalRevenue.bp}
          />
        </motion.div>
      </motion.div>
      {/* Monthly Comparison - Show when comparison tab is active or always in overview */}
      <motion.div variants={itemVariants} className="card overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Year-on-Year Comparison</h2>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold text-primary-600">{comparisonOptions.find(opt => opt.key === comparisonMetric)?.fullLabel}</span>
            </p>
          </div>
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-full">
            {comparisonOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setComparisonMetric(option.key)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full focus:outline-none transition-colors duration-300 flex items-center gap-2 ${
                  comparisonMetric === option.key ? 'text-primary-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {comparisonMetric === option.key && (
                  <motion.div
                    layoutId="comparison-metric-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{option.icon}</span>
                <span className="relative z-10">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-80 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-chart-blue/5 to-chart-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={displayComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f72585" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f72585" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                wrapperStyle={{ outline: 'none' }}
                cursor={{ stroke: '#f0f0f0', strokeWidth: 1, fill: 'rgba(240, 240, 240, 0.2)' }}
              />
              <Legend 
                payload={legendPayload}
                wrapperStyle={{ paddingTop: '10px' }}
                iconSize={8}
                formatter={(value, entry) => <span style={{ color: entry.color, fontWeight: 500 }}>{value}</span>}
              />
              
              {/* Reference area to highlight target achievement */}
              {displayComparisonData.map((entry, index) => (
                entry['2025'] > entry.target && (
                  <ReferenceArea 
                    key={`area-${index}`}
                    x1={entry.month} 
                    x2={entry.month} 
                    y1={entry.target} 
                    y2={entry['2025']} 
                    fill="#4ade80" 
                    fillOpacity={0.1} 
                  />
                )
              ))}
              
              {/* Target line */}
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#2ec4b6" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false}
                name="Target"
              />
              
              {/* Area for 2024 data */}
              <Area 
                type="monotone" 
                dataKey="2024" 
                fill="url(#colorUv)" 
                stroke="#4361ee" 
                strokeWidth={0}
                activeDot={false}
              />
              
              {/* Area for 2025 data */}
              <Area 
                type="monotone" 
                dataKey="2025" 
                fill="url(#colorPv)" 
                stroke="#f72585" 
                strokeWidth={0}
                activeDot={false}
              />
              
              {/* Line for 2024 data */}
              <Line 
                type="monotone" 
                dataKey="2024" 
                stroke="#4361ee" 
                strokeWidth={3} 
                dot={{ fill: '#4361ee', r: 4, strokeWidth: 2, stroke: '#ffffff' }} 
                activeDot={{ r: 7, stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              
              {/* Line for 2025 data */}
              <Line 
                type="monotone" 
                dataKey="2025" 
                stroke="#f72585" 
                strokeWidth={3} 
                dot={{ fill: '#f72585', r: 4, strokeWidth: 2, stroke: '#ffffff' }} 
                activeDot={{ r: 7, stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              
              {/* Scatter points for emphasis on high values */}
              <Scatter 
                dataKey="2025" 
                fill="#f72585" 
                shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  // Only show for highest values
                  if (payload['2025'] > payload['2024'] * 1.2 && payload['2025'] > payload.target) {
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={8} 
                        stroke="#f72585" 
                        strokeWidth={2} 
                        fill="#ffffff" 
                        fillOpacity={0.8} 
                      />
                    );
                  }
                  return <g />; // Return an empty SVG group instead of null
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        </motion.div>

        {/* YTD vs LYTD and MTD vs LMTD Comparison Charts - Fixed to 2025 vs 2024 */}
        {selectedYear === 2025 && (
          <PeriodComparisonCharts 
            ytdSummaryData={tillDateComparisonData.ytd}
            mtdDataForSelectedMonth={tillDateComparisonData.mtd[monthMap[selectedMonth]] || null}
            allMonthsComparisonData={yearOnYearComparisonData} 
            selectedMonthLabel={monthMap[selectedMonth]}
            currentYear={2025}
            previousYear={2024}
            isExpanded={isComparisonExpanded}
            onToggleExpand={() => setIsComparisonExpanded(!isComparisonExpanded)}
          />
        )}
        
        <motion.div variants={itemVariants} className="card overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Revenue Breakdown</h2>
            <div className="flex items-center bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
              <Coins className="text-primary-500 mr-2" size={18} />
              <span className="text-sm font-medium">Distribution</span>
            </div>
          </div>
          
          <div className="h-72 flex flex-col md:flex-row">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <defs>
                  {revenueBreakdown.map((entry, index) => (
                    <filter key={`filter-${index}`} id={`shadow-${index}`} height="130%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" floodColor={entry.color} />
                    </filter>
                  ))}
                  {revenueBreakdown.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={45}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={3}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  label={({ name: _name, percent }) => {
                    return percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : '';
                  }}
                  activeIndex={Array.from({ length: revenueBreakdown.length }, (_, i) => i)}
                  activeShape={(props: any) => {
                    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                    return (
                      <g>
                        <Sector
                          cx={cx}
                          cy={cy}
                          innerRadius={innerRadius}
                          outerRadius={outerRadius + 5}
                          startAngle={startAngle}
                          endAngle={endAngle}
                          fill={fill}
                          opacity={0.3}
                        />
                        <Sector
                          cx={cx}
                          cy={cy}
                          innerRadius={innerRadius}
                          outerRadius={outerRadius}
                          startAngle={startAngle}
                          endAngle={endAngle}
                          fill={fill}
                        />
                      </g>
                    );
                  }}
                >
                  {revenueBreakdown.map((_entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pieGradient-${index})`} 
                      filter={`url(#shadow-${index})`}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.75rem',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '0.75rem'
                  }}
                  itemStyle={{
                    padding: '5px 0',
                    fontWeight: 500
                  }}
                  wrapperStyle={{
                    zIndex: 100
                  }}
                />
                <Legend 
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    paddingLeft: '10px'
                  }}
                  formatter={(value, _entry, index) => {
                    const { color } = revenueBreakdown[index];
                    return <span style={{ color, fontWeight: 600 }}>{value}</span>;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="40%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="20%" 
                outerRadius="90%" 
                data={radialChartData} 
                startAngle={180} 
                endAngle={0}
                barSize={25}
              >
                <defs>
                  {radialChartData.map((entry, index) => (
                    <linearGradient key={`radialGradient-${index}`} id={`radialGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={entry.fill} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={entry.fill} stopOpacity={1} />
                    </linearGradient>
                  ))}
                </defs>
                <PolarGrid radialLines={false} />
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const { name, payload: itemPayload } = payload[0];
                      return (
                        <div className="custom-tooltip bg-white p-3 rounded-md shadow-lg border border-gray-200">
                          <p className="font-semibold text-gray-800 mb-1">{name}</p>
                          <p className="text-sm text-gray-700">Target: {itemPayload.target?.toLocaleString()}</p>
                          <p className="text-sm text-gray-700">Actual: {itemPayload.actual?.toLocaleString()}</p>
                          <p className="text-sm font-bold" style={{ color: itemPayload.fill }}>
                            Achievement: {itemPayload.value.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  wrapperStyle={{ outline: 'none' }}
                  cursor={{ stroke: '#f0f0f0', strokeWidth: 1, fill: 'rgba(240, 240, 240, 0.2)' }}
                />
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={15}
                  label={{
                    position: 'insideStart',
                    fill: '#fff',
                    fontSize: 12,
                    fontWeight: 'bold',
                    formatter: (value: number) => `${value.toFixed(0)}%`
                  }}
                  animationDuration={1800}
                  animationEasing="ease-out"
                >
                  {radialChartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#radialGradient-${index})`} />
                  ))}
                </RadialBar>
                <Legend 
                  iconSize={12} 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{
                    paddingLeft: '10px'
                  }}
                  formatter={(value, _entry, _index) => {
                    return <span>{value}</span>;
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(0)}%`, 'Target Completion']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.75rem',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '0.75rem'
                  }}
                  itemStyle={{
                    padding: '5px 0',
                    fontWeight: 500
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Removed Month and Year Selector - Now at the top */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="card overflow-hidden">
          <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Top Advisors by Revenue</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topAdvisorsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4361ee" stopOpacity={1} />
                    <stop offset="100%" stopColor="#7209b7" stopOpacity={0.8} />
                  </linearGradient>
                  <filter id="shadow" height="130%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="1" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} vertical={false} />
                <XAxis 
                  dataKey="advisorName" 
                  tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '0.75rem'
                  }}
                  cursor={{ fill: 'rgba(67, 97, 238, 0.1)' }}
                />
                <Bar 
                  dataKey="totalRevenue" 
                  fill="url(#colorGradient)" 
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  filter="url(#shadow)"
                >
                  <LabelList 
                    dataKey="totalRevenue" 
                    position="top" 
                    formatter={(value: number) => `₹${(value/1000).toFixed(0)}k`}
                    style={{ fontSize: 10, fill: '#6b7280', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Quarterly Performance Trends</h2>
            <select 
              value={selectedTrendMetricKey}
              onChange={(e) => setSelectedTrendMetricKey(e.target.value as keyof MonthlyTrendItem)}
              className="p-2 border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {trendMetricsOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={quarterlyTrendsChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <defs>
                  <linearGradient id="bar2024" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="bar2025" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7209b7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7209b7" stopOpacity={0.2}/>
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.1"/>
                  </filter>
                </defs>
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => trendMetricsOptions.find(o => o.value === selectedTrendMetricKey)?.isCurrency ? `₹${(value / 100000).toFixed(0)}L` : value.toLocaleString()}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    const metricOption = trendMetricsOptions.find(opt => opt.value === selectedTrendMetricKey);
                    const formattedValue = metricOption?.isCurrency ? formatIndianCurrency(value) : value.toLocaleString();
                    return [formattedValue, name];
                  }}
                />
                <Legend />
                <Bar dataKey="2024" barSize={20} fill="url(#bar2024)" name="2024" radius={[4, 4, 0, 0]} filter="url(#shadow)" />
                <Bar dataKey="2025" barSize={20} fill="url(#bar2025)" name="2025" radius={[4, 4, 0, 0]} filter="url(#shadow)" />
                <Line type="monotone" dataKey="2025" stroke="#f72585" name="2025 Trend" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#f72585' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      

      
      {/* Data Table */}
      <motion.div variants={itemVariants} className="card overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Service Advisor Performance</h2>
          <div className="flex items-center bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
            <Users className="text-primary-500 mr-2" size={18} />
            <span className="text-sm font-medium">All Advisors</span>
          </div>
        </div>
        
        <div style={{ maxHeight: '400px', overflow: 'auto', width: '100%' }}>
          <div style={{ minWidth: '2000px' }}>
            <DataTable
              data={advisorPerformanceTableData}
              searchable={true}
              columns={[
                { header: 'Service Advisor', accessor: (row: ProcessedAdvisorPerformance) => row.advisorName },
                { header: 'Throughput', accessor: (row: ProcessedAdvisorPerformance) => row.throughput, className: 'text-right' },
                { header: 'VAS (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["VAS (INR)"]), className: 'text-right' },
                { header: 'Labour (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["LAB"]), className: 'text-right' },
                { header: 'Accessories (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["ACCES"]), className: 'text-right' },
                { header: 'Lubricants (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["LUB"]), className: 'text-right' },
                { header: 'Brake Pad (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["Brake Pad (INR)"]), className: 'text-right' },
                { header: 'Brake Pad (Nos)', accessor: (row: ProcessedAdvisorPerformance) => row.revenueItems["Brake Pad (Nos)"], className: 'text-right' },
                { header: 'Wiper Blade (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["Wiper Blade (INR)"]), className: 'text-right' },
                { header: 'Wiper Blade (Nos)', accessor: (row: ProcessedAdvisorPerformance) => row.revenueItems["Wiper Blade (Nos)"], className: 'text-right' },
                { header: 'Washer Fluid (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["Washer Fluid (INR)"]), className: 'text-right' },
                { header: 'Washer Fluid (Nos)', accessor: (row: ProcessedAdvisorPerformance) => row.revenueItems["Washer Fluid (Nos)"], className: 'text-right' },
                { header: 'Wheel Align. (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["Wheel Alignment (INR)"]), className: 'text-right' },
                { header: 'Wheel Align. (Nos)', accessor: (row: ProcessedAdvisorPerformance) => row.revenueItems["Wheel Alignment (Nos)"], className: 'text-right' },
                { header: 'Battery (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["BAT (INR)"]), className: 'text-right' },
                { header: 'Battery (Nos)', accessor: (row: ProcessedAdvisorPerformance) => row.revenueItems["BAT (Nos)"], className: 'text-right' },
                { header: 'Parts (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.revenueItems["Parts (INR)"]), className: 'text-right' },
                { header: 'Total Revenue (₹)', accessor: (row: ProcessedAdvisorPerformance) => formatIndianCurrency(row.calculatedTotalRevenue), className: 'font-semibold text-right' }
              ]}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RevenueDashboard;