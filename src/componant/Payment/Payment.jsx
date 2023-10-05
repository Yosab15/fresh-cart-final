import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
    const{cartId, setNumOfCartItems , setTotalCartPrice , setCartProduct}= useContext(cartContext)


        
    async function confirmCashPyment(){

    const phonevalue   =   document.querySelector('#phone').value;
    const cityvalue    =   document.querySelector('#city').value;
    const detailsvalue =   document.querySelector('#details').value;

   const shippingAddress= {
        "shippingAddress":{
            "details": detailsvalue,
            "phone": phonevalue,
            "city": cityvalue
            }
    }

    try {

        const{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,{
            headers:{token:localStorage.getItem("tkn")}
        })

console.log(data);
if(data.status==="success"){
   toast.success("order created successfully");
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    setCartProduct([]);
}else{
    toast.error("something went wrong");
}


        
    } catch (e) {
        console.log("error",e);
    }







    }

    async function confirmOnlinePyment(){
        const phonevalue   =   document.querySelector('#phone').value;
        const cityvalue    =   document.querySelector('#city').value;
        const detailsvalue =   document.querySelector('#details').value;
    
       const shippingAddress= {
            "shippingAddress":{
                "details": detailsvalue,
                "phone": phonevalue,
                "city": cityvalue
                }
        }

        try {
            
           const{data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress,
            
            {

                headers:{token:localStorage.getItem("tkn")},
                params:{url:"http://localhost:3000"}
            }
            
            )

            window.open(data.session.url,"_blank");


        } catch (e) {
            console.log("error",e);
            
        }


    }


  return <>


<Helmet>
  <title>payment</title>
  <meta name="payment" />
</Helmet>
<div className="all">
    <div className=" container py-5 wrapper">
    <form >


        
        
        <div className="input-box">
        <input id='phone' type="tel" placeholder='phone' className=' mb-3 form-control' />
        </div>
        
        <div className="input-box">
        <input id='city' type="text" placeholder='city' className=' mb-3 form-control' />
        </div>
    
        <div className="input-box">
        <input id='details' type="tel" placeholder='details' className=' mb-3 form-control' />
        </div>

<div className="payment-tyep d-flex justify-content-between">
<button type='button' onClick={confirmCashPyment}  className='btnc btn-primary'>confirm cash payment</button>
<button type='button' onClick={confirmOnlinePyment}  className='btno btn-primary'>confirm online payment</button>
</div>
        
    </form>




    </div>
    </div>
  
  </>
}
