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
          console.log(item)
        } else {
          if (!fs.existsSync(fileDir)) {
            for (i=0; i<dirsA.length; i++) {
              fs.mkdir(fileDir + '/' + dirsA, { recursive: true }, (err) => {
                if (err) throw err;
              });
                console.log('MKDIR: ' + dirsA)
            }
          } else {
            console.log('DELETE: ' + dirsA)
            for (i=0; i<dirsA.length; i++) {
              fs.rmdir(fileDir + '/' + dirsA, { recursive: true }, (err) => {
                if (err) throw err;
              });
                console.log('MKDIR: ' + dirsA)
            }
          }
        }
      })
    })
  }
  const writeFile = () => {
    //passsing directoryPath and callback function
    fs.readdir(base, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file)
            fs.link( base + '/' + file,  fileDir + '/' + file[0].toUpperCase() + '/' + file, err => {
              console.log('FILE: ' + fileDir + '/' + file[0].toUpperCase() + '/' + file)
              if (err) {
                console.error(err.message)
                return
              }
            })
        });
    });
  
  }

//writeDir()


let asyncTest = () => {
  writeDir()
  setTimeout(() => writeFile(), 2000)
}

asyncTest();