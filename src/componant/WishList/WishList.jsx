import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './WishList.css'
import { Helmet } from 'react-helmet';

export default function WishList() {
    const {wishlistProducts,deleteProductFromWishList,addProdactToCart}=useContext(cartContext);
    console.log(wishlistProducts);
    
    async function addProduct(id){
        const res= await addProdactToCart(id)
      
        if(res.status === "success"){
          toast.success(res.message,{
            position: "top-center",
            duration: 2000,
          })   // alert('Product Added to cart')
      }
      else{
        toast.error("error happend",{
          position: "top-center",
          duration: 2000,
        })
      }
       
      }

    if(wishlistProducts ===null){
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

       if(wishlistProducts.length===0){
        return<>

<Helmet>
  <title>wishlist</title>
  <meta name="wishlist" />
</Helmet>
<div className="all">
        <div className="vh-100 d-flex align-items-center justify-content-center">
        <h2>Wish List is empty </h2>
        <h1 className='tzbet' > <Link to="/Products">Get some Products ...</Link> </h1>
        </div>
        </div>
        </>
       }
       async function deleteElementFromWish(id){
        const res= await deleteProductFromWishList(id);
     
         if(res.status==="success"){
            toast.success("product deleted successfully");
         }else{
             toast.error("something went wrong");
         }
     
        }

        console.log(wishlistProducts);
    
    return<>
    
    <Helmet>
  <title>wishlist</title>
  <meta name="wishlist" />
</Helmet>

<div className="all">
    
     <div s className=' container py-5 wrapper'>
    <h2>my wish list:</h2> 
 
  <div className="d-flex justify-content-between"></div>
  
{wishlistProducts.map(function(item,idx){
    return<div key={idx} className="row my-2 border-bottom border-3 p-3 align-items-center">
    <div className="col-sm-2">
        <img src={item.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-sm-8">
    <h2 className=' h6'>{item.title}</h2>
    <h5 className=' main-color h6'>price:{item.price}</h5>
    <button onClick={()=>deleteElementFromWish(item.id)}  className='btnr btn-outline-danger'>Remove</button>
    
    </div>
    <div className="col-sm-2">
    <div className="d-flex align-items-center">
        <button onClick={()=>addProduct(item.id)} className='btnb btn-outline-success '><h5>Add to cart</h5></button>
    </div>

    </div>
  </div> 
})}

  
  </div>
  </div>
  </>

}
