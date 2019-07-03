const http = require('http');
const fs = require('fs');
const { Console } = console;

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {
        setInterval(() => getDateTime(), 1000) 
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        console.time('process');
        setTimeout((() => {  
            console.log('END: ' + new Date().toLocaleString('de-DE', { timeZone: 'UTC' }))
            return process.exit(console.timeEnd('process'));
            
        }), 10000);
          
        function getDateTime() {

            var date = new Date();
        
            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;
        
            var min  = date.getMinutes();
            min = (min < 10 ? "0" : "") + min;
        
            var sec  = date.getSeconds();
            sec = (sec < 10 ? "0" : "") + sec;
        
            var year = date.getFullYear();
        
            var month = date.getMonth() + 1;
            month = (month < 10 ? "0" : "") + month;
        
            var day  = date.getDate();
            day = (day < 10 ? "0" : "") + day;
        
            console.log(year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec);
        
        }
    }).listen(8080);


});