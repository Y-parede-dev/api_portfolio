const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = (req, res, next)=>{
   
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JSW_SECRET}`);
    const userId = decodedToken.user_id;
    const isAdmin = decodedToken.isAdmin;
    if((req.body.id && req.body.id !== userId )){
        if(isAdmin==true){
            next()   
        }
        else{
            res.status(400).json({message:"Vous n'etes pas l'admin ni l'utilisateur de se compte"});
        };
    }else {
        next(); 
    };
};
