const fs = require('fs')
const http = require('http')
const port = 6666
const path = require('path')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/favicon.ico') {
    fs.createReadStream('favicon.ico')
    fs.pipe(res)
  } else {
    res.end('Hello world!')
  }
});

fs.writeFile(path.join(__dirname, 'hello.txt'), 'Hello world!', (err) => {
  if (err) {
    console.log('Error write to file!');
  }
});
fs.readdir(__dirname + '/rohfiles', (err, files) => {
  if (err) {
    console.log('Ошибка чтения каталога')
  }
  files.forEach((item) => {
    console.log(item)
  })
})
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
});