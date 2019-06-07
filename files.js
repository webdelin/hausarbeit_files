const fs = require('fs')
const path = require('path')
const base = __dirname + '/rohfiles'
const fileDir = __dirname + '/FILES'
const files = fs.readdirSync(base)


const readDir = (base, level) => {

  files.forEach(item => {
    let localBase = path.join(base, item)
    const dirsA = item[0].toUpperCase()
    let state = fs.statSync(localBase)
    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item)
      readDir(localBase, level + 1)
    } else {

      let digit = JSON.stringify(dirsA)
      console.log('INDEXOFF: ' + digit )
      console.log('FILE: ' + item )
      
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir)
      }
      var obj = dirsA;
      var obj1 = JSON.parse(digit);
      console.log(obj1.x); // 4
for (index = 0; index <dirsA.length; ++index) {
  console.log('digit[index]' + dirsA[index])

 //fs.mkdirSync(fileDir + '/' + dirsA[index])
}
      fs.link(base + '/' + item,  fileDir + '/' + item, err => {
        if (err) {
          console.error(err.message)
          return
        }
      })
    }
  })
}
readDir(base, 0)