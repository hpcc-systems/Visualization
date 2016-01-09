var d3 = require("d3");
var topojson = require("topojson");
var fs = require("fs");
var request = require('request');
var async = require('async');

var content = fs.readFileSync(process.argv[2]);

var topo = JSON.parse(content);

var countryFeature = topojson.feature(topo, topo.objects.PolbndA);

var projection = d3.geo.mercator();

var path = d3.geo.path().projection(projection);

var calls = [];

var total = countryFeature.features.length;
var i = 0;
var index = {};

function appendIfMissing(arr, i) {
    if (arr.indexOf(i) >= 0) {
        return;
    }
    arr.push(i);
}

function doRequest(i, longLat) {
    //https://maps.googleapis.com/maps/api/js/GeocodeService.Search?5m2&1d11.453107&2d10.744629000000032&7sUS&9sen-US&callback=_xdc_._opmqeo&token=17596
    request("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAoUPTCgwGRJba5ZsImLcCv5g7lkfkZa-0&latlng=" + longLat[1] + "," + longLat[0], function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var resp = JSON.parse(body);
            if (resp.error_message) {
                console.log("Error (" + process.argv[2] + "):  " + resp.error_message);
            } else if (resp.results) {
                resp.results.forEach(function (result) {
                    if (result.address_components) {
                        result.address_components.forEach(function (component) {
                            if (component.types) {
                                component.types.forEach(function (type) {
                                    if (!index[type]) {
                                        index[type] = {};
                                    }
                                    if (!index[type][component.short_name]) {
                                        index[type][component.short_name] = [];
                                    }
                                    if (!index[type][component.long_name]) {
                                        index[type][component.long_name] = [];
                                    }
                                    appendIfMissing(index[type][component.short_name], i);
                                    appendIfMissing(index[type][component.long_name], i);
                                });
                            }
                        });
                    }
                });
            }
        }
    });
};

var interval = setInterval(function () {
    if (i >= total) {
        clearInterval(interval);
        console.log(JSON.stringify(index));
        return;
    }
    var feature = countryFeature.features[i];
    var pos = path.centroid(feature);
    var longLat = projection.invert(pos);
    doRequest(i++, longLat);
}, 150);
