import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Filter,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
// import { 
//   complaintData, 
//   getComplaintCountsByStatus,
//   // getComplaintCountsByType, // Replaced by PSF data logic
//   complaintTrends
// } from '../data'; // Replaced by psfComprehensiveComplaintsData
import {
  psfDetailedComplaintData, // Retained for PSF Complaints by Type Pie Chart
  allPsfComplaintTypes      // Retained for PSF Complaints by Type Pie Chart
} from '../data/psfAdvisorComplaintData';
import {
  psfComprehensiveComplaintsData,
  flattenComplaintsData,
  getAvailableYearsFromComplaints,
  ALL_MONTHS_ORDERED, // Added import
  type PsfComplaint, // Added import
  type PsfYearlyComplaints // Added import
} from '../data/psfComprehensiveComplaintsData';

const ComplaintsDashboard: React.FC = () => {
  // Data specifically for 2025 monthly trends, not affected by filters
  const yearlyData2025 = psfComprehensiveComplaintsData.find(yearlyData => yearlyData.year === 2025);
  const complaintsForMonthlyTrends2025: PsfComplaint[] = yearlyData2025 && yearlyData2025.months
    ? Object.values(yearlyData2025.months).flat()
    : [];
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Initialize with available years from comprehensive data
  const comprehensiveAvailableYears = getAvailableYearsFromComplaints(psfComprehensiveComplaintsData);
  const [selectedPsfYear, setSelectedPsfYear] = useState<number>(comprehensiveAvailableYears[0] || new Date().getFullYear());
  const [selectedPsfMonth, setSelectedPsfMonth] = useState<string>(''); // '' for All Months

  // Memoized list of all unique service advisors for search recommendations
  const allServiceAdvisors = useMemo(() => {
    const allFlattenedComplaints = flattenComplaintsData(psfComprehensiveComplaintsData); // Get all complaints, no year/month filter
    const advisors = new Set(allFlattenedComplaints.map(c => c.serviceAdvisor).filter(Boolean)); // Filter out undefined/empty strings
    return Array.from(advisors).sort();
  }, []); // Depends only on the base data, so computes once
  
  const [allComplaintsForPeriod, setAllComplaintsForPeriod] = useState<PsfComplaint[]>([]);
  const [advisorSearchText, setAdvisorSearchText] = useState<string>('');
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [advisorRecommendations, setAdvisorRecommendations] = useState<string[]>([]);

  // State for PSF Complaints by Type Pie Chart (uses different data source)
  const [psfComplaintTypeData, setPsfComplaintTypeData] = useState<{ name: string; value: number }[]>([]);

  // Effect to update advisor recommendations based on search text
  useEffect(() => {
    if (advisorSearchText) {
      const filteredAdvisors = allServiceAdvisors.filter(advisor =>
        advisor.toLowerCase().includes(advisorSearchText.toLowerCase())
      );
      setAdvisorRecommendations(filteredAdvisors);
    } else {
      setAdvisorRecommendations([]);
    }
  }, [advisorSearchText, allServiceAdvisors]);

  const handleAdvisorSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvisorSearchText(e.target.value);
    if (!e.target.value) { // If search text is cleared, also clear selected advisor
      setSelectedAdvisor(null);
    }
  };

  const handleSelectAdvisor = (advisor: string) => {
    setSelectedAdvisor(advisor);
    setAdvisorSearchText(advisor); // Populate search bar with selected advisor
    setAdvisorRecommendations([]); // Hide recommendations
  };

  const clearSelectedAdvisor = () => {
    setSelectedAdvisor(null);
    setAdvisorSearchText('');
    setAdvisorRecommendations([]);
  };

  const psfMonthsDropdownOptions = [
    { value: '', label: 'All Months' },
    ...ALL_MONTHS_ORDERED.map(month => ({ value: month, label: month }))
  ];

  // Effect to load and filter comprehensive complaints data based on year/month selection
  useEffect(() => {
    let complaints = flattenComplaintsData(
      psfComprehensiveComplaintsData,
      selectedPsfYear,
      selectedPsfMonth === '' ? undefined : selectedPsfMonth
    );

    if (selectedAdvisor) {
      complaints = complaints.filter(c => c.serviceAdvisor === selectedAdvisor);
    }

    setAllComplaintsForPeriod(complaints);
  }, [selectedPsfYear, selectedPsfMonth, selectedAdvisor]);

  // Calculate stats from allComplaintsForPeriod
  const totalComplaints = allComplaintsForPeriod.length;
  const resolvedComplaintsCount = allComplaintsForPeriod.filter(c => c.status === 'closed').length;
  const pendingComplaintsCount = allComplaintsForPeriod.filter(c => c.status === 'Open' || c.status === 'Pending').length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaintsCount / totalComplaints) * 100) : 0;

  // PSF Complaints by Type Data Processing (Pie Chart - uses psfDetailedComplaintData)
  useEffect(() => {
    const aggregatedCounts: { [key: string]: number } = {};
    allPsfComplaintTypes.forEach(type => {
      aggregatedCounts[type] = 0;
    });

    const yearData = psfDetailedComplaintData.filter(item => item.year === selectedPsfYear);

    yearData.forEach(monthlyData => {
      if (selectedPsfMonth === '' || monthlyData.month === selectedPsfMonth) {
        monthlyData.records.forEach(advisorRecord => {
          if (!selectedAdvisor || advisorRecord.advisorName === selectedAdvisor) {
          Object.entries(advisorRecord.complaints).forEach(([type, count]) => {
            if (aggregatedCounts.hasOwnProperty(type)) {
              aggregatedCounts[type] += count;
            } else {
              // This case should ideally not happen if allPsfComplaintTypes is comprehensive
              // Or if new types appear in data not listed in allPsfComplaintTypes
              aggregatedCounts[type] = count;
            }
          });
          }
        });
      }
    });

    const formattedData = Object.entries(aggregatedCounts)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0); // Optionally filter out types with zero complaints

    setPsfComplaintTypeData(formattedData);
  }, [selectedPsfYear, selectedPsfMonth, selectedAdvisor, psfDetailedComplaintData, allPsfComplaintTypes]);
  
  // Prepare data for priority distribution from allComplaintsForPeriod
  const priorityData = ['High', 'Medium', 'Low'].map(pLevel => ({
    name: pLevel,
    value: allComplaintsForPeriod.filter(c => c.priority === pLevel).length
  }));
  
  // Prepare data for resolution time from allComplaintsForPeriod
  const resolutionTimeData = allComplaintsForPeriod
    .filter(c => c.status === 'Closed' || c.status === 'closed') // Consider both casings for closed status
    .map(c => {
      const potentialDateValues: any[] = Object.values(c);
      const dateStrings: string[] = [];

      for (const value of potentialDateValues) {
        if (typeof value === 'string' && value.trim() !== "") {
          // Basic check for date-like strings (YYYY-MM-DD or DD/MM/YYYY or MM/DD/YYYY etc.)
          // This regex is a heuristic and might need refinement based on actual date formats
          if (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/.test(value)) {
            const d = new Date(value);
            if (!isNaN(d.getTime())) {
              dateStrings.push(value);
            }
          }
        }
      }

      const parsedDates: Date[] = dateStrings
        .map(dateStr => {
          // Attempt to normalize DD/MM/YYYY to MM/DD/YYYY for robust parsing if needed
          // For now, directly parsing, assuming JavaScript's Date constructor handles common formats
          return new Date(dateStr);
        })
        .filter(date => !isNaN(date.getTime()));

      if (parsedDates.length < 2) {
        // Need at least two valid dates to calculate a difference
        return { id: c.id, days: 0 };
      }

      // Sort dates to easily find min and max
      parsedDates.sort((a, b) => a.getTime() - b.getTime());
      
      const minDate = parsedDates[0];
      const maxDate = parsedDates[parsedDates.length - 1];
      
      const timeDiff = maxDate.getTime() - minDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      return {
        id: c.id,
        days: daysDiff >= 0 ? daysDiff : 0 // Ensure resolution time is not negative
      };
    });
  
  const totalResolutionDays = resolutionTimeData.reduce((sum, item) => sum + item.days, 0);
  const avgResolutionTime = resolutionTimeData.length > 0 ? parseFloat((totalResolutionDays / resolutionTimeData.length).toFixed(1)) : 0;

  // Filter complaints for DataTable based on statusFilter and allComplaintsForPeriod
  const filteredComplaints = allComplaintsForPeriod.filter(c => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'resolved') return c.status === 'Closed';
    if (statusFilter === 'pending') return c.status === 'Open' || c.status === 'Pending';
    return true;
  });

  // Prepare data for Complaint Trends Line Chart using 2025 data
  const complaintTrendsData = ALL_MONTHS_ORDERED.map((monthName, monthIndex) => {
    const complaintsInMonth = complaintsForMonthlyTrends2025.filter(c => {
      const complaintDate = new Date(c.receivedDate);
      return complaintDate.getMonth() === monthIndex;
    });
    return {
      month: monthName.substring(0, 3),
      total: complaintsInMonth.length,
      resolved: complaintsInMonth.filter(c => c.status === 'closed').length, // Ensure lowercase 'closed'
      pending: complaintsInMonth.filter(c => c.status === 'Open' || c.status === 'Pending').length
    };
  });
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];
  const PRIORITY_COLORS = {
    'High': '#ef4444',
    'Medium': '#f59e0b',
    'Low': '#10b981'
  };
  
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
  
  const [isResolutionChartExpanded, setIsResolutionChartExpanded] = useState(false);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Effect to handle Escape key for closing expanded chart
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isResolutionChartExpanded) {
        setIsResolutionChartExpanded(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isResolutionChartExpanded]);

  // Prepare data for Resolution Time Distribution Chart (Bucketed)
  const getResolutionBucketsDefinition = (expanded: boolean) => {
    if (expanded) {
      return [
        { name: "0-5 days", min: 0, max: 5 },
        { name: "6-10 days", min: 6, max: 10 },
        { name: "11-15 days", min: 11, max: 15 },
        { name: "16-20 days", min: 16, max: 20 },
        { name: "21-25 days", min: 21, max: 25 },
        { name: "26-30 days", min: 26, max: 30 },
        { name: "31+ days", min: 31, max: Infinity },
      ];
    } else {
      return [
        { name: "0-5 days", min: 0, max: 5 },
        { name: "6-10 days", min: 6, max: 10 },
        { name: "11-15 days", min: 11, max: 15 },
        { name: "16+ days", min: 16, max: Infinity },
      ];
    }
  };

  const resolutionBucketsDefinition = getResolutionBucketsDefinition(isResolutionChartExpanded);
  const resolutionTimeBuckets = resolutionBucketsDefinition.map(bucket => ({
    name: bucket.name,
    count: resolutionTimeData.filter(item => item.days >= bucket.min && item.days <= bucket.max).length,
  }));

  return (
    <motion.div 
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold mb-6">PSF Internal Complaints</h1>
      </motion.div>

      {/* PSF Filters Row - Sticky and Styled (Matched to RevenueDashboard) */}
      <motion.div 
        variants={itemVariants} 
        className="sticky top-0 z-10 w-auto max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-primary-100 py-2 px-4 mb-4 transform transition-all duration-300 hover:shadow-xl"
        style={{ boxShadow: '0 4px 20px rgba(67, 97, 238, 0.15)' }}
      >
        <div className="flex items-center justify-center gap-3">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="psfYearFilter" className="text-xs font-medium text-primary-600 whitespace-nowrap">Year</label>
            <select 
              id="psfYearFilter"
              value={selectedPsfYear}
              onChange={(e) => setSelectedPsfYear(Number(e.target.value))}
              className="text-sm px-2 py-1 bg-primary-50 border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-primary-700"
            >
              {comprehensiveAvailableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="psfMonthFilter" className="text-xs font-medium text-primary-600 whitespace-nowrap">Month</label>
            <select 
              id="psfMonthFilter"
              value={selectedPsfMonth}
              onChange={(e) => setSelectedPsfMonth(e.target.value)}
              className="text-sm px-2 py-1 bg-primary-50 border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-primary-700"
            >
              {psfMonthsDropdownOptions.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Advisor Filter */}
          <div className="flex items-center gap-2 relative">
            <label htmlFor="advisorSearch" className="text-xs font-medium text-primary-600 whitespace-nowrap">Advisor</label>
            <div className="flex items-center">
              <input 
                type="text"
                id="advisorSearch"
                placeholder="Search Advisor..."
                value={advisorSearchText}
                onChange={handleAdvisorSearchChange}
                className="text-sm px-2 py-1 bg-primary-50 border border-primary-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-primary-700 w-40"
              />
              {selectedAdvisor && (
                <button 
                  onClick={clearSelectedAdvisor} 
                  className="ml-1 p-1 text-gray-400 hover:text-gray-600"
                  title="Clear advisor filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {advisorRecommendations.length > 0 && advisorSearchText && !selectedAdvisor && (
              <ul className="absolute top-full left-0 mt-1 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {advisorRecommendations.map(advisor => (
                  <li 
                    key={advisor}
                    onClick={() => handleSelectAdvisor(advisor)}
                    className="px-3 py-2 text-sm hover:bg-primary-100 cursor-pointer"
                  >
                    {advisor}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Stat Cards Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Complaints"
          value={totalComplaints.toString()}
          icon={<AlertCircle className="text-red-500" size={24} />}
          // trend="vs last month" // Placeholder for more complex trend logic
        />
        <StatCard 
          title="Resolved"
          value={resolvedComplaintsCount.toString()}
          icon={<CheckCircle2 className="text-green-500" size={24} />}
          subValue={`${resolutionRate}% resolution rate`}
        />
        <StatCard 
          title="Pending"
          value={pendingComplaintsCount.toString()}
          icon={<Clock className="text-yellow-500" size={24} />}
          // trend="new this month" // Placeholder
        />
        <StatCard 
          title="Avg. Resolution Time"
          value={`${avgResolutionTime} days`}
          icon={<AlertTriangle className="text-orange-500" size={24} />}
          // trend="vs target" // Placeholder
        />
      </motion.div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Complaints by Type</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {psfComplaintTypeData.map((_, index) => (
                    <filter key={`psf-filter-${index}`} id={`psf-shadow-${index}`} height="130%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" floodColor={COLORS[index % COLORS.length]} />
                    </filter>
                  ))}
                  {psfComplaintTypeData.map((_, index) => (
                    <linearGradient key={`psf-gradient-${index}`} id={`psf-pieGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                      <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={psfComplaintTypeData} // Use new PSF data
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={45}
                  fill="#8884d8" /* Default fill, overridden by Cell */
                  dataKey="value"
                  label={({ percent }) => {
                    const percentageValue = (percent * 100).toFixed(0);
                    return percentageValue === '0' ? null : `${percentageValue}%`;
                  }}
                >
                  {psfComplaintTypeData.map((_, index) => (
                    <Cell key={`cell-type-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Priority Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Complaints">
                  {priorityData.map((entry, index) => (
                    <Cell 
                      key={`cell-priority-${index}`} 
                      fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants} className="card">
          <h2 className="text-lg font-semibold mb-4">Monthly Complaint Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={complaintTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} name="Total Complaints"/>
                <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved"/>
                <Line type="monotone" dataKey="pending" stroke="#ffc658" name="Pending"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className={isResolutionChartExpanded 
            ? "fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm"
            : "card"
          }
        >
          <div className={isResolutionChartExpanded ? 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col' : 'h-full'}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${isResolutionChartExpanded ? 'text-gray-900 dark:text-white' : ''}`}>Resolution Time Distribution</h2>
              <button 
                onClick={() => setIsResolutionChartExpanded(!isResolutionChartExpanded)}
                className={`p-1 rounded-md ${isResolutionChartExpanded ? 'text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                title={isResolutionChartExpanded ? 'Collapse chart (Esc)' : 'Expand chart'}
              >
                {isResolutionChartExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
            <div className={isResolutionChartExpanded ? "flex-grow min-h-0" : "h-72"}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resolutionTimeBuckets} margin={{ top: 5, right: 30, left: 20, bottom: isResolutionChartExpanded ? 20 : 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={isResolutionChartExpanded && resolutionTimeBuckets.length > 5 ? -30 : 0} textAnchor={isResolutionChartExpanded && resolutionTimeBuckets.length > 5 ? 'end' : 'middle'} height={isResolutionChartExpanded && resolutionTimeBuckets.length > 5 ? 60 : undefined} />
                  <YAxis allowDecimals={false} label={{ value: 'Number of Complaints', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, _name, props) => [`${value} complaints`, props.payload.name]} />
                  <Legend />
                  <Bar dataKey="count" name="Complaints">
                    {resolutionTimeBuckets.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {isResolutionChartExpanded && <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">Press Esc to close</p>}
          </div>
        </motion.div>
      </div>
    
    {/* Complaints Table */}
    <motion.div variants={itemVariants} className="card">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Complaint Details</h2>
        
        <div className="flex items-center mt-2 sm:mt-0">
          <Filter className="text-gray-500 mr-2" size={16} />
          <span className="mr-2 text-sm">Status:</span>
          <select
            className="px-2 py-1 border rounded-md text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="resolved">Resolved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div className="h-96 overflow-y-auto">
        <DataTable
        data={filteredComplaints}
        columns={[
          { header: 'Complaint ID', accessor: 'id' },
          { header: 'Customer', accessor: 'customerName' },
          { header: 'Advisor', accessor: 'serviceAdvisor' },
          { header: 'Received', accessor: 'receivedDate' },
          {
            header: 'Priority',
            accessor: (row: PsfComplaint) => (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                row.priority === 'High' ? 'bg-red-100 text-red-800' :
                row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                row.priority === 'Low' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800' // Default for other/undefined priorities
              }`}>
                {row.priority}
              </span>
            )
          },
          {
            header: 'Status',
            accessor: (row: PsfComplaint) => (
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                row.status === 'Closed' ? 'bg-green-100 text-green-800' :
                row.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                row.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {row.status}
              </span>
            )
          },
          { header: 'Type', accessor: 'complaintType' },
        ]}
      />
      </div>
    </motion.div>
  </motion.div>
);
};

export default ComplaintsDashboard;