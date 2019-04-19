const Alexa = require('ask-sdk-core');

const {
    LaunchRequestHandler,
    NextConcertDateIntentHandler,
    NextConcertTitleIntentHandler,
    NextConcertLocationIntentHandler,
    NextConcertPriceIntentHandler,
    TimeUntilNextConcertIntentHandler,
    PastSemestersTitleIntentHandler,
    PastSemestersSongListIntentHandler,
    LastConcertTitleIntentHandler,
    LastConcertSongListIntentHandler,
    ListPastSemestersTitlesIntentHandler,
    ReservationInfoIntentHandler,
    BuyTicketsInfoIntentHandler,
    ReducedPriceInfoIntentHandler,
    AboutIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
} = require('./intentHandlers');

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },

    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },

    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Hm.. jetzt ist irgendwas schief gegangen.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        NextConcertDateIntentHandler,
        NextConcertTitleIntentHandler,
        NextConcertLocationIntentHandler,
        NextConcertPriceIntentHandler,
        TimeUntilNextConcertIntentHandler,
        PastSemestersTitleIntentHandler,
        PastSemestersSongListIntentHandler,
        LastConcertTitleIntentHandler,
        LastConcertSongListIntentHandler,
        ListPastSemestersTitlesIntentHandler,
        ReservationInfoIntentHandler,
        BuyTicketsInfoIntentHandler,
        ReducedPriceInfoIntentHandler,
        AboutIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
