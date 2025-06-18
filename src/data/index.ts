import type { 
  ServiceAdvisorData, 
  KpiData, 
  DailyKpi, 
  BreakEvenData, 
  ComplaintData,
  ServiceAdvisorPerformance
} from '../types';

// Current month service advisor data (from provided dataset)
export const serviceAdvisorData: ServiceAdvisorData[] = [
  {
    name: "Ajay Kumar",
    throughput: 353,
    vas: 8090,
    lab: 39759.35,
    acces: 7651.05,
    lub: 20435.47,
    bat: 539047.01,
    tyre: 0,
    parts: 205895.18,
    wheelAlignment: 7,
    brakePad: 9866.4,
    wiperBlade: 0,
    washerFluid: 4,
    rsa: 0,
    ew: 0
  },
  {
    name: "Dhanesh Tripathi",
    throughput: 68,
    vas: 110874,
    lab: 120922.5,
    acces: 17942.32,
    lub: 77928.73,
    bat: 36291.4,
    tyre: 14864.06,
    parts: 562941.31,
    wheelAlignment: 58,
    brakePad: 35436.7,
    wiperBlade: 0,
    washerFluid: 35,
    rsa: 0,
    ew: 0
  },
  {
    name: "Yashvir Singh Aswal",
    throughput: 109,
    vas: 168276,
    lab: 197738.88,
    acces: 55389.6,
    lub: 95652.81,
    bat: 31267.52,
    tyre: 0,
    parts: 550651.21,
    wheelAlignment: 62,
    brakePad: 69442.15,
    wiperBlade: 0,
    washerFluid: 71,
    rsa: 0,
    ew: 0
  },
  {
    name: "Vikram",
    throughput: 69,
    vas: 153870,
    lab: 105917.15,
    acces: 23764.81,
    lub: 79781.71,
    bat: 944.29,
    tyre: 12924.22,
    parts: 317205.54,
    wheelAlignment: 41,
    brakePad: 43871.85,
    wiperBlade: 0,
    washerFluid: 47,
    rsa: 0,
    ew: 0
  },
  {
    name: "Nikhil Kumar",
    throughput: 111,
    vas: 92489,
    lab: 93945,
    acces: 10816.23,
    lub: 13560,
    bat: 37853.39,
    tyre: 0,
    parts: 614322.74,
    wheelAlignment: 0,
    brakePad: 0,
    wiperBlade: 0,
    washerFluid: 73,
    rsa: 0,
    ew: 0
  },
  // Additional dummy data for visualization
  {
    name: "Rahul Sharma",
    throughput: 143,
    vas: 128765,
    lab: 154390.22,
    acces: 32871.45,
    lub: 87342.18,
    bat: 28761.33,
    tyre: 21543.87,
    parts: 478932.11,
    wheelAlignment: 38,
    brakePad: 52871.32,
    wiperBlade: 12,
    washerFluid: 52,
    rsa: 8,
    ew: 5
  },
  {
    name: "Amit Singh",
    throughput: 165,
    vas: 187432,
    lab: 178954.37,
    acces: 43982.76,
    lub: 98743.21,
    bat: 54321.98,
    tyre: 32198.45,
    parts: 527834.23,
    wheelAlignment: 45,
    brakePad: 67892.45,
    wiperBlade: 18,
    washerFluid: 64,
    rsa: 12,
    ew: 9
  },
  {
    name: "Priya Patel",
    throughput: 128,
    vas: 142387,
    lab: 132786.54,
    acces: 29876.32,
    lub: 76543.21,
    bat: 42198.76,
    tyre: 18765.43,
    parts: 423876.54,
    wheelAlignment: 32,
    brakePad: 48765.32,
    wiperBlade: 9,
    washerFluid: 47,
    rsa: 6,
    ew: 4
  },
  {
    name: "Sanjay Gupta",
    throughput: 187,
    vas: 198765,
    lab: 198732.65,
    acces: 47832.18,
    lub: 103298.76,
    bat: 64321.87,
    tyre: 37654.21,
    parts: 587654.32,
    wheelAlignment: 49,
    brakePad: 72143.87,
    wiperBlade: 21,
    washerFluid: 73,
    rsa: 15,
    ew: 11
  },
  {
    name: "Deepak Verma",
    throughput: 103,
    vas: 112398,
    lab: 121876.43,
    acces: 24321.87,
    lub: 65432.18,
    bat: 32198.76,
    tyre: 14321.65,
    parts: 387654.32,
    wheelAlignment: 28,
    brakePad: 39876.54,
    wiperBlade: 7,
    washerFluid: 39,
    rsa: 5,
    ew: 3
  }
];

