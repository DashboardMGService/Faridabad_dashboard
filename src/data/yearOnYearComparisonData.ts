export interface MonthlyComparisonData {
  month: string;
  mechRo: { '2024': number; '2025': number; target: number };
  bpRo: { '2024': number; '2025': number; target: number };
  accessoriesRo: { '2024': number; '2025': number; target: number };
  partsRevenue: { '2024': number; '2025': number; target: number };
  labourRevenue: { '2024': number; '2025': number; target: number };
}

const raw2025Data: Array<any> = [
  {
    "month": "Apr",
    "mechRo": { "total": 1123 },
    "bpRo": { "total": 175 },
    "mechParts": 8009736.180000001,
    "bpParts": 6219482.739999999,
    "mechLaborRevenue": 2878102.25,
    "bpLaborRevenue": 2687707.73,
    "mechAccessories": 569699.8400000001,
    "bpAccessories": 45918.770000000004
  },
  {
    "month": "Feb",
    "mechRo": { "total": 1124 },
    "bpRo": { "total": 160 },
    "mechParts": 6841547.649999999,
    "bpParts": 6430476.1,
    "mechLaborRevenue": 3054913.0,
    "bpLaborRevenue": 2733546.91,
    "mechAccessories": 631010.05,
    "bpAccessories": 13392.529999999999
  },
  {
    "month": "Jan",
    "mechRo": { "total": 1134 },
    "bpRo": { "total": 146 },
    "mechParts": 8102953.7299999995,
    "bpParts": 4082508.61,
    "mechLaborRevenue": 3088027.81,
    "bpLaborRevenue": 2961587.96,
    "mechAccessories": 761959.1,
    "bpAccessories": 16603.510000000002
  },
  {
    "month": "Jun",
    "mechRo": { "total": 604 },
    "bpRo": { "total": 59 },
    "mechParts": 4466286.18,
    "bpParts": 2635120.19,
    "mechLaborRevenue": 1549744.48,
    "bpLaborRevenue": 965801.76,
    "mechAccessories": 269941.11000000004,
    "bpAccessories": 9990.0
  },
  {
    "month": "Mar",
    "mechRo": { "total": 1020 },
    "bpRo": { "total": 154 },
    "mechParts": 7869538.93,
    "bpParts": 5390384.0600000005,
    "mechLaborRevenue": 3172735.37,
    "bpLaborRevenue": 2644326.4899999998,
    "mechAccessories": 463970.67,
    "bpAccessories": 25379.86
  },
  {
    "month": "May",
    "mechRo": { "total": 1203 },
    "bpRo": { "total": 170 },
    "mechParts": 8502135.07,
    "bpParts": 7943871.79,
    "mechLaborRevenue": 3069465.7699999996,
    "bpLaborRevenue": 2613419.36,
    "mechAccessories": 702321.0,
    "bpAccessories": 6258.849999999999
  }
];

