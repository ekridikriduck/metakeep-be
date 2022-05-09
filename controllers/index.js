const App = require("../models/app-model");
const generateApiKey = require("generate-api-key");

const listApplications = async (req, res) => {
  try {
    const { cognitoUser } = req;
    const userID = cognitoUser.sub;
    const apps = await App.find({ userID });
    res.status(200).send(apps);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const createApplication = async (req, res) => {
  try {
    const { cognitoUser } = req;
    const { username } = cognitoUser;
    const { appName, chain } = req.body;
    const userId = cognitoUser.sub;
    const appID = generateApiKey({
      method: "string",
      pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    });

    const appSecret = generateApiKey({
      method: "string",
      min: 16,
      max: 16,
    });

    const app = await App.create({
      appName,
      chain,
      userId,
      appID,
      appSecret,
      createdBy: username,
    });
    res.status(200).send(app);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  listApplications,
  createApplication,
};
