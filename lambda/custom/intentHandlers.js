const {
    getSemesterText,
    getNextConcert,
    getConcertBySemesterAndYear,
    getPastConcerts,
    getLastConcert,
    getYear,
    timeDifferenceToText,
} = require('./util');
const { sentences } = require('./sentences');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },

    handle(handlerInput) {
        const speechText = sentences['WELCOME']();
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const NextConcertDateIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextConcertDateIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        let speechText;
        if (!nextConcert) {
            speechText = sentences['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
        } else {
            speechText = sentences['NEXT_CONCERT_DATE'](nextConcert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const NextConcertTitleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextConcertTitleIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        let speechText;
        if (!nextConcert) {
            speechText = sentences['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
        } else {
            speechText = sentences['NEXT_CONCERT_TITLE'](nextConcert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const NextConcertLocationIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextConcertLocationIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        let speechText;
        if (!nextConcert) {
            speechText = sentences['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
        } else {
            speechText = sentences['NEXT_CONCERT_LOCATION'](nextConcert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const NextConcertPriceIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextConcertPriceIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        let speechText;
        if (!nextConcert) {
            speechText = sentences['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
        } else {
            speechText = sentences['NEXT_CONCERT_PRICE'](nextConcert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const TimeUntilNextConcertIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'TimeUntilNextConcertIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        let speechText;
        if (!nextConcert) {
            speechText = sentences['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
        } else {
            const timeUntilNextConcert = timeDifferenceToText(nextConcert.dates[0], nextConcert.time);
            speechText = sentences['TIME_UNTIL_NEXT_CONCERT'](timeUntilNextConcert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const PastSemestersTitleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PastSemestersTitleIntent';
    },

    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        let semesterSlotId = null;
        let semesterText = slots.semester.value;
        if (slots.semester.resolutions.resolutionsPerAuthority[0].values) {
            semesterSlotId = slots.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            semesterText = getSemesterText(semesterSlotId);
        }

        const yearSlotValue = slots.year.value;
        const year = getYear(yearSlotValue);

        const concert = getConcertBySemesterAndYear(semesterSlotId, year);
        let speechText;
        if (!concert) {
            speechText = sentences['NO_INFORMATION_FOR_PAST_SEMESTER'](semesterText, year);
        } else {
            speechText = sentences['PAST_SEMESTER_TITLE'](concert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const PastSemestersSongListIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PastSemestersSongListIntent';
    },

    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;

        let semesterSlotId = null;
        let semesterText = slots.semester.value;
        if (slots.semester.resolutions.resolutionsPerAuthority[0].values) {
            semesterSlotId = slots.semester.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            semesterText = getSemesterText(semesterSlotId);
        }

        const yearSlotValue = slots.year.value;
        const year = getYear(yearSlotValue);

        const concert = getConcertBySemesterAndYear(semesterSlotId, year);
        let speechText;
        if (!concert) {
            speechText = sentences['NO_INFORMATION_FOR_PAST_SEMESTER'](semesterText, year);
        } else {
            speechText = sentences['PAST_SEMESTER_SONG_LIST'](concert);
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const LastConcertTitleIntentHandler = {
        canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'LastConcertTitleIntent';
    },

    handle(handlerInput) {
        const lastConcert = getLastConcert();
        const speechText = sentences['LAST_CONCERT_TITLE'](lastConcert);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const LastConcertSongListIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'LastConcertSongListIntent';
    },

    handle(handlerInput) {
        const lastConcert = getLastConcert();
        const speechText = sentences['LAST_CONCERT_SONG_LIST'](lastConcert);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const ListPastSemestersTitlesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ListPastSemestersTitlesIntent';
    },

    handle(handlerInput) {
        const concerts = getPastConcerts();
        const speechText = sentences['LIST_PAST_SEMESTERS_TITLES'](concerts);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const ReservationInfoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ReservationInfoIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        const speechText = sentences['RESERVATION_INFO']();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const BuyTicketsInfoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'BuyTicketsInfoIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        const speechText = sentences['BUY_TICKETS_INFO']();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const ReducedPriceInfoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ReducedPriceInfoIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        const speechText = sentences['REDUCED_PRICE_INFO']();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const AboutIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
    },

    handle(handlerInput) {
        const nextConcert = getNextConcert();
        const speechText = sentences['ABOUT']();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },

    handle(handlerInput) {
        const speechText = sentences['HELP']();

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(sentences['REPROMPT']())
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {
        const speechText = sentences['CANCEL_STOP']();
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

module.exports = {
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
};
