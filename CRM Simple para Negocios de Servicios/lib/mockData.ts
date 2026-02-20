import { Contact, Deal, Quote } from "./types";
import { subDays, addDays, format } from "date-fns";

export const CONTACTS: Contact[] = [
  {
    id: "c1",
    name: "Ana García",
    email: "ana@techstart.com",
    phone: "+52 55 1234 5678",
    company: "TechStart Inc.",
    role: "CEO",
    interactions: [
      {
        id: "i1",
        type: "call",
        content: "Llamada inicial de presentación",
        date: format(subDays(new Date(), 10), "yyyy-MM-dd"),
      },
      {
        id: "i2",
        type: "email",
        content: "Enviada presentación corporativa",
        date: format(subDays(new Date(), 9), "yyyy-MM-dd"),
      },
    ],
  },
  {
    id: "c2",
    name: "Carlos Ruiz",
    email: "carlos@agenciaboom.mx",
    phone: "+52 55 8765 4321",
    company: "Agencia Boom",
    role: "Director de Marketing",
    interactions: [],
  },
  {
    id: "c3",
    name: "Sofia Méndez",
    email: "sofia@consultores.co",
    phone: "+57 300 123 4567",
    company: "Méndez Consultores",
    role: "Gerente General",
    interactions: [
      {
        id: "i3",
        type: "meeting",
        content: "Reunión presencial para definir alcance",
        date: format(subDays(new Date(), 2), "yyyy-MM-dd"),
      },
    ],
  },
];

export const DEALS: Deal[] = [
  {
    id: "d1",
    title: "Rediseño Sitio Web Corporativo",
    value: 2500,
    stage: "negotiation",
    contactId: "c1",
    expectedDate: format(addDays(new Date(), 15), "yyyy-MM-dd"),
    notes: "Cliente muy interesado, pendiente aprobación de presupuesto 2026",
    tags: ["Web", "Urgente"],
  },
  {
    id: "d2",
    title: "Campaña SEO Q2",
    value: 1200,
    stage: "proposal",
    contactId: "c2",
    expectedDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    notes: "Propuesta enviada el martes pasado",
    tags: ["SEO", "Marketing"],
  },
  {
    id: "d3",
    title: "Desarrollo App Móvil",
    value: 8000,
    stage: "contacted",
    contactId: "c3",
    expectedDate: format(addDays(new Date(), 45), "yyyy-MM-dd"),
    notes: "Primer contacto positivo",
    tags: ["App", "Mobile"],
  },
  {
    id: "d4",
    title: "Mantenimiento Mensual",
    value: 500,
    stage: "prospect",
    contactId: "c1",
    expectedDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    notes: "Posible upsell",
    tags: ["Mantenimiento"],
  },
  {
    id: "d5",
    title: "Consultoría UX/UI",
    value: 1500,
    stage: "closed",
    contactId: "c2",
    expectedDate: format(subDays(new Date(), 5), "yyyy-MM-dd"),
    notes: "Proyecto cerrado exitosamente",
    tags: ["Consultoría"],
  },
];
