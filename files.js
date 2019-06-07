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
for (index = 0; index <dirsA.length; ++index) {
  console.log('digit[index]: ' + dirsA[index])

 //fs.mkdirSync(fileDir + '/' + dirsA[index])
}
      fs.link(base + '/' + item,  fileDir + '/' + item, err => {
        if (err) {
          console.error(err.message)
          return
        }
      })
    }
    var names_array_new = dirsA.reduceRight(function (r, a) {
      r.some(function (b) { return a === b; }) || r.push(a);
      return r;
    }, []);
    
    const dla = JSON.stringify(names_array_new, 0, 4);
    console.log('AAAAA' + dla)
  })
}
readDir(base, 0)