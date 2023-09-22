const jwt = require("jsonwebtoken");
const secretKey = "Kamal$52625@"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        username: user.username
    }, secretKey)

}
function getUser(token) {
    try {
        return jwt.verify(
            token,
            secretKey,
            (err, decoded) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(403);
                    
                }
                return decoded                
            }
            );

    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}