// Daily KPI Data (from provided dataset with some additions)
export const dailyKpiData: DailyKpi[] = [
  {
    date: "22-Mar-25",
    mechRo: 43,
    bpRo: 9,
    accessoriesRo: 0,
    csi: 890,
    mgNps: 75,
    dealerNps: 74,
    serviceAdvisor: 875,
    handoverDelivery: 873,
    sopWorkCharges: 100,
    sopFixRight: 85,
    concernsEscalated: 2,
    ccptv: 48,
    ccrMech: "100%",
    artMech: "1 Day",
    ccrBp: "NA",
    artBp: "NA",
    psfContact: "52%"
  },
  {
    date: "23-Mar-25",
    mechRo: 38,
    bpRo: 7,
    accessoriesRo: 2,
    csi: 885,
    mgNps: 72,
    dealerNps: 73,
    serviceAdvisor: 870,
    handoverDelivery: 875,
    sopWorkCharges: 98,
    sopFixRight: 87,
    concernsEscalated: 1,
    ccptv: 45,
    ccrMech: "98%",
    artMech: "1.2 Days",
    ccrBp: "95%",
    artBp: "5 Days",
    psfContact: "55%"
  },
  {
    date: "24-Mar-25",
    mechRo: 41,
    bpRo: 8,
    accessoriesRo: 1,
    csi: 888,
    mgNps: 74,
    dealerNps: 72,
    serviceAdvisor: 872,
    handoverDelivery: 870,
    sopWorkCharges: 99,
    sopFixRight: 86,
    concernsEscalated: 2,
    ccptv: 46,
    ccrMech: "97%",
    artMech: "1.5 Days",
    ccrBp: "92%",
    artBp: "5.5 Days",
    psfContact: "54%"
  },
  {
    date: "25-Mar-25",
    mechRo: 45,
    bpRo: 10,
    accessoriesRo: 3,
    csi: 892,
    mgNps: 76,
    dealerNps: 75,
    serviceAdvisor: 878,
    handoverDelivery: 876,
    sopWorkCharges: 100,
    sopFixRight: 88,
    concernsEscalated: 1,
    ccptv: 42,
    ccrMech: "99%",
    artMech: "1.1 Days",
    ccrBp: "94%",
    artBp: "5.2 Days",
    psfContact: "58%"
  },
  {
    date: "26-Mar-25",
    mechRo: 42,
    bpRo: 8,
    accessoriesRo: 2,
    csi: 889,
    mgNps: 73,
    dealerNps: 74,
    serviceAdvisor: 874,
    handoverDelivery: 872,
    sopWorkCharges: 99,
    sopFixRight: 86,
    concernsEscalated: 2,
    ccptv: 44,
    ccrMech: "98%",
    artMech: "1.3 Days",
    ccrBp: "93%",
    artBp: "5.4 Days",
    psfContact: "56%"
  }
];

