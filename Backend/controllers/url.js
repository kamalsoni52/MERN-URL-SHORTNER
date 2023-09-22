const ShortUniqueId = require('short-unique-id');
const URL = require("../models/url")

const handleCreateShortURL = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "URLS is required"});
    const shortId = new ShortUniqueId();
    const id = shortId()
    console.log(id)
    let redUrl = body.url;
    if(!redUrl.match(/^(https:\/\/)|(http:\/\/)/gi)) redUrl = "https://"+redUrl
    await URL.create({
        shortId: id,
        redirectURL: redUrl, 
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.status(200).json({ "shortUrl" : "localhost:8001/"+id })
}

module.exports = {
  
    handleCreateShortURL
}