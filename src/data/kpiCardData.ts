// Helper function to calculate percentage change and round to two decimal places
const calculateAndRoundPercentageChange = (current: number, previous: number): number | undefined => {
  if (previous === 0) {
    // If previous is 0, and current is positive, it's an infinite increase (or large if you prefer a number)
    // If current is also 0 or negative, change is 0 or undefined based on preference.
    return current > 0 ? undefined : 0; 
  }
  const change = ((current - previous) / previous) * 100;
  return parseFloat(change.toFixed(2));
};

// Extended interface for predictions
export interface PredictedMonthlyComparisonData extends MonthlyComparisonData {
  mechRoPredicted?: number;
  bpRoPredicted?: number;
  partsRevenuePredicted?: number;
  labourRevenuePredicted?: number;
}

export interface MonthlyComparisonData {
  month: string;
  throughput: { '2024': number; '2025': number; target: number; percentChange?: number };
  mechRo: { '2024': number; '2025': number; target: number; percentChange?: number };
  bpRo: { '2024': number; '2025': number; target: number; percentChange?: number };
  accessoriesRo: { '2024': number; '2025': number; target: number; percentChange?: number };
  partsRevenue: { '2024': number; '2025': number; target: number; percentChange?: number };
  labourRevenue: { '2024': number; '2025': number; target: number; percentChange?: number };
}

export const raw2025Data: Array<any> = [
  {
    "month": "Apr",
    "mechRo": {
      "total": 1123
    },
    "bpRo": {
      "total": 175
    },
    "mechParts": 8009736.180000001,
    "bpParts": 6219482.74,
    "mechLaborRevenue": 2878102.25,
    "bpLaborRevenue": 2687707.73,
    "mechAccessories": 569699.8400000001,
    "bpAccessories": 45918.770000000004
  },
  {
    "month": "Feb",
    "mechRo": {
      "total": 1124
    },
    "bpRo": {
      "total": 160
    },
    "mechParts": 6841547.65,
    "bpParts": 6430476.1000000015,
    "mechLaborRevenue": 3054913.0,
    "bpLaborRevenue": 2733546.91,
    "mechAccessories": 631010.05,
    "bpAccessories": 13392.529999999999
  },
  {
    "month": "Jan",
    "mechRo": {
      "total": 1134
    },
    "bpRo": {
      "total": 146
    },
    "mechParts": 8102953.7299999995,
    "bpParts": 4082508.61,
    "mechLaborRevenue": 3088027.8099999996,
    "bpLaborRevenue": 2961587.96,
    "mechAccessories": 761959.0999999999,
    "bpAccessories": 16603.51
  },
  {
    "month": "Jun",
    "mechRo": {
      "total": 604
    },
    "bpRo": {
      "total": 59
    },
    "mechParts": 4466286.18,
    "bpParts": 2635120.19,
    "mechLaborRevenue": 1549744.48,
    "bpLaborRevenue": 965801.76,
    "mechAccessories": 269941.11000000004,
    "bpAccessories": 9990.0
  },
  {
    "month": "Mar",
    "mechRo": {
      "total": 1020
    },
    "bpRo": {
      "total": 154
    },
    "mechParts": 7869538.930000001,
    "bpParts": 5390384.0600000005,
    "mechLaborRevenue": 3172735.37,
    "bpLaborRevenue": 2644326.4899999998,
    "mechAccessories": 463970.67,
    "bpAccessories": 25379.86
  },
  {
    "month": "May",
    "mechRo": {
      "total": 1203
    },
    "bpRo": {
      "total": 170
    },
    "mechParts": 8502135.07,
    "bpParts": 7943871.79,
    "mechLaborRevenue": 3069465.7699999996,
    "bpLaborRevenue": 2613419.36,
    "mechAccessories": 702321.0,
    "bpAccessories": 6258.85
  }
];

