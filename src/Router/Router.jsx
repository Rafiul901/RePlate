import {
  createBrowserRouter,
 
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Homepage/Home";
import Login from "../Authentication/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
           index:true,
           element:<Home></Home> 
        },

        {
            path:'/login',
            element:<Login></Login>
        }
    ]


  },
]);

export default router;