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
import ProfilePage from "../Homepage/ProfilePage";
import Payment from "../Homepage/Payment";
import Favorites from "../Homepage/Favorites";
import MyReviews from "../Homepage/MyReviews";

import CharityTransactions from "../Homepage/CharityTransactions";
import UserDashboard from "../Homepage/UserDashboard";
import CharityDashboard from "../DashBoard/CharityDashboard";
import RestaurantDashboard from "../DashBoard/RestaurantDashboard";
import AdminDashboard from "../DashBoard/AdminDashboard";
import AdminRoute from "../Authentication/AdminRoute";
import CharityRoute from "../Authentication/CharityRoute";
import RestaurantRoute from "../Authentication/RestaurantRoute";
import RestaurantProfile from "../Homepage/RestaurantProfile";
import AddDonation from "../Restaurant/AddDonation";
import MyDonations from "../Restaurant/MyDonations";
import UpdateDonation from "../Restaurant/UpdateDonation";
import RequestDonation from "../Restaurant/RequestDonation";
import DashboardRouter from "./DashboardRouter";
import CharityProfile from "../Charity/CharityProfile";
import CharityRequest from "../Charity/CharityRequest";
import CharityPickup from "../Charity/CharityPickup";
import CharityDonation from "../Charity/CharityDonation";
import CharityTransaction from "../Charity/CharityTransaction";



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
          element:<PrivateRoute><AllDonation></AllDonation></PrivateRoute>,
          loader: ()=> fetch('http://localhost:3000/donations')
        },
        {
          path:'/donations/:id',
          element:<DonationDetails></DonationDetails>
        },
      
        {
          path:'/userDashboard',
          element:<PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
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
              path:'favorites',
              element:<Favorites></Favorites>
            },
            {
              path:'reviews',
              element:<MyReviews></MyReviews>
            },
            {
              path:'transactions',
              element:<CharityTransactions></CharityTransactions>
            },
          ]
        },
        {
  path: '/charityDashboard',
  element: <CharityRoute><CharityDashboard /></CharityRoute>,
  children: [
    {
      path:'profile',
      element:<CharityProfile></CharityProfile>
    },
    {
      path:'requests',
      element:<CharityRequest></CharityRequest>
    },
    {
      path:'pickups',
      element:<CharityPickup></CharityPickup>
    },
    {
      path:'receivedDonations',
      element:<CharityDonation></CharityDonation>
    },
    {
      path:'transaction',
      element:<CharityTransaction></CharityTransaction>
    },
  ]
},


{
  path: '/restaurantDashboard',
  element: <RestaurantRoute><RestaurantDashboard /></RestaurantRoute>,
  children: [
    {
      path:'profile',
      element:<RestaurantProfile></RestaurantProfile>
    },
    {
      path:'addDonations',
      element:<AddDonation></AddDonation>
    },
    {
      path:'myDonations',
      element:<MyDonations></MyDonations>
    },
    {
      path:'update-donation/:id',
      element:<UpdateDonation></UpdateDonation>
    },
    {
      path:'reqDonations',
      element:<RequestDonation></RequestDonation>
    },
  ]
},
{
  path: '/adminDashboard',
  element: <AdminRoute><AdminDashboard /></AdminRoute>,
  children: [
    // admin-specific pages
  ]
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
  ,
  {
      
    path:'*',
    element:<Error></Error>
  
  }
]);

export default router;