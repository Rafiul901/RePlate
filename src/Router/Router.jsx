import {
  createBrowserRouter,
 
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Homepage/Home";
import Login from "../Authentication/Login";
import AuthLayout from "../Authentication/AuthLayout";
import Register from "../Authentication/Register";
import Loader from "../Homepage/Loader";
import PrivateRoute from "../Authentication/PrivateRoute";
import AllDonation from "../Homepage/AllDonation";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Loader><RootLayout></RootLayout></Loader>,
    children:[
        {
           index:true,
           element:<Home></Home> 
        },
        {
          path:'/allDonation',
          element:<PrivateRoute><AllDonation></AllDonation></PrivateRoute>
        }

       
    ]


  },

  {
    path:'/',
    element:<Loader><AuthLayout></AuthLayout></Loader>,
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