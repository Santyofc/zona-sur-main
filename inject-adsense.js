const fs = require('fs');
const path = require('path');

const apps = [
  'admin', 'api', 'auth', 'citas', 'crm', 'facturacion', 
  'reviews', 'cdn', 'stack', 'status', 'monitor', 'registro', 'app', 'logs'
];

const appsDir = path.join(__dirname, 'apps');
const adsenseId = 'ca-pub-XXXXXXXXXXXXXXX'; // Placeholder since it was not provided in the prompt

apps.forEach(app => {
  const appSrcDir = path.join(appsDir, app, 'app');
  const layoutFilePath = path.join(appSrcDir, 'layout.tsx');

  if (fs.existsSync(layoutFilePath)) {
    let layoutContent = fs.readFileSync(layoutFilePath, 'utf8');

    // Add import for Script if it doesn't exist
    if (!layoutContent.includes('import Script from "next/script";')) {
      layoutContent = layoutContent.replace('import type { Metadata } from "next";', 
        'import type { Metadata } from "next";\nimport Script from "next/script";');
    }

    // Add the Script tag before the closing head or right after opening body, Next.js 15 way is usually inside layout return or before body.
    // Next.js handles <Script> component anywhere inside the render tree, but inside <head> is clean for verification tags string replacement.
    if (!layoutContent.includes('Google AdSense Verification')) {
      layoutContent = layoutContent.replace(
        '<html lang="es">',
        \`<html lang="es">
      <head>
        {/* Google AdSense Verification */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=\${adsenseId}" 
          crossOrigin="anonymous" 
          strategy="afterInteractive" 
        />
      </head>\`
      );
      fs.writeFileSync(layoutFilePath, layoutContent);
      console.log(\`✅ AdSense Script injected into \${app}/app/layout.tsx\`);
    } else {
        console.log(\`⚠️ AdSense Script already exists in \${app}/app/layout.tsx\`);
    }
  }
});

// Create ads.txt for specific domains
const adsTxtContent = \`google.com, \${adsenseId}, DIRECT, f08c47fec0942fa0\n\`;
['app', 'reviews'].forEach(targetApp => {
  const publicDir = path.join(appsDir, targetApp, 'public');
  if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
  }
  const adsTxtPath = path.join(publicDir, 'ads.txt');
  fs.writeFileSync(adsTxtPath, adsTxtContent);
  console.log(\`✅ ads.txt created in \${targetApp}/public/ads.txt\`);
});

console.log('🎉 AdSense verification complete.');
