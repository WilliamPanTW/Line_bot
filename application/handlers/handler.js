const line = require('@line/bot-sdk');
const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
const Product = require('../database/product.js');
const _ = require('lodash');

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
});

// Helper function to format a product into a column
const toColumn = (product) => ({
  thumbnailImageUrl: product.imgUrl, // Use imgUrl instead of images[0].url
  title: product.name.substring(0, 40), // LINE carousel titles max 40 chars
  text: product.detail.substring(0, 60), // LINE carousel text max 60 chars
  actions: [
    {
      type: 'postback',
      label: 'View Details',
      data: `action=viewProduct&id=${product.id}`
    }
  ]
});

// Helper function to format products into carousel columns
const toColumns = ({ products }) => {
  if (!products) {
    console.error('No products provided in toColumns.');
    return [];
  }

  return _.map(products, toColumn); // Use lodash to map through the products array
};

// Handle getting products
const handleGetProducts = async (event) => {
  try {
    const result = await Product.readProducts(); 
    console.log('debug: products data', result.products);

    const columns = toColumns({ products: result.products });

    if (columns.length === 0) {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'No products found.'
      });
    }

    const carouselProducts = {
      type: 'template',
      altText: 'Check out our products!',
      template: {
        type: 'carousel',
        columns: columns
      }
    };

    return client.replyMessage(event.replyToken, carouselProducts);
  } catch (error) {
    console.error(error);
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'An error occurred while fetching products. Please try again later.'
    });
  }
};

// Main event handler
async function handleEvent(event) {
  console.log(event); // Log the event for debugging

  // Handle text messages
  if (event.type === 'message' && event.message.type === 'text') {
    const userMessage = event.message.text;

    if (userMessage === 'flow=general&action=getProducts') {
      return handleGetProducts(event); // Call your existing handleGetProducts function
    }

    // Default response for unhandled text
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `Sorry, I don't understand "${userMessage}".`
    });
  }

  // Handle postback events
  if (event.type === 'postback') {
    const data = event.postback.data;

    if (data === 'flow=general&action=getOrders') {
      return handleGetOrders(event);
    } else if (data === 'flow=general&action=getProducts') {
      return handleGetProducts(event); // Trigger for getting products
    } else if (data === 'flow=general&action=getMemberInfo') {
      return handleGetMemberInfo(event);
    }
  }

  // Default response for other event types
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'Hello, this is a reply bot from handler!'
  });
}

module.exports = { handleEvent };
