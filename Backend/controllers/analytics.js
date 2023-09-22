const URL = require("../models/url")

const handleAnalytics = async (req, res) => {
    try {        
        const allUrls = await URL.find({ createdBy: req.user._id})    
        return res.status(200).json({"urls" : allUrls})    
    } catch (error) {
        console.log(error)
        return res.status(404).json({"msg": "Not Found"})        
    }
    
    
}

module.exports ={
    handleAnalytics
}