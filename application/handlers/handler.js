module.exports = async function handler(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const receivedText = event.message.text;
    
    // Send the same text message back to the user
    return {
      type: 'text',
      text: receivedText
    };
  }

  // If it's not a text message, return null
  return null;
};

// const _ = require('lodash');  // Utility for object manipulation
// const Product = require('../database/product.js');  // Your product database model

// // Handle incoming text messages and other events
// const handleMessage = async (event) => {
//   if (event.message.type === 'text') {
//     const text = event.message.text;

//     // Respond based on text message (for example, send a greeting)
//     if (text === 'hello') {
//       const message = {
//         type: 'text',
//         text: 'Hello, world!'
//       };
//       return message;
//     }

//     // Handle other text messages or actions here
//     return {
//       type: 'text',
//       text: `You said: ${text}`
//     };
//   }

//   return null;
// };

// // Handle postback events (such as when a user clicks a button)
// const handlePostback = async (event) => {
//   if (event.type === 'postback') {
//     const data = event.postback.data;

//     if (data === 'getProducts') {
//       const products = await Product.readProducts();
//       const carouselProducts = {
//         type: 'template',
//         altText: 'Available Products',
//         imageAspectRatio: 'rectangle',
//         imageSize: 'cover',
//         template: {
//           type: 'carousel',
//           columns: _.map(products, product => ({
//             thumbnailImageUrl: product.imgUrl,
//             imageBackgroundColor: '#FFFFFF',
//             title: product.name,
//             text: product.detail,
//             defaultAction: {
//               type: 'uri',
//               label: 'View image',
//               uri: product.imgUrl
//             },
//             actions: [
//               {
//                 type: 'postback',
//                 label: 'I want to buy!',
//                 data: `flow=shoping&action=buy&productID=${product.id}`
//               }
//             ]
//           }))
//         }
//       };

//       return carouselProducts;
//     }
//   }

//   return null;
// };

// // Main event handler that determines the type of event and calls the appropriate handler
// const handleEvent = async (event) => {
//   let response = null;

//   // Handle text messages
//   response = await handleMessage(event);
//   if (response) return response;

//   // Handle postback actions
//   response = await handlePostback(event);
//   if (response) return response;

//   // Default response for unknown event types
//   return {
//     type: 'text',
//     text: 'I cannot understand this message.'
//   };
// };

// module.exports = handleEvent;
