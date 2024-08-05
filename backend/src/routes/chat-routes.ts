import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion,sendAllChats,deleteChats } from "../controllers/chat-controllers.js";

//protected API
const chatRoutes = Router()
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken,generateChatCompletion  )
chatRoutes.get("/all-chats", verifyToken,sendAllChats  )
chatRoutes.delete("/delete-chats", verifyToken,deleteChats  )

export default chatRoutes