const fs = require('fs').promises
const path = require('path')

async function walk(dir, fileList = []) {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file))
    if (stat.isDirectory()) fileList = await walk(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList
}

walk('./rohfiles').then((res) => {
  console.log(res)
})



fs.readdir('./rohfiles', { withFileTypes: true }, (err, entries) => {
  if (err) throw err;
  entries.filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      console.log(`${entry.name} is a directory`);
    });
});

