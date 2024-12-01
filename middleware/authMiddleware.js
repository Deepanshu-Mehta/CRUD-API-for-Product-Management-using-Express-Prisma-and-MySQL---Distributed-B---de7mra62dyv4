const authKey = require("./authkey");

const authMiddleware = (req,res,next)=>{
    const {apiauthkey} = req.headers;
    if(!apiauthkey){
        return res.status(401).json({message: "Access denied, apiauthkey is missing"})
    }
    if(apiauthkey !== authKey()){
        return res.status(401).json({message: "Failed to authenticate apiauthkey"})
    }
    next();
}

module.exports = authMiddleware;