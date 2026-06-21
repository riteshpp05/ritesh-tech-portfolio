const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
  { name: 'python', slug: 'python' },
  { name: 'langchain', slug: 'langchain' },
  { name: 'langgraph', slug: 'langchain' }, // fallback to langchain logo
  { name: 'openai', slug: 'openai' },
  { name: 'ollama', slug: 'ollama' },
  { name: 'huggingface', slug: 'huggingface' },
  { name: 'aws', slug: 'amazonaws' },
  { name: 'sap', slug: 'sap' },
  { name: 'sapaicore', slug: 'sap' },
  { name: 'sapbtp', slug: 'sap' },
  { name: 'docker', slug: 'docker' },
  { name: 'kubernetes', slug: 'kubernetes' },
  { name: 'github', slug: 'github' },
  { name: 'mysql', slug: 'mysql' },
  { name: 'neo4j', slug: 'neo4j' },
  { name: 'pinecone', slug: 'pinecone' },
  { name: 'powerbi', slug: 'powerbi' },
  { name: 'powerautomate', slug: 'powerautomate' },
  { name: 'copilot', slug: 'microsoftcopilot' },
  { name: 'streamlit', slug: 'streamlit' },
  { name: 'sqlite', slug: 'sqlite' }
];

const outDir = path.join(__dirname, 'public', 'assets', 'logos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadIcon(icon) {
  const url = `https://cdn.simpleicons.org/${icon.slug}/white`;
  const dest = path.join(outDir, `${icon.name}.svg`);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${icon.name}.svg`);
          resolve(true);
        });
      } else {
        console.log(`Failed to download: ${icon.name} (Status: ${res.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${icon.name}: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('Starting logo downloads...');
  for (const icon of icons) {
    await downloadIcon(icon);
  }
  console.log('Done.');
}

main();
