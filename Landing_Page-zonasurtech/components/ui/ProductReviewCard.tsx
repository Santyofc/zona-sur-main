'use client';
import Image from 'next/image';
import { Star, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductReviewCardProps {
  title: string;
  category: string;
  summary: string;
  rating: number;
  mainImage: string;
  brandLogo: string;
  pros: string[];
  cons: string[];
  slug: string;
}

export const ProductReviewCard = ({
  title,
  category,
  summary,
  rating,
  mainImage,
  brandLogo,
  pros,
  cons,
  slug
}: ProductReviewCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
    >
      {/* AdSense Slot Upper (Suggested space) */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-[8px] font-mono">
        AD_SLOT_TOP
      </div>

      {/* Main Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold tracking-widest uppercase">
          {category.replace('_', ' ')}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(rating) ? "text-amber-400" : "text-slate-600"}
                  />
                ))}
              </div>
              <span className="text-slate-400 text-sm font-bold">{rating.toFixed(1)}/5.0</span>
            </div>
          </div>
          
          {/* Brand Logo Glass Overlay */}
          <div className="w-16 h-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-2xl">
            <img src={brandLogo} alt="Brand" className="w-full h-auto object-contain brightness-110" />
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
          {summary}
        </p>

        {/* Technical Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <h4 className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Pros</h4>
            {pros.map((pro, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>{pro}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
             <h4 className="text-rose-400 text-[10px] font-bold tracking-widest uppercase">Cons</h4>
             {cons.map((con, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                <XCircle size={14} className="text-rose-500 shrink-0" />
                <span>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AdSense Integrated Bottom */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <a 
            href={`/reviews/${slug}`} 
            className="flex items-center gap-2 text-white font-bold text-sm group/btn hover:text-emerald-400 transition-colors"
          >
            Leer Análisis Completo 
            <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>

          {/* AdSense Placeholder - Layout optimized for small display ads */}
          <div className="hidden lg:block w-32 h-10 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
            <span className="text-[8px] text-slate-600 uppercase font-mono tracking-tighter">AdSense Slot</span>
          </div>
        </div>
      </div>

      {/* Corporate Branding Floating Detail */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/10 blur-[60px] rounded-full pointer-events-none"></div>
    </motion.div>
  );
};
