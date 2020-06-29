'use strict';

const { speechContents } = require('./contents');

function getHandler(handleFunction, intentNames, requestType='IntentRequest') {
    if (!Array.isArray(intentNames)) {
        intentNames = [intentNames];
    }

    const handlerObject = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === requestType
                && (intentNames.length === 0 || intentNames.includes(handlerInput.requestEnvelope.request.intent.name));
        },

        handle(handlerInput) {
            const slots = handlerInput.requestEnvelope.request.intent ? handlerInput.requestEnvelope.request.intent.slots : undefined;
            const parameters = {
                semester: slots && slots.semester && slots.semester.resolutions.resolutionsPerAuthority[0].values
                    ? slots.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id
                    : undefined,
                year: slots && slots.year ? slots.year.value : undefined,
            };

            const response = handleFunction(parameters);

            let responseBuilder = handlerInput.responseBuilder
                .speak(response.speechText)
                .reprompt(speechContents['REPROMPT']());

            if (response.visualContent) {
                responseBuilder = responseBuilder
                    .withStandardCard(
                        response.visualContent.title,
                        response.visualContent.text,
                        response.visualContent.imageUrl,
                    );
            }

            return responseBuilder
                .getResponse();
        },
    }

    return handlerObject;
}

module.exports = {
    getHandler,
};
