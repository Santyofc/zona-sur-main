# CitaFácil — Plataforma de Gestión de Citas y Turnos

¡Proyecto 100% Full-Stack habilitado para producción! Esta plataforma ha sido optimizada para el ecosistema de **Zona Sur Tech**.

## 🚀 Tecnologías (Stack Pro)

- **Frontend**: Next.js 15 (App Router) + Tailwind CSS 4.
- **Backend**: Next.js API Routes + Prisma ORM.
- **Base de Datos**: PostgreSQL (Dockerized).
- **Despliegue**: Docker (Alpine) optimizado para el servidor Phoenix.
- **Puerto**: 22022.

## 📦 Estructura Full-Stack

- `/prisma`: Esquema de base de datos relacional.
- `/app/api`: Endpoints funcionales para gestión de citas.
- `docker-compose.yml`: Infraestructura local de persistencia.
- `Dockerfile`: Configuración de despliegue de alto rendimiento.

## 🛠️ Configuración Rápida

1. Clonar el repositorio.
2. Copiar `.env.example` a `.env` y configurar credenciales.
3. Levantar base de datos: `docker compose up -d`.
4. Instalar y migrar: `npm install && npx prisma migrate dev`.
5. Iniciar: `npm run dev`.

## 🌐 Ecosistema Zona Sur Tech

Este proyecto está preparado para integrarse con:

- `api.zonasurtech.online`
- `cdn.zonasurtech.online`
- `auth.zonasurtech.online`

Desarrollado por [Santyofc](https://github.com/Santyofc).
