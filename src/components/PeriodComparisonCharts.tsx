import React, { useState } from 'react';
import { ChevronsDownUp, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  BarChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
  Cell
} from 'recharts';

import { MtdKpiMetricSet, YtdComparisonDataType } from '../data/tillDateComparisonData'; // Adjust path if necessary
import { MonthlyComparisonData } from '../data/yearOnYearComparisonData'; // Added for expanded view

export type PeriodMetricKey = 'totalRevenue' | 'labourRevenue' | 'partsRevenue' | 'accessoriesRevenue' | 'throughput';

export interface PeriodComparisonChartsProps {
  ytdSummaryData: YtdComparisonDataType;
  mtdDataForSelectedMonth: MtdKpiMetricSet | null;
  allMonthsComparisonData: MonthlyComparisonData[]; // For expanded MTD view
  selectedMonthLabel: string; // e.g., "JUN"
  currentYear: number; // e.g., 2025
  previousYear: number; // e.g., 2024
  isExpanded: boolean; // Controls overall expansion
  onToggleExpand: () => void; // For expanded MTD view
}

// type RevenueCategory = 'totalRevenue' | 'labor' | 'parts' | 'accessories' | 'lubricants' | 'battery' | 'tyre'; // Old type

// type RevenueCategoryData = { // Old type
//   ytd2025: number;
//   ytd2024: number;
//   mtdJun: number;
//   mtdMay: number;
//   label: string;
// };

// type RevenueCategoriesType = { // Old type
//   [key in RevenueCategory]: RevenueCategoryData;
// };

// Helper function to get display label for metric keys
const getMetricLabel = (metric: PeriodMetricKey | keyof Omit<MonthlyComparisonData, 'month'>): string => {
  switch (metric) {
    case 'totalRevenue': return 'Total Revenue';
    case 'labourRevenue': return 'Labour Revenue';
    case 'partsRevenue': return 'Parts Revenue';
    case 'accessoriesRevenue': return 'Accessories Revenue';
    case 'throughput': return 'Throughput';
    case 'mechRo': return 'Mechanical ROs';
    case 'bpRo': return 'Body & Paint ROs';
    // Add other cases from MonthlyComparisonData if they differ or need specific labels
    default: 
      // Capitalize first letter for default cases
      const str = String(metric);
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1').trim();
  }
};

// Helper function to format currency
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  } else {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
};

