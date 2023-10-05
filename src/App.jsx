import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './componant/Layout/Layout';
import Products from './componant/Products/Products';
import NotFound from './componant/NotFound/NotFound';
import Categories from './componant/Categories/Categories';
import Brandes from './componant/Brandes/Brandes';
import Login from './componant/Login/Login';
import Register from './componant/Register/Register';
import Profile from './componant/Profile/Profile';
import { AuthProvider } from './Context/authentication';
import ProtectedRout from './componant/Test/Test';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './componant/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './componant/Cart/Cart';
import Payment from './componant/Payment/Payment';
import AllOrders from './componant/AllOrders/AllOrders';
import WishList from './componant/WishList/WishList';
import { Offline } from 'react-detect-offline';
import FogetPassword from './componant/FogetPassword/FogetPassword';
import Respassword from './componant/ResPassword/Respassword';







const myrouter= createBrowserRouter([

{path:"/",element:<Layout/>,children:[

  {path:"",element:<ProtectedRout><Products/></ProtectedRout>},
  {path:"Products",element:<ProtectedRout><Products/></ProtectedRout>},

  {path:"Login",element:<Login/>},
  {path:"Register",element:<Register/>},

  {path:"Profile",element:<ProtectedRout><Profile/></ProtectedRout>},
  {path:"FogetPassword",element:<FogetPassword/>},
  {path:"Respassword",element:<Respassword/>},
  {path:"WishList",element:<ProtectedRout><WishList/></ProtectedRout>},
  {path:"AllOrders",element:<ProtectedRout><AllOrders/></ProtectedRout>},
  {path:"Payment",element:<ProtectedRout><Payment/></ProtectedRout>},
  {path:"cart",element:<ProtectedRout><Cart/></ProtectedRout>},
  {path:"Categories",element:<ProtectedRout><Categories/></ProtectedRout>},
  {path:"Brandes",element:<ProtectedRout><Brandes/></ProtectedRout>},
  {path:"ProductDetails/:id",element:<ProtectedRout><ProductDetails/></ProtectedRout>},
  {path:"*",element:<NotFound/>},

  



]},


]);


export default function App() {
let queryClient = new QueryClient() 


  return <>
  <QueryClientProvider client={queryClient}>

    <CartContextProvider>
      <AuthProvider>
        <RouterProvider router={myrouter}/>
      </AuthProvider>
    </CartContextProvider>
    <Toaster/>


  </QueryClientProvider>
  <Offline>

  <div className="position-fixed bottom-0 start-0 bg-dark text-white p-3 rounded-3">
    Ooops you are offline now.
  </div>


  </Offline>



  
  </>
}
