import app from "./app.js"
import { dbConnect } from "./db/connection.js";



//connections and listeners 
const PORT = process.env.PORT
dbConnect().then(()=>{
  app.listen(PORT, ()=> console.log("Server is running on port 800 & connected to database on port " + PORT ));

}).catch((err)=> {
  console.log("error connecting to database " + err);
  
})
