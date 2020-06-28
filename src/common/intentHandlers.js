const {
    getSemesterText,
    getNextConcert,
    getConcertBySemesterAndYear,
    getPastConcerts,
    getLastConcert,
    getYear,
    timeDifferenceToText,
} = require('./util');
const { data } = require('./data');
const { speechContents, visualContents } = require('./contents');

function handleLaunch() {
    return {
        speechText: speechContents['WELCOME'](),
    };
}

function handleNextConcertDateIntent() {
    const nextConcert = getNextConcert();
    let speechText;
    let visualContent;
    if (!nextConcert) {
        speechText = speechContents['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
    } else {
        speechText = speechContents['NEXT_CONCERT_DATE'](nextConcert);
        visualContent = visualContent = visualContents['CONCERT'](nextConcert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handleNextConcertTitleIntent() {
    const nextConcert = getNextConcert();
    let speechText;
    let visualContent;
    if (!nextConcert) {
        speechText = speechContents['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
    } else {
        speechText = speechContents['NEXT_CONCERT_TITLE'](nextConcert);
        visualContent = visualContent = visualContents['CONCERT'](nextConcert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handleNextConcertLocationIntent() {
    const nextConcert = getNextConcert();
    let speechText;
    let visualContent;
    if (!nextConcert) {
        speechText = speechContents['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
    } else {
        speechText = speechContents['NEXT_CONCERT_LOCATION'](nextConcert);
        visualContent = visualContent = visualContents['CONCERT'](nextConcert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handleNextConcertPriceIntent() {
    const nextConcert = getNextConcert();
    let speechText;
    let visualContent;
    if (!nextConcert) {
        speechText = speechContents['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
    } else {
        speechText = speechContents['NEXT_CONCERT_PRICE'](nextConcert);
        visualContent = visualContent = visualContents['CONCERT'](nextConcert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handleTimeUntilNextConcertIntent() {
    const nextConcert = getNextConcert();
    let speechText;
    let visualContent;
    if (!nextConcert) {
        speechText = speechContents['NO_INFORMATION_FOR_NEXT_CONCERT_YET']();
    } else {
        const timeUntilNextConcert = timeDifferenceToText(nextConcert.dates[0], nextConcert.time);
        speechText = speechContents['TIME_UNTIL_NEXT_CONCERT'](timeUntilNextConcert);
        visualContent = visualContent = visualContents['CONCERT'](nextConcert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handlePastSemestersTitleIntent(parameters) {
    const semesterText = getSemesterText(parameters.semester);
    const fullYear = getYear(parameters.year);

    const concert = getConcertBySemesterAndYear(parameters.semester, fullYear);
    let speechText;
    let visualContent;
    if (!concert) {
        speechText = speechContents['NO_INFORMATION_FOR_PAST_SEMESTER'](semesterText, fullYear);
    } else {
        speechText = speechContents['PAST_SEMESTER_TITLE'](concert);
        visualContent = visualContents['CONCERT'](concert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handlePastSemestersSongListIntent(parameters) {
    const semesterText = getSemesterText(parameters.semester);
    const fullYear = getYear(parameters.year);

    const concert = getConcertBySemesterAndYear(parameters.semester, fullYear);
    let speechText;
    let visualContent;
    if (!concert) {
        speechText = speechContents['NO_INFORMATION_FOR_PAST_SEMESTER'](semesterText, fullYear);
    } else {
        speechText = speechContents['PAST_SEMESTER_SONG_LIST'](concert);
        visualContent = visualContents['CONCERT_SONG_LIST'](concert);
    }
    return {
        speechText: speechText,
        visualContent: visualContent,
    };
}

function handleLastConcertTitleIntent() {
    const lastConcert = getLastConcert();
    return {
        speechText: speechContents['LAST_CONCERT_TITLE'](lastConcert),
        visualContent: visualContents['CONCERT'](lastConcert),
    };
}

function handleLastConcertSongListIntent() {
    const lastConcert = getLastConcert();
    return {
        speechText: speechContents['LAST_CONCERT_SONG_LIST'](lastConcert),
        visualContent: visualContents['CONCERT_SONG_LIST'](lastConcert),
    };
}

function handleListPastSemestersTitlesIntent() {
    const concerts = getPastConcerts();
    return {
        speechText: speechContents['LIST_PAST_SEMESTERS_TITLES'](concerts),
        visualContent: visualContents['LIST_PAST_SEMESTERS_TITLES'](concerts, data.general),
    };
}

function handleReservationInfoIntent() {
    const nextConcert = getNextConcert();
    return {
        speechText: speechContents['RESERVATION_INFO'](),
        visualContent: visualContents['RESERVATION_INFO'](data.general, nextConcert),
    };
}

function handleBuyTicketsInfoIntent() {
    return {
        speechText: speechContents['BUY_TICKETS_INFO'](),
    };
}

function handleReducedPriceInfoIntent() {
    return {
        speechText: speechContents['REDUCED_PRICE_INFO'](),
    };
}

function handleAboutIntent() {
    return {
        speechText: speechContents['ABOUT'](),
        visualContent: visualContents['ABOUT'](data.general),
    };
}

function handleHelpIntent() {
    return {
        speechText: speechContents['HELP'](),
        visualContent: visualContents['HELP'](data.general),
    };
}

function handleCancelAndStopIntent() {
    return {
        speechText: speechContents['CANCEL_STOP'](),
    };
}

module.exports = {
    handleLaunch,
    handleNextConcertDateIntent,
    handleNextConcertTitleIntent,
    handleNextConcertLocationIntent,
    handleNextConcertPriceIntent,
    handleTimeUntilNextConcertIntent,
    handlePastSemestersTitleIntent,
    handlePastSemestersSongListIntent,
    handleLastConcertTitleIntent,
    handleLastConcertSongListIntent,
    handleListPastSemestersTitlesIntent,
    handleReservationInfoIntent,
    handleBuyTicketsInfoIntent,
    handleReducedPriceInfoIntent,
    handleAboutIntent,
    handleHelpIntent,
    handleCancelAndStopIntent,
};