// Monthly KPI data for 2025
export const monthlyKpiData: KpiData[] = [
  {
    month: "Jan-25",
    mechRo: 1062,
    bpRo: 148,
    accessoriesRo: 73,
    partsRevenue: 131,
    labourRevenue: 55,
    csi: 884,
    mgNps: 71,
    dealerNps: 76,
    serviceAdvisor: 865,
    handoverDelivery: 866,
    sopWorkCharges: 96,
    sopFixRight: 87,
    concernsEscalated: 26,
    ccptv: 25,
    ccrMech: "89%",
    ccrBp: "50%",
    psfContact: "73%",
    mechRoAgeing: "4.90%",
    bpRoAgeing: "7.43%",
    sameDayDelivery: "79%",
    bpRoTat: 8.5,
    warrantyClaimSubmission: "89%"
  },
  {
    month: "Feb-25",
    mechRo: 978,
    bpRo: 154,
    accessoriesRo: 33,
    partsRevenue: 131,
    labourRevenue: 55,
    csi: 880,
    mgNps: 55,
    dealerNps: 73,
    serviceAdvisor: 891,
    handoverDelivery: 891,
    sopWorkCharges: 100,
    sopFixRight: 82,
    concernsEscalated: 32,
    ccptv: 28,
    ccrMech: "73%",
    ccrBp: "83%",
    psfContact: "76%",
    mechRoAgeing: "5.83%",
    bpRoAgeing: "12.99%",
    sameDayDelivery: "82%",
    bpRoTat: 8.8,
    warrantyClaimSubmission: "91%"
  },
  {
    month: "Mar-25",
    mechRo: 972,
    bpRo: 156,
    accessoriesRo: 28,
    partsRevenue: 135,
    labourRevenue: 58,
    csi: 873,
    mgNps: 66,
    dealerNps: 69,
    serviceAdvisor: 857,
    handoverDelivery: 874,
    sopWorkCharges: 95,
    sopFixRight: 91,
    concernsEscalated: 30,
    ccptv: 27,
    ccrMech: "77%",
    ccrBp: "71%",
    psfContact: "75%",
    mechRoAgeing: "5.37%",
    bpRoAgeing: "10.21%",
    sameDayDelivery: "81%",
    bpRoTat: 8.7,
    warrantyClaimSubmission: "90%"
  }
];

// Previous year (2024) data for comparison
export const previousYearData = [
  {
    month: "Jan",
    mechRo: 921,
    bpRo: 132,
    accessoriesRo: 54,
    partsRevenue: 112,
    labourRevenue: 48,
    csi: 871
  },
  {
    month: "Feb",
    mechRo: 943,
    bpRo: 142,
    accessoriesRo: 28,
    partsRevenue: 118,
    labourRevenue: 51,
    csi: 868
  },
  {
    month: "Mar",
    mechRo: 932,
    bpRo: 147,
    accessoriesRo: 24,
    partsRevenue: 121,
    labourRevenue: 53,
    csi: 865
  },
  {
    month: "Apr",
    mechRo: 967,
    bpRo: 152,
    accessoriesRo: 32,
    partsRevenue: 125,
    labourRevenue: 54,
    csi: 870
  },
  {
    month: "May",
    mechRo: 984,
    bpRo: 158,
    accessoriesRo: 36,
    partsRevenue: 129,
    labourRevenue: 55,
    csi: 875
  },
  {
    month: "Jun",
    mechRo: 998,
    bpRo: 162,
    accessoriesRo: 38,
    partsRevenue: 132,
    labourRevenue: 57,
    csi: 872
  },
  {
    month: "Jul",
    mechRo: 1012,
    bpRo: 165,
    accessoriesRo: 42,
    partsRevenue: 135,
    labourRevenue: 58,
    csi: 878
  },
  {
    month: "Aug",
    mechRo: 1025,
    bpRo: 168,
    accessoriesRo: 45,
    partsRevenue: 138,
    labourRevenue: 59,
    csi: 880
  },
  {
    month: "Sep",
    mechRo: 1034,
    bpRo: 171,
    accessoriesRo: 48,
    partsRevenue: 141,
    labourRevenue: 60,
    csi: 882
  },
  {
    month: "Oct",
    mechRo: 1042,
    bpRo: 173,
    accessoriesRo: 50,
    partsRevenue: 143,
    labourRevenue: 61,
    csi: 885
  },
  {
    month: "Nov",
    mechRo: 1050,
    bpRo: 175,
    accessoriesRo: 52,
    partsRevenue: 145,
    labourRevenue: 62,
    csi: 887
  },
  {
    month: "Dec",
    mechRo: 1058,
    bpRo: 177,
    accessoriesRo: 54,
    partsRevenue: 147,
    labourRevenue: 63,
    csi: 890
  }
];

