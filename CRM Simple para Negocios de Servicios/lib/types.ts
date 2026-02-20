export type DealStage =
  | "prospect"
  | "contacted"
  | "proposal"
  | "negotiation"
  | "closed";

export interface Interaction {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  content: string;
  date: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  interactions: Interaction[];
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  expectedDate: string;
  notes: string;
  tags: string[];
}

export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  dealId: string;
  number: string;
  date: string;
  validUntil: string;
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "accepted" | "rejected";
}

export interface Invoice {
  id: string;
  quoteId: string;
  number: string;
  date: string;
  dueDate: string;
  total: number;
  status: "pending" | "paid" | "overdue";
}

export interface User {
  id: string;
  name: string;
  email: string;
}