export const raw2024Data: Array<any> = [
  {
    "month": "Apr",
    "mechRo": {
      "total": 1529
    },
    "bpRo": {
      "total": 235
    },
    "mechParts": 9136294.45,
    "bpParts": 6319660.290000002,
    "mechLaborRevenue": 3042362.7199999997,
    "bpLaborRevenue": 3164060.6399999997,
    "mechAccessories": 345728.97,
    "bpAccessories": 39095.21000000001
  },
  {
    "month": "Aug",
    "mechRo": {
      "total": 1431
    },
    "bpRo": {
      "total": 221
    },
    "mechParts": 9046775.45,
    "bpParts": 8243318.430000001,
    "mechLaborRevenue": 2767793.54,
    "bpLaborRevenue": 3258581.2,
    "mechAccessories": 346174.0399999999,
    "bpAccessories": 13453.970000000001
  },
  {
    "month": "Dec",
    "mechRo": {
      "total": 1301
    },
    "bpRo": {
      "total": 184
    },
    "mechParts": 9061814.96,
    "bpParts": 7719658.779999999,
    "mechLaborRevenue": 3934073.8899999997,
    "bpLaborRevenue": 3159950.6999999997,
    "mechAccessories": 299253.7899999999,
    "bpAccessories": 38911.13
  },
  {
    "month": "Feb",
    "mechRo": {
      "total": 1313
    },
    "bpRo": {
      "total": 184
    },
    "mechParts": 10561098.49,
    "bpParts": 5636478.31,
    "mechLaborRevenue": 3517083.09,
    "bpLaborRevenue": 3008850.54,
    "mechAccessories": 427059.69,
    "bpAccessories": 50496.07
  },
  {
    "month": "Jan",
    "mechRo": {
      "total": 1332
    },
    "bpRo": {
      "total": 188
    },
    "mechParts": 9199120.52,
    "bpParts": 7446075.890000001,
    "mechLaborRevenue": 3257269.01,
    "bpLaborRevenue": 3113276.3899999997,
    "mechAccessories": 327749.93000000005,
    "bpAccessories": 32888.89
  },
  {
    "month": "Jul",
    "mechRo": {
      "total": 1654
    },
    "bpRo": {
      "total": 231
    },
    "mechParts": 9303522.28,
    "bpParts": 6471173.71,
    "mechLaborRevenue": 3343117.2800000003,
    "bpLaborRevenue": 3474281.85,
    "mechAccessories": 449553.36,
    "bpAccessories": 47747.41
  },
  {
    "month": "Jun",
    "mechRo": {
      "total": 1432
    },
    "bpRo": {
      "total": 231
    },
    "mechParts": 8231121.679999999,
    "bpParts": 5084647.890000001,
    "mechLaborRevenue": 2347254.9699999997,
    "bpLaborRevenue": 3055002.26,
    "mechAccessories": 406104.42,
    "bpAccessories": 37365.84
  },
  {
    "month": "Mar",
    "mechRo": {
      "total": 1365
    },
    "bpRo": {
      "total": 223
    },
    "mechParts": 10365808.909999998,
    "bpParts": 5715215.76,
    "mechLaborRevenue": 3506224.06,
    "bpLaborRevenue": 3626249.17,
    "mechAccessories": 511253.44000000006,
    "bpAccessories": 34827.13
  },
  {
    "month": "May",
    "mechRo": {
      "total": 1463
    },
    "bpRo": {
      "total": 232
    },
    "mechParts": 9073501.27,
    "bpParts": 5927629.2,
    "mechLaborRevenue": 2812102.37,
    "bpLaborRevenue": 3219729.58,
    "mechAccessories": 364667.32000000007,
    "bpAccessories": 37704.87
  },
  {
    "month": "Nov",
    "mechRo": {
      "total": 1252
    },
    "bpRo": {
      "total": 172
    },
    "mechParts": 8500568.239999998,
    "bpParts": 11472235.439999998,
    "mechLaborRevenue": 3538918.42,
    "bpLaborRevenue": 4379346.68,
    "mechAccessories": 310310.43,
    "bpAccessories": 19382.260000000002
  },
  {
    "month": "Oct",
    "mechRo": {
      "total": 1179
    },
    "bpRo": {
      "total": 179
    },
    "mechParts": 9338933.250000002,
    "bpParts": 10368978.370000003,
    "mechLaborRevenue": 2706922.04,
    "bpLaborRevenue": 3034276.0999999996,
    "mechAccessories": 261162.71999999997,
    "bpAccessories": 21995.449999999997
  },
  {
    "month": "Sep",
    "mechRo": {
      "total": 1370
    },
    "bpRo": {
      "total": 225
    },
    "mechParts": 8908458.51,
    "bpParts": 8929754.929999998,
    "mechLaborRevenue": 2833545.4,
    "bpLaborRevenue": 3026740.75,
    "mechAccessories": 425494.95,
    "bpAccessories": 36894.490000000005
  }
];

