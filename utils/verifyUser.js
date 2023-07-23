const jwt  = require("jsonwebtoken");
const { success, error } = require("./responseRapper");

const verifyUser = (req,res,next) =>{
  try {
    if(!req.headers['authorization']){
      return res.send(success(404,"Authentication Required"));  
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.send(error(404,"token Required"));
    }
    const user = jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
      if(err){
        return res.send(error(400,err));
      }
      req.id = user.id;
      next();
    });
  } catch (e) {
    return res.send(error(500,e.message));
  }
}
module.exports = verifyUser;