// Break even data from the provided dataset
export const breakEvenData: BreakEvenData = {
  employeeCost: 4969219,
  sellingDistributionCost: 72000,
  administrationCost: 3692777,
  financeCost: 21034,
  totalCost: 8755030,
  revenueRequired: 8755030,
  currentLabourAchievement: 5503733,
  achievementPercentage: 63,
  gap: -3251297
};

// Dummy data for PSF internal complaints
export const complaintData: ComplaintData[] = [
  {
    id: "PSF-2025-001",
    type: "Service Quality",
    status: "Resolved",
    customer: "Rajesh Kumar",
    vehicle: "MG Hector (MH01AB1234)",
    description: "Customer reported engine noise after service",
    dateReported: "2025-01-05",
    assignedTo: "Ajay Kumar",
    priority: "High",
    resolution: "Engine mount replaced under warranty",
    dateResolved: "2025-01-07"
  },
  {
    id: "PSF-2025-002",
    type: "Staff Behavior",
    status: "Resolved",
    customer: "Priya Singh",
    vehicle: "MG ZS EV (DL05CD5678)",
    description: "Customer complained about rude behavior from service staff",
    dateReported: "2025-01-12",
    assignedTo: "Dhanesh Tripathi",
    priority: "Medium",
    resolution: "Staff counseled and customer offered complimentary service",
    dateResolved: "2025-01-14"
  },
  {
    id: "PSF-2025-003",
    type: "Delivery Delay",
    status: "Resolved",
    customer: "Amit Sharma",
    vehicle: "MG Astor (UP16EF9012)",
    description: "Vehicle delivery delayed by 2 days",
    dateReported: "2025-01-18",
    assignedTo: "Yashvir Singh Aswal",
    priority: "Medium",
    resolution: "Customer compensated with free accessories",
    dateResolved: "2025-01-19"
  },
  {
    id: "PSF-2025-004",
    type: "Billing Issue",
    status: "Resolved",
    customer: "Neha Gupta",
    vehicle: "MG Gloster (HR26GH3456)",
    description: "Customer billed for parts not replaced",
    dateReported: "2025-01-25",
    assignedTo: "Vikram",
    priority: "High",
    resolution: "Bill corrected and customer refunded",
    dateResolved: "2025-01-26"
  },
  {
    id: "PSF-2025-005",
    type: "Service Quality",
    status: "Pending",
    customer: "Rahul Verma",
    vehicle: "MG Hector Plus (KA01IJ7890)",
    description: "AC not cooling properly after service",
    dateReported: "2025-02-03",
    assignedTo: "Nikhil Kumar",
    priority: "Medium"
  },
  {
    id: "PSF-2025-006",
    type: "Parts Availability",
    status: "Resolved",
    customer: "Smita Patel",
    vehicle: "MG ZS EV (GJ05KL1234)",
    description: "Customer waiting for brake pads for 1 week",
    dateReported: "2025-02-10",
    assignedTo: "Ajay Kumar",
    priority: "High",
    resolution: "Parts expedited and fitted with complimentary wheel alignment",
    dateResolved: "2025-02-12"
  },
  {
    id: "PSF-2025-007",
    type: "Cleanliness",
    status: "Resolved",
    customer: "Vikram Singh",
    vehicle: "MG Astor (PB10MN5678)",
    description: "Vehicle returned with interior stains",
    dateReported: "2025-02-15",
    assignedTo: "Dhanesh Tripathi",
    priority: "Low",
    resolution: "Complimentary interior cleaning provided",
    dateResolved: "2025-02-16"
  },
  {
    id: "PSF-2025-008",
    type: "Service Quality",
    status: "Pending",
    customer: "Sanjay Kapoor",
    vehicle: "MG Hector (TN07OP9012)",
    description: "Steering wheel vibration after wheel balancing",
    dateReported: "2025-02-22",
    assignedTo: "Yashvir Singh Aswal",
    priority: "Medium"
  },
  {
    id: "PSF-2025-009",
    type: "Appointment",
    status: "Resolved",
    customer: "Anjali Mathur",
    vehicle: "MG ZS EV (MP09QR3456)",
    description: "Customer appointment rescheduled without notice",
    dateReported: "2025-02-28",
    assignedTo: "Vikram",
    priority: "Low",
    resolution: "Pickup and drop service offered as compensation",
    dateResolved: "2025-03-01"
  },
  {
    id: "PSF-2025-010",
    type: "Billing Issue",
    status: "Pending",
    customer: "Deepak Sharma",
    vehicle: "MG Gloster (RJ11ST7890)",
    description: "Warranty claim rejected incorrectly",
    dateReported: "2025-03-05",
    assignedTo: "Nikhil Kumar",
    priority: "High"
  }
];

