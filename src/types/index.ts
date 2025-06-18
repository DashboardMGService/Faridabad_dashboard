export interface ServiceAdvisorData {
  name: string;
  throughput: number;
  vas: number;
  lab: number;
  acces: number;
  lub: number;
  bat: number;
  tyre: number;
  parts: number;
  wheelAlignment: number;
  brakePad: number;
  wiperBlade: number;
  washerFluid: number;
  rsa: number;
  ew: number;
}

export interface KpiData {
  date?: string;
  month?: string;
  mechRo: number;
  bpRo: number;
  accessoriesRo: number;
  partsRevenue?: number;
  labourRevenue?: number;
  csi: number;
  mgNps: number;
  dealerNps: number;
  serviceAdvisor: number;
  handoverDelivery: number;
  sopWorkCharges: number;
  sopFixRight: number;
  concernsEscalated?: number;
  ccptv: number;
  ccrMech: string;
  artMech?: string;
  ccrBp: string;
  artBp?: string;
  psfContact: string;
  mechRoAgeing?: string;
  bpRoAgeing?: string;
  sameDayDelivery?: string;
  bpRoTat?: number;
  warrantyClaimSubmission?: string;
}

export interface DailyKpi {
  date: string;
  mechRo: number;
  bpRo: number;
  accessoriesRo: number;
  csi: number;
  mgNps: number;
  dealerNps: number;
  serviceAdvisor: number;
  handoverDelivery: number;
  sopWorkCharges: number;
  sopFixRight: number;
  concernsEscalated: number;
  ccptv: number;
  ccrMech: string;
  artMech: string;
  ccrBp: string;
  artBp: string;
  psfContact: string;
}

export interface BreakEvenData {
  employeeCost: number;
  sellingDistributionCost: number;
  administrationCost: number;
  financeCost: number;
  totalCost: number;
  revenueRequired: number;
  currentLabourAchievement: number;
  achievementPercentage: number;
  gap: number;
}

export interface ComplaintData {
  id: string;
  type: string;
  status: string;
  customer: string;
  vehicle: string;
  description: string;
  dateReported: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  resolution?: string;
  dateResolved?: string;
}

export interface ServiceAdvisorPerformance {
  name: string;
  rsa: number;
  ew: number;
  wheelAlignment: number;
  balancing: number;
  upselling: number;
  customerSatisfaction: number;
}

export interface ServiceAdvisorData {
  name: string;
  throughput: number;
  vas: number;
  lab: number;
  acces: number;
  lub: number;
  bat: number;
  tyre: number;
  parts: number;
  wheelAlignment: number;
  brakePad: number;
  wiperBlade: number;
  washerFluid: number;
  rsa: number;
  ew: number;
}

export interface KpiData {
  date?: string;
  month?: string;
  mechRo: number;
  bpRo: number;
  accessoriesRo: number;
  partsRevenue?: number;
  labourRevenue?: number;
  csi: number;
  mgNps: number;
  dealerNps: number;
  serviceAdvisor: number;
  handoverDelivery: number;
  sopWorkCharges: number;
  sopFixRight: number;
  concernsEscalated?: number;
  ccptv: number;
  ccrMech: string;
  artMech?: string;
  ccrBp: string;
  artBp?: string;
  psfContact: string;
  mechRoAgeing?: string;
  bpRoAgeing?: string;
  sameDayDelivery?: string;
  bpRoTat?: number;
  warrantyClaimSubmission?: string;
}

export interface DailyKpi {
  date: string;
  mechRo: number;
  bpRo: number;
  accessoriesRo: number;
  csi: number;
  mgNps: number;
  dealerNps: number;
  serviceAdvisor: number;
  handoverDelivery: number;
  sopWorkCharges: number;
  sopFixRight: number;
  concernsEscalated: number;
  ccptv: number;
  ccrMech: string;
  artMech: string;
  ccrBp: string;
  artBp: string;
  psfContact: string;
}

export interface BreakEvenData {
  employeeCost: number;
  sellingDistributionCost: number;
  administrationCost: number;
  financeCost: number;
  totalCost: number;
  revenueRequired: number;
  currentLabourAchievement: number;
  achievementPercentage: number;
  gap: number;
}

export interface ComplaintData {
  id: string;
  type: string;
  status: string;
  customer: string;
  vehicle: string;
  description: string;
  dateReported: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  resolution?: string;
  dateResolved?: string;
}

export interface ServiceAdvisorPerformance {
  name: string;
  rsa: number;
  ew: number;
  wheelAlignment: number;
  balancing: number;
  upselling: number;
  customerSatisfaction: number;
}

export type DashboardView = 'revenue' | 'csi' | 'complaints' | 'advisor-performance' | 'kpi';

export interface TransformedPredictionDataForChart {
  month: string;
  mechRo_actual?: number;
  mechRo_predicted?: number;
  bpRo_actual?: number;
  bpRo_predicted?: number;
  partsRevenue_actual?: number;
  partsRevenue_predicted?: number;
  labourRevenue_actual?: number;
  labourRevenue_predicted?: number;
  advisor_top3_revenue_actual?: number;
  advisor_top3_revenue_predicted?: number;
}