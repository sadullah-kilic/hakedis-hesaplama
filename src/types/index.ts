export interface Project {
  id: string;
  name: string;
  description?: string;
  contractor: string;
  employer: string;
  location: string;
  startDate: string;
  endDate?: string;
  totalValue: number;
  status: 'active' | 'completed' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface PozItem {
  id: string;
  projectId: string;
  pozNo: string;
  description: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressEntry {
  id: string;
  projectId: string;
  pozId: string;
  period: number;
  completedQuantity: number;
  progressPercentage: number;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressReport {
  id: string;
  projectId: string;
  period: number;
  reportDate: string;
  totalWorkDone: number;
  previousWorkDone: number;
  currentWorkDone: number;
  priceAdjustment: number;
  deductions: number;
  advances: number;
  vatAmount: number;
  netPayable: number;
  status: 'draft' | 'submitted' | 'approved';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  projects: string[];
  createdAt: string;
}