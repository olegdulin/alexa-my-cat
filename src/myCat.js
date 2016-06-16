/**
 * Created by dulino on 6/16/16.
 */

var request = require('request');

var randomFact = function (callback) {
    request({
        url: 'http://catfacts-api.appspot.com/api/facts', //URL to hit
        qs: {number: 1}, //Query string data
        method: 'GET'
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            callback(JSON.parse(body));
        }
    });
}

randomFact(function(fact) {
   console.log(fact);
});

