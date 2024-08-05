// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAi } from "../config/opneai-config.js";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// export const generateChatCompletion = async (req:Request,res:Response,next:NextFunction) =>{

//     // config the open api
//     const {message } = req.body

//     try {
//         const user = await User.findById(res.locals.jwtData.id)
//     if(!user) return res.status(401).json({message: "USer not registered or Token malfunctioned"})
//     //  grab chats of the user
//     const chats = user.chats.map(({role,content})=>{
//         return {role,content} as ChatCompletionRequestMessage
//     })
//     chats.push({content: message, role: "user"})
//     user.chats.push({content:message, role: "user"})
//     //send all chats with new one to openAi API 
//     const config = configureOpenAi();
//     const openai = new OpenAIApi(config);
//     const chatResponse = await openai.createChatCompletion({model: "gpt-3,5-turbo", messages: chats})
//     //  get latest response
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save()
//     return res.status(200).json({chats: user.chats })
        
//     } catch (error) {
//         return res.status(500).json({message: "Something went wrong " + error})
//     }

// }

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAi } from "../config/opneai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message content is required' });
    }

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: 'User not registered or Token malfunctioned' });
        }

        // Grab chats of the user
        const chats = user.chats.map(({ role, content }) => {
            return { role, content } as ChatCompletionRequestMessage;
        });

        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: 'user' });

        // Send all chats with new one to OpenAI API
        const config = configureOpenAi();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: 'gpt-4o-mini',
            messages: chats
        });
        

        // Get latest response
        const aiMessage = chatResponse.data.choices[0].message;
        user.chats.push(aiMessage);
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.error('Error in generateChatCompletion:', error.response ? error.response.data : error.message);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};


export const sendAllChats = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: 'User not registered or Token malfunctioned' });
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({
            message: "OK",
            chats: user.chats
        })


        
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: 'User not registered or Token malfunctioned' });
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        } 
            //@ts-ignore
            user.chats = []
            await user.save()

        return res.status(200).json({
            message: "Deleted Chats",
        })
        
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};