var https = require('https');


function getLocation(location , success , error) {
    https.get('https://api.cedarmaps.com/v1/geocode/cedarmaps.streets/'+ location +'?limit=2&access_token=4cf91bf3f599b8e155a5fe65a35ee55868ec352a' , function (res) {

        var body = '';
        res.on('data' , function (data) {
            body += data;
        });
        
        res.on('end' , function () {
            var google = JSON.parse(body);
            for (var key in google){
                if (google['status'] == 'OK'){
                    var lat = google.results[0].location.center.split(',')[0];
                    var lng = google.results[0].location.center.split(',')[1];
                    success(lat , lng);
                    break
                }
            }
            // console.log(google);
            
        });
        // res.on('data', function (data) {
        //     console.log(JSON.parse(data.toString()));
        // })
        res.on('error' , function (err) {
            error(err);
        });


    });
}


function getWeather (lat , lng , success , error){
    https.get('https://api.darksky.net/forecast/020cf45c13ba6ade91eeecbf9df29a7f/'+lat +',' + lng + '?units=si' , function (res) {
        var body = '';
        res.on('data' , function (data) {
            body += data;
            
        });
        
        res.on('end', function () {
            var weather = JSON.parse(body);
            success(weather);
            
        });
        
        res.on('error' , function (err) {
            error(err);
        });
    })
}

module.exports.getLocatio = getLocation;
module.exports.getWeather = getWeather;