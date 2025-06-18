// src/data/kpiDashboardData.ts

/*
================================================================================
| Instructions for adding data:                                                |
| 1. All data for the KPI Dashboard should be placed in this file.             |
| 2. The necessary TypeScript types are defined below.                         |
| 3. Populate the `kpiDataByYear` object with your monthly data for each year. |
| 4. Update the `breakEvenData` object with the relevant values.               |
================================================================================
*/

// 1. --- TYPE DEFINITIONS ---

export interface MonthlyKpi {
  month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
  mechRo: number;
  bpRo: number;
  accessoriesRo: number;
  partsRevenue: number;
  labourRevenue: number;
  csi: number;
  mgNps: number;
  // Add any other monthly KPI fields you need
}

// 2. --- PASTE YOUR DATA HERE ---

/**
 * Contains all KPI data, organized by year.
 * Add new years as top-level keys (e.g., "2026").
 * Each year should have an array of monthly data objects.
 */
export const kpiDataByYear: { [year: number]: MonthlyKpi[] } = {
  2025: [
    // --- Paste your 2025 monthly data here ---
    { month: "Jan", mechRo: 1062, bpRo: 148, accessoriesRo: 73, partsRevenue: 131, labourRevenue: 55, csi: 884, mgNps: 75 },
    { month: "Feb", mechRo: 978, bpRo: 154, accessoriesRo: 33, partsRevenue: 131, labourRevenue: 55, csi: 880, mgNps: 72 },
    { month: "Mar", mechRo: 972, bpRo: 156, accessoriesRo: 28, partsRevenue: 135, labourRevenue: 58, csi: 873, mgNps: 68 },
    // Example for next month: { month: "Apr", mechRo: 0, bpRo: 0, accessoriesRo: 0, partsRevenue: 0, labourRevenue: 0, csi: 0, mgNps: 0 },
  ],
  2024: [
    // --- Paste your 2024 monthly data here ---
    { month: "Jan", mechRo: 921, bpRo: 132, accessoriesRo: 54, partsRevenue: 112, labourRevenue: 48, csi: 871, mgNps: 65 },
    { month: "Feb", mechRo: 943, bpRo: 142, accessoriesRo: 28, partsRevenue: 118, labourRevenue: 51, csi: 868, mgNps: 69 },
    { month: "Mar", mechRo: 932, bpRo: 147, accessoriesRo: 24, partsRevenue: 121, labourRevenue: 53, csi: 865, mgNps: 71 },
    { month: "Apr", mechRo: 967, bpRo: 152, accessoriesRo: 32, partsRevenue: 125, labourRevenue: 55, csi: 870, mgNps: 73 },
    // ... add all 12 months for 2024
  ],
};


