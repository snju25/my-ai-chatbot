import { NextFunction,Request,Response } from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req: Request,res:Response,next:NextFunction) =>{
    // get all user from database'
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK",
            users
        })
    } catch (error) {
        return res.status(200).json({message: 'ERROR', cause: error.message })
    }
    
}

export const userSignup = async  (req: Request,res:Response,next:NextFunction) =>{
    const {name,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(name,email,password)
    try {
        // does user already exist?
        const userAlreadyExist = await User.findOne({email})
        if(userAlreadyExist){
            return res.status(400).json({
                success: false,
                message: "Email already Exist",
            })
        }
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
         // clear cookies
         res.clearCookie("auth_token", {httpOnly: true, domain: "https://my-ai-chatbot-production-sanjay.up.railway.app", signed: true, path: "/"}); //clear any existing cookies

         const token = createToken(user._id.toString(),user.email, "7d")
         // use token in form of cookies
         // use cookie parser used to pass the cookies from backend to frontend
 
         const expires = new Date();
         expires.setDate(expires.getDate() + 7 )
         res.cookie("auth_token", token, {path: "/", domain: "https://my-ai-chatbot-production-sanjay.up.railway.app" , expires, httpOnly: true, signed: true});
        return res.status(201).json({
            success: true,
            message: "User created",
            name: user.name,
            email: user.email
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed creating User",
            error
        })
    }
}

// export const userLogin = async  (req: Request,res:Response,next:NextFunction) =>{
//     const {email,password} = req.body
//     try {
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(401).json({
//                 message: "User not registered"
//             })
//         }

//         const matchPassword = await bcrypt.compare(password,user.password)
//         if(!matchPassword){
//             return res.status(401).json({
//                 message: "Invalid credentials"
//             })
//         }
//         // clear cookies
//         res.clearCookie("auth_token", {httpOnly: true, domain: "localhost", signed: true, path: "/"}); //clear any existing cookies

//         const token = createToken(user._id.toString(),user.email, "7d")
//         // use token in form of cookies
//         // use cookie parser used to pass the cookies from backend to frontend

//         const expires = new Date();
//         expires.setDate(expires.getDate() + 7 )
//         res.cookie("auth_token", token, {path: "/", domain: "localhost" , expires, httpOnly: true, signed: true});

//         return res.status(200).json({
//             message: "Login Successfully",
//             name: user.name,
//             email: user.email
//         })

//     } catch (error) {
//         return res.status(400).json({
//             message: "Login failed",
//             error
//         })
        
//     }
// }

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not registered"
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        // clear cookies
        res.clearCookie("auth_token", { httpOnly: true, domain: "https://my-ai-chatbot-production-sanjay.up.railway.app", signed: true, path: "/" }); // clear any existing cookies

        const token = createToken(user._id.toString(), user.email, "7d");
        // use token in form of cookies
        // use cookie parser used to pass the cookies from backend to frontend

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token", token, { path: "/", domain: "https://my-ai-chatbot-production-sanjay.up.railway.app", expires, httpOnly: true, signed: true });

        return res.status(200).json({
            message: "Login successfully",
            name: user.name,
            email: user.email
        });

    } catch (error) {
        return res.status(400).json({
            message: "Login failed",
            error
        });
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id)
        console.log(user);
        
        if(!user){
            return res.status(401).send("User not registered or Token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match")
        }
        return res.status(200).json({
            message: "Verified successfully",
            name: user.name,
            email: user.email
        });
    
    } catch (error) {
        return res.status(400).json({
            message: "Verification token failed",
            error
        });
    }
}
export const userLogout = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id)
        if(!user){
            return res.status(401).send("User not registered or Token malfunctioned")
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match")
        }

        res.clearCookie("auth_token", { httpOnly: true, domain: "https://my-ai-chatbot-production-sanjay.up.railway.app", signed: true, path: "/" }); // clear any existing cookies


        return res.status(200).json({
            message: "Verified successfully",
            name: user.name,
            email: user.email
        });
    
    } catch (error) {
        return res.status(400).json({
            message: "Verification token failed",
            error
        });
    }
}

