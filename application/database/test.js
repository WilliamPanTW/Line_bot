const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
const rp = require('request-promise')

const test = async () => {
  const option = {
    headers: {
      'Authorization': 'Bearer ' + process.env.AIRTABLE_API_KEY
    },
    url: `https://api.airtable.com/v0/${process.env.AIRTABLE_API_ID}/${process.env.AIRTABLE_NAME}`,
    json: true
  }
  console.log(JSON.stringify(await rp(option)))
}
test()