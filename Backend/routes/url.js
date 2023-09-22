const express = require("express");
const router = express.Router();
const { handleCreateShortURL , handleAnalytics, } = require("../controllers/url")

router.post("/",handleCreateShortURL);

module.exports = router;