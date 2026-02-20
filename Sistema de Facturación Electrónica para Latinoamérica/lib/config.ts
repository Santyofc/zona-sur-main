import { CountryProfile } from "./types";

export const COUNTRY_CONFIGS: Record<string, CountryProfile> = {
  PE: {
    code: "PE",
    name: "Perú",
    currency: "PEN",
    currencySymbol: "S/",
    tax: { name: "IGV", rate: 0.18, code: "IGV" },
    documentName: "RUC",
    invoiceTypes: [
      { code: "01", name: "Factura Electrónica" },
      { code: "03", name: "Boleta de Venta" },
      { code: "07", name: "Nota de Crédito" },
    ],
  },
  MX: {
    code: "MX",
    name: "México",
    currency: "MXN",
    currencySymbol: "$",
    tax: { name: "IVA", rate: 0.16, code: "IVA" },
    documentName: "RFC",
    invoiceTypes: [
      { code: "I", name: "Ingreso (Factura)" },
      { code: "E", name: "Egreso (Nota de Crédito)" },
      { code: "P", name: "Pago" },
    ],
  },
  CO: {
    code: "CO",
    name: "Colombia",
    currency: "COP",
    currencySymbol: "$",
    tax: { name: "IVA", rate: 0.19, code: "IVA" },
    documentName: "NIT",
    invoiceTypes: [
      { code: "FV", name: "Factura de Venta" },
      { code: "NC", name: "Nota de Crédito" },
      { code: "ND", name: "Nota de Débito" },
    ],
  },
};
