const fs = require('fs');
const buffer = fs.readFileSync('public/models/model.glb');
const chunk0Length = buffer.readUInt32LE(12);
const gltf = JSON.parse(buffer.toString('utf8', 20, 20 + chunk0Length));

gltf.meshes.forEach(m => {
  if (m.name.includes('Head') || m.name.includes('Face') || m.name.includes('Body')) {
    console.log(`Mesh: ${m.name}`);
    if (m.extras && m.extras.targetNames) {
      console.log(`  Found ${m.extras.targetNames.length} blendshapes (morph targets)`);
      console.log(`  Examples: ${m.extras.targetNames.slice(0, 10).join(', ')} ...`);
    } else {
      console.log('  No targetNames (blendshapes) found in extras.');
    }
  }
});
