// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.authenticate = (req, res, next) => {
//   const token = req.cookies.loginToken; // assuming you're using cookies
//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized access" });
//   }

//   jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ success: false, message: "Invalid token" });
//     }
//     req.user = decoded; // storing decoded user info in the request
//     next();
//   });
// };


const jwt =require("jsonwebtoken")
require("dotenv").config()

exports.checkAuthentication = async (req,res,next)=>{
try{
    const token = req.body.token || req.cookies.loginToken || req.headers.authorization?.split(" ")[1];
    console.log(token)
    if(!token || token===undefined){
        return res.status(401).json({
            success: false,
            message:"token is missing or invalid"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.jwt_secret);
        console.log(decode);
        req.user= decode;
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "error occure while decode token",
            error: err.message
        })
    }
    next();
}
catch(error){
    return res.status(401).json({
        success:false,
        message: " error while token checking for auhhentatication",
        error: error.message
    })
}
}

