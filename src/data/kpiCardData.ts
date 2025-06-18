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
      "total": 558
    },
    "bpRo": {
      "total": 87
    },
    "mechParts": 2587816.05,
    "bpParts": 2438969.5499999993,
    "mechLaborRevenue": 1549847.8,
    "bpLaborRevenue": 1021577.8599999999,
    "mechAccessories": 348505.7,
    "bpAccessories": 12934.11
  },
  {
    "month": "Feb",
    "mechRo": {
      "total": 480
    },
    "bpRo": {
      "total": 50
    },
    "mechParts": 2858268.5599999996,
    "bpParts": 1943991.3399999999,
    "mechLaborRevenue": 1603204.0,
    "bpLaborRevenue": 971372.89,
    "mechAccessories": 173656.22,
    "bpAccessories": 18165.569999999996
  },
  {
    "month": "Jan",
    "mechRo": {
      "total": 494
    },
    "bpRo": {
      "total": 61
    },
    "mechParts": 2472912.9000000004,
    "bpParts": 3505972.59,
    "mechLaborRevenue": 1488125.9,
    "bpLaborRevenue": 1163508.65,
    "mechAccessories": 133292.83,
    "bpAccessories": 23337.56
  },
  {
    "month": "Jun",
    "mechRo": {
      "total": 289
    },
    "bpRo": {
      "total": 32
    },
    "mechParts": 1680319.62,
    "bpParts": 935531.8,
    "mechLaborRevenue": 790191.5700000001,
    "bpLaborRevenue": 363215.01,
    "mechAccessories": 140487.43,
    "bpAccessories": 4066.1
  },
  {
    "month": "Mar",
    "mechRo": {
      "total": 516
    },
    "bpRo": {
      "total": 73
    },
    "mechParts": 2412969.87,
    "bpParts": 2891084.8800000004,
    "mechLaborRevenue": 1636608.15,
    "bpLaborRevenue": 1119457.8399999999,
    "mechAccessories": 275690.88,
    "bpAccessories": 21932.95
  },
  {
    "month": "May",
    "mechRo": {
      "total": 584
    },
    "bpRo": {
      "total": 87
    },
    "mechParts": 3327830.48,
    "bpParts": 2553134.7399999998,
    "mechLaborRevenue": 1425921.04,
    "bpLaborRevenue": 1087876.27,
    "mechAccessories": 327782.44,
    "bpAccessories": 26582.259999999995
  }
];

export const raw2024Data: Array<any> = [
  {
    "month": "Apr",
    "mechRo": {
      "total": 430
    },
    "bpRo": {
      "total": 49
    },
    "mechParts": 2271616.7800000003,
    "bpParts": 1413305.11,
    "mechLaborRevenue": 1194865.39,
    "bpLaborRevenue": 1069289.0,
    "mechAccessories": 38356.899999999994,
    "bpAccessories": 23117.18
  },
  {
    "month": "Aug",
    "mechRo": {
      "total": 460
    },
    "bpRo": {
      "total": 66
    },
    "mechParts": 2864101.9899999998,
    "bpParts": 1949799.82,
    "mechLaborRevenue": 1016907.48,
    "bpLaborRevenue": 796852.5,
    "mechAccessories": 174555.00999999998,
    "bpAccessories": 7754.5599999999995
  },
  {
    "month": "Dec",
    "mechRo": {
      "total": 507
    },
    "bpRo": {
      "total": 59
    },
    "mechParts": 3379902.3199999994,
    "bpParts": 2807664.0600000005,
    "mechLaborRevenue": 1253933.21,
    "bpLaborRevenue": 912595.8,
    "mechAccessories": 81983.76999999999,
    "bpAccessories": 6315.33
  },
  {
    "month": "Feb",
    "mechRo": {
      "total": 442
    },
    "bpRo": {
      "total": 54
    },
    "mechParts": 3017794.8699999996,
    "bpParts": 1526809.66,
    "mechLaborRevenue": 1154809.7999999998,
    "bpLaborRevenue": 1103901.0,
    "mechAccessories": 76408.05,
    "bpAccessories": 12190.270000000004
  },
  {
    "month": "Jan",
    "mechRo": {
      "total": 392
    },
    "bpRo": {
      "total": 49
    },
    "mechParts": 2224524.15,
    "bpParts": 2199194.5399999996,
    "mechLaborRevenue": 1062144.34,
    "bpLaborRevenue": 1013005.0,
    "mechAccessories": 64888.71,
    "bpAccessories": 26790.12
  },
  {
    "month": "Jul",
    "mechRo": {
      "total": 533
    },
    "bpRo": {
      "total": 64
    },
    "mechParts": 4095511.1599999997,
    "bpParts": 1883770.4300000002,
    "mechLaborRevenue": 1164545.66,
    "bpLaborRevenue": 830451.5,
    "mechAccessories": 135454.2,
    "bpAccessories": 17201.39
  },
  {
    "month": "Jun",
    "mechRo": {
      "total": 589
    },
    "bpRo": {
      "total": 64
    },
    "mechParts": 3543091.97,
    "bpParts": 1519547.8500000003,
    "mechLaborRevenue": 1196272.3599999999,
    "bpLaborRevenue": 940087.5,
    "mechAccessories": 74311.85,
    "bpAccessories": 17389.9
  },
  {
    "month": "Mar",
    "mechRo": {
      "total": 445
    },
    "bpRo": {
      "total": 43
    },
    "mechParts": 2778263.4700000007,
    "bpParts": 1261876.48,
    "mechLaborRevenue": 1259095.33,
    "bpLaborRevenue": 993676.0,
    "mechAccessories": 38163.71000000001,
    "bpAccessories": 20490.97
  },
  {
    "month": "May",
    "mechRo": {
      "total": 527
    },
    "bpRo": {
      "total": 56
    },
    "mechParts": 2951786.5300000003,
    "bpParts": 1387112.15,
    "mechLaborRevenue": 1265201.25,
    "bpLaborRevenue": 859574.5,
    "mechAccessories": 53564.119999999995,
    "bpAccessories": 20642.440000000002
  },
  {
    "month": "Nov",
    "mechRo": {
      "total": 474
    },
    "bpRo": {
      "total": 68
    },
    "mechParts": 3505507.79,
    "bpParts": 2332692.9499999997,
    "mechLaborRevenue": 1204443.0,
    "bpLaborRevenue": 981015.88,
    "mechAccessories": 56908.42,
    "bpAccessories": 9334.369999999997
  },
  {
    "month": "Oct",
    "mechRo": {
      "total": 462
    },
    "bpRo": {
      "total": 59
    },
    "mechParts": 2771382.08,
    "bpParts": 2076923.84,
    "mechLaborRevenue": 1183431.21,
    "bpLaborRevenue": 684695.0,
    "mechAccessories": 84186.68,
    "bpAccessories": 21812.14
  },
  {
    "month": "Sep",
    "mechRo": {
      "total": 501
    },
    "bpRo": {
      "total": 62
    },
    "mechParts": 2927208.52,
    "bpParts": 2082696.04,
    "mechLaborRevenue": 1118983.0,
    "bpLaborRevenue": 899066.0,
    "mechAccessories": 184011.26,
    "bpAccessories": 28696.989999999998
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
