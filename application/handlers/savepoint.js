const line = require('@line/bot-sdk');

const client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
});

// Simple handler functions for different actions
const handleGetOrders = (event) => {
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You clicked new getOrders'
    });
}

const handleGetProducts = (event) => {
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You clicked new getProducts'
    });
}

const handleGetMemberInfo = (event) => {
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'You clicked new getMemberInfo'
    });
}

// Main event handler
function handleEvent(event) {
    console.log(event); // Debugging the incoming event
    
    // Check if the event is a postback event
    if (event.type === 'postback') {
        const data = event.postback.data;

        // Handle actions based on the postback data
        if (data === 'flow=general&action=getOrders') {
            return handleGetOrders(event);
        } else if (data === 'flow=general&action=getProducts') {
            return handleGetProducts(event);
        } else if (data === 'flow=general&action=getMemberInfo') {
            return handleGetMemberInfo(event);
        }
    }

    // Default response for other types of events (like text messages)
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'Hello, this is a reply bot from handler!'
    });
}

module.exports = { handleEvent };
