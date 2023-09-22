const express = require("express");
const analyticsRouter = express.Router();

const { handleAnalytics } = require("../controllers/analytics")

analyticsRouter.get("/", handleAnalytics);


module.exports = analyticsRouter;