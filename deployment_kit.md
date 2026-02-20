# 🚀 Zona Sur Tech: Deployment Kit (Coolify v4)

Este documento es tu **"Cheat Sheet" oficial** para la configuración del monorepo en el servidor Phoenix. Asegúrate de inyectar estas variables exactamente como se muestran en la sección "Environment Variables" de tu recurso de Coolify (cada una de las 14 aplicaciones requiere esto).

---

## 🔑 1. Variables de Entorno Fundamentales

Copia y pega estas variables en la consola de tu ecosistema.

### 🗄️ Base de Datos e Infraestructura

Estas variables permiten que Prisma (ORM) sincronice la magia durante el proceso avanzado de Docker Auth y que conecte a tu PostgreSQL local o remoto.

```env
# URL de Conexión a tu Base de Datos PostgreSQL
# Reemplaza [USER], [PASSWORD] y [DB_NAME] por las credenciales asignadas en el clúster.
DATABASE_URL="postgresql://[USER]:[PASSWORD]@209.74.83.205:5432/[DB_NAME]?schema=public"

# (Opcional) URL para conexiones de pooling si escalas más allá de 4 vCPUs
DIRECT_URL="postgresql://[USER]:[PASSWORD]@209.74.83.205:5432/[DB_NAME]?schema=public"

# Define el modo estricto en el servidor
NODE_ENV="production"
```

### 💰 Monetización y AdSense

Fundamental para que los scripts del frontend en Next.js validen y rendericen los tags de anuncios sin hardcodear el ID en ningún componente secreto.

```env
# Tu ID público de publicador
NEXT_PUBLIC_ADSENSE_ID="ca-pub-8338467922774671"
```

### 🔐 Autenticación Universal (Login Pro Max)

Para proteger tus identidades usando un estándar JWT/Auth de alta gama:

```env
# Clave maestra de cifrado JWT (Usa "openssl rand -base64 32" para generar tu cadena)
AUTH_SECRET="your-ultra-secure-random-secret-key-here"

# Dominio Base para callbacks OAuth (ej. "https://auth.zonasurtech.online")
NEXTAUTH_URL="https://[YOUR_SUBDOMAIN].zonasurtech.online"
```

---

## ⚙️ 2. Reglas Mecánicas de Despliegue (Build Commands)

Nuestros scripts ya han adaptado el ecosistema, pero ten en cuenta la siguiente validación estructural por si tienes que hacer un "force rebuild" en Coolify:

1. **Build Pack (Sistema):** Elige siempre `Nixpacks` o configuración nativa de `Dockerfile`.
2. **Puertos Expuestos:** En las opciones de red avanzada de Coolify de cada módulo, confirma que el puerto expuesto del contenedor sea el **`22022`** y que se mapea directamente al puerto `80/443` estándar del proxy web invertido de Coolify.
3. **Persistencia de Base de Datos:** Los \`Dockerfiles\` ya contienen estas variables claves, las cuales garantizan actualizaciones automáticas del modelo \`Newsletter\` sin que se caiga el proceso:
   ```dockerfile
   RUN npx prisma generate
   RUN npx prisma db push --accept-data-loss || true
   ```

---

## ✅ 3. Checklist Post-Despliegue

- [ ] ¿Están todas las Variables de Entorno cargadas y verificadas?
- [ ] Módulo `/apps/registro` guardando emails correctos a PostgreSQL desde la UI Glassmorphism.
- [ ] Verificar el archivo *https://app.zonasurtech.online/ads.txt* sea detectado por el crawler de Google.
- [ ] Ingresar a *https://status.zonasurtech.online* o a `/apps/monitor` para constatar latencia y consumo 4-vCPU.
