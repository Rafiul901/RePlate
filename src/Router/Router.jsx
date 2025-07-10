import {
  createBrowserRouter,
 
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Homepage/Home";
import Login from "../Authentication/Login";
import AuthLayout from "../Authentication/AuthLayout";
import Register from "../Authentication/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
           index:true,
           element:<Home></Home> 
        },

       
    ]


  },

  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  }
]);

export default router;