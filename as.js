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
              if (err) reject(err)
              else resolve(writeFile())
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
          const exact = fileDir + '/' + file[0].toUpperCase() + '/' + dirExFix + '/' + file
          if (!fs.existsSync(exact)) {
            fs.link( base + '/' + file,  exact, err => {
             //console.log('FILE: ' + fileDir + '/' + file[0].toUpperCase() + '/' + file)
             if (err) reject(err)
             else resolve()
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
  
  if (fs.existsSync(fileDir)) {
    const Q = require('q')
    function rmdir(dir) {
      return Q.nfcall(fs.access, dir).then(() => {
        return Q.nfcall(fs.readdir, dir)
          .then(files => files.reduce((pre, f) => pre.then(() => {
            var sub = path.join(dir, f)
            return Q.nfcall(fs.lstat, sub).then(stat => {
              if (stat.isDirectory()) return rmdir(sub)
              return Q.nfcall(fs.unlink, sub)
            })
          }), Q()))
      }, err => {})
      .then(() => Q.nfcall(fs.rmdir, dir))
    }
    rmdir(fileDir)
    
  } else {
  run()
  }