const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const yearOnYearComparisonData: PredictedMonthlyComparisonData[] = allMonths.map(monthName => {
  const data2024 = raw2024Data.find(d => d.month === monthName) || 
                   { mechRo: { total: 0 }, bpRo: { total: 0 }, mechParts: 0, bpParts: 0, mechLaborRevenue: 0, bpLaborRevenue: 0, mechAccessories: 0, bpAccessories: 0 };
  const data2025 = raw2025Data.find(d => d.month === monthName) || 
                   { mechRo: { total: 0 }, bpRo: { total: 0 }, mechParts: 0, bpParts: 0, mechLaborRevenue: 0, bpLaborRevenue: 0, mechAccessories: 0, bpAccessories: 0 };

  const throughput2024 = (data2024.mechRo?.total || 0) + (data2024.bpRo?.total || 0);
  const throughput2025 = (data2025.mechRo?.total || 0) + (data2025.bpRo?.total || 0);
  const throughputPercentChange = calculateAndRoundPercentageChange(throughput2025, throughput2024);

  return {
    month: monthName,
    throughput: {
      '2024': throughput2024,
      '2025': throughput2025,
      target: 1400, // Placeholder target for combined throughput
      percentChange: throughputPercentChange
    },
    mechRo: {
      '2024': data2024.mechRo.total,
      '2025': data2025.mechRo.total,
      target: 1200, 
      percentChange: calculateAndRoundPercentageChange(data2025.mechRo.total, data2024.mechRo.total)
    },
    bpRo: {
      '2024': data2024.bpRo.total,
      '2025': data2025.bpRo.total,
      target: 200, 
      percentChange: calculateAndRoundPercentageChange(data2025.bpRo.total, data2024.bpRo.total)
    },
    accessoriesRo: {
      '2024': data2024.mechAccessories + data2024.bpAccessories,
      '2025': data2025.mechAccessories + data2025.bpAccessories,
      target: 500000, 
      percentChange: calculateAndRoundPercentageChange(
        data2025.mechAccessories + data2025.bpAccessories,
        data2024.mechAccessories + data2024.bpAccessories
      )
    },
    partsRevenue: {
      '2024': data2024.mechParts + data2024.bpParts,
      '2025': data2025.mechParts + data2025.bpParts,
      target: 15000000, // Placeholder target
      percentChange: calculateAndRoundPercentageChange(
        data2025.mechParts + data2025.bpParts,
        data2024.mechParts + data2024.bpParts
      )
    },
    labourRevenue: {
      '2024': data2024.mechLaborRevenue + data2024.bpLaborRevenue,
      '2025': data2025.mechLaborRevenue + data2025.bpLaborRevenue,
      target: 6000000, 
      percentChange: calculateAndRoundPercentageChange(
        data2025.mechLaborRevenue + data2025.bpLaborRevenue,
        data2024.mechLaborRevenue + data2024.bpLaborRevenue
      )
    },
    // Add dummy predictions for Jul, Aug, Sep 2025
    ...(monthName === 'Jul' ? {
      mechRoPredicted: (data2025.mechRo?.total || 320) * 1.05, // Slight increase from June actuals
      bpRoPredicted: (data2025.bpRo?.total || 26) * 1.02,
      partsRevenuePredicted: (data2025.mechParts + data2025.bpParts || 2269312.12 + 645376.54) * 1.03,
      labourRevenuePredicted: (data2025.mechLaborRevenue + data2025.bpLaborRevenue || 751499.03 + 345285.38) * 1.04,
    } : {}),
    ...(monthName === 'Aug' ? {
      mechRoPredicted: (data2025.mechRo?.total || 320) * 1.08, 
      bpRoPredicted: (data2025.bpRo?.total || 26) * 1.05,
      partsRevenuePredicted: (data2025.mechParts + data2025.bpParts || 2269312.12 + 645376.54) * 1.06,
      labourRevenuePredicted: (data2025.mechLaborRevenue + data2025.bpLaborRevenue || 751499.03 + 345285.38) * 1.08,
    } : {}),
    ...(monthName === 'Sep' ? {
      mechRoPredicted: (data2025.mechRo?.total || 320) * 1.1,
      bpRoPredicted: (data2025.bpRo?.total || 26) * 1.07,
      partsRevenuePredicted: (data2025.mechParts + data2025.bpParts || 2269312.12 + 645376.54) * 1.09,
      labourRevenuePredicted: (data2025.mechLaborRevenue + data2025.bpLaborRevenue || 751499.03 + 345285.38) * 1.12,
    } : {}),
  };
});

