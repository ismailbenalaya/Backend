const jwt = require("jsonwebtoken");
const Formateur = require("../models/Formateur");
const Condidat = require("../models/Condidat");
const Admin = require("../models/Admin");
require("dotenv").config();
exports.verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Split the token to remove the 'Bearer ' prefix
  const tokenWithoutBearer = token.split(" ")[1];

  // Verify the token
  jwt.verify(tokenWithoutBearer, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token verification failed" });
    }

    // Attach the decoded payload to the request object for further use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
};
module.exports.checkUserRole = (requireRole)=>{
    return async (req,res,next)=>{
        try{
            const token = req.headers.authorization.split(" ")[1];
            const  decoded = jwt.verify(token,process.env.TOKEN_SECRET);
            const formateur =await Formateur.findOne(decoded.userId);
            if (formateur && formateur.role === requireRole)
            {
                req.user =formateur
                next();
                return;

            }
            const condidat = await Condidat.findOne(decoded.userId);
            if (condidat && condidat.role === requireRole)
            {
                req.user =condidat
                next();
                return;

            }
            const admin = await Admin.findOne(decoded.userId)
            if (admin && admin.role === requireRole)
            {   req.user = admin
                next();
                return;

                }
            res.status(403).json({message:"Unautheized access"});
        }catch(err){
            console.log(err)
            res.status(500).json({message: "Invalid Token"});
        }
        
    
}
}


module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const formateur = await Formateur.findOne({ email });
    const condidat = await Condidat.findOne({ email });
    const admin = await Admin.findOne({ email });
    if (!formateur && !condidat && !admin) {
      return res.status(401).send({ message: "Invalid cerdential" });
    }
    const user = formateur || condidat || admin;
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    if (user == formateur) {
      res.json({
        success: true,
        token: token,

        user: user,
      });
    
    }
    if (user == condidat) {
      res.json({
        success: true,
        token: token,

        user: user,
      });
  
    }
    if (user == admin) {
      res.json({
        success: true,
        token: token,
        user: user,
      });
    }
    
  } catch (err) {
    console.log("erreur de verification des champs");
  }
};
