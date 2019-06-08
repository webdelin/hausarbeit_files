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
 
        function RemoveDuplValues(dupvaluearr) {

          tempArr(dupvaluearr);
  
      }
  
      function tempArr(arr) {
  
          newArr = new Array();
  
          for (i = 0; i < arr.length; i++) {
  
              if (!duplValuescheck(newArr, arr[i])) {
  
                  newArr.length += 1;
  
                  newArr[newArr.length - 1] = arr[i];
  
              }
  
          }
  
          console.log(newArr);
  
      }
  
      for (i=0; i<dirsA.length; i++) {  
        if (!newArray.includes(dirsA[i])) {
            newArray.push(dirsA[i]); 
        }
    }
      console.log('WRITE DIR: ' + newArray)
        
      }
    })
  })
}

writeDir(base, 0);
//readDir(base, 0);