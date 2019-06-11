const path = require('path')
const fs = require('fs')
const base = path.join(__dirname, './rohfiles')
const fileDir = path.join(__dirname, './temp')
const dir = fileDir

const writeDir = async () => {
  try {
    await fs.readdir(base, (err, files) => {
        if (err) {
          console.log('Ошибка чтения каталога')
        }
        files.forEach((item) => {
          let localBase = path.join(base, item)
          let state = fs.statSync(localBase)
          const dirsA = item[0].toUpperCase()
          if (state.isDirectory()) {
          } else {
            if (!fs.existsSync(fileDir)) {
              for (i=0; i<dirsA.length; i++) {
                fs.mkdirSync(fileDir + '/' + dirsA, { recursive: true }, (err) => {
                  if (err) throw err
                });
              }
            } else {
            }
          }
        })
      })

      await writeFile()
  } catch (err) {
    console.error(err)
  }
}

const writeFile = async () => {
  try {
    await fs.readdir(base, function (err, files) {
      if (err) {
          return console.log('Unable to scan directory: ' + err)
      } 
      files.forEach(function (file) {
        let localBase = path.join(base, file)
        let state = fs.statSync(localBase)
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
      })
  })

  } catch (err) {
    console.error(err)
  }
}
if (fs.existsSync(fileDir)) {
  
  function deleteFile(dir, file) {
    return new Promise(function (resolve, reject) {
        var filePath = path.join(dir, file);
        fs.lstat(filePath, function (err, stats) {
            if (err) {
                return reject(err);
            }
            if (stats.isDirectory()) {
                resolve(deleteDirectory(filePath));
            } else {
                fs.unlink(filePath, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            }
        });
    });
};

function deleteDirectory(dir) {
    return new Promise(function (resolve, reject) {
        fs.access(dir, function (err) {
            if (err) {
                return reject(err);
            }
            fs.readdir(dir, function (err, files) {
                if (err) {
                    return reject(err);
                }
                Promise.all(files.map(function (file) {
                    return deleteFile(dir, file);
                })).then(function () {
                    fs.rmdir(dir, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }).catch(reject);
            });
        });
    });
};
  deleteFile(dir, '')
  deleteDirectory(dir)
  writeDir()
} else {
  writeDir()
}