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
import Error from "../Homepage/Error";
import DonationDetails from "../RootLayout/DonationDetails";
import DashboardLayout from "../Homepage/DashboardLayout";
import ProfilePage from "../Homepage/ProfilePage";

import PaymentSuccess from "../Homepage/PaymentSuccess";
import PaymentCancel from "../Homepage/PaymentCancel";
import Payment from "../Homepage/Payment";
import Favorites from "../Homepage/Favorites";
import MyReviews from "../Homepage/MyReviews";


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
          element:<AllDonation></AllDonation>,
          loader: ()=> fetch('http://localhost:3000/donations')
        },
        {
          path:'/donations/:id',
          element:<DonationDetails></DonationDetails>
        },
        {
          path:'/dashboard',
          element:<DashboardLayout></DashboardLayout>,
          children:[
            {
              path:'profile',
              element:<ProfilePage></ProfilePage>
            },
            {
              path:'request',
              element:<Payment></Payment>
            },
            {
              path:'payment-success',
              element:<PaymentSuccess></PaymentSuccess>
            },
            {
              path:'payment-cancel',
              element:<PaymentCancel></PaymentCancel>
            },
            {
              path:'favorites',
              element:<Favorites></Favorites>
            },
            {
              path:'reviews',
              element:<MyReviews></MyReviews>
            },
          ]
        },
       

       
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
  ,
  {
      
    path:'*',
    element:<Error></Error>
  
  }
]);

export default router;