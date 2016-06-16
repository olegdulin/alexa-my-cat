
/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var myCat=require('./myCat');

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

MyCatSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MyCatSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.tell(fortune.fortune());
};

MyCatSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MyCatSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

MyCatSkill.prototype.intentHandlers = {
    // register custom intent handlers
    "CatFactIntent": function (intent, session, response) {
        myCat.randomFact(function(fact) {
            response.tellWithCard(fact.facts[0], "My Cat", fact.facts[0]);
        });

    },
    "JustFedIntent" : function(intent, session, response) {
        myCat.rememberFed(session.user.userId, new Date().getTime(), function() {
            response.tellWithCard("Yes, you did feed your cat, but that won't stop it from " +
                "trying to convince you otherwise!", "My Cat", "Remember not to overfeed your cat!");
        } );
    },
    "LastFedIntent" : function(intent, session, response) {
        myCat.lastFed(session.user.userId, function(err, data) {
            if (data.lastFed==0) {
                response.tellWithCard("I do not rememeber you feeding your cat", "My Cat", "I do not rememeber you feeding your cat");
            }
            else {
                var timeNow=new Date().getTime();
                var difference=timeNow-data.lastFed;
                var minutes=Math.floor(difference/1000/60);
                var hours=Math.floor(difference/1000/60/60);
                if (hours==0) {
                    response.tellWithCard("Your cat has been fed in the past hour", "My Cat", "Your cat has been fed in the past hour");
                }
                else if (hours>4) {
                    response.tellWithCard("Your cat has been fed "+hours+" hours ago and it might be ready for a snack.", "My Cat",
                        "Your cat has been fed "+hours+" hours ago and it might be ready for a snack.");
                }
                else {
                    response.tellWithCard("Your cat has been fed less than four hours ago.", "My Cat",
                        "Your cat has been fed less than four hours ago.");
                }

            }
        });
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("I help you track your cat's feeding times and with things you should know about your cat. You can tell me when you fed your cat, " +
            "ask me when your cat was fed last, and ask me for a fun cat fact!")
    }
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the UnixFortune skill.
    console.log(JSON.stringify(event));
    var f = new MyCatSkill();
    f.execute(event, context);
};

