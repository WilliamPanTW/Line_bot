const airtable = require('./airtable.js');
const _ = require('lodash');

module.exports.readProducts = async () => {
  try {
    const result = await airtable.get({
      table: `${process.env.AIRTABLE_NAME}`, 
      pageSize: 10,
      sort: [{ field: 'id', direction: 'asc' }]
    });

    // console.log('Airtable result:', JSON.stringify(result, null, 2)); // Log the entire result for debugging

    result['products'] = _.compact(_.map(result.records, record => {
      const { fields } = record;
      const { id, name, detail, price, images } = fields;

      // Check for missing fields
      if (!name || !detail || !price || !images || !images[0]?.url) {
        // console.log(`Skipping product due to missing fields:`, { id, name, detail, price, images });
        return null;
      }

      // Return structured product object
      return {
        id,
        name,
        detail,
        price,
        imgUrl: images[0].url
      };
    }));

    // console.log('Processed products:', JSON.stringify(products, null, 2)); // Log processed products for verification
    console.log('return success from product.js')
    return result;

  } catch (error) {
    console.error('Error reading products from Airtable:', error);
    throw error;
  }
};
