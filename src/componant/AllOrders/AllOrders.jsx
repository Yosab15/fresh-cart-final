import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function AllOrders() {

  

    const [userOrders, setUserOrders] = useState(null)
    useEffect(() => {
    const res= jwtDecode(localStorage.getItem("tkn"));
    // setUserId(res.id);
    getUserOrder(res.id);

 }, [])


 async function getUserOrder(id){
    try {
        const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        
        console.log(data);
        setUserOrders(data);


    } catch (e) {
        console.log("error",e);
        
    }
 }

 if(userOrders===null){
    return <div className="vh-100 d-flex align-items-center justify-content-center">
    <ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
    </div>
 }
 if(userOrders.length===0){
    return<>
    <div className="vh-100 d-flex align-items-center justify-content-center">
    <h2>cart is empty </h2>
    <h1 className='tzbet' ><Link to="/Products">Get some Products ...</Link> </h1>
    
    </div>
    </>
   }

  return <>


<Helmet>
  <title>All orders</title>
  <meta name="All orders" />
</Helmet>

  
  <div className=" container">
        <div className="row g-4">

            {userOrders.map(function(order,idx){

                return <div key={idx} className="col-md-6">
                <div className="order bg-info  rounded-5 py-5">

                    <div className=" container">
                        <div className="row g-4">
                        {order.cartItems?.map(function(item,indx){

                    return <div key={indx} className="col-sm-3 py-2 shadow bg-light">
                        <div className='my-2'>

                            <img src={item.product.imageCover} className=' w-100' alt={item.product.title}/>
                            <h5>{item.product.title.split(' ').slice(0,2).join(" ")}</h5>
                            <h6>count : {item.count}</h6>
                            <h6>price : {item.price}</h6>
                        </div>
                    </div>
})}

                        </div>
                    </div>

                  

                    <p>order send to user phone :{order.shippingAddress.phone }
                    ant with a details :{order.shippingAddress.details } at {order.shippingAddress.city }
                    </p>
                    <h5>payment method : {order.paymentMethodType }</h5>
                    <h5> price : {order.totalOrderPrice }</h5>
                </div>
            </div>

            })}
            
        </div>

  </div>
  
  
  </>
}