// --- Service Advisor Performance Projection Data ---

import { allServiceAdvisorYearlyPerformance, AdvisorDetailedRevenueItems } from './advisorPerformanceData';

// Helper to calculate total revenue from the detailed items
const calculateAdvisorTotalRevenue = (revenueItems: AdvisorDetailedRevenueItems): number => {
  return Object.entries(revenueItems)
    .filter(([key]) => key.includes('(INR)'))
    .reduce((sum, [, value]) => sum + (typeof value === 'number' ? value : 0), 0);
};

// 1. Process data for the monthly Top 3 Advisors combined revenue view
const getTop3AdvisorsCombinedRevenue = () => {
  const monthlyData = allServiceAdvisorYearlyPerformance.find(y => y.year === 2025)?.monthlyBreakdown || [];
  
  return monthlyData.map(monthData => {
    const advisorsWithRevenue = monthData.advisors.map(advisor => ({
      ...advisor,
      totalRevenue: calculateAdvisorTotalRevenue(advisor.revenueItems)
    })).sort((a, b) => b.totalRevenue - a.totalRevenue);

    const top3Revenue = advisorsWithRevenue.slice(0, 3).reduce((sum, advisor) => sum + advisor.totalRevenue, 0);

    return {
      month: monthData.month.substring(0, 3),
      advisor_top3_revenue_actual: top3Revenue,
      // We can add a predicted value later if needed
      advisor_top3_revenue_predicted: top3Revenue * 1.1, // Dummy prediction
    };
  });
};

export const top3AdvisorsMonthlyRevenue = getTop3AdvisorsCombinedRevenue();

// 2. Process data for the June per-advisor daily projection
const getJuneAdvisorDailyProjections = () => {
    const juneData = allServiceAdvisorYearlyPerformance.find(y => y.year === 2025)?.monthlyBreakdown.find(m => m.month === 'June');
    if (!juneData) return [];

    const projectionData: any[] = [];
    const advisors = juneData.advisors;
    const daysInMonth = 30;
    const currentDay = 14;

    // Initialize projection data array for 30 days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEntry: { day: number, [key: string]: number } = { day };
        projectionData.push(dayEntry);
    }

    advisors.forEach(advisor => {
        const totalRevenueSoFar = calculateAdvisorTotalRevenue(advisor.revenueItems);
        const dailyRunRate = totalRevenueSoFar / currentDay;

        for (let day = 1; day <= daysInMonth; day++) {
            if (day <= currentDay) {
                // For past days, we can create a linear accumulation of actuals
                projectionData[day - 1][`${advisor.advisorName}_actual`] = (totalRevenueSoFar / currentDay) * day;
            }
            // For all days, calculate the projection
            projectionData[day - 1][`${advisor.advisorName}_projected`] = dailyRunRate * day;
        }
    });

    return projectionData;
};

export const juneAdvisorDailyProjections = getJuneAdvisorDailyProjections();

// Get a list of advisor names for creating lines in the chart
export const juneAdvisorNames = allServiceAdvisorYearlyPerformance
    .find(y => y.year === 2025)?.monthlyBreakdown
    .find(m => m.month === 'June')?.advisors.map(a => a.advisorName) || [];

// --- Intra-Month Projection Data for June ---

export interface IntraMonthDataPoint {
  day: string; // e.g., "Jun 1"
  mechRo_actual?: number;
  mechRo_projected?: number;
  bpRo_actual?: number;
  bpRo_projected?: number;
  partsRevenue_actual?: number;
  partsRevenue_projected?: number;
  labourRevenue_actual?: number;
  labourRevenue_projected?: number;
}

