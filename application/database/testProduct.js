const { readProducts } = require('./product.js'); // Adjust the path to your product.js file

// Test function to log the output of readProducts
const testReadProducts = async () => {
  try {
    const products = await readProducts();
    console.log('Test output - products:', JSON.stringify(products, null, 2)); // Log the products to see the output
  } catch (error) {
    console.error('Test failed:');
  }
};

// Run the test
testReadProducts();
