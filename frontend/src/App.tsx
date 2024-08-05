import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/chat",
        element: <Chat/>
      },
      {
        path: "/login",
        element : <Login/>
      } ,
      {
        path: "/signup",
        element : <Signup/>
      } 
    ]
  }
])

const App= ()=> {
  return (<>
  <RouterProvider router={router}/>
  </>
  )
}
export default App