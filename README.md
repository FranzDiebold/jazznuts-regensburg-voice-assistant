<img src="./images/jazznuts-regensburg-alexa-skill-preview-image.png" width="135px" alt="Jazznuts Regensburg Alexa skill preview image" />

# "Jazznuts Regensburg" voice assistant

[![Alexa skill: live](https://img.shields.io/badge/Alexa%20skill-live-2ccafb.svg)](https://jazznuts-regensburg-alexa.diebold.io)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

_Jazznuts Regensburg_ is a German-speaking voice assistant for [Amazon Echo (Alexa)](https://en.wikipedia.org/wiki/Amazon_Echo) and [Google Assistant](https://en.wikipedia.org/wiki/Google_Assistant), which informs you about upcoming and past concerts of the [Jazznuts](http://www.jazznuts.de). The Jazznuts is an a cappella choir at the [University of Regensburg](https://www.uni-regensburg.de).

### Example Conversation

1. _Alexa, öffne "Jazznuts Regensburg"._
2. _Wann findet das nächste Konzert statt?_
3. _Wie lange ist noch bis zum nächsten Konzert?_
4. _Was ist das Thema des nächsten Konzerts_
5. _Wo findet das nächste Konzert statt?_
6. _Kann man Karten für das Konzert reservieren?_
7. _Was war der Titel des letzten Konzertes?_
8. _Welche Lieder wurden im letzten Konzert gesungen?_
9. _Was war das Konzerttitel im Wintersemester 2018?_
10. _Erzähle mir über die Jazznuts._

## Interaction Model

### Intents

| Name                            | Sample Utterance                                           |
| ------------------------------- | ---------------------------------------------------------- |
| `NextConcertDateIntent`         | _Wann findet das nächste Konzert statt?_                   |
| `NextConcertTitleIntent`        | _Was ist das Thema des nächsten Konzerts_                  |
| `NextConcertLocationIntent`     | _Wo findet das nächste Konzert statt?_                     |
| `NextConcertPriceIntent`        | _Wieviel Eintritt kostet das nächste Konzert?_             |
| `ReservationInfoIntent`         | _Kann man Karten für das Konzert reservieren?_             |
| `PastSemestersTitleIntent`      | _Was war das Konzerttitel im Wintersemester 2017?_         |
| `BuyTicketsInfoIntent`          | _Wo kann man Tickets kaufen?_                              |
| `ReducedPriceInfoIntent`        | _Wer bekommt einen ermäßtigen Preis?_                      |
| `TimeUntilNextConcertIntent`    | _Wie lange ist noch bis zum nächsten Konzert?_             |
| `ListPastSemestersTitlesIntent` | _Was waren die Themen in den letzten Semestern?_           |
| `LastConcertTitleIntent`        | _Was war der Titel des letzten Konzertes?_                 |
| `LastConcertSongListIntent`     | _Welche Lieder wurden im letzten Konzert gesungen?_        |
| `PastSemestersSongListIntent`   | _Welche Lieder wurden im Konzert im Sommer 2016 gesungen?_ |
| `AboutIntent`                   | _Erzähle mir über die Jazznuts._                           |

### Entities / Slot types

| Name       | Values                                                 |
| ---------- | ------------------------------------------------------ |
| `Semester` | `Sommersemester`, `Sommer`, `Wintersemester`, `Winter` |

## Endpoints

### Amazon Echo

The Amazon Echo endpoint is a [Node.js](https://nodejs.org) [AWS Lambda](https://aws.amazon.com/lambda/) function using the Alexa Skills Kit SDK for Node.js [`ask-sdk`](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs).

Check out the lambda function in [`/src/amazon-alexa`](./src/amazon-alexa).

### Google Assistant

The Google Assistant endpoint is a [Node.js](https://nodejs.org) [Google Cloud Function](https://cloud.google.com/functions) using the Dialogflow fulfillment package [dialogflow-fulfillment-nodejs](https://github.com/dialogflow/dialogflow-fulfillment-nodejs).

Check out the cloud function in [`/src/google-assistant`](./src/google-assistant).
