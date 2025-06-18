import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Zap, Wrench, DollarSign, Package, ArrowLeft, Users } from 'lucide-react';
import { juneIntraMonthDataCumulative, top3AdvisorsMonthlyRevenue, juneAdvisorDailyProjections, juneAdvisorNames } from '../data/kpiCardData';
import { TransformedPredictionDataForChart } from '../types';

interface PredictionsSectionProps {
  dataForChart: TransformedPredictionDataForChart[];
}

type PredictionMetricKey = 'mechRo' | 'bpRo' | 'partsRevenue' | 'labourRevenue' | 'serviceAdvisors';

interface MetricConfig {
  key: PredictionMetricKey;
  label: string;
  actualKey: keyof Omit<TransformedPredictionDataForChart, 'month'>;
  predictedKey: keyof Omit<TransformedPredictionDataForChart, 'month'>;
  icon: React.ReactElement;
}

const metricConfigs: MetricConfig[] = [
  { key: 'mechRo', label: 'Mechanical ROs', actualKey: 'mechRo_actual', predictedKey: 'mechRo_predicted', icon: <Wrench size={16} /> },
  { key: 'bpRo', label: 'Body & Paint ROs', actualKey: 'bpRo_actual', predictedKey: 'bpRo_predicted', icon: <Zap size={16} /> },
  { key: 'partsRevenue', label: 'Parts Revenue', actualKey: 'partsRevenue_actual', predictedKey: 'partsRevenue_predicted', icon: <Package size={16} /> },
  { key: 'labourRevenue', label: 'Labour Revenue', actualKey: 'labourRevenue_actual', predictedKey: 'labourRevenue_predicted', icon: <DollarSign size={16} /> },
  { key: 'serviceAdvisors', label: 'Service Advisors', actualKey: 'advisor_top3_revenue_actual', predictedKey: 'advisor_top3_revenue_predicted', icon: <Users size={16} /> },
];

const PredictionsSection: React.FC<PredictionsSectionProps> = ({ dataForChart: initialData }) => {
  const [activeMetric, setActiveMetric] = useState<PredictionMetricKey>('mechRo');
  const [showJuneDetail, setShowJuneDetail] = useState(false);

  const selectedConfig = metricConfigs.find(mc => mc.key === activeMetric) || metricConfigs[0];

  const handleBarDoubleClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload?.month === 'Jun') {
      setShowJuneDetail(true);
    }
  };

  const chartData = useMemo(() => {
    if (showJuneDetail) {
      return activeMetric === 'serviceAdvisors' ? juneAdvisorDailyProjections : juneIntraMonthDataCumulative;
    } else {
      return activeMetric === 'serviceAdvisors' ? top3AdvisorsMonthlyRevenue : initialData;
    }
  }, [showJuneDetail, activeMetric, initialData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-200">
          <p className="font-semibold text-gray-700">{showJuneDetail && activeMetric !== 'serviceAdvisors' ? `Day ${label}` : label}</p>
          {payload.map((pld: any, index: number) => (
            <p key={index} style={{ color: pld.stroke || pld.fill }}>
              {`${pld.name}: ${pld.value === undefined || pld.value === null ? 'N/A' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pld.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="card p-4 md:p-6 bg-white shadow-subtle rounded-xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0 flex items-center">
          <TrendingUp className="mr-2 text-primary-500" size={24} />
          {showJuneDetail ? `June 2025 Projection Detail (${selectedConfig.label})` : 'Future Performance Predictions'}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {showJuneDetail ? (
            <button 
              onClick={() => setShowJuneDetail(false)} 
              className="px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Monthly
            </button>
          ) : (
            metricConfigs.map(config => (
              <button
                key={config.key}
                onClick={() => setActiveMetric(config.key)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md flex items-center gap-1.5 transition-all duration-200 ease-in-out 
                  ${activeMetric === config.key 
                    ? 'bg-primary-500 text-white shadow-md scale-105' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {config.icon}
                {config.label}
              </button>
            ))
          )}
        </div>
      </div>

      <div style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData as any[]} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} onDoubleClick={handleBarDoubleClick}>
            <defs>
              <linearGradient id="actualBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey={showJuneDetail ? 'day' : 'month'} tick={{ fontSize: 12, fill: '#666' }} />
            <YAxis tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value)} tick={{ fontSize: 12, fill: '#666' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}/>
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
            
            {showJuneDetail ? (
              <>
                {activeMetric === 'serviceAdvisors' ? (
                  juneAdvisorNames.map((name, index) => (
                    <Line 
                      key={name}
                      type="monotone" 
                      dataKey={`${name}_projected`} 
                      name={name}
                      stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 9]}
                      strokeWidth={2} 
                      dot={{ r: 2 }} 
                      activeDot={{ r: 4 }}
                    />
                  ))
                ) : (
                  <>
                    <Line type="monotone" dataKey={`${activeMetric}_actual`} name="Cumulative Actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey={`${activeMetric}_projected`} name="Cumulative Projection" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </>
                )}
              </>
            ) : (
              <>
                <Bar dataKey={selectedConfig.actualKey} name="Actual" fill="url(#actualBarGradient)" barSize={35} radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey={selectedConfig.predictedKey} name="Predicted" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        {showJuneDetail ? 'Double-click a bar in the monthly view to see daily details.' : 'Displaying monthly predictions. Double-click on the June bar for a daily projection.'}
      </p>
    </motion.div>
  );
};

export default PredictionsSection;