// Dummy data for RSA and EW per advisor
export const advisorPerformanceData: ServiceAdvisorPerformance[] = [
  {
    name: "Ajay Kumar",
    rsa: 8,
    ew: 5,
    wheelAlignment: 32,
    balancing: 28,
    upselling: 72,
    customerSatisfaction: 87
  },
  {
    name: "Dhanesh Tripathi",
    rsa: 12,
    ew: 9,
    wheelAlignment: 58,
    balancing: 45,
    upselling: 85,
    customerSatisfaction: 92
  },
  {
    name: "Yashvir Singh Aswal",
    rsa: 15,
    ew: 11,
    wheelAlignment: 62,
    balancing: 54,
    upselling: 90,
    customerSatisfaction: 94
  },
  {
    name: "Vikram",
    rsa: 7,
    ew: 4,
    wheelAlignment: 41,
    balancing: 37,
    upselling: 68,
    customerSatisfaction: 85
  },
  {
    name: "Nikhil Kumar",
    rsa: 5,
    ew: 3,
    wheelAlignment: 28,
    balancing: 22,
    upselling: 65,
    customerSatisfaction: 82
  },
  {
    name: "Rahul Sharma",
    rsa: 10,
    ew: 7,
    wheelAlignment: 45,
    balancing: 40,
    upselling: 78,
    customerSatisfaction: 88
  },
  {
    name: "Amit Singh",
    rsa: 14,
    ew: 10,
    wheelAlignment: 52,
    balancing: 48,
    upselling: 82,
    customerSatisfaction: 90
  },
  {
    name: "Priya Patel",
    rsa: 9,
    ew: 6,
    wheelAlignment: 38,
    balancing: 35,
    upselling: 75,
    customerSatisfaction: 86
  }
];

// Monthly trends for complaints (for chart visualization)
export const complaintTrends = [
  { month: "Jan", resolved: 28, pending: 5, total: 33 },
  { month: "Feb", resolved: 25, pending: 7, total: 32 },
  { month: "Mar", resolved: 22, pending: 8, total: 30 }
];

// Calculate total revenue for each service advisor
export const calculateTotalRevenue = (advisor: ServiceAdvisorData): number => {
  return advisor.vas + advisor.lab + advisor.acces + advisor.lub + advisor.bat + advisor.tyre + advisor.parts;
};

// Get top service advisors by revenue
export const getTopServiceAdvisors = (count: number = 10): ServiceAdvisorData[] => {
  return [...serviceAdvisorData]
    .sort((a, b) => calculateTotalRevenue(b) - calculateTotalRevenue(a))
    .slice(0, count);
};

// Get complaint counts by status
export const getComplaintCountsByStatus = (): { resolved: number; pending: number } => {
  const resolved = complaintData.filter(complaint => complaint.status === "Resolved").length;
  const pending = complaintData.filter(complaint => complaint.status === "Pending").length;
  return { resolved, pending };
};

// Get complaint counts by type
export const getComplaintCountsByType = (): Record<string, number> => {
  return complaintData.reduce((acc, complaint) => {
    acc[complaint.type] = (acc[complaint.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};