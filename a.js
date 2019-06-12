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
          let localBase = path.join(base, file)
          let state = fs.statSync(localBase)
            console.log(file)
            if (state.isDirectory()) {
            } else {
            fs.link( base + '/' + file,  fileDir + '/' + file[0].toUpperCase() + '/' + file, err => {
              console.log('FILE: ' + fileDir + '/' + file[0].toUpperCase() + '/' + file)
              if (err) {
                console.error(err.message)
                return
              }
            })
          }
        });
    });
  
  }
  let getData = async () => {
    try {
        await writeDir();
        await writeFile();
      } catch (error) {
        console.log(error);
      }
  };
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
    getData()
    
  }else {
    getData()
  }



