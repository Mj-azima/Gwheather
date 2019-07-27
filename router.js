var render = require('./render');
var querystring = require('querystring');
var weather = require('./weather');


function Home(req , res) {
    if(req.url == '/') {
        if (req.method.toLowerCase() === "get"){
            res.writeHead(200 , {'Content-Type' : 'text/html'});
            render.view("location" ,{"title" : "forecast Website"},res );
            res.end();
        } else {
            //get data
            req.on('data' , function (PostBody) {
                var query = querystring.parse(PostBody.toString());
                res.writeHead(302, {"Location" : "/" + query.location});
                res.end();
            })

            //localhost:3000
        }


    }

}


function Forecast(req , res) {
    var location = req.url.replace("/","");
    if (location .length>0){
        // res.writeHead(200 , {'Content-Type' : 'text/plain'})
        // res.write('route forecast');
        // res.end();
        weather.getLocatio(location , function (lat , lng) {
            weather.getWeather(lat ,lng , function (data) {
                var weath = data.daily.data;
                res.writeHead(200 , {'Content-Type' : 'text/html'});
                render.view('forecast/header' , {title : location} , res);
                weath.forEach(function (item , index) {
                    console.log(item);
                    render.view('forecast/weather',{
                        time : item.time,
                        icon : item.icon,
                        tempMin : Math.round(item.temperatureMin),
                        tempMax : Math.round(item.temperatureMax)
                    },res)
                });
                render.view('forecast/footer' , {} , res);
                res.end();
                console.log(data);
            }, error)
        } , error);
    }
    // console.log(location);
}
function error(err){
    if (err) console.log(err)
}

module.exports.home = Home;
module.exports.forecast = Forecast;