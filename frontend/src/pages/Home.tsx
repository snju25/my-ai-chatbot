import { Box } from "@mui/material"
import TypingAnim from "../typer/TypingAnim"

const Home = () => {
  return (
    <Box width={"100%"} height={'100%'}>
      <Box sx={{display:"flex", width:"100%", flexDirection:"column",mx:"auto", alignItems:"center", mt:"3"}}>
        <Box>
          <TypingAnim/>
        </Box>
        <Box sx={{width:"100%", display:"flex", flexDirection:{md:"row", xs:"column"}, gap:5, my:10}}>
          <img src="robot.png" alt="robot image" style={{width:"200px", margin:"auto"}}/>
          <img src="openai.png" alt="robot image" style={{width:"200px", margin:"auto"}} className="image-rotate image-inverted"/>
       </Box>
       <Box sx={{display:"flex", width:"100%", mx:"auto", marginBottom:"20px"}}>
        <img src="chat.png" alt="chatbot" style={{display:"flex",margin:"auto", width:"60%", borderRadius:20,boxShadow:" -5px -5px 105px #64f3d5"}}/>

       </Box>
      </Box>
    </Box>
  )
}
export default Home