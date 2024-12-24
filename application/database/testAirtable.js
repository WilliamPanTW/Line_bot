const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
const airtable = require('./airtable.js'); // assuming airtable.js is your module file

const testAirtable = async () => {
  try {
    // Test with a specific table name
    const result = await airtable.get({
      table: `${process.env.AIRTABLE_NAME}`, // Replace with the actual table name you want to query
      pageSize: 10,
      sort: [{ field: 'id', direction: 'asc' }]
    });
    console.log('Airtable response:', result); // Log the Airtable response
  } catch (error) {
    console.error('Error fetching data from Airtable:');
    // console.error('Error fetching data from Airtable:',error);
  }
};

testAirtable();
