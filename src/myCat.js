/**
 * Created by dulino on 6/16/16.
 */

var request = require('request');
var AWS=require('aws-sdk');
var async=require('async');

var S3=new AWS.S3();

var bucket='olegdulin-alexa-mycat';

/*
Cat fact courtesy of http://catfacts-api.appspot.com/doc.html
 */
var randomFact = function (callback) {
    var fact={};
    var tasks=[
        function(callback) {
            request({
                url: 'http://catfacts-api.appspot.com/api/facts', //URL to hit
                qs: {number: 1}, //Query string data
                method: 'GET'
            }, function(error, response, body){
                if(error) {
                    fact={};
                } else {
                    fact=JSON.parse(body);
                }
                callback();
            });
        }
    ];
    async.series(tasks, function() {
        callback(fact);
    });



}

var rememberFed = function(userId, time, callback) {
    var tasks=[
        function(callback) {
            var remember= {
                lastFed: time
            };
            S3.putObject({
                    Bucket: bucket,
                    Key: userId + "/default/food.json",
                    ContentType: "application/json",
                    Body: new Buffer(JSON.stringify(remember))
                },
                function(err, data) {
                    callback(err, data);
                }
            );
        }
    ];
    async.series(tasks, function(err, data) {
        callback(err, data);
    });


}

var lastFed = function(userId, callback) {
    var tasks=[
        function(err, data) {
            S3.getObject({
                    Bucket: bucket,
                    Key: userId + "/default/food.json"
                },
                function(err, data) {
                    if (!err) {
                        if (data!=null) {
                            if (data.Body!=null) {
                                callback(null, JSON.parse(data.Body.toString()));
                            }
                        }
                        else
                        {
                            callback(null, { lastFed : 0});
                        }
                    }
                    else
                    {
                        if (err.code=='NoSuchKey') {
                            callback(null, { lastFed : 0});
                        }
                        else
                        {
                            callback(err, data);
                        }

                    }

                }
            );
        }
    ];
    async.series(tasks, function(err, data) {
        callback(err, data);
    });

}

//randomFact(function(fact) {
//    console.log(fact);
//});

//rememberFed("testUser", new Date().getTime(), function(err, data) {
//   console.log(data);
//});

//lastFed("testUser1", function(err, data) {
//    console.log(data);
//});

module.exports={
    randomFact : randomFact,
    rememberFed : rememberFed,
    lastFed : lastFed
}
