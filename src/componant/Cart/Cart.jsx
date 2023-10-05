import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext'
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './Cart.css'
import { Helmet } from 'react-helmet';

export default function Cart() {

    
    const {cartProducts,totalCartPrice,numOfCartItems,deleteProduct,updateCount,clearCard}=useContext(cartContext);

    console.log(cartProducts);
    
   if(cartProducts ===null){
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

   if(cartProducts.length===0){
    
    return<>
    <Helmet>
  <title>cart</title>
  <meta name="cart" />
</Helmet>
<div className="all">

    <div className="vh-100 d-flex align-items-center justify-content-center">
    <h2>cart is empty </h2>
    <h1 className='tzbet' ><Link to="/Products">Get some Products ...</Link> </h1>
    </div>
    </div>
    </>
   }
   
  async function deleteElement(id){
   const res= await deleteProduct(id);

    if(res.status==="success"){
       toast.success("product deleted successfully");
    }else{
        toast.error("something went wrong");
    }

   }
    async function updateCountOnCart(id,count){
    
        const res= await updateCount(id,count);
         if(res.status==="success"){
            toast.success("product count updated successfully");
         }else{
             toast.error("something went wrong");
         }
    }
   async function clearCardData(){
       await clearCard();
    }
 
    console.log(cartProducts);

    
    
 
 return <>
 <Helmet>
  <title>cart</title>
  <meta name="cart" />
</Helmet>
 
 
<div className="all">
 <div  className=' container py-5 wrapper'>
    <h2>shop cart:</h2> 
  <h5>total price : {totalCartPrice}</h5>
  <h5>total items : {numOfCartItems}</h5>
  <div className="d-flex justify-content-between ">
  <button onClick={clearCardData}  className='btnr btn-outline-danger'>clear cart</button>
  <Link to='/Payment' className='btnp btn-primary'>confirm payment</Link>

  </div>
  
{cartProducts.map(function(item,idx){
    return<div key={idx} className="row my-2 border-bottom border-3 p-2 align-items-center">
    <div className="col-sm-1">
        <img src={item.product.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-sm-9">
    <h2 className=' h6'>{item.product.title}</h2>
    <h5 className=' h6'>price:{item.price}</h5>
    <button onClick={()=>deleteElement(item.product.id)}  className='btnr '>Remove</button>
    
    </div>
    <div className="col-sm-2">
    <div className="d-flex align-items-center">
        <button onClick={()=>updateCountOnCart(item.product.id , item.count +1)}  className='btn btn-outline-success'>+</button>
        <span className=' mx-2'>{item.count}</span>
        <button  onClick={()=>updateCountOnCart(item.product.id , item.count -1)}   className='btn btn-outline-success'>-</button>
    </div>

    </div>
  </div> 
})} 
  </div>


  </div>
  </>
}
