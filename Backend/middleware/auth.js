const { getUser } = require("../service/auth");


function checkForVerification( req, res, next) {
    try{
        const authorizationHeader = req.headers["authorization"];
        if(!authorizationHeader) return res.sendStatus(404).json({"msg": "Go and login first"});
        const token = authorizationHeader.split(" ")[1];
        const user = getUser(token)
        if(!user) return res.sendStatus(403).json("Token expired Please Lgoin again")
        req.user= user
        return next();
    }
    catch (error) {
        if(error.code ) { 
            console.log("error in auhtorization")
        }
    }
   }

module.exports = {
    checkForVerification,
}