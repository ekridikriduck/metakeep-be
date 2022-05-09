const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "./.env") });

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  AWS_REGION: process.env.AWS_REGION,
  POOL_ID: process.env.POOL_ID,
};
