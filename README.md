## strava-export-all

Export all tracks for a given [Strava](http://www.strava.com/) user into
one big [GeoJSON](http://www.geojson.org/) file so you can use it with
stuff like [TileMill](http://www.mapbox.com/tilemill/) and whatnot.

Right now uses [John Keefe](http://johnkeefe.net/)'s excellent [Multiple Ride Mapper](http://www.jonathanokeeffe.com/strava/map.php).

### usage

    npm install strava-export-all

In which `3` is your rider ID, which you can get from your user profile page.

    node index.js --rider=3
