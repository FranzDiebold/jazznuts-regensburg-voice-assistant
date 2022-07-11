// https://github.com/dialogflow/dialogflow-fulfillment-nodejs

"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");

const {
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
} = require("./intentHandlers");
const { getHandler } = require("./googleAssistantHandler");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });

    let intentMap = new Map();
    intentMap.set("LaunchRequest", getHandler(handleLaunch));
    intentMap.set("Default Welcome Intent", getHandler(handleLaunch));
    intentMap.set(
      "NextConcertDateIntent",
      getHandler(handleNextConcertDateIntent)
    );
    intentMap.set(
      "NextConcertTitleIntent",
      getHandler(handleNextConcertTitleIntent)
    );
    intentMap.set(
      "NextConcertLocationIntent",
      getHandler(handleNextConcertLocationIntent)
    );
    intentMap.set(
      "NextConcertPriceIntent",
      getHandler(handleNextConcertPriceIntent)
    );
    intentMap.set(
      "TimeUntilNextConcertIntent",
      getHandler(handleTimeUntilNextConcertIntent)
    );
    intentMap.set(
      "PastSemestersTitleIntent",
      getHandler(handlePastSemestersTitleIntent)
    );
    intentMap.set(
      "PastSemestersSongListIntent",
      getHandler(handlePastSemestersSongListIntent)
    );
    intentMap.set(
      "LastConcertTitleIntent",
      getHandler(handleLastConcertTitleIntent)
    );
    intentMap.set(
      "LastConcertSongListIntent",
      getHandler(handleLastConcertSongListIntent)
    );
    intentMap.set(
      "ListPastSemestersTitlesIntent",
      getHandler(handleListPastSemestersTitlesIntent)
    );
    intentMap.set(
      "ReservationInfoIntent",
      getHandler(handleReservationInfoIntent)
    );
    intentMap.set(
      "BuyTicketsInfoIntent",
      getHandler(handleBuyTicketsInfoIntent)
    );
    intentMap.set(
      "ReducedPriceInfoIntent",
      getHandler(handleReducedPriceInfoIntent)
    );
    intentMap.set("AboutIntent", getHandler(handleAboutIntent));
    intentMap.set("HelpIntent", getHandler(handleHelpIntent));

    agent.handleRequest(intentMap);
  }
);
