const fs = require('fs');
const path = require('path');

const apps = [
  'admin', 'api', 'auth', 'citas', 'crm', 'facturacion', 
  'reviews', 'cdn', 'stack', 'status', 'monitor', 'registro', 'app', 'logs'
];

const appsDir = path.join(__dirname, 'apps');

apps.forEach(app => {
  const dockerfilePath = path.join(appsDir, app, 'Dockerfile');

  if (fs.existsSync(dockerfilePath)) {
    let content = fs.readFileSync(dockerfilePath, 'utf8');

    // Check if Prisma generate / db push already exists
    if (!content.includes('npx prisma generate')) {
      // Find where we run build: RUN npm run build
      // Insert right before it
      content = content.replace(
        'RUN npm run build',
        '# Generar Prisma Client y empujar schema a la DB (PostgreSQL Coolify)\\nRUN npx prisma generate\\nRUN npx prisma db push --accept-data-loss || true\\nRUN npm run build'
      );
      
      fs.writeFileSync(dockerfilePath, content);
      console.log('✅ Dockerfile updated for ' + app);
    } else {
      console.log('⚠️ Dockerfile already contains Prisma commands for ' + app);
    }
  } else {
    console.log('❌ Dockerfile not found for ' + app);
  }
});

console.log('🎉 Dockerfiles updated with Prisma DB Push.');
