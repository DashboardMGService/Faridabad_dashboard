// File: src/data/csiDashboardDetailedData.ts

/**
 * Represents the KPI values for each month.
 * All values should be numerical (e.g., percentages as 80, not "80%").
 */
export interface MonthlyKpiValues {
  january: number | null;
  february: number | null;
  march: number | null;
  april: number | null;
  may: number | null;
  june: number | null;
  july: number | null;
  august: number | null;
  september: number | null;
  october: number | null;
  november: number | null;
  december: number | null;
}

/**
 * Represents a single Key Performance Indicator (KPI) entry.
 */
export interface KpiDataEntry {
  kpiName: string;        // The name of the KPI, e.g., "CSI", "MG NPS"
  targetString: string;   // The original target string from your dataset, e.g., "(Tgt >=875)"
  targetNumeric?: number; 
  unit?: 'percentage' | 'score' | 'days' | 'count' | 'ratio' | string; // string for flexibility
  monthlyValues: MonthlyKpiValues; // Monthly values for this KPI
  ytdValue: number | null;         // Year-to-date value for this KPI
}

/**
 * Represents all KPI data for a specific year.
 */
export interface YearlyKpiDataset {
  year: number;
  kpis: KpiDataEntry[];
}

export const csiDetailedData: YearlyKpiDataset[] = [
  {
    "year": 2024,
    "kpis": [
      {
        "kpiName": "CSI",
        "targetString": "(Tgt >=875)",
        "targetNumeric": 875.0,
        "unit": "score",
        "monthlyValues": {
          "january": 871.0,
          "february": 839.0,
          "march": 840.0,
          "april": 813.0,
          "may": 763.0,
          "june": 773.0,
          "july": 808.0,
          "august": 769.0,
          "september": 776.0,
          "october": 802.0,
          "november": 818.0,
          "december": 822.0
        },
        "ytdValue": 807.833333333333
      },
      {
        "kpiName": "MG NPS",
        "targetString": "(Tgt >=70)",
        "targetNumeric": 70.0,
        "unit": "score",
        "monthlyValues": {
          "january": 65.0,
          "february": 75.0,
          "march": 63.0,
          "april": 62.0,
          "may": 45.0,
          "june": 48.0,
          "july": 64.0,
          "august": 50.0,
          "september": 53.0,
          "october": 53.0,
          "november": 55.0,
          "december": 64.0
        },
        "ytdValue": 58.0833333333333
      },
      {
        "kpiName": "Dealer NPS",
        "targetString": "(Tgt >=70)",
        "targetNumeric": 70.0,
        "unit": "score",
        "monthlyValues": {
          "january": 77.0,
          "february": 58.0,
          "march": 63.0,
          "april": 57.0,
          "may": 43.0,
          "june": 47.0,
          "july": 52.0,
          "august": 44.0,
          "september": 42.0,
          "october": 58.0,
          "november": 58.0,
          "december": 58.0
        },
        "ytdValue": 54.75
      },
      {
        "kpiName": "Service Advisor",
        "targetString": "(Tgt >=850)",
        "targetNumeric": 850.0,
        "unit": "score",
        "monthlyValues": {
          "january": 869.0,
          "february": 853.0,
          "march": 854.0,
          "april": 807.0,
          "may": 761.0,
          "june": 765.0,
          "july": 817.0,
          "august": 777.0,
          "september": 783.0,
          "october": 797.0,
          "november": 813.0,
          "december": 819.0
        },
        "ytdValue": 809.583333333333
      },
      {
        "kpiName": "Handover and delivery",
        "targetString": "(Tgt >=850)",
        "targetNumeric": 850.0,
        "unit": "score",
        "monthlyValues": {
          "january": 881.0,
          "february": 849.0,
          "march": 866.0,
          "april": 855.0,
          "may": 822.0,
          "june": 833.0,
          "july": 849.0,
          "august": 831.0,
          "september": 817.0,
          "october": 845.0,
          "november": 844.0,
          "december": 837.0
        },
        "ytdValue": 844.083333333333
      },
      {
        "kpiName": "Fix Right First Time",
        "targetString": "(Tgt >=90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 88.0,
          "february": 88.0,
          "march": 88.0,
          "april": 84.0,
          "may": 79.0,
          "june": 79.0,
          "july": 83.0,
          "august": 79.0,
          "september": 83.0,
          "october": 80.0,
          "november": 88.0,
          "december": 90.0
        },
        "ytdValue": 84.0833333333333
      },
      {
        "kpiName": "Washing Quality",
        "targetString": "(Tgt >=850)",
        "targetNumeric": 850.0,
        "unit": "score",
        "monthlyValues": {
          "january": 831.0,
          "february": 829.0,
          "march": 791.0,
          "april": 776.0,
          "may": 791.0,
          "june": 803.0,
          "july": 809.0,
          "august": 791.0,
          "september": 834.0,
          "october": 833.0,
          "november": 822.0,
          "december": 811.0
        },
        "ytdValue": 810.083333333333
      },
      {
        "kpiName": "No. of concerns escalated",
        "targetString": "",
        "targetNumeric": 0.0,
        "unit": "count",
        "monthlyValues": {
          "january": 30.0,
          "february": 33.0,
          "march": 44.0,
          "april": 32.0,
          "may": 67.0,
          "june": 35.0,
          "july": 32.0,
          "august": 64.0,
          "september": 84.0,
          "october": 60.0,
          "november": 24.0,
          "december": 21.0
        },
        "ytdValue": 526.0
      },
      {
        "kpiName": "CCPTV (CC/1000 Vehicles)",
        "targetString": "(Tgt =32)",
        "targetNumeric": 32.0,
        "unit": "score",
        "monthlyValues": {
          "january": 21.0,
          "february": 23.0,
          "march": 29.0,
          "april": 22.0,
          "may": 46.0,
          "june": 25.0,
          "july": 26.0,
          "august": 28.0,
          "september": 58.0,
          "october": 48.0,
          "november": 18.0,
          "december": 16.0
        },
        "ytdValue": 360.0
      },
      {
        "kpiName": "CCR% <= 3 days (Mech)",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 100.0,
          "february": 90.0,
          "march": 80.0,
          "april": 79.0,
          "may": 87.0,
          "june": 67.0,
          "july": 64.0,
          "august": 90.0,
          "september": 73.0,
          "october": 77.0,
          "november": 57.0,
          "december": 73.0
        },
        "ytdValue": 78.08
      },
      {
        "kpiName": "CCR% <= 7 days (BP)",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 86.0,
          "february": 100.0,
          "march": 75.0,
          "april": 56.0,
          "may": 93.0,
          "june": 100.0,
          "july": 88.0,
          "august": 100.0,
          "september": 90.0,
          "october": 92.0,
          "november": 20.0,
          "december": 80.0
        },
        "ytdValue": 81.67
      },
      {
        "kpiName": "3rd Day PSF Contact %age",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 80.0,
          "february": 81.0,
          "march": 81.0,
          "april": 71.0,
          "may": 83.0,
          "june": 74.0,
          "july": 81.0,
          "august": 72.0,
          "september": 72.0,
          "october": 68.0,
          "november": 75.0,
          "december": 74.0
        },
        "ytdValue": 76.0
      },
      {
        "kpiName": "Mech RO ageing > 3 days",
        "targetString": "(Tgt < 2%)",
        "targetNumeric": 2.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 2.2,
          "february": 3.4,
          "march": 4.6,
          "april": 2.2,
          "may": 3.0,
          "june": 8.72,
          "july": 5.49,
          "august": 7.02,
          "september": 6.91,
          "october": 8.43,
          "november": 6.98,
          "december": 6.09
        },
        "ytdValue": 5.42
      },
      {
        "kpiName": "BP RO ageing > 15 days",
        "targetString": "(Tgt < 10%)",
        "targetNumeric": 10.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 8.5,
          "february": 4.9,
          "march": 8.1,
          "april": 9.7,
          "may": 8.0,
          "june": 10.68,
          "july": 10.82,
          "august": 20.27,
          "september": 20.44,
          "october": 20.56,
          "november": 20.81,
          "december": 17.74
        },
        "ytdValue": 13.38
      },
      {
        "kpiName": "Same Day Delivery",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 86.0,
          "february": 82.0,
          "march": 78.0,
          "april": 86.0,
          "may": 80.0,
          "june": 74.0,
          "july": 78.0,
          "august": 72.0,
          "september": 72.0,
          "october": 73.0,
          "november": 76.0,
          "december": 76.0
        },
        "ytdValue": 77.75
      },
      {
        "kpiName": "BP RO TAT",
        "targetString": "(Tgt <= 8days)",
        "targetNumeric": 8.0,
        "unit": "days",
        "monthlyValues": {
          "january": 8.4,
          "february": 6.6,
          "march": 8.2,
          "april": 8.4,
          "may": 8.7,
          "june": 8.9,
          "july": 8.5,
          "august": 11.1,
          "september": 11.9,
          "october": 13.9,
          "november": 16.3,
          "december": 12.8
        },
        "ytdValue": 10.3083333333333
      },
      {
        "kpiName": "Warranty Claim Submission within 5 Days",
        "targetString": "5 Days",
        "targetNumeric": 0.0, // As per user data, might need review if target is 5 days for the value
        "unit": "days",
        "monthlyValues": {
          "january": 0.57,
          "february": 0.67,
          "march": 0.68,
          "april": 0.83,
          "may": 0.7,
          "june": 0.87,
          "july": 0.76,
          "august": 0.73,
          "september": 0.85,
          "october": 0.91,
          "november": 0.86,
          "december": 0.91
        },
        "ytdValue": 0.778333333333333
      }
    ]
  },
  {
    "year": 2025,
    "kpis": [
      {
        "kpiName": "CSI",
        "targetString": "(Tgt >=875)",
        "targetNumeric": 875.0,
        "unit": "score",
        "monthlyValues": {
          "january": 884.0,
          "february": 873.0,
          "march": 867.0,
          "april": 844.0,
          "may": 859.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 842.2
      },
      {
        "kpiName": "MG NPS",
        "targetString": "(Tgt >=70)",
        "targetNumeric": 70.0,
        "unit": "score",
        "monthlyValues": {
          "january": 71.0,
          "february": 68.0,
          "march": 40.0,
          "april": 65.0,
          "may": 63.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 61.4
      },
      {
        "kpiName": "Dealer NPS",
        "targetString": "(Tgt >=70)",
        "targetNumeric": 70.0,
        "unit": "score",
        "monthlyValues": {
          "january": 76.0,
          "february": 69.0,
          "march": 20.0,
          "april": 64.0,
          "may": 84.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 62.6
      },
      {
        "kpiName": "Service Advisor",
        "targetString": "(Tgt >=850)",
        "targetNumeric": 850.0,
        "unit": "score",
        "monthlyValues": {
          "january": 865.0,
          "february": 866.0,
          "march": 720.0,
          "april": 817.0,
          "may": 874.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 828.4
      },
      {
        "kpiName": "Handover and delivery",
        "targetString": "(Tgt >=850)",
        "targetNumeric": 850.0,
        "unit": "score",
        "monthlyValues": {
          "january": 866.0,
          "february": 858.0,
          "march": 760.0,
          "april": 844.0,
          "may": 874.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 840.4
      },
      {
        "kpiName": "SOP- Work & Charges explained",
        "targetString": "",
        "targetNumeric": 0.0,
        "unit": "score",
        "monthlyValues": {
          "january": 96.0,
          "february": 99.0,
          "march": 100.0,
          "april": 94.0,
          "may": 78.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 93.4
      },
      {
        "kpiName": "SOP- Fix Right First Time",
        "targetString": "",
        "targetNumeric": 0.0,
        "unit": "score",
        "monthlyValues": {
          "january": 87.0,
          "february": 85.0,
          "march": 80.0,
          "april": 94.0,
          "may": 78.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 84.8
      },
      {
        "kpiName": "No. of concerns escalated",
        "targetString": "",
        "targetNumeric": 0.0,
        "unit": "count",
        "monthlyValues": {
          "january": 26.0,
          "february": 32.0,
          "march": 30.0,
          "april": 34.0,
          "may": 34.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 156.0
      },
      {
        "kpiName": "CCPTV (CC/1000 Vehicles)",
        "targetString": "(Tgt =27)",
        "targetNumeric": 27.0,
        "unit": "score",
        "monthlyValues": {
          "january": 25.0,
          "february": 25.0,
          "march": 27.0,
          "april": 28.84,
          "may": 26.44,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 26.456
      },
      {
        "kpiName": "CCR% <= 3 days (Mech)",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 89.0,
          "february": 74.0,
          "march": 77.0,
          "april": 50.0,
          "may": 37.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 65.4
      },
      {
        "kpiName": "CCR% <= 7 days (BP)",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 50.0,
          "february": 86.0,
          "march": 71.0,
          "april": 20.0,
          "may": 70.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 59.4
      },
      {
        "kpiName": "3rd Day PSF Contact %age",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 73.0,
          "february": 80.0,
          "march": 75.0,
          "april": 82.0,
          "may": 68.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 75.6
      },
      {
        "kpiName": "Mech RO ageing > 3 days",
        "targetString": "(Tgt < 2%)",
        "targetNumeric": 2.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 4.9,
          "february": 5.4,
          "march": 6.86,
          "april": 8.19,
          "may": 8.23,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 6.72
      },
      {
        "kpiName": "BP RO ageing > 15 days",
        "targetString": "(Tgt < 10%)",
        "targetNumeric": 10.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 7.43,
          "february": 12.88,
          "march": 9.62,
          "april": 12.0,
          "may": 10.59,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 10.5
      },
      {
        "kpiName": "Same Day Delivery",
        "targetString": "(Tgt > 90%)",
        "targetNumeric": 90.0,
        "unit": "percentage",
        "monthlyValues": {
          "january": 79.0,
          "february": 84.0,
          "march": 78.0,
          "april": 75.0,
          "may": 76.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 78.4
      },
      {
        "kpiName": "BP RO TAT",
        "targetString": "(Tgt <= 8days)",
        "targetNumeric": 8.0,
        "unit": "days",
        "monthlyValues": {
          "january": 8.5,
          "february": 9.9,
          "march": 8.0,
          "april": 8.0,
          "may": 11.0,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 9.08
      },
      {
        "kpiName": "Warranty Claim Submission within 5 Days",
        "targetString": "5 Days",
        "targetNumeric": 0.0, // As per user data
        "unit": "days",
        "monthlyValues": {
          "january": 0.89,
          "february": 0.96,
          "march": 0.88,
          "april": 0.99,
          "may": 0.99,
          "june": 0.0,
          "july": 0.0,
          "august": 0.0,
          "september": 0.0,
          "october": 0.0,
          "november": 0.0,
          "december": 0.0
        },
        "ytdValue": 0.942
      }
    ]
  }
];

// Optional Helper function to parse target strings (example)
// You might need more sophisticated parsing based on all your target string formats.
export function parseTargetValue(targetString: string): number | undefined {
  if (!targetString) return undefined;
  const match = targetString.match(/([<>=]+)\s*([\d.]+)\%?/);
  if (match && match[2]) {
    return parseFloat(match[2]);
  }
  const daysMatch = targetString.match(/([\d.]+)\s*Days/i);
  if (daysMatch && daysMatch[1]) {
    return parseFloat(daysMatch[1]);
  }
  return undefined;
}
