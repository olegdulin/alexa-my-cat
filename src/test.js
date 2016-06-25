/**
 * Created by dulino on 6/19/16.
 */

var handler=require('./index');

var launchRequest={
    "version": "1.0",
    "session": {
        "new": true,

        "user": {
            "userId": "TEST"
        }
    },
    "request": {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.e1a63226-2cb4-4a06-8a14-efd003c3c908",
        "timestamp": "2016-06-19T17:21:42Z",
        "locale": "en-US"
    }
};

var justFed={
    "version": "1.0",
    "session": {
        "new": true,
        "user": {
            "userId": "TEST"
        }
        ,
        "foo":"bar"
    },
    "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.b3130a31-9e4b-4c07-903a-8f45882efbee",
        "timestamp": "2016-06-19T18:06:17Z",
        "locale": "en-US",
        "intent": {
            "name": "JustFedIntent"
        }
    }
}

var lastFed={
    "version": "1.0",
    "session": {
        "new": false,
        "application": {
            "applicationId": "amzn1.echo-sdk-ams.app.f8fc1f7d-65bf-4fd6-9a1a-f9ab92eea501"
        },
        "attributes": {
            "interactive": true,
            "speechReplay": "I can help you take better care of your cat. You can tell me that you fed your cat, ask me if your cat has been fed, or ask me for a fun fact.. "
        },
        "user": {
            "userId": "TEST"
        }
    },
    "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.317a0345-8389-4b57-9159-1a11c0da91ee",
        "timestamp": "2016-06-25T10:03:55Z",
        "locale": "en-US",
        "intent": {
            "name": "LastFedIntent"
        }
    }
}

var context={
    succeed: function(success) {
        console.log(JSON.stringify(success));
    },
    fail: function(error) {
        console.log(JSON.stringify(error));
    }
}

handler.handler(lastFed, context);