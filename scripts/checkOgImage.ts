import fs from 'fs';
import path from 'path';

// Simple CI/local check to ensure the OG image exists where meta tags point.

const projectRoot = process.cwd();
const ogImagePath = path.join(projectRoot, 'public', 'images', 'og-portfolio-cover.png');

if (!fs.existsSync(ogImagePath)) {
  console.error(`❌ OG image missing: ${ogImagePath}`);
  console.error('Create a 1200x630 hero screenshot and save it as public/images/og-portfolio-cover.png');
  process.exit(1);
}

const stats = fs.statSync(ogImagePath);
const sizeKb = stats.size / 1024;

console.log(`✅ OG image found at ${ogImagePath} (${sizeKb.toFixed(1)} KB)`);
