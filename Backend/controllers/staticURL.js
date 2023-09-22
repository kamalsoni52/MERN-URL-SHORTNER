const URL = require("../models/url")

 const handleHomePage = async (req,res) =>{
    res.render("home")
 }

  const handleRedirectURL = async (req,res) =>{
  const shortId = req.params.id
  console.log(shortId)
  const entry = await URL.findOneAndUpdate(
       { 
           shortId,
       },
       {
           $push: {
               visitHistory : {
                   timestamp: Date.now()
               }
           }
       }
   );
   if(!entry) return res.redirect("/")
   console.log(entry.redirectURL)
   return res.status(300).redirect(entry.redirectURL)
}


 module.exports = {
    handleRedirectURL,
    handleHomePage,
 }