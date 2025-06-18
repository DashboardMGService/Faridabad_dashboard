export interface RevenueCategoryDetail {
  actual: number;
  target?: number; // Target is optional
}

export interface MonthlyBreakdownYearDetail {
  throughput: RevenueCategoryDetail;
  labour: RevenueCategoryDetail;
  accessories: RevenueCategoryDetail;
  lubricant: RevenueCategoryDetail;
  parts: RevenueCategoryDetail;
}

export interface YearlyRevenueData {
  '2024': MonthlyBreakdownYearDetail;
  '2025': MonthlyBreakdownYearDetail;
}

export interface MonthlyRevenueBreakdownEntry {
  month: string; // "Jan", "Feb", ..., "Dec"
  data: YearlyRevenueData;
}

export const detailedRevenueBreakdownData: MonthlyRevenueBreakdownEntry[] = [
  {
    "month": "Jan",
    "data": {
      "2024": {
        "throughput": {
          "actual": 441,
          "target": 1535
        },
        "labour": {
          "actual": 2075149.34,
          "target": 5853000
        },
        "accessories": {
          "actual": 91678.83,
          "target": 370500
        },
        "lubricant": {
          "actual": 425012.01,
          "target": 1172500
        },
        "parts": {
          "actual": 4423718.6899999995,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 555,
          "target": 1316.574537
        },
        "labour": {
          "actual": 2651634.55,
          "target": 8777270.509
        },
        "accessories": {
          "actual": 156630.38999999998,
          "target": 1296074.537
        },
        "lubricant": {
          "actual": 451873.57,
          "target": 1051667.083
        },
        "parts": {
          "actual": 5978885.49,
          "target": 15353730.3
        }
      }
    }
  },
  {
    "month": "Feb",
    "data": {
      "2024": {
        "throughput": {
          "actual": 496,
          "target": 1535
        },
        "labour": {
          "actual": 2258710.8,
          "target": 5853000
        },
        "accessories": {
          "actual": 88598.32,
          "target": 370500
        },
        "lubricant": {
          "actual": 374019.48000000004,
          "target": 1172500
        },
        "parts": {
          "actual": 4544604.529999999,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 530,
          "target": 1384.748427
        },
        "labour": {
          "actual": 2574576.89,
          "target": 8948818.234000001
        },
        "accessories": {
          "actual": 191821.79,
          "target": 1365048.427
        },
        "lubricant": {
          "actual": 482643.38,
          "target": 1118223.584
        },
        "parts": {
          "actual": 4802259.899999999,
          "target": 15645225.778
        }
      }
    }
  },
  {
    "month": "Mar",
    "data": {
      "2024": {
        "throughput": {
          "actual": 488,
          "target": 1535
        },
        "labour": {
          "actual": 2252771.33,
          "target": 5853000
        },
        "accessories": {
          "actual": 58654.68000000001,
          "target": 370500
        },
        "lubricant": {
          "actual": 425153.28,
          "target": 1172500
        },
        "parts": {
          "actual": 4040139.9500000007,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 589,
          "target": 1399.186417
        },
        "labour": {
          "actual": 2756065.9899999998,
          "target": 9070701.594999999
        },
        "accessories": {
          "actual": 297623.83,
          "target": 1277436.417
        },
        "lubricant": {
          "actual": 503945.17000000004,
          "target": 1148117.776
        },
        "parts": {
          "actual": 5304054.75,
          "target": 15049488.809
        }
      }
    }
  },
  {
    "month": "Apr",
    "data": {
      "2024": {
        "throughput": {
          "actual": 479,
          "target": 1535
        },
        "labour": {
          "actual": 2264154.3899999997,
          "target": 5853000
        },
        "accessories": {
          "actual": 61474.079999999994,
          "target": 370500
        },
        "lubricant": {
          "actual": 423946.52999999997,
          "target": 1172500
        },
        "parts": {
          "actual": 3684921.8900000006,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 645,
          "target": 1468.518132
        },
        "labour": {
          "actual": 2571425.66,
          "target": 9567427.968
        },
        "accessories": {
          "actual": 361439.81,
          "target": 1447118.132
        },
        "lubricant": {
          "actual": 476204.63,
          "target": 1182566.319
        },
        "parts": {
          "actual": 5026785.6,
          "target": 16729160.085
        }
      }
    }
  },
  {
    "month": "May",
    "data": {
      "2024": {
        "throughput": {
          "actual": 583,
          "target": 1535
        },
        "labour": {
          "actual": 2124775.75,
          "target": 5853000
        },
        "accessories": {
          "actual": 74206.56,
          "target": 370500
        },
        "lubricant": {
          "actual": 476681.97,
          "target": 1172500
        },
        "parts": {
          "actual": 4338898.68,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 671,
          "target": 1448.650183
        },
        "labour": {
          "actual": 2513797.31,
          "target": 9451595.786
        },
        "accessories": {
          "actual": 354364.7,
          "target": 1427450.183
        },
        "lubricant": {
          "actual": 535404.35,
          "target": 1165985.165
        },
        "parts": {
          "actual": 5880965.22,
          "target": 16527043.862
        }
      }
    }
  },
  {
    "month": "Jun",
    "data": {
      "2024": {
        "throughput": {
          "actual": 653,
          "target": 1535
        },
        "labour": {
          "actual": 2136359.86,
          "target": 5853000
        },
        "accessories": {
          "actual": 91701.75,
          "target": 370500
        },
        "lubricant": {
          "actual": 528948.7000000001,
          "target": 1172500
        },
        "parts": {
          "actual": 5062639.82,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 321,
          "target": 1538.611521
        },
        "labour": {
          "actual": 1153406.58,
          "target": 10476829.539
        },
        "accessories": {
          "actual": 144553.53,
          "target": 1513211.521
        },
        "lubricant": {
          "actual": 274760.11,
          "target": 1219650.369
        },
        "parts": {
          "actual": 2615851.42,
          "target": 18333355.829
        }
      }
    }
  },
  {
    "month": "Jul",
    "data": {
      "2024": {
        "throughput": {
          "actual": 597,
          "target": 1535
        },
        "labour": {
          "actual": 1994997.16,
          "target": 5853000
        },
        "accessories": {
          "actual": 152655.59000000003,
          "target": 370500
        },
        "lubricant": {
          "actual": 455497.54000000004,
          "target": 1172500
        },
        "parts": {
          "actual": 5979281.59,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1708.780555
        },
        "labour": {
          "actual": 0,
          "target": 11436556.387
        },
        "accessories": {
          "actual": 0,
          "target": 1681880.555
        },
        "lubricant": {
          "actual": 0,
          "target": 1363052.5
        },
        "parts": {
          "actual": 0,
          "target": 20006865.14
        }
      }
    }
  },
  {
    "month": "Aug",
    "data": {
      "2024": {
        "throughput": {
          "actual": 526,
          "target": 1535
        },
        "labour": {
          "actual": 1813759.98,
          "target": 5853000
        },
        "accessories": {
          "actual": 182309.56999999998,
          "target": 370500
        },
        "lubricant": {
          "actual": 503349.86,
          "target": 1172500
        },
        "parts": {
          "actual": 4813901.81,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1647.355452
        },
        "labour": {
          "actual": 0,
          "target": 11096428.442
        },
        "accessories": {
          "actual": 0,
          "target": 1620955.452
        },
        "lubricant": {
          "actual": 0,
          "target": 1311019.906
        },
        "parts": {
          "actual": 0,
          "target": 19413998.11
        }
      }
    }
  },
  {
    "month": "Sep",
    "data": {
      "2024": {
        "throughput": {
          "actual": 563,
          "target": 1535
        },
        "labour": {
          "actual": 2018049.0,
          "target": 5853000
        },
        "accessories": {
          "actual": 212708.25,
          "target": 370500
        },
        "lubricant": {
          "actual": 418841.25,
          "target": 1172500
        },
        "parts": {
          "actual": 5009904.5600000005,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1622.1429
        },
        "labour": {
          "actual": 0,
          "target": 11033614.469999999
        },
        "accessories": {
          "actual": 0,
          "target": 1595442.9
        },
        "lubricant": {
          "actual": 0,
          "target": 1286378.61
        },
        "parts": {
          "actual": 0,
          "target": 19307314.6
        }
      }
    }
  },
  {
    "month": "Oct",
    "data": {
      "2024": {
        "throughput": {
          "actual": 521,
          "target": 1535
        },
        "labour": {
          "actual": 1868126.21,
          "target": 5853000
        },
        "accessories": {
          "actual": 105998.81999999999,
          "target": 370500
        },
        "lubricant": {
          "actual": 437319.7199999999,
          "target": 1172500
        },
        "parts": {
          "actual": 4848305.92,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1830.677456
        },
        "labour": {
          "actual": 0,
          "target": 11869513.061
        },
        "accessories": {
          "actual": 0,
          "target": 1804377.456
        },
        "lubricant": {
          "actual": 0,
          "target": 1476659.71
        },
        "parts": {
          "actual": 0,
          "target": 20752697.05
        }
      }
    }
  },
  {
    "month": "Nov",
    "data": {
      "2024": {
        "throughput": {
          "actual": 542,
          "target": 1535
        },
        "labour": {
          "actual": 2185458.88,
          "target": 5853000
        },
        "accessories": {
          "actual": 66242.79,
          "target": 370500
        },
        "lubricant": {
          "actual": 474408.01,
          "target": 1172500
        },
        "parts": {
          "actual": 5838200.74,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1599.679134
        },
        "labour": {
          "actual": 0,
          "target": 10724220.277999999
        },
        "accessories": {
          "actual": 0,
          "target": 1574379.134
        },
        "lubricant": {
          "actual": 0,
          "target": 1275261.221
        },
        "parts": {
          "actual": 0,
          "target": 18761259.55
        }
      }
    }
  },
  {
    "month": "Dec",
    "data": {
      "2024": {
        "throughput": {
          "actual": 566,
          "target": 1535
        },
        "labour": {
          "actual": 2166529.01,
          "target": 5853000
        },
        "accessories": {
          "actual": 88299.09999999999,
          "target": 370500
        },
        "lubricant": {
          "actual": 503079.31,
          "target": 1172500
        },
        "parts": {
          "actual": 6187566.38,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 0,
          "target": 1549.075286
        },
        "labour": {
          "actual": 0,
          "target": 10552223.73
        },
        "accessories": {
          "actual": 0,
          "target": 1523475.286
        },
        "lubricant": {
          "actual": 0,
          "target": 1227767.758
        },
        "parts": {
          "actual": 0,
          "target": 18465410.882
        }
      }
    }
  }
];

// Colors for the pie chart and potentially for the radial bars
export const REVENUE_PIE_CHART_COLORS = {
  THROUGHPUT: '#fb8500',    // Orange
  LABOUR: '#4361ee',       // Blue
  PARTS: '#f72585',        // Pink
  ACCESSORIES: '#4cc9f0',  // Light Blue
  LUBRICANT: '#2ec4b6',     // Teal
};