// Data from raw2025Data for June (represents totals for the first 14 days)
const june2025SoFar = {
  mechRo: 320,
  bpRo: 26,
  partsRevenue: 2269312.12 + 645376.54, // 2914688.66
  labourRevenue: 751499.03 + 345285.38, // 1096784.41
};

// Calculate daily run rate based on first 14 days
const dailyRunRate = {
  mechRo: june2025SoFar.mechRo / 14,
  bpRo: june2025SoFar.bpRo / 14,
  partsRevenue: june2025SoFar.partsRevenue / 14,
  labourRevenue: june2025SoFar.labourRevenue / 14,
};

// Generate somewhat realistic daily actuals for the first 14 days
const generateDailyActuals = (total: number, days: number, runRate: number): number[] => {
  const actuals = [];
  let remainingTotal = total;
  for (let i = 0; i < days - 1; i++) {
    const variance = (Math.random() - 0.5) * 0.4; // +/- 20% variance
    let dailyValue = runRate * (1 + variance);
    dailyValue = Math.max(0, dailyValue);
    dailyValue = Math.min(dailyValue, remainingTotal * 0.5); // Cap to avoid one day taking too much
    actuals.push(parseFloat(dailyValue.toFixed(2)));
    remainingTotal -= dailyValue;
  }
  actuals.push(parseFloat(remainingTotal.toFixed(2))); // Last day gets the remainder
  return actuals;
};

const dailyActuals = {
  mechRo: generateDailyActuals(june2025SoFar.mechRo, 14, dailyRunRate.mechRo),
  bpRo: generateDailyActuals(june2025SoFar.bpRo, 14, dailyRunRate.bpRo),
  partsRevenue: generateDailyActuals(june2025SoFar.partsRevenue, 14, dailyRunRate.partsRevenue),
  labourRevenue: generateDailyActuals(june2025SoFar.labourRevenue, 14, dailyRunRate.labourRevenue),
};

export const juneIntraMonthDataCumulative: IntraMonthDataPoint[] = [];
let cumulativeActual = {
    mechRo: 0, bpRo: 0, partsRevenue: 0, labourRevenue: 0
};

for (let day = 1; day <= 30; day++) {
    const dataPoint: IntraMonthDataPoint = { day: `Jun ${day}` };

    if (day <= 14) {
        cumulativeActual.mechRo += dailyActuals.mechRo[day - 1];
        cumulativeActual.bpRo += dailyActuals.bpRo[day - 1];
        cumulativeActual.partsRevenue += dailyActuals.partsRevenue[day - 1];
        cumulativeActual.labourRevenue += dailyActuals.labourRevenue[day - 1];

        dataPoint.mechRo_actual = parseFloat(cumulativeActual.mechRo.toFixed(2));
        dataPoint.bpRo_actual = parseFloat(cumulativeActual.bpRo.toFixed(2));
        dataPoint.partsRevenue_actual = parseFloat(cumulativeActual.partsRevenue.toFixed(2));
        dataPoint.labourRevenue_actual = parseFloat(cumulativeActual.labourRevenue.toFixed(2));
    }

    if (day >= 14) {
        if (day === 14) {
            dataPoint.mechRo_projected = parseFloat(cumulativeActual.mechRo.toFixed(2));
            dataPoint.bpRo_projected = parseFloat(cumulativeActual.bpRo.toFixed(2));
            dataPoint.partsRevenue_projected = parseFloat(cumulativeActual.partsRevenue.toFixed(2));
            dataPoint.labourRevenue_projected = parseFloat(cumulativeActual.labourRevenue.toFixed(2));
        } else {
            const prevProjected = juneIntraMonthDataCumulative[day - 2];
            dataPoint.mechRo_projected = parseFloat(((prevProjected.mechRo_projected || 0) + dailyRunRate.mechRo).toFixed(2));
            dataPoint.bpRo_projected = parseFloat(((prevProjected.bpRo_projected || 0) + dailyRunRate.bpRo).toFixed(2));
            dataPoint.partsRevenue_projected = parseFloat(((prevProjected.partsRevenue_projected || 0) + dailyRunRate.partsRevenue).toFixed(2));
            dataPoint.labourRevenue_projected = parseFloat(((prevProjected.labourRevenue_projected || 0) + dailyRunRate.labourRevenue).toFixed(2));
        }
    }
    juneIntraMonthDataCumulative.push(dataPoint);
}
