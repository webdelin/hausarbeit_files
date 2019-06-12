const fs = require('fs')
const path = require('path')
const base = path.join(__dirname, './rohfiles')
const fileDir = path.join(__dirname, './temp')


const writeDir = () => {
  new Promise((resolve, reject) => {
  fs.readdir(base, (err, files) => {
    if (err) {
      console.log('Ошибка чтения каталога');
    }
    files.forEach((item) => {
      let localBase = path.join(base, item)
      let state = fs.statSync(localBase)
      const dirsA = item[0].toUpperCase()
      const dirsEx = path.parse(item.toUpperCase()).ext
      const dirExFix = dirsEx.replace('.', '')
      if (!state.isDirectory()) {
        if (!fs.existsSync(dirExFix)) {
          for (i=0; i<dirExFix.length; i++) {
            fs.mkdir(fileDir + '/' + dirsA + '/' + dirExFix, { recursive: true }, (err) => {
              if (err) throw err;

            })
          }
        }
      } 
    })
  })
})
}


const writeFile = () => {
  new Promise((resolve, reject) => {
      fs.readdir(base, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
          let localBase = path.join(base, file)
          let state = fs.statSync(localBase)
          const dirsEx = path.parse(file.toUpperCase()).ext
          const dirExFix = dirsEx.replace('.', '')
          if(base + '/' + file,  fileDir + '/' + file[0].toUpperCase() + '/' + dirExFix + '/' + file){
            fs.link( base + '/' + file,  fileDir + '/' + file[0].toUpperCase() + '/' + dirExFix + '/' + file, err => {
             // console.log('FILE: ' + fileDir + '/' + file[0].toUpperCase() + '/' + file)
              if (err) {
                console.error(err.message)
                return
              }
            })
          }
        })
    })
  })
  }

  module.exports = {
    writeDir,
    writeFile
  }

  const run = async () => {
     await writeDir()
  }
  
  run()