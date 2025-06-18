// File: src/data/tillDateComparisonData.ts

// --- Common Interfaces ---

/**
 * Represents the core values for comparing a single metric
 * between a current period (2025) and a previous period (2024).
 */
export interface ComparisonMetricValues {
  current: number;        // Value for 2025 (YTD or MTD)
  previous: number;       // Value for 2024 (corresponding YTD or MTD)
  target: number;         // Target for 2025
  percentChange?: number; // Pre-calculated: ((current - previous) / previous) * 100, rounded.
}

/**
 * Represents the cumulative values for a single metric for a specific month
 * within a Year-To-Date (YTD) context.
 */
export interface MonthlyCumulativeValue {
  month: string;                // "Jan", "Feb", ...
  currentCumulative: number;    // Cumulative value for 2025 up to this month
  previousCumulative: number;   // Cumulative value for 2024 up to this month
  // targetCumulative?: number; // Optional: Cumulative target for 2025 up to this month
  // percentChangeCumulative?: number; // Optional
}

// --- YTD (Year-To-Date vs Last-Year-To-Date) Data Structures ---

/**
 * Holds the summary and monthly breakdown for a single KPI in the YTD comparison (2025 vs 2024).
 */
export interface YtdKpiSet {
  summary: ComparisonMetricValues;
  monthlyBreakdown: MonthlyCumulativeValue[];
}

/**
 * Defines the structure for all YTD comparison data (2025 vs 2024), covering all tracked KPIs.
 */
export interface YtdComparisonDataType {
  throughput: YtdKpiSet;
  partsRevenue: YtdKpiSet;
  labourRevenue: YtdKpiSet;
  accessoriesRevenue: YtdKpiSet;
  totalRevenue: YtdKpiSet;
}

// --- MTD (Month-To-Date vs Last-Month-To-Date) Data Structures ---

/**
 * Holds the set of all tracked KPIs for a single month in the MTD comparison (2025 vs 2024).
 * Each KPI will have its 'current', 'previous', 'target', and 'percentChange'.
 */
export interface MtdKpiMetricSet {
  throughput: ComparisonMetricValues;
  partsRevenue: ComparisonMetricValues;
  labourRevenue: ComparisonMetricValues;
  accessoriesRevenue: ComparisonMetricValues;
  totalRevenue: ComparisonMetricValues;
}

/**
 * Defines the structure for all MTD comparison data (2025 vs 2024).
 * It's an object where each key is a three-letter month abbreviation (e.g., "Jan"),
 * and the value is the MtdKpiMetricSet for that month.
 */
export interface MtdComparisonDataType {
  [monthAbbreviation: string]: MtdKpiMetricSet; // e.g., Jan: MtdKpiMetricSet, Feb: MtdKpiMetricSet, ...
}

// --- Main Data Structure for the Entire File ---

/**
 * The main data structure for till-date comparisons,
 * focusing on 2025 (current) vs 2024 (previous).
 */
export interface TillDateComparisonMainData {
  ytd: YtdComparisonDataType;
  mtd: MtdComparisonDataType;
}

// --- Actual Data (2025 vs 2024) ---

