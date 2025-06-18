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

const raw2024Data: Array<any> = [
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
