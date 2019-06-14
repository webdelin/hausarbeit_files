var http = require('http')
var server = http.createServer(function (req, res) {
  
  let i = 0;

  function increment() {
    i++;
    console.log(i);
  }
  
  setInterval(increment, 2000);

});
server.listen(8080)
