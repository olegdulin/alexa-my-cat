/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.f8fc1f7d-65bf-4fd6-9a1a-f9ab92eea501"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var myCat = require('./myCat');

/**
 * UnixFortune is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var MyCatSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MyCatSkill.prototype = Object.create(AlexaSkill.prototype);
MyCatSkill.prototype.constructor = MyCatSkill;

MyCatSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MyCatSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

var fedMyCatResponse = [
    "Noted. Just remember that your cat may try to convince you otherwise. Do not overfeed your pet!",
    "Thanks for letting me know, I made a note of the feeding time. Remember not to overfeed your pet!",
    "I recorded the feeding time, thank you. Don't overfeed your cat!"

]

MyCatSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MyCatSkill onLaunch requestId: " + JSON.stringify(launchRequest));

    myCat.lastFed(session.user.userId, function (err, data) {
        if (data.lastFed == 0) {
            doFirstTime(launchRequest, session, response);
        }
        else {
            lastFedIntent(session, response);
        }
    });
};

MyCatSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MyCatSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

const HELP_SPEECH = "I can help you take better care of your cat. " +
    "You can tell me that you fed your cat, ask me if your cat has been fed, or ask me for a fun fact.";

function doFirstTime(launchRequest, session, response) {
    response.tell(HELP_SPEECH);
}

function feedingTimeHoursAgo(data) {
    var timeNow = new Date().getTime();
    var difference = timeNow - data.lastFed;
    var hours = Math.floor(difference / 1000 / 60 / 60);
    return hours;
}
function lastFedIntent(session, response) {
    myCat.lastFed(session.user.userId, function (err, data) {
        if (data.lastFed == 0) {
            response.tellWithCard("I do not rememeber you feeding your cat", "My Cat", "I do not rememeber you feeding your cat");
        }
        else {
            var hours = feedingTimeHoursAgo(data);
            if (hours == 0) {
                response.tellWithCard("Your cat has been fed in the past hour", "My Cat", "Your cat has been fed in the past hour");
            }
            else if (hours > 4) {
                response.tellWithCard("Your cat has been fed " + hours + " hours ago and it might be ready for a snack.", "My Cat",
                    "Your cat has been fed " + hours + " hours ago and it might be ready for a snack.");
            }
            else {
                response.tellWithCard("Your cat has been fed less than four hours ago.", "My Cat",
                    "Your cat has been fed less than four hours ago.");
            }

        }
    });
}
MyCatSkill.prototype.intentHandlers = {
    // register custom intent handlers
    "CatFactIntent": function (intent, session, response) {
        myCat.randomFact(function (fact) {
            response.tellWithCard(fact.facts[0], "My Cat", fact.facts[0]);
        });

    },
    "JustFedIntent": function (intent, session, response) {
        myCat.lastFed(session.user.userId, function (err, data) {
            var hours = feedingTimeHoursAgo(data);
            if (hours < 1) {
                response.tell("You already fed your cat less than an hour ago. You shouldn't overfeed your pet");
            }
            else {
                myCat.rememberFed(session.user.userId, new Date().getTime(), function () {
                    response.tellWithCard("Noted. Just remember that your cat may try to convince you otherwise. Do not overfeed your pet!", "My Cat", "Remember not to overfeed your cat!");
                });
            }
        });

    },
    "LastFedIntent": function (intent, session, response) {
        lastFedIntent(session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        doFirstTime(null, session, response);
    }
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the UnixFortune skill.
    console.log(JSON.stringify(event));
    var f = new MyCatSkill();
    f.execute(event, context);
};

