var http = require('http');
var router = require('./router');



http.createServer(function (req , res) {

    //localhost:3000
    router.home(req , res);

    //localhost:3000/babol
    router.forecast(req , res );



}).listen(3000 , function () {
   console.log("server running at localhost:3000")
});