const fs = require('fs')
const path = require('path')
const base = __dirname + '/rohfiles'
const fileDir = __dirname + '/temp'

const readDir = (base, level) => {
  const files = fs.readdirSync(base);
  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    

    if (state.isDirectory()) {
      console.log(' '.repeat(level) + 'DIR: ' + item);
      readDir(localBase, level + 1);
    } else {
      console.log(' '.repeat(level) + 'File: ' + item);
    }
  })
}



const writeDir = () => {
  fs.readdir(base, (err, files) => {
    if (err) {
      console.log('Ошибка чтения каталога');
    }
    files.forEach((item) => {
      let localBase = path.join(base, item)
      let state = fs.statSync(localBase)
      const dirsA = item[0].toUpperCase()
      const dirsS = JSON.stringify(dirsA)
      const dirsSt = dirsA.toString()
      if (state.isDirectory()) {
        console.log(item)
        readDir(localBase)
      } else {
        if (!fs.existsSync(dirsA)) {
          //fs.mkdirSync(fileDir)
        }
        
        function removeDuplicates(arr){
          let unique_array = []
          for(let i = 0;i < arr.length; i++){
              if(unique_array.indexOf(arr[i]) == -1){
                  unique_array.push(arr[i])
              }
          }
          return unique_array
      }
      
      console.log(removeDuplicates(dirsA))
      

        //console.log('WRITE DIR: ' + item[0].toUpperCase())
        console.log('WRITE DIR: ' + dirsSt);
        
      }
    })
  })
}

writeDir(base, 0);
//readDir(base, 0);