/**
 * Created by dulino on 6/19/16.
 */

var handler=require('./index');

var launchRequest={
    "version": "1.0",
    "session": {
        "new": true,
        "sessionId": "amzn1.echo-api.session.310858d5-af40-4673-ad60-2c4e5e24fa2c",
        "application": {
            "applicationId": "amzn1.echo-sdk-ams.app.f8fc1f7d-65bf-4fd6-9a1a-f9ab92eea501"
        },
        "user": {
            "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QHHDH3MZLY2PHUHQU6QHJYLPNDJ5IVAJGDBLA6HTDE37VHLAGWYL5XME4I332MY4RZ57S36AQUSFP7RNGAACD4CZPGYM4VEFRC4OLYNFZZBBIWZ772SR76S5I3DXMRD3W35FAEW6VHT6XGWXPHML5FVUXTKY"
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
        "sessionId": "amzn1.echo-api.session.1dabe447-ccb5-4908-b4c6-72d46e4f4901",
        "application": {
            "applicationId": "amzn1.echo-sdk-ams.app.f8fc1f7d-65bf-4fd6-9a1a-f9ab92eea501"
        },
        "user": {
            "userId": "amzn1.ask.account.AFP3ZWPOS2BGJR7OWJZ3DHPKMOMNWY4AY66FUR7ILBWANIHQN73QHHDH3MZLY2PHUHQU6QHJYLPNDJ5IVAJGDBLA6HTDE37VHLAGWYL5XME4I332MY4RZ57S36AQUSFP7RNGAACD4CZPGYM4VEFRC4OLYNFZZBBIWZ772SR76S5I3DXMRD3W35FAEW6VHT6XGWXPHML5FVUXTKY"
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

var context={
    succeed: function(success) {
        console.log(JSON.stringify(success));
    },
    fail: function(error) {
        console.log(JSON.stringify(error));
    }
}

handler.handler(justFed, context);