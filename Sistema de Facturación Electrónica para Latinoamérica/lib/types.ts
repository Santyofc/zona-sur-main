export type CountryCode = "PE" | "MX" | "CO";

export interface TaxConfig {
  name: string;
  rate: number;
  code: string;
}

export interface CountryProfile {
  code: CountryCode;
  name: string;
  currency: string;
  currencySymbol: string;
  tax: TaxConfig;
  documentName: string; // RUC, RFC, NIT
  invoiceTypes: { code: string; name: string }[];
}

export interface Client {
  id: string;
  name: string;
  taxId: string; // RUC/RFC/NIT
  email: string;
  address: string;
  country: CountryCode;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  taxIncluded: boolean;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = "draft" | "issued" | "paid" | "cancelled";

export interface Invoice {
  id: string;
  number: string;
  type: string; // Factura, Boleta, Nota de Crédito
  date: string;
  dueDate: string;
  clientId: string;
  clientName: string;
  clientTaxId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  status: InvoiceStatus;
  country: CountryCode;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "accountant";
}
