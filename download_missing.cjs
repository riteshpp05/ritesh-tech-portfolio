const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  { name: 'openai', url: 'https://unpkg.com/simple-icons@11.0.0/icons/openai.svg' },
  { name: 'aws', url: 'https://unpkg.com/simple-icons@11.0.0/icons/amazonaws.svg' },
  { name: 'powerbi', url: 'https://unpkg.com/simple-icons@11.0.0/icons/powerbi.svg' },
  { name: 'powerautomate', url: 'https://unpkg.com/simple-icons@11.0.0/icons/powerautomate.svg' },
  { name: 'copilot', url: 'https://unpkg.com/simple-icons@11.0.0/icons/microsoftcopilot.svg' }
];

const outDir = path.join(__dirname, 'public', 'assets', 'logos');

async function downloadIcon(icon) {
  const dest = path.join(outDir, `${icon.name}.svg`);
  return new Promise((resolve) => {
    https.get(icon.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => resolve(true));
        });
      } else {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => resolve(true));
      }
    }).on('error', () => resolve(false));
  });
}

async function main() {
  for (const icon of icons) {
    await downloadIcon(icon);
  }
  console.log("Done missing.");
}
main();
