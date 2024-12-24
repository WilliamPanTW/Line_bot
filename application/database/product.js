const airtable = require('./airtable.js');
const _ = require('lodash');

module.exports.readProducts = async () => {
  try {
    const result = await airtable.get({
      table: `${process.env.AIRTABLE_NAME}`, 
      pageSize: 10,
      sort: [{ field: 'id', direction: 'asc' }]
    });
    console.log('Airtable result:', JSON.stringify(result)); // Log the entire result for debugging

    // Process the records and ensure the required fields are present
    const products = _.compact(_.map(result.records, record => {
      const { fields } = record;
      const { id, name, detail, price, images } = fields;
      
      // Check if essential product data is missing
      if (!(name && detail && price && images && images[0].url)) {
        console.log(`Missing or incomplete data in product id: ${id}`); // Log incomplete product data
        return null;  // If data is incomplete, skip this product
      }

      // Return a structured product object
      return {
        id,
        name,
        detail,
        price,
        imgUrl: images[0].url
      };
    }));

    console.log('Processed products:', JSON.stringify(products)); // Log processed products for verification
    return products;  // Return the processed list of products

  } catch (error) {
    console.error('Error reading products from Airtable:', error);  // Log any errors that occur
    throw error;  // Re-throw the error so the caller can handle it
  }
};
