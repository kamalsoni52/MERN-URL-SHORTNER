const express = require("express");
const { 
    handleHomePage,
    handleRedirectURL,
     } = require("../controllers/staticURL");


const staticRouter = express.Router();


staticRouter.get("/",handleHomePage)
staticRouter.get("/redirect/:id", handleRedirectURL);

module.exports = staticRouter;

