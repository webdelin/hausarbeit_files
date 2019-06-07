const fs = require('fs')
const path = require('path')
const base = __dirname + '/rohfiles'
const fileDir = __dirname + '/temp'
const files = fs.readdirSync(base)

const namesArray = 
  [ "a", "a", "a", "b", "b", "c", "c", "c" ]
;
const names_array_new = namesArray.reduceRight(function (r, a) {
  r.some(function (b) { return a === b; }) || r.push(a);
  return r;
}, []);

const dla = JSON.stringify(names_array_new, 1, 2).toUpperCase();
console.log(dla)

if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir)
} else {
  fs.rmdir(fileDir, err => {
    if(err){
      console.log(err)
    }
  })
  console.log('DELETE ' + fileDir + ' DONE')
  fs.mkdirSync(fileDir)
  console.log('CREATE ' + fileDir + ' DONE')
}

const readDir = (base, level) => {
  const files = fs.readdirSync(base);
  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      readDir(localBase, level + 1);
      fs.mkdirSync(fileDir + '/'.repeat(level) + dla)
    } else {
      console.log(' '.repeat(level) + 'File: ' + item);
    }
  })
}

readDir(base, 0);
console.log('BASE: ' + base)