const PeriodComparisonCharts: React.FC<PeriodComparisonChartsProps> = ({
  ytdSummaryData,
  mtdDataForSelectedMonth,
  allMonthsComparisonData,
  selectedMonthLabel,
  currentYear,
  previousYear,
  isExpanded,
  onToggleExpand
}) => {
  // State for selected metrics
  const [ytdMetric, setYtdMetric] = useState<PeriodMetricKey>('totalRevenue');
  const [mtdMetric, setMtdMetric] = useState<PeriodMetricKey>('totalRevenue');
  // isYtdExpanded is now controlled by the isExpanded prop
  const [expandedMtdMetric, setExpandedMtdMetric] = useState<keyof Omit<MonthlyComparisonData, 'month'>>('partsRevenue'); // Default for new expanded chart

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  // Data is now passed via props. Hardcoded revenueCategories removed.
  
  const selectedYtdMetricDataSet = ytdSummaryData[ytdMetric];
  const ytdData = [
    {
      name: `${previousYear} (LYTD)`,
      value: selectedYtdMetricDataSet?.summary?.previous || 0,
      fill: 'url(#colorYTD2024)' // Use gradient URL
    },
    {
      name: `${currentYear} (YTD)`,
      value: selectedYtdMetricDataSet?.summary?.current || 0,
      fill: 'url(#colorYTD2025)' // Use gradient URL
    }
  ];

  const ytdPercentChange = selectedYtdMetricDataSet?.summary?.percentChange?.toFixed(1) ?? 
    (selectedYtdMetricDataSet?.summary?.previous && selectedYtdMetricDataSet?.summary?.previous !== 0 
      ? (((selectedYtdMetricDataSet.summary.current - selectedYtdMetricDataSet.summary.previous) / selectedYtdMetricDataSet.summary.previous) * 100).toFixed(1) 
      : (selectedYtdMetricDataSet?.summary?.current ?? 0 > 0 ? "∞" : "0"));

  const selectedMtdMetricDataSet = mtdDataForSelectedMonth ? mtdDataForSelectedMonth[mtdMetric] : null;
  const mtdData = selectedMtdMetricDataSet ? [
    {
      name: `${selectedMonthLabel} ${previousYear}`,
      value: selectedMtdMetricDataSet.previous || 0,
      fill: '#4cc9f0'
    },
    {
      name: `${selectedMonthLabel} ${currentYear}`,
      value: selectedMtdMetricDataSet.current || 0,
      fill: '#f72585'
    }
  ] : [];

  const mtdPercentChange = selectedMtdMetricDataSet?.percentChange?.toFixed(1) ?? 
    (selectedMtdMetricDataSet?.previous && selectedMtdMetricDataSet?.previous !== 0 
      ? (((selectedMtdMetricDataSet.current - selectedMtdMetricDataSet.previous) / selectedMtdMetricDataSet.previous) * 100).toFixed(1) 
      : (selectedMtdMetricDataSet?.current ?? 0 > 0 ? "∞" : "0"));

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-primary-600 font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_auto_1fr]'} gap-6 mb-6`}
    >
      {/* YTD vs LYTD Chart */}
      <motion.div 
        variants={itemVariants} 
        className={`card bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              YTD vs LYTD Comparison {isExpanded ? `(${getMetricLabel(ytdMetric)} - Monthly Breakdown)` : ''}
            </h2>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setYtdMetric('totalRevenue')}
              className={`btn text-xs py-1 px-3 ${ytdMetric === 'totalRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Total Revenue
            </button>
            <button
              onClick={() => setYtdMetric('labourRevenue')}
              className={`btn text-xs py-1 px-3 ${ytdMetric === 'labourRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Labour Revenue
            </button>
            <button
              onClick={() => setYtdMetric('partsRevenue')}
              className={`btn text-xs py-1 px-3 ${ytdMetric === 'partsRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Parts Revenue
            </button>
            <button
              onClick={() => setYtdMetric('accessoriesRevenue')}
              className={`btn text-xs py-1 px-3 ${ytdMetric === 'accessoriesRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Accessories Revenue
            </button>
            <button
              onClick={() => setYtdMetric('throughput')}
              className={`btn text-xs py-1 px-3 ${ytdMetric === 'throughput' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Throughput
            </button>
          </div>
        </div>
        
        <div className={`${isExpanded ? 'h-[60vh]' : 'h-80'} relative overflow-hidden group transition-all duration-300 ease-in-out`}>
          <div className="absolute inset-0 bg-gradient-to-r from-chart-blue/5 to-chart-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <ResponsiveContainer width="100%" height="100%">
            {!isExpanded ? (
              <BarChart
                data={ytdData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barSize={60}
              >
                <defs>
                  <linearGradient id="colorYTD2025" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f72585" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f72585" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="colorYTD2024" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  iconType="circle"
                  iconSize={8}
                  payload={[
                    { value: `${previousYear} (LYTD)`, type: 'square', id: 'lytd', color: '#4361ee' },
                    { value: `${currentYear} (YTD)`, type: 'square', id: 'ytd', color: '#f72585' },
                  ]}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {ytdData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList
                    content={(props: any) => {
                      const { index, value, x, y, width } = props;
                      if (index === 1 && value > 0) { // YTD bar is at index 1
                        return (
                          <text x={x + width / 2} y={y} dy={-6} fill="#f72585" fontSize="12px" fontWeight="bold" textAnchor="middle">
                            {`${ytdPercentChange !== "0" && ytdPercentChange !== "∞" ? (parseFloat(ytdPercentChange) > 0 ? '+' : '') : ''}${ytdPercentChange}%`}
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </Bar>
              </BarChart>
            ) : (
              <ComposedChart
                data={ytdSummaryData[ytdMetric]?.monthlyBreakdown || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  width={80}
                />
                <Tooltip 
                  labelStyle={{ color: "#374151", fontWeight: "bold", marginBottom: "5px" }}
                  formatter={(value: number, name: string /* LYTD or YTD */, props: any) => {
                    let formattedValue;
                    if (ytdMetric === 'throughput') {
                      formattedValue = value.toString(); // Throughput is a count
                    } else {
                      formattedValue = formatCurrency(value); // Revenues are currency
                    }
                    // 'name' will be "LYTD" or "YTD" from the Line component
                    // The color will be automatically picked up by the tooltip from the line's stroke (props.payload.stroke)
                    return [
                      <span style={{ color: props.payload.stroke }}>{formattedValue}</span>,
                      name
                    ];
                  }}
                  labelFormatter={(label: string /* Month e.g., "Jan" */) => {
                    return label; // Just show the month
                  }}
                  wrapperStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' }}
                  itemStyle={{ padding: '3px 0', color: '#4b5563' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
                /> 
                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" iconSize={8} />
                <Line type="monotone" dataKey="previousCumulative" name="LYTD" stroke="#4361ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="currentCumulative" name="YTD" stroke="#f72585" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Centered Toggle Button */}
      <div className="flex justify-center items-center my-1">
        <button 
          onClick={onToggleExpand}
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-150 ease-in-out"
          title={isExpanded ? "Collapse Charts" : "Expand Charts"}
        >
          {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronsDownUp className="h-6 w-6" />}
        </button>
      </div>

      {/* MTD vs LMTD Chart (Conditional Rendering based on isExpanded) */}
      {!isExpanded && (
        <motion.div 
          variants={itemVariants} 
          className="card bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
        >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            MTD vs LYMTD Comparison ({selectedMonthLabel})        </h2>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setMtdMetric('totalRevenue')}
              className={`btn text-xs py-1 px-3 ${mtdMetric === 'totalRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Total Revenue
            </button>
            <button
              onClick={() => setMtdMetric('labourRevenue')}
              className={`btn text-xs py-1 px-3 ${mtdMetric === 'labourRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Labour Revenue
            </button>
            <button
              onClick={() => setMtdMetric('partsRevenue')}
              className={`btn text-xs py-1 px-3 ${mtdMetric === 'partsRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Parts Revenue
            </button>
            <button
              onClick={() => setMtdMetric('accessoriesRevenue')}
              className={`btn text-xs py-1 px-3 ${mtdMetric === 'accessoriesRevenue' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Accessories Revenue
            </button>
            <button
              onClick={() => setMtdMetric('throughput')}
              className={`btn text-xs py-1 px-3 ${mtdMetric === 'throughput' ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
            >
              Throughput
            </button>
          </div>
        </div>
        
        <div className="h-80 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-chart-blue/5 to-chart-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mtdData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barSize={60}
            >
              <defs>
                <linearGradient id="colorMTDJun" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f72585" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f72585" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="colorMTDMay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4cc9f0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4cc9f0" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="circle"
                iconSize={8}
              />
              <Bar 
                dataKey="value"
                name={getMetricLabel(mtdMetric)}
                radius={[6, 6, 0, 0]}
                fill="url(#colorMTDJun)"
              >
                {/* Add percentage change label to the second bar (JUN) */}
                {/* Percentage change label */}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={() => `+${mtdPercentChange}%`}
                  style={{ fontWeight: 'bold', fontSize: '12px', fill: '#f72585' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        </motion.div>
      )}

      {isExpanded && (
        <motion.div 
          variants={itemVariants} 
          className="card bg-gradient-to-br from-white to-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Placeholder for new Expanded MTD All Months Chart */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-2 sm:mb-0">
              Monthly Comparison ({currentYear} vs {previousYear}) - {getMetricLabel(expandedMtdMetric)}
            </h2>
            <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg self-start sm:self-center">
              {(Object.keys(allMonthsComparisonData[0] || {}).filter(key => key !== 'month') as Array<keyof Omit<MonthlyComparisonData, 'month'>>).map(metric => (
                <button
                  key={metric}
                  onClick={() => setExpandedMtdMetric(metric)}
                  className={`btn text-xs py-1 px-2 ${expandedMtdMetric === metric ? 'bg-white text-primary-600 shadow-sm' : 'bg-transparent text-gray-600'}`}
                >
                  {getMetricLabel(metric)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={(() => {
                const monthOrder: { [key: string]: number } = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
                // Ensure allMonthsComparisonData is not empty and has the metric
                if (!allMonthsComparisonData || allMonthsComparisonData.length === 0 || !allMonthsComparisonData[0][expandedMtdMetric]) {
                  return [];
                }
                return allMonthsComparisonData
                  .map(monthlyData => ({
                    month: monthlyData.month,
                    [`${previousYear}`]: monthlyData[expandedMtdMetric]?.[previousYear.toString() as '2024' | '2025'] || 0,
                    [`${currentYear}`]: monthlyData[expandedMtdMetric]?.[currentYear.toString() as '2024' | '2025'] || 0,
                  }))
                  .sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
              })()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.6} vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4b5563' }} axisLine={{ stroke: '#d1d5db' }} tickLine={false} />
                <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: '#4b5563' }} axisLine={{ stroke: '#d1d5db' }} tickLine={false} width={70}/>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" iconSize={8} />
                <Bar dataKey={`${previousYear}`} fill="#60a5fa" name={`${previousYear}`} radius={[4, 4, 0, 0]} barSize={20}/>
                <Bar dataKey={`${currentYear}`} fill="#f472b6" name={`${currentYear}`} radius={[4, 4, 0, 0]} barSize={20}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PeriodComparisonCharts;