export const tillDateComparisonData: TillDateComparisonMainData = {
  "ytd": {
    "throughput": {
      "summary": {
        "current": 3311,
        "previous": 3140,
        "target": 0,
        "percentChange": 5.45
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 555,
          "previousCumulative": 441
        },
        {
          "month": "Feb",
          "currentCumulative": 1085,
          "previousCumulative": 937
        },
        {
          "month": "Mar",
          "currentCumulative": 1674,
          "previousCumulative": 1425
        },
        {
          "month": "Apr",
          "currentCumulative": 2319,
          "previousCumulative": 1904
        },
        {
          "month": "May",
          "currentCumulative": 2990,
          "previousCumulative": 2487
        },
        {
          "month": "Jun",
          "currentCumulative": 3311,
          "previousCumulative": 3140
        },
        {
          "month": "Jul",
          "currentCumulative": 3311,
          "previousCumulative": 3737
        },
        {
          "month": "Aug",
          "currentCumulative": 3311,
          "previousCumulative": 4263
        },
        {
          "month": "Sep",
          "currentCumulative": 3311,
          "previousCumulative": 4826
        },
        {
          "month": "Oct",
          "currentCumulative": 3311,
          "previousCumulative": 5347
        },
        {
          "month": "Nov",
          "currentCumulative": 3311,
          "previousCumulative": 5889
        },
        {
          "month": "Dec",
          "currentCumulative": 3311,
          "previousCumulative": 6455
        }
      ]
    },
    "partsRevenue": {
      "summary": {
        "current": 29608802.380000003,
        "previous": 26094923.560000002,
        "target": 0,
        "percentChange": 13.47
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 5978885.49,
          "previousCumulative": 4423718.6899999995
        },
        {
          "month": "Feb",
          "currentCumulative": 10781145.39,
          "previousCumulative": 8968323.219999999
        },
        {
          "month": "Mar",
          "currentCumulative": 16085200.14,
          "previousCumulative": 13008463.17
        },
        {
          "month": "Apr",
          "currentCumulative": 21111985.740000002,
          "previousCumulative": 16693385.06
        },
        {
          "month": "May",
          "currentCumulative": 26992950.96,
          "previousCumulative": 21032283.740000002
        },
        {
          "month": "Jun",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 26094923.560000002
        },
        {
          "month": "Jul",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 32074205.150000002
        },
        {
          "month": "Aug",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 36888106.96
        },
        {
          "month": "Sep",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 41898011.52
        },
        {
          "month": "Oct",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 46746317.440000005
        },
        {
          "month": "Nov",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 52584518.18000001
        },
        {
          "month": "Dec",
          "currentCumulative": 29608802.380000003,
          "previousCumulative": 58772084.56000001
        }
      ]
    },
    "labourRevenue": {
      "summary": {
        "current": 14220906.98,
        "previous": 13111921.469999999,
        "target": 0,
        "percentChange": 8.46
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 2651634.55,
          "previousCumulative": 2075149.34
        },
        {
          "month": "Feb",
          "currentCumulative": 5226211.4399999995,
          "previousCumulative": 4333860.14
        },
        {
          "month": "Mar",
          "currentCumulative": 7982277.43,
          "previousCumulative": 6586631.47
        },
        {
          "month": "Apr",
          "currentCumulative": 10553703.09,
          "previousCumulative": 8850785.86
        },
        {
          "month": "May",
          "currentCumulative": 13067500.4,
          "previousCumulative": 10975561.61
        },
        {
          "month": "Jun",
          "currentCumulative": 14220906.98,
          "previousCumulative": 13111921.469999999
        },
        {
          "month": "Jul",
          "currentCumulative": 14220906.98,
          "previousCumulative": 15106918.629999999
        },
        {
          "month": "Aug",
          "currentCumulative": 14220906.98,
          "previousCumulative": 16920678.61
        },
        {
          "month": "Sep",
          "currentCumulative": 14220906.98,
          "previousCumulative": 18938727.61
        },
        {
          "month": "Oct",
          "currentCumulative": 14220906.98,
          "previousCumulative": 20806853.82
        },
        {
          "month": "Nov",
          "currentCumulative": 14220906.98,
          "previousCumulative": 22992312.7
        },
        {
          "month": "Dec",
          "currentCumulative": 14220906.98,
          "previousCumulative": 25158841.71
        }
      ]
    },
    "accessoriesRevenue": {
      "summary": {
        "current": 1506434.05,
        "previous": 466314.22000000003,
        "target": 0,
        "percentChange": 223.05
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 156630.38999999998,
          "previousCumulative": 91678.83
        },
        {
          "month": "Feb",
          "currentCumulative": 348452.18,
          "previousCumulative": 180277.15000000002
        },
        {
          "month": "Mar",
          "currentCumulative": 646076.01,
          "previousCumulative": 238931.83000000002
        },
        {
          "month": "Apr",
          "currentCumulative": 1007515.8200000001,
          "previousCumulative": 300405.91000000003
        },
        {
          "month": "May",
          "currentCumulative": 1361880.52,
          "previousCumulative": 374612.47000000003
        },
        {
          "month": "Jun",
          "currentCumulative": 1506434.05,
          "previousCumulative": 466314.22000000003
        },
        {
          "month": "Jul",
          "currentCumulative": 1506434.05,
          "previousCumulative": 618969.81
        },
        {
          "month": "Aug",
          "currentCumulative": 1506434.05,
          "previousCumulative": 801279.38
        },
        {
          "month": "Sep",
          "currentCumulative": 1506434.05,
          "previousCumulative": 1013987.63
        },
        {
          "month": "Oct",
          "currentCumulative": 1506434.05,
          "previousCumulative": 1119986.45
        },
        {
          "month": "Nov",
          "currentCumulative": 1506434.05,
          "previousCumulative": 1186229.24
        },
        {
          "month": "Dec",
          "currentCumulative": 1506434.05,
          "previousCumulative": 1274528.34
        }
      ]
    },
    "totalRevenue": {
      "summary": {
        "current": 45336143.41,
        "previous": 39673159.25,
        "target": 0,
        "percentChange": 14.27
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 8787150.43,
          "previousCumulative": 6590546.859999999
        },
        {
          "month": "Feb",
          "currentCumulative": 16355809.009999998,
          "previousCumulative": 13482460.509999998
        },
        {
          "month": "Mar",
          "currentCumulative": 24713553.58,
          "previousCumulative": 19834026.47
        },
        {
          "month": "Apr",
          "currentCumulative": 32673204.65,
          "previousCumulative": 25844576.83
        },
        {
          "month": "May",
          "currentCumulative": 41422331.879999995,
          "previousCumulative": 32382457.819999997
        },
        {
          "month": "Jun",
          "currentCumulative": 45336143.41,
          "previousCumulative": 39673159.25
        },
        {
          "month": "Jul",
          "currentCumulative": 45336143.41,
          "previousCumulative": 47800093.59
        },
        {
          "month": "Aug",
          "currentCumulative": 45336143.41,
          "previousCumulative": 54610064.95
        },
        {
          "month": "Sep",
          "currentCumulative": 45336143.41,
          "previousCumulative": 61850726.760000005
        },
        {
          "month": "Oct",
          "currentCumulative": 45336143.41,
          "previousCumulative": 68673157.71000001
        },
        {
          "month": "Nov",
          "currentCumulative": 45336143.41,
          "previousCumulative": 76763060.12
        },
        {
          "month": "Dec",
          "currentCumulative": 45336143.41,
          "previousCumulative": 85205454.61
        }
      ]
    }
  },
  "mtd": {
    "Jan": {
      "throughput": {
        "current": 555,
        "previous": 441,
        "target": 0,
        "percentChange": 25.85
      },
      "partsRevenue": {
        "current": 5978885.49,
        "previous": 4423718.6899999995,
        "target": 0,
        "percentChange": 35.16
      },
      "labourRevenue": {
        "current": 2651634.55,
        "previous": 2075149.34,
        "target": 0,
        "percentChange": 27.78
      },
      "accessoriesRevenue": {
        "current": 156630.38999999998,
        "previous": 91678.83,
        "target": 0,
        "percentChange": 70.85
      },
      "totalRevenue": {
        "current": 8787150.43,
        "previous": 6590546.859999999,
        "target": 0,
        "percentChange": 33.33
      }
    },
    "Feb": {
      "throughput": {
        "current": 530,
        "previous": 496,
        "target": 0,
        "percentChange": 6.85
      },
      "partsRevenue": {
        "current": 4802259.899999999,
        "previous": 4544604.529999999,
        "target": 0,
        "percentChange": 5.67
      },
      "labourRevenue": {
        "current": 2574576.89,
        "previous": 2258710.8,
        "target": 0,
        "percentChange": 13.98
      },
      "accessoriesRevenue": {
        "current": 191821.79,
        "previous": 88598.32,
        "target": 0,
        "percentChange": 116.51
      },
      "totalRevenue": {
        "current": 7568658.579999999,
        "previous": 6891913.649999999,
        "target": 0,
        "percentChange": 9.82
      }
    },
    "Mar": {
      "throughput": {
        "current": 589,
        "previous": 488,
        "target": 0,
        "percentChange": 20.7
      },
      "partsRevenue": {
        "current": 5304054.75,
        "previous": 4040139.9500000007,
        "target": 0,
        "percentChange": 31.28
      },
      "labourRevenue": {
        "current": 2756065.9899999998,
        "previous": 2252771.33,
        "target": 0,
        "percentChange": 22.34
      },
      "accessoriesRevenue": {
        "current": 297623.83,
        "previous": 58654.68000000001,
        "target": 0,
        "percentChange": 407.42
      },
      "totalRevenue": {
        "current": 8357744.57,
        "previous": 6351565.960000001,
        "target": 0,
        "percentChange": 31.59
      }
    },
    "Apr": {
      "throughput": {
        "current": 645,
        "previous": 479,
        "target": 0,
        "percentChange": 34.66
      },
      "partsRevenue": {
        "current": 5026785.6,
        "previous": 3684921.8900000006,
        "target": 0,
        "percentChange": 36.41
      },
      "labourRevenue": {
        "current": 2571425.66,
        "previous": 2264154.3899999997,
        "target": 0,
        "percentChange": 13.57
      },
      "accessoriesRevenue": {
        "current": 361439.81,
        "previous": 61474.079999999994,
        "target": 0,
        "percentChange": 487.95
      },
      "totalRevenue": {
        "current": 7959651.069999999,
        "previous": 6010550.36,
        "target": 0,
        "percentChange": 32.43
      }
    },
    "May": {
      "throughput": {
        "current": 671,
        "previous": 583,
        "target": 0,
        "percentChange": 15.09
      },
      "partsRevenue": {
        "current": 5880965.22,
        "previous": 4338898.68,
        "target": 0,
        "percentChange": 35.54
      },
      "labourRevenue": {
        "current": 2513797.31,
        "previous": 2124775.75,
        "target": 0,
        "percentChange": 18.31
      },
      "accessoriesRevenue": {
        "current": 354364.7,
        "previous": 74206.56,
        "target": 0,
        "percentChange": 377.54
      },
      "totalRevenue": {
        "current": 8749127.229999999,
        "previous": 6537880.989999999,
        "target": 0,
        "percentChange": 33.82
      }
    },
    "Jun": {
      "throughput": {
        "current": 321,
        "previous": 653,
        "target": 0,
        "percentChange": -50.84
      },
      "partsRevenue": {
        "current": 2615851.42,
        "previous": 5062639.82,
        "target": 0,
        "percentChange": -48.33
      },
      "labourRevenue": {
        "current": 1153406.58,
        "previous": 2136359.86,
        "target": 0,
        "percentChange": -46.01
      },
      "accessoriesRevenue": {
        "current": 144553.53,
        "previous": 91701.75,
        "target": 0,
        "percentChange": 57.63
      },
      "totalRevenue": {
        "current": 3913811.53,
        "previous": 7290701.43,
        "target": 0,
        "percentChange": -46.32
      }
    }
  }
}
;
