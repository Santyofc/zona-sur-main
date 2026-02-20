'use client';
import { ProductReviewCard } from '@/components/ui/ProductReviewCard';
import { Header } from '@/components/ui/Header';
import { motion } from 'framer-motion';

const MOCK_REVIEWS = [
  {
    title: "Master Station Pro 2026: La Bestia del Rendering",
    category: "HARDWARE",
    summary: "Analizamos a fondo nuestro ensamble insignia de Zona Sur Tech. Una workstation diseñada para arquitectos y editores de video que no aceptan compromisos en velocidad.",
    rating: 4.9,
    mainImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    brandLogo: "https://cdn.zonasurtech.online/assets/logo-zst-icon.png", // Demo logo placeholder
    pros: ["Rendimiento térmico superior", "Gestión de cables premium", "Silenciosa bajo carga pesada"],
    cons: ["Precio elevado", "Tamaño considerable"],
    slug: "master-station-pro-2026"
  },
  {
    title: "EcoSmart Real Estate: Domótica de Lujo",
    category: "REAL_ESTATE_TECH",
    summary: "Cómo la tecnología está redefiniendo las propiedades de lujo en Pérez Zeledón. Review del sistema de control inteligente integrado.",
    rating: 4.7,
    mainImage: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop",
    brandLogo: "https://cdn.zonasurtech.online/assets/smart-home-logo.png", // Demo logo placeholder
    pros: ["Integración nativa con iOS/Android", "Bajo consumo energético", "Interfaz estética"],
    cons: ["Requiere instalación profesional"],
    slug: "ecosmart-real-estate-tech"
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* AdSense Top Leaderboard Placeholder */}
        <div className="mb-12 w-full h-32 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
            <span className="text-xs text-slate-700 uppercase font-mono tracking-widest">AdSense Leaderboard (728x90)</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Análisis Técnicos</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Smart <span className="text-emerald-500">Reviews</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            Explora nuestros análisis detallados sobre el hardware y las soluciones digitales que están marcando tendencia este 2026. Ingeniería honesta, sin filtros.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MOCK_REVIEWS.map((review, index) => (
            <ProductReviewCard key={index} {...review} />
          ))}
        </div>

        {/* AdSense Bottom Responsive Placeholder */}
        <div className="mt-16 w-full h-48 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
            <span className="text-xs text-slate-700 uppercase font-mono tracking-widest">AdSense Feed In-Article</span>
        </div>
      </div>
    </div>
  );
}
