var request = require('request'),
    queue = require('queue-async'),
    fs = require('fs'),
    argv = require('optimist')
        .default('output', 'rides.geojson')
        .argv;

var getRides = 'http://www.jonathanokeeffe.com/strava/ajaxGetRides.php5';

request.post(getRides, {
    form: { rider: argv.rider }
}, function(err, resp, body) {
    var rides = JSON.parse(body).rides;
    var q = queue(4);
    rides.forEach(function(r) {
        q.defer(request,
            'http://www.jonathanokeeffe.com/strava/ajaxGetRidePoints.php5?ride=' + r);
    });
    q.awaitAll(function(err, results) {
        fs.writeFileSync(argv.output, JSON.stringify({
            type: 'FeatureCollection',
            features: results.map(function(r) {
                var j = JSON.parse(r.body);
                return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: j.points.map(function(p) {
                            return [p.longitude, p.latitude];
                        })
                    }
                };
            })
        }));
    });
});
