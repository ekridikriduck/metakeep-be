const CognitoExpress = require("cognito-express");
const config = require("../config");

const cognitoExpress = new CognitoExpress({
  region: config.AWS_REGION,
  cognitoUserPoolId: config.POOL_ID,
  tokenUse: "access", //Possible Values: access | id
  tokenExpiration: 3600000, //Up to default expiration of 1 hour (3600000 ms)
});

const cognitoAuthMiddleware = (req, res, next) => {
  let accessTokenFromClient = req.headers.authorization;

  if (!accessTokenFromClient)
    return res.status(401).send("Access Token missing from header");

  cognitoExpress.validate(accessTokenFromClient, function (err, response) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    //Else API has been authenticated. Proceed.
    req.cognitoUser = response;
    next();
  });
};

module.exports = cognitoAuthMiddleware;
