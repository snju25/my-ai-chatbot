import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion,sendAllChats } from "../controllers/chat-controllers.js";

//protected API
const chatRoutes = Router()
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken,generateChatCompletion  )
chatRoutes.get("/all-chats", verifyToken,sendAllChats  )

export default chatRoutes