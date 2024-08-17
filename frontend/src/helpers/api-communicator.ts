import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post("/user/login", {email,password});
    try {
        const data = await response.data
        return data
    } catch (error:any) {
        throw new Error(error)
    }
}
export const signupUser = async (name:string,email: string, password: string) => {
    const response = await axios.post("/user/signup", {name,email,password});
    try {
        const data = await response.data
        return data
    } catch (error:any) {
        throw new Error(error)
    }
}

export const checkAuthStatus = async () =>{
    const response = await axios.get("/user/auth-status");
    
    if(response.status!== 200){
        throw new Error("Unable to autheticate");
    }
    const data = await response.data
    return data
}

export const sendChatRequest = async (message:string) =>{
    const response = await axios.post("/chat/new", {message});
    
    if(response.status!== 200){
        throw new Error("Unable to send chat");
    }
    const data = await response.data
    return data
}

export const getUserChats = async() =>{
    const response = await axios.get("/chat/all-chats");
    console.log(response);
    
    
    if(response.status!== 200){
        throw new Error("Unable to send chat");
    }
    const data = await response.data
    return data
}

export const deleteChats = async() =>{
    const response = await axios.delete("/chat/delete-chats");
    console.log(response);
    
    
    if(response.status!== 200){
        throw new Error("Unable to delete chat");
    }
    const data = await response.data
    return data
}
export const logoutUser = async() =>{
    const response = await axios.get("/user/logout");
    
    
    if(response.status!== 200){
        throw new Error("error logging out");
    }
    const data = await response.data
    return data
}