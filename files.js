const fs = require('fs');
const path = require('path');

  const base = path.join(__dirname, './rohfiles');
  const fileDir = path.join(__dirname, './temp');

  const writeDir = () => {
    fs.readdir(base, (err, files) => {
      if (err) {
        console.log('Ошибка чтения каталога');
      }
      files.forEach((item) => {
        let localBase = path.join(base, item)
        let state = fs.statSync(localBase)
        const dirsA = item[0].toUpperCase()
        if (state.isDirectory()) {
        } else {
          if (!fs.existsSync(fileDir)) {
            for (i=0; i<dirsA.length; i++) {
              fs.mkdir(fileDir + '/' + dirsA, { recursive: true }, (err) => {
                if (err) throw err;
              });
            }
          } else {

          }
  
        }
      })
    })
  }
  const writeFile = () => {
    fs.readdir(base, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            fs.link( base + '/' + file,  fileDir + '/' + file[0].toUpperCase() + '/' + file, err => {
              
              if (err) {
                console.error(err.message)
                return
              }
            })
        });
    });
  
  }
let asyncTest = () => {
  writeDir()
  setTimeout(() => writeFile(), 2000)
}

asyncTest();