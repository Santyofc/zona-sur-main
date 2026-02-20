import { Client, Invoice, Product } from "./types";
import { addDays, subDays, format } from "date-fns";

export const CLIENTS: Client[] = [
  // Peru
  {
    id: "c1",
    name: "Constructora del Sur S.A.C.",
    taxId: "20100123456",
    email: "contacto@consur.pe",
    address: "Av. Arequipa 123, Lima",
    country: "PE",
  },
  {
    id: "c2",
    name: "Juan Pérez Mendoza",
    taxId: "10456789012",
    email: "juan.perez@gmail.com",
    address: "Jr. Unión 456, Cusco",
    country: "PE",
  },
  // Mexico
  {
    id: "c3",
    name: "Tecnología Avanzada SA de CV",
    taxId: "TAV101010ABC",
    email: "facturacion@tecav.mx",
    address: "Reforma 222, CDMX",
    country: "MX",
  },
  {
    id: "c4",
    name: "Restaurante El Mariachi",
    taxId: "REM900101XYZ",
    email: "admin@elmariachi.com",
    address: "Av. Vallarta 500, Guadalajara",
    country: "MX",
  },
  // Colombia
  {
    id: "c5",
    name: "Inversiones Bogotá SAS",
    taxId: "900.123.456-1",
    email: "contabilidad@invbogota.co",
    address: "Cra 7 # 32-10, Bogotá",
    country: "CO",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Consultoría de Software (Hora)",
    price: 150,
    taxIncluded: false,
  },
  { id: "p2", name: "Licencia Anual ERP", price: 1200, taxIncluded: false },
  { id: "p3", name: "Mantenimiento Mensual", price: 300, taxIncluded: false },
  { id: "p4", name: "Servidor VPS", price: 50, taxIncluded: true },
];

export const INVOICES: Invoice[] = [
  {
    id: "inv1",
    number: "F001-000001",
    type: "01",
    date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 28), "yyyy-MM-dd"),
    clientId: "c1",
    clientName: "Constructora del Sur S.A.C.",
    clientTaxId: "20100123456",
    country: "PE",
    status: "issued",
    items: [
      {
        id: "i1",
        productId: "p1",
        description: "Consultoría de Software",
        quantity: 10,
        unitPrice: 150,
        total: 1500,
      },
    ],
    subtotal: 1500,
    taxAmount: 270, // 18%
    total: 1770,
  },
  {
    id: "inv2",
    number: "A-1234",
    type: "I",
    date: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 10), "yyyy-MM-dd"),
    clientId: "c3",
    clientName: "Tecnología Avanzada SA de CV",
    clientTaxId: "TAV101010ABC",
    country: "MX",
    status: "paid",
    items: [
      {
        id: "i2",
        productId: "p2",
        description: "Licencia Anual ERP",
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
      },
    ],
    subtotal: 1200,
    taxAmount: 192, // 16%
    total: 1392,
  },
  {
    id: "inv3",
    number: "FV-500",
    type: "FV",
    date: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    clientId: "c5",
    clientName: "Inversiones Bogotá SAS",
    clientTaxId: "900.123.456-1",
    country: "CO",
    status: "draft",
    items: [
      {
        id: "i3",
        productId: "p3",
        description: "Mantenimiento Mensual",
        quantity: 1,
        unitPrice: 300,
        total: 300,
      },
    ],
    subtotal: 300,
    taxAmount: 57, // 19%
    total: 357,
  },
];