const raw2024Data: Array<any> = [
  {
    "month": "Apr",
    "mechRo": { "total": 1529 },
    "bpRo": { "total": 235 },
    "mechParts": 9173107.16,
    "bpParts": 6322682.16,
    "mechLaborRevenue": 3042362.7199999997,
    "bpLaborRevenue": 3164060.6399999997,
    "mechAccessories": 308916.25999999995,
    "bpAccessories": 36073.34
  },
  {
    "month": "Aug",
    "mechRo": { "total": 1431 },
    "bpRo": { "total": 221 },
    "mechParts": 9084554.419999998,
    "bpParts": 8243318.430000001,
    "mechLaborRevenue": 2767793.54,
    "bpLaborRevenue": 3258581.2,
    "mechAccessories": 308395.07,
    "bpAccessories": 13453.97
  },
  {
    "month": "Dec",
    "mechRo": { "total": 1301 },
    "bpRo": { "total": 184 },
    "mechParts": 9101047.139999997,
    "bpParts": 7725553.31,
    "mechLaborRevenue": 3934073.8899999997,
    "bpLaborRevenue": 3159950.6999999997,
    "mechAccessories": 260021.61,
    "bpAccessories": 33016.6
  },
  {
    "month": "Feb",
    "mechRo": { "total": 1313 },
    "bpRo": { "total": 184 },
    "mechParts": 10616335.17,
    "bpParts": 5636478.31,
    "mechLaborRevenue": 3517083.09,
    "bpLaborRevenue": 3008850.54,
    "mechAccessories": 371823.01,
    "bpAccessories": 50496.07
  },
  {
    "month": "Jan",
    "mechRo": { "total": 1332 },
    "bpRo": { "total": 188 },
    "mechParts": 9221303.58,
    "bpParts": 7446075.89,
    "mechLaborRevenue": 3257269.01,
    "bpLaborRevenue": 3113276.39,
    "mechAccessories": 305566.87,
    "bpAccessories": 32888.89000000001
  },
  {
    "month": "Jul",
    "mechRo": { "total": 1654 },
    "bpRo": { "total": 231 },
    "mechParts": 9361220.120000001,
    "bpParts": 6471173.71,
    "mechLaborRevenue": 3343117.2800000003,
    "bpLaborRevenue": 3474281.85,
    "mechAccessories": 391855.51999999996,
    "bpAccessories": 47747.41
  },
  {
    "month": "Jun",
    "mechRo": { "total": 1432 },
    "bpRo": { "total": 231 },
    "mechParts": 8265519.529999998,
    "bpParts": 5088447.039999999,
    "mechLaborRevenue": 2347254.9699999997,
    "bpLaborRevenue": 3055002.2600000002,
    "mechAccessories": 371706.57000000007,
    "bpAccessories": 33566.689999999995
  },
  {
    "month": "Mar",
    "mechRo": { "total": 1365 },
    "bpRo": { "total": 223 },
    "mechParts": 10428051.139999997,
    "bpParts": 5715215.760000001,
    "mechLaborRevenue": 3506224.06,
    "bpLaborRevenue": 3626249.17,
    "mechAccessories": 449011.21,
    "bpAccessories": 34827.130000000005
  },
  {
    "month": "May",
    "mechRo": { "total": 1463 },
    "bpRo": { "total": 232 },
    "mechParts": 9114270.65,
    "bpParts": 5927629.200000001,
    "mechLaborRevenue": 2812102.37,
    "bpLaborRevenue": 3219729.58,
    "mechAccessories": 323897.94,
    "bpAccessories": 37704.869999999995
  },
  {
    "month": "Nov",
    "mechRo": { "total": 1252 },
    "bpRo": { "total": 172 },
    "mechParts": 8528347.44,
    "bpParts": 11477260.83,
    "mechLaborRevenue": 3538918.42,
    "bpLaborRevenue": 4379346.68,
    "mechAccessories": 282531.23,
    "bpAccessories": 14356.87
  },
  {
    "month": "Oct",
    "mechRo": { "total": 1179 },
    "bpRo": { "total": 179 },
    "mechParts": 9355088.030000001,
    "bpParts": 10368978.370000001,
    "mechLaborRevenue": 2706922.04,
    "bpLaborRevenue": 3034276.1,
    "mechAccessories": 245007.93999999997,
    "bpAccessories": 21995.45
  },
  {
    "month": "Sep",
    "mechRo": { "total": 1370 },
    "bpRo": { "total": 225 },
    "mechParts": 8955989.24,
    "bpParts": 8933143.91,
    "mechLaborRevenue": 2833545.4,
    "bpLaborRevenue": 3026740.75,
    "mechAccessories": 377964.22000000003,
    "bpAccessories": 33505.51
  }
];

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const yearOnYearComparisonData: MonthlyComparisonData[] = monthOrder.map(monthName => {
  const data2024 = raw2024Data.find(d => d.month === monthName) || {};
  const data2025 = raw2025Data.find(d => d.month === monthName) || {};

  return {
    month: monthName,
    mechRo: {
      '2024': data2024.mechRo?.total || 0,
      '2025': data2025.mechRo?.total || 0,
      target: 0
    },
    bpRo: {
      '2024': data2024.bpRo?.total || 0,
      '2025': data2025.bpRo?.total || 0,
      target: 0
    },
    accessoriesRo: {
      '2024': (data2024.mechAccessories || 0) + (data2024.bpAccessories || 0),
      '2025': (data2025.mechAccessories || 0) + (data2025.bpAccessories || 0),
      target: 0
    },
    partsRevenue: {
      '2024': (data2024.mechParts || 0) + (data2024.bpParts || 0),
      '2025': (data2025.mechParts || 0) + (data2025.bpParts || 0),
      target: 0
    },
    labourRevenue: {
      '2024': (data2024.mechLaborRevenue || 0) + (data2024.bpLaborRevenue || 0),
      '2025': (data2025.mechLaborRevenue || 0) + (data2025.bpLaborRevenue || 0),
      target: 0
    }
  };
});
