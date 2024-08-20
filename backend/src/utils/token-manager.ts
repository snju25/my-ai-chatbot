import { NextFunction, Request , Response } from "express";
import jwt  from "jsonwebtoken";

export const createToken = (id:string,email:string,expiresIn:string) =>{
    const payload = {id,email}
    const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn})
    return token
}

export const verifyToken = async (req:Request,res:Response, next: NextFunction) =>{
    const token = req.signedCookies[`auth_token`]
    console.log("token " + token);
    
    if(!token || token.trim() == ""){
        return res.status(401).json({message: "Token not received"})
    }
    return new Promise<void>((resolve,reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err,success)=> {
            if(err){
                reject(err.message)
                return res.status(401).json({message: 'Token expired'})
            } else {
                console.log('token verification successful');
                resolve();
                res.locals.jwtData = success;
                return next()              
            }
        })
    })
  
    
}

