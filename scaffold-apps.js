const fs = require('fs');
const path = require('path');

const apps = [
  'admin', 'api', 'auth', 'citas', 'crm', 'facturacion', 
  'reviews', 'cdn', 'stack', 'status', 'monitor', 'registro', 'app', 'logs'
];

const appsDir = path.join(__dirname, 'apps');
if (!fs.existsSync(appsDir)) fs.mkdirSync(appsDir);

apps.forEach(app => {
  const appDir = path.join(appsDir, app);
  const appSrcDir = path.join(appDir, 'app');
  
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir);
  if (!fs.existsSync(appSrcDir)) {
      fs.mkdirSync(appSrcDir, { recursive: true });
  }

  // package.json
  const packageJson = {
    name: `@zonasurtech/${app}`,
    version: "1.0.0",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    dependencies: {
      "next": "15.0.0",
      "react": "19.0.0",
      "react-dom": "19.0.0",
      "@tailwindcss/postcss": "^4.0.0",
      "tailwindcss": "^4.0.0",
      "lucide-react": "latest",
      "framer-motion": "latest",
      "@prisma/client": "^5.0.0"
    },
    devDependencies: {
      "@types/node": "^20.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "postcss": "^8.0.0",
      "typescript": "^5.0.0"
    }
  };
  fs.writeFileSync(path.join(appDir, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Dockerfile
  const dockerfile = `FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=22022
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 22022

CMD ["node", "server.js"]
`;
  fs.writeFileSync(path.join(appDir, 'Dockerfile'), dockerfile);

  // README.md
  const readme = `# Zona Sur Tech - ${app.toUpperCase()}
  
Módulo de la plataforma técnica de Zona Sur Tech, construido con Next.js 15, Tailwind CSS 4 y Docker (puerto 22022).
`;
  fs.writeFileSync(path.join(appDir, 'README.md'), readme);

  // next.config.ts
  const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
`;
  fs.writeFileSync(path.join(appDir, 'next.config.ts'), nextConfig);

  // tsconfig.json
  const tsconfig = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;
  fs.writeFileSync(path.join(appDir, 'tsconfig.json'), tsconfig);

  // app/globals.css
  const globalsCss = `@import "tailwindcss";

:root {
  --background: #0f172a; /* slate-900 */
  --foreground: #f8fafc; /* slate-50 */
  --primary: #0ea5e9; /* sky-500 */
  --accent: #10b981; /* emerald-500 */
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-accent: var(--accent);
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
`;
  fs.writeFileSync(path.join(appSrcDir, 'globals.css'), globalsCss);

  // app/layout.tsx
  const layoutTsx = `import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zona Sur Tech - ${app.charAt(0).toUpperCase() + app.slice(1)}",
  description: "Ecosistema Tecnológico de Zona Sur Tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/30">
        <main className="flex flex-col min-h-screen">
          {/* Global Navbar Integration Point */}
          {children}
          {/* Global Footer Integration Point */}
        </main>
      </body>
    </html>
  );
}
`;
  fs.writeFileSync(path.join(appSrcDir, 'layout.tsx'), layoutTsx);

  // app/page.tsx
  const pageTsx = `import Link from 'next/link';
import { ArrowLeft, Rocket } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="glass p-12 rounded-3xl max-w-3xl w-full text-center relative z-10">
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/20">
          <Rocket className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6 drop-shadow-sm">
          Módulo ${app.toUpperCase()}
        </h1>
        
        <p className="text-xl text-foreground/70 mb-10 leading-relaxed font-light">
          Infraestructura Core de <span className="text-primary font-medium">Zona Sur Tech</span>. Sistema interconectado mediante Prisma y diseñado bajo nuestra estética premium de Glassmorphism.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="https://zonasurtech.online" className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al sitio principal
          </Link>
          <a href="https://wa.me/50687623229" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
            Ventas y Soporte
          </a>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-foreground/40 font-mono text-center relative z-10">
        Puerto de Despliegue Docker: <span className="text-accent">22022</span> | {new Date().getFullYear()} Zona Sur Tech
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(appSrcDir, 'page.tsx'), pageTsx);

  console.log("✅ " + app + " generated successfully.");
});
console.log('🎉 All 14 applications generated in /apps');
