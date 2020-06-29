'use strict';

const { Text, Card } = require('dialogflow-fulfillment');

function getHandler(handleFunction) {
    function handlerFunction(agent) {
        const response = handleFunction(agent.parameters);

        const text = new Text('');
        text.setSsml(`<speak>${response.speechText}</speak>`);
        agent.add(text);

        if (response.visualContent) {
            agent.add(new Card({
                title: response.visualContent.title,
                imageUrl: response.visualContent.imageUrl,
                text: response.visualContent.text,
                buttonText: response.visualContent.buttonText,
                buttonUrl: response.visualContent.buttonUrl,
            }));
        }
    }

    return handlerFunction;
}

module.exports = {
    getHandler,
};
