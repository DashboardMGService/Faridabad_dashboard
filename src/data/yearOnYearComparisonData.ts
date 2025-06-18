export interface MonthlyComparisonData {
  month: string;
  mechRo: { 
    '2024': { [key: string]: number }; 
    '2025': { [key: string]: number }; 
    target: { [key: string]: number }; 
  };
  bpRo: { '2024': number; '2025': number; target: number };
  accessoriesRo: { '2024': number; '2025': number; target: number };
  partsRevenue: { '2024': number; '2025': number; target: number };
  labourRevenue: { '2024': number; '2025': number; target: number };
}

export interface RawData {
  month: string;
  mechRo: { [key: string]: number };
  bpRo: { total: number };
  mechParts: number;
  bpParts: number;
  mechLaborRevenue: number;
  bpLaborRevenue: number;
  mechAccessories: number;
  bpAccessories: number;
}

export const raw2025Data: RawData[] = [
  {
    "month": "Apr",
    "mechRo": {
      "General Repair": 221,
      "Preventive Maintenance-Paid Service(PMS)": 130,
      "2nd Free Service": 58,
      "1st Free Service": 52,
      "3rd Free Service": 52,
      "Accessory Orders": 23,
      "4th Free Service": 11,
      "5th Free Service": 11,
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
      "General Repair": 172,
      "Preventive Maintenance-Paid Service(PMS)": 141,
      "1st Free Service": 55,
      "2nd Free Service": 44,
      "3rd Free Service": 38,
      "4th Free Service": 14,
      "5th Free Service": 9,
      "Accessory Orders": 7,
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
      "General Repair": 171,
      "Preventive Maintenance-Paid Service(PMS)": 122,
      "1st Free Service": 74,
      "2nd Free Service": 48,
      "3rd Free Service": 41,
      "5th Free Service": 15,
      "4th Free Service": 13,
      "Accessory Orders": 10,
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
      "General Repair": 127,
      "Preventive Maintenance-Paid Service(PMS)": 80,
      "3rd Free Service": 25,
      "1st Free Service": 23,
      "2nd Free Service": 22,
      "5th Free Service": 8,
      "4th Free Service": 4,
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
      "General Repair": 178,
      "Preventive Maintenance-Paid Service(PMS)": 147,
      "2nd Free Service": 57,
      "1st Free Service": 55,
      "3rd Free Service": 42,
      "5th Free Service": 17,
      "4th Free Service": 13,
      "Accessory Orders": 7,
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
      "General Repair": 252,
      "Preventive Maintenance-Paid Service(PMS)": 147,
      "2nd Free Service": 64,
      "1st Free Service": 44,
      "3rd Free Service": 43,
      "5th Free Service": 15,
      "4th Free Service": 13,
      "Accessory Orders": 6,
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

export const raw2024Data: RawData[] = [
  {
    "month": "Apr",
    "mechRo": {
      "General Repair": 168,
      "Preventive Maintenance-Paid Service(PMS)": 87,
      "2nd Free Service": 50,
      "1st Free Service": 39,
      "3rd Free Service": 39,
      "5th Free Service": 23,
      "4th Free Service": 17,
      "Accessory Orders": 7,
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
      "General Repair": 200,
      "Preventive Maintenance-Paid Service(PMS)": 94,
      "1st Free Service": 35,
      "3rd Free Service": 35,
      "Accessory Orders": 28,
      "2nd Free Service": 27,
      "5th Free Service": 25,
      "4th Free Service": 16,
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
      "General Repair": 210,
      "Preventive Maintenance-Paid Service(PMS)": 120,
      "1st Free Service": 58,
      "3rd Free Service": 40,
      "2nd Free Service": 31,
      "Accessory Orders": 18,
      "4th Free Service": 15,
      "5th Free Service": 15,
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
      "General Repair": 179,
      "Preventive Maintenance-Paid Service(PMS)": 81,
      "1st Free Service": 50,
      "3rd Free Service": 42,
      "2nd Free Service": 38,
      "5th Free Service": 28,
      "4th Free Service": 16,
      "Accessory Orders": 8,
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
      "General Repair": 159,
      "Preventive Maintenance-Paid Service(PMS)": 87,
      "1st Free Service": 37,
      "3rd Free Service": 35,
      "2nd Free Service": 33,
      "5th Free Service": 17,
      "4th Free Service": 16,
      "Accessory Orders": 8,
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
      "General Repair": 253,
      "Preventive Maintenance-Paid Service(PMS)": 88,
      "3rd Free Service": 43,
      "2nd Free Service": 42,
      "Accessory Orders": 31,
      "1st Free Service": 30,
      "4th Free Service": 27,
      "5th Free Service": 19,
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
      "General Repair": 276,
      "Preventive Maintenance-Paid Service(PMS)": 102,
      "3rd Free Service": 58,
      "2nd Free Service": 46,
      "1st Free Service": 43,
      "4th Free Service": 27,
      "5th Free Service": 23,
      "Accessory Orders": 14,
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
      "General Repair": 168,
      "Preventive Maintenance-Paid Service(PMS)": 98,
      "1st Free Service": 55,
      "2nd Free Service": 41,
      "3rd Free Service": 36,
      "4th Free Service": 22,
      "5th Free Service": 20,
      "Accessory Orders": 5,
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
      "General Repair": 234,
      "Preventive Maintenance-Paid Service(PMS)": 97,
      "2nd Free Service": 49,
      "1st Free Service": 44,
      "3rd Free Service": 43,
      "5th Free Service": 21,
      "4th Free Service": 20,
      "Accessory Orders": 19,
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
      "General Repair": 194,
      "Preventive Maintenance-Paid Service(PMS)": 105,
      "2nd Free Service": 45,
      "1st Free Service": 41,
      "3rd Free Service": 36,
      "Accessory Orders": 21,
      "4th Free Service": 19,
      "5th Free Service": 13,
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
      "General Repair": 209,
      "Preventive Maintenance-Paid Service(PMS)": 103,
      "3rd Free Service": 39,
      "1st Free Service": 32,
      "Accessory Orders": 30,
      "2nd Free Service": 25,
      "4th Free Service": 15,
      "5th Free Service": 9,
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
      "General Repair": 237,
      "Preventive Maintenance-Paid Service(PMS)": 100,
      "3rd Free Service": 46,
      "1st Free Service": 39,
      "2nd Free Service": 38,
      "5th Free Service": 14,
      "Accessory Orders": 14,
      "4th Free Service": 13,
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

const defaultRawData: RawData = {
    month: '',
    mechRo: {},
    bpRo: { total: 0 },
    mechParts: 0,
    bpParts: 0,
    mechLaborRevenue: 0,
    bpLaborRevenue: 0,
    mechAccessories: 0,
    bpAccessories: 0,
};

export const yearOnYearComparisonData: MonthlyComparisonData[] = monthOrder.map(monthName => {
  const data2024 = raw2024Data.find(d => d.month === monthName) || defaultRawData;
  const data2025 = raw2025Data.find(d => d.month === monthName) || defaultRawData;

  return {
    month: monthName,
    mechRo: {
      '2024': data2024.mechRo,
      '2025': data2025.mechRo,
      target: {}
    },
    bpRo: {
      '2024': data2024.bpRo.total,
      '2025': data2025.bpRo.total,
      target: 0
    },
    accessoriesRo: {
      '2024': data2024.mechAccessories + data2024.bpAccessories,
      '2025': data2025.mechAccessories + data2025.bpAccessories,
      target: 0
    },
    partsRevenue: {
      '2024': data2024.mechParts + data2024.bpParts,
      '2025': data2025.mechParts + data2025.bpParts,
      target: 0
    },
    labourRevenue: {
      '2024': data2024.mechLaborRevenue + data2024.bpLaborRevenue,
      '2025': data2025.mechLaborRevenue + data2025.bpLaborRevenue,
      target: 0
    }
  };
});
