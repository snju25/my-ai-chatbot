
import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext"
import NavigationLinks from "./shared/NavigationLinks"
const Header = () => {
  const auth = useAuth()
  return (
    <div>
      <AppBar sx={{bgcolor: "transparent",position: "static", boxShadow: "none"}} >
        <Toolbar sx={{display: "flex"}}>
          <Logo/>
          <div style={{display: "flex"}}> 
            {auth?.isLoggedIn ? 
            <>
              <NavigationLinks to="/chat" bg="#00fffc" text= "Go to chats" textColor = "black" />
              <NavigationLinks to="/" bg="#51538f" text= "Logout" textColor = "white" onClick={auth.logout} />
            </> 
            :
            <>
              <NavigationLinks to="/login" bg="#00fffc" text= "Login" textColor = "black" />
              <NavigationLinks to="/signup" bg="#51538f" text= "SignUp" textColor = "black" />
            </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default Header