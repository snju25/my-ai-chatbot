import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"

const HomeLayout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
       
    </main>
  )
}
export default HomeLayout