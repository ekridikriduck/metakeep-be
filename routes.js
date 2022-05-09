const express = require("express");
const cognitoAuthMiddleware = require("./middleware");
const { listApplications, createApplication } = require("./controllers");

const authenticatedRoute = express.Router();

authenticatedRoute.use(cognitoAuthMiddleware);

authenticatedRoute.get("/listApplications", listApplications);

authenticatedRoute.post("/createApplication", createApplication);

module.exports = authenticatedRoute;
