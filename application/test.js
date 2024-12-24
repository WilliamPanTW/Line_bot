const dotenv = require("dotenv");
dotenv.config({ path: './application/.env' });
console.log(process.env.CHANNEL_ACCESS_TOKEN, process.env.CHANNEL_SECRET);
