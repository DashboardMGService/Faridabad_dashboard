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
          "actual": 1520,
          "target": 1535
        },
        "labour": {
          "actual": 6370545.399999999,
          "target": 5853000
        },
        "accessories": {
          "actual": 360638.82000000007,
          "target": 370500
        },
        "lubricant": {
          "actual": 1166204.6800000002,
          "target": 1172500
        },
        "parts": {
          "actual": 16645196.41,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 1280,
          "target": 1316.574537
        },
        "labour": {
          "actual": 6049615.77,
          "target": 8777270.509
        },
        "accessories": {
          "actual": 778562.6099999999,
          "target": 1296074.537
        },
        "lubricant": {
          "actual": 981165.62,
          "target": 1051667.083
        },
        "parts": {
          "actual": 12185462.34,
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
          "actual": 1497,
          "target": 1535
        },
        "labour": {
          "actual": 6525933.63,
          "target": 5853000
        },
        "accessories": {
          "actual": 477555.76,
          "target": 370500
        },
        "lubricant": {
          "actual": 1286430.76,
          "target": 1172500
        },
        "parts": {
          "actual": 16197576.8,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 1284,
          "target": 1384.748427
        },
        "labour": {
          "actual": 5788459.91,
          "target": 8948818.234000001
        },
        "accessories": {
          "actual": 644402.5800000001,
          "target": 1365048.427
        },
        "lubricant": {
          "actual": 870287.0800000001,
          "target": 1118223.584
        },
        "parts": {
          "actual": 13272023.750000002,
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
          "actual": 1588,
          "target": 1535
        },
        "labour": {
          "actual": 7132473.23,
          "target": 5853000
        },
        "accessories": {
          "actual": 546080.5700000001,
          "target": 370500
        },
        "lubricant": {
          "actual": 1338339.45,
          "target": 1172500
        },
        "parts": {
          "actual": 16081024.669999998,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 1174,
          "target": 1399.186417
        },
        "labour": {
          "actual": 5817061.859999999,
          "target": 9070701.594999999
        },
        "accessories": {
          "actual": 489350.52999999997,
          "target": 1277436.417
        },
        "lubricant": {
          "actual": 950848.0700000002,
          "target": 1148117.776
        },
        "parts": {
          "actual": 13259922.990000002,
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
          "actual": 1764,
          "target": 1535
        },
        "labour": {
          "actual": 6206423.359999999,
          "target": 5853000
        },
        "accessories": {
          "actual": 384824.18,
          "target": 370500
        },
        "lubricant": {
          "actual": 1348949.4100000001,
          "target": 1172500
        },
        "parts": {
          "actual": 15455954.740000002,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 1298,
          "target": 1468.518132
        },
        "labour": {
          "actual": 5565809.98,
          "target": 9567427.968
        },
        "accessories": {
          "actual": 615618.6100000001,
          "target": 1447118.132
        },
        "lubricant": {
          "actual": 945727.57,
          "target": 1182566.319
        },
        "parts": {
          "actual": 14229218.920000002,
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
          "actual": 1695,
          "target": 1535
        },
        "labour": {
          "actual": 6031831.95,
          "target": 5853000
        },
        "accessories": {
          "actual": 402372.19000000006,
          "target": 370500
        },
        "lubricant": {
          "actual": 1259840.91,
          "target": 1172500
        },
        "parts": {
          "actual": 15001130.469999999,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 1373,
          "target": 1448.650183
        },
        "labour": {
          "actual": 5682885.129999999,
          "target": 9451595.786
        },
        "accessories": {
          "actual": 708579.85,
          "target": 1427450.183
        },
        "lubricant": {
          "actual": 998963.99,
          "target": 1165985.165
        },
        "parts": {
          "actual": 16446006.86,
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
          "actual": 1663,
          "target": 1535
        },
        "labour": {
          "actual": 5402257.2299999995,
          "target": 5853000
        },
        "accessories": {
          "actual": 443470.26,
          "target": 370500
        },
        "lubricant": {
          "actual": 1072869.98,
          "target": 1172500
        },
        "parts": {
          "actual": 13315769.57,
          "target": 13530000
        }
      },
      "2025": {
        "throughput": {
          "actual": 663,
          "target": 1538.611521
        },
        "labour": {
          "actual": 2515546.24,
          "target": 10476829.539
        },
        "accessories": {
          "actual": 279931.11000000004,
          "target": 1513211.521
        },
        "lubricant": {
          "actual": 472973.39999999997,
          "target": 1219650.369
        },
        "parts": {
          "actual": 7101406.369999999,
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
          "actual": 1885,
          "target": 1535
        },
        "labour": {
          "actual": 6817399.130000001,
          "target": 5853000
        },
        "accessories": {
          "actual": 497300.77,
          "target": 370500
        },
        "lubricant": {
          "actual": 1370826.2999999998,
          "target": 1172500
        },
        "parts": {
          "actual": 15774695.989999998,
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
          "actual": 1652,
          "target": 1535
        },
        "labour": {
          "actual": 6026374.74,
          "target": 5853000
        },
        "accessories": {
          "actual": 359628.0099999999,
          "target": 370500
        },
        "lubricant": {
          "actual": 999999.87,
          "target": 1172500
        },
        "parts": {
          "actual": 17290093.88,
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
          "actual": 1595,
          "target": 1535
        },
        "labour": {
          "actual": 5860286.15,
          "target": 5853000
        },
        "accessories": {
          "actual": 462389.44,
          "target": 370500
        },
        "lubricant": {
          "actual": 1219999.6800000002,
          "target": 1172500
        },
        "parts": {
          "actual": 17838213.439999998,
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
          "actual": 1358,
          "target": 1535
        },
        "labour": {
          "actual": 5741198.14,
          "target": 5853000
        },
        "accessories": {
          "actual": 283158.17,
          "target": 370500
        },
        "lubricant": {
          "actual": 1030428.52,
          "target": 1172500
        },
        "parts": {
          "actual": 19707911.620000005,
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
          "actual": 1424,
          "target": 1535
        },
        "labour": {
          "actual": 7918265.1,
          "target": 5853000
        },
        "accessories": {
          "actual": 329692.69,
          "target": 370500
        },
        "lubricant": {
          "actual": 1115833.28,
          "target": 1172500
        },
        "parts": {
          "actual": 19972803.679999996,
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
          "actual": 1485,
          "target": 1535
        },
        "labour": {
          "actual": 7094024.59,
          "target": 5853000
        },
        "accessories": {
          "actual": 338164.9199999999,
          "target": 370500
        },
        "lubricant": {
          "actual": 1152066.2099999997,
          "target": 1172500
        },
        "parts": {
          "actual": 16781473.740000002,
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
