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
        "current": 7072,
        "previous": 9727,
        "target": 0,
        "percentChange": -27.3
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 1280,
          "previousCumulative": 1520
        },
        {
          "month": "Feb",
          "currentCumulative": 2564,
          "previousCumulative": 3017
        },
        {
          "month": "Mar",
          "currentCumulative": 3738,
          "previousCumulative": 4605
        },
        {
          "month": "Apr",
          "currentCumulative": 5036,
          "previousCumulative": 6369
        },
        {
          "month": "May",
          "currentCumulative": 6409,
          "previousCumulative": 8064
        },
        {
          "month": "Jun",
          "currentCumulative": 7072,
          "previousCumulative": 9727
        },
        {
          "month": "Jul",
          "currentCumulative": 7072,
          "previousCumulative": 11612
        },
        {
          "month": "Aug",
          "currentCumulative": 7072,
          "previousCumulative": 13264
        },
        {
          "month": "Sep",
          "currentCumulative": 7072,
          "previousCumulative": 14859
        },
        {
          "month": "Oct",
          "currentCumulative": 7072,
          "previousCumulative": 16217
        },
        {
          "month": "Nov",
          "currentCumulative": 7072,
          "previousCumulative": 17641
        },
        {
          "month": "Dec",
          "currentCumulative": 7072,
          "previousCumulative": 19126
        }
      ]
    },
    "partsRevenue": {
      "summary": {
        "current": 76494041.23000002,
        "previous": 92696652.66,
        "target": 0,
        "percentChange": -17.48
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 12185462.34,
          "previousCumulative": 16645196.41
        },
        {
          "month": "Feb",
          "currentCumulative": 25457486.090000004,
          "previousCumulative": 32842773.21
        },
        {
          "month": "Mar",
          "currentCumulative": 38717409.080000006,
          "previousCumulative": 48923797.879999995
        },
        {
          "month": "Apr",
          "currentCumulative": 52946628.00000001,
          "previousCumulative": 64379752.62
        },
        {
          "month": "May",
          "currentCumulative": 69392634.86000001,
          "previousCumulative": 79380883.09
        },
        {
          "month": "Jun",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 92696652.66
        },
        {
          "month": "Jul",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 108471348.64999999
        },
        {
          "month": "Aug",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 125761442.52999999
        },
        {
          "month": "Sep",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 143599655.96999997
        },
        {
          "month": "Oct",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 163307567.58999997
        },
        {
          "month": "Nov",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 183280371.26999998
        },
        {
          "month": "Dec",
          "currentCumulative": 76494041.23000002,
          "previousCumulative": 200061845.01
        }
      ]
    },
    "labourRevenue": {
      "summary": {
        "current": 31419378.89,
        "previous": 37669464.8,
        "target": 0,
        "percentChange": -16.59
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 6049615.77,
          "previousCumulative": 6370545.399999999
        },
        {
          "month": "Feb",
          "currentCumulative": 11838075.68,
          "previousCumulative": 12896479.03
        },
        {
          "month": "Mar",
          "currentCumulative": 17655137.54,
          "previousCumulative": 20028952.259999998
        },
        {
          "month": "Apr",
          "currentCumulative": 23220947.52,
          "previousCumulative": 26235375.619999997
        },
        {
          "month": "May",
          "currentCumulative": 28903832.65,
          "previousCumulative": 32267207.569999997
        },
        {
          "month": "Jun",
          "currentCumulative": 31419378.89,
          "previousCumulative": 37669464.8
        },
        {
          "month": "Jul",
          "currentCumulative": 31419378.89,
          "previousCumulative": 44486863.93
        },
        {
          "month": "Aug",
          "currentCumulative": 31419378.89,
          "previousCumulative": 50513238.67
        },
        {
          "month": "Sep",
          "currentCumulative": 31419378.89,
          "previousCumulative": 56373524.82
        },
        {
          "month": "Oct",
          "currentCumulative": 31419378.89,
          "previousCumulative": 62114722.96
        },
        {
          "month": "Nov",
          "currentCumulative": 31419378.89,
          "previousCumulative": 70032988.06
        },
        {
          "month": "Dec",
          "currentCumulative": 31419378.89,
          "previousCumulative": 77127012.65
        }
      ]
    },
    "accessoriesRevenue": {
      "summary": {
        "current": 3516445.29,
        "previous": 2614941.7800000003,
        "target": 0,
        "percentChange": 34.48
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 778562.6099999999,
          "previousCumulative": 360638.82000000007
        },
        {
          "month": "Feb",
          "currentCumulative": 1422965.19,
          "previousCumulative": 838194.5800000001
        },
        {
          "month": "Mar",
          "currentCumulative": 1912315.72,
          "previousCumulative": 1384275.1500000001
        },
        {
          "month": "Apr",
          "currentCumulative": 2527934.33,
          "previousCumulative": 1769099.33
        },
        {
          "month": "May",
          "currentCumulative": 3236514.18,
          "previousCumulative": 2171471.52
        },
        {
          "month": "Jun",
          "currentCumulative": 3516445.29,
          "previousCumulative": 2614941.7800000003
        },
        {
          "month": "Jul",
          "currentCumulative": 3516445.29,
          "previousCumulative": 3112242.5500000003
        },
        {
          "month": "Aug",
          "currentCumulative": 3516445.29,
          "previousCumulative": 3471870.56
        },
        {
          "month": "Sep",
          "currentCumulative": 3516445.29,
          "previousCumulative": 3934260.0
        },
        {
          "month": "Oct",
          "currentCumulative": 3516445.29,
          "previousCumulative": 4217418.17
        },
        {
          "month": "Nov",
          "currentCumulative": 3516445.29,
          "previousCumulative": 4547110.86
        },
        {
          "month": "Dec",
          "currentCumulative": 3516445.29,
          "previousCumulative": 4885275.78
        }
      ]
    },
    "totalRevenue": {
      "summary": {
        "current": 111429865.41000001,
        "previous": 132981059.24,
        "target": 0,
        "percentChange": -16.21
      },
      "monthlyBreakdown": [
        {
          "month": "Jan",
          "currentCumulative": 19013640.72,
          "previousCumulative": 23376380.63
        },
        {
          "month": "Feb",
          "currentCumulative": 38718526.96,
          "previousCumulative": 46577446.82
        },
        {
          "month": "Mar",
          "currentCumulative": 58284862.34,
          "previousCumulative": 70337025.28999999
        },
        {
          "month": "Apr",
          "currentCumulative": 78695509.85000001,
          "previousCumulative": 92384227.57
        },
        {
          "month": "May",
          "currentCumulative": 101532981.69000001,
          "previousCumulative": 113819562.17999999
        },
        {
          "month": "Jun",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 132981059.24
        },
        {
          "month": "Jul",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 156070455.13
        },
        {
          "month": "Aug",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 179746551.76
        },
        {
          "month": "Sep",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 203907440.79
        },
        {
          "month": "Oct",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 229639708.72
        },
        {
          "month": "Nov",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 257860470.19
        },
        {
          "month": "Dec",
          "currentCumulative": 111429865.41000001,
          "previousCumulative": 282074133.44
        }
      ]
    }
  },
  "mtd": {
    "Jan": {
      "throughput": {
        "current": 1280,
        "previous": 1520,
        "target": 0,
        "percentChange": -15.79
      },
      "partsRevenue": {
        "current": 12185462.34,
        "previous": 16645196.41,
        "target": 0,
        "percentChange": -26.79
      },
      "labourRevenue": {
        "current": 6049615.77,
        "previous": 6370545.399999999,
        "target": 0,
        "percentChange": -5.04
      },
      "accessoriesRevenue": {
        "current": 778562.6099999999,
        "previous": 360638.82000000007,
        "target": 0,
        "percentChange": 115.88
      },
      "totalRevenue": {
        "current": 19013640.72,
        "previous": 23376380.63,
        "target": 0,
        "percentChange": -18.66
      }
    },
    "Feb": {
      "throughput": {
        "current": 1284,
        "previous": 1497,
        "target": 0,
        "percentChange": -14.23
      },
      "partsRevenue": {
        "current": 13272023.750000002,
        "previous": 16197576.8,
        "target": 0,
        "percentChange": -18.06
      },
      "labourRevenue": {
        "current": 5788459.91,
        "previous": 6525933.63,
        "target": 0,
        "percentChange": -11.3
      },
      "accessoriesRevenue": {
        "current": 644402.5800000001,
        "previous": 477555.76,
        "target": 0,
        "percentChange": 34.94
      },
      "totalRevenue": {
        "current": 19704886.240000002,
        "previous": 23201066.19,
        "target": 0,
        "percentChange": -15.07
      }
    },
    "Mar": {
      "throughput": {
        "current": 1174,
        "previous": 1588,
        "target": 0,
        "percentChange": -26.07
      },
      "partsRevenue": {
        "current": 13259922.990000002,
        "previous": 16081024.669999998,
        "target": 0,
        "percentChange": -17.54
      },
      "labourRevenue": {
        "current": 5817061.859999999,
        "previous": 7132473.23,
        "target": 0,
        "percentChange": -18.44
      },
      "accessoriesRevenue": {
        "current": 489350.52999999997,
        "previous": 546080.5700000001,
        "target": 0,
        "percentChange": -10.39
      },
      "totalRevenue": {
        "current": 19566335.380000003,
        "previous": 23759578.47,
        "target": 0,
        "percentChange": -17.65
      }
    },
    "Apr": {
      "throughput": {
        "current": 1298,
        "previous": 1764,
        "target": 0,
        "percentChange": -26.42
      },
      "partsRevenue": {
        "current": 14229218.920000002,
        "previous": 15455954.740000002,
        "target": 0,
        "percentChange": -7.94
      },
      "labourRevenue": {
        "current": 5565809.98,
        "previous": 6206423.359999999,
        "target": 0,
        "percentChange": -10.32
      },
      "accessoriesRevenue": {
        "current": 615618.6100000001,
        "previous": 384824.18,
        "target": 0,
        "percentChange": 59.97
      },
      "totalRevenue": {
        "current": 20410647.51,
        "previous": 22047202.28,
        "target": 0,
        "percentChange": -7.42
      }
    },
    "May": {
      "throughput": {
        "current": 1373,
        "previous": 1695,
        "target": 0,
        "percentChange": -19.0
      },
      "partsRevenue": {
        "current": 16446006.86,
        "previous": 15001130.469999999,
        "target": 0,
        "percentChange": 9.63
      },
      "labourRevenue": {
        "current": 5682885.129999999,
        "previous": 6031831.95,
        "target": 0,
        "percentChange": -5.79
      },
      "accessoriesRevenue": {
        "current": 708579.85,
        "previous": 402372.19000000006,
        "target": 0,
        "percentChange": 76.1
      },
      "totalRevenue": {
        "current": 22837471.84,
        "previous": 21435334.61,
        "target": 0,
        "percentChange": 6.54
      }
    },
    "Jun": {
      "throughput": {
        "current": 663,
        "previous": 1663,
        "target": 0,
        "percentChange": -60.13
      },
      "partsRevenue": {
        "current": 7101406.369999999,
        "previous": 13315769.57,
        "target": 0,
        "percentChange": -46.67
      },
      "labourRevenue": {
        "current": 2515546.24,
        "previous": 5402257.2299999995,
        "target": 0,
        "percentChange": -53.44
      },
      "accessoriesRevenue": {
        "current": 279931.11000000004,
        "previous": 443470.26,
        "target": 0,
        "percentChange": -36.88
      },
      "totalRevenue": {
        "current": 9896883.719999999,
        "previous": 19161497.060000002,
        "target": 0,
        "percentChange": -48.35
      }
    }
  }
}
;
