import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"
import Footer from "../components/footer/Footer"

const HomeLayout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
        <Footer/>
    </main>
  )
}
export default HomeLayout