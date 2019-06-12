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
      const localBase = path.join(base, item)
      const state = fs.statSync(localBase)
      const dirsA = item[0].toUpperCase()
      const dirsEx = path.parse(item.toUpperCase()).ext
      const dirExFix = dirsEx.replace('.', '')
      
        if (!state.isDirectory() && !fs.existsSync(dirExFix)) {
          for (i=0; i<dirExFix.length; i++) {
            fs.mkdirSync(fileDir + '/' + dirsA + '/' + dirExFix, { recursive: true }, (err) => {
              
              if (err) {
                return console.log('FOLDER: ' + err);
              } 
            })
            return item
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
          const localBase = path.join(base, file)
          const state = fs.statSync(localBase)
          const dirsEx = path.parse(file.toUpperCase()).ext
          const dirExFix = dirsEx.replace('.', '')
          const exact = fileDir + '/' + file[0].toUpperCase() + '/' + dirExFix + '/' + file
          if (!fs.existsSync(exact)) {
            fs.linkSync( base + '/' + file,  exact, err => {
             //console.log('FILE: ' + fileDir + '/' + file[0].toUpperCase() + '/' + file)
            if (err) {
              return console.log('FELE: ' + err);
            } 
            })
          }
      
        })
    })
  }

  const getProducts = async () => {
    await writeDir()
  
    await writeFile()
  }
  
  getProducts()