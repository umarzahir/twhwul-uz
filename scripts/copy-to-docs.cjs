const fs = require('fs');
const path = require('path');

const src = path.resolve(process.cwd(), 'build', 'client');
const dest = path.resolve(process.cwd(), 'docs');

async function copyRecursive(srcDir, destDir) {
  await fs.promises.rm(destDir, { recursive: true, force: true });
  await fs.promises.mkdir(destDir, { recursive: true });

  const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

copyRecursive(src, dest)
  .then(() => console.log('Copied build/client -> docs/'))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
