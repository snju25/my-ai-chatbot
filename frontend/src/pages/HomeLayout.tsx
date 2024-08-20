import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const HomeLayout = () => {
  return (
    <main>
        <Header/>
        <Outlet/>
       
    </main>
  )
}
export default HomeLayout