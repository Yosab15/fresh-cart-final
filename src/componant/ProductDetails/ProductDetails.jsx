import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Bars, ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'


export default function ProductDetails() {

const {addProdactToCart,addProdactToWishList}=  useContext(cartContext)

const [sendindLoader, setsendindLoader] = useState(false);


const {id}= useParams()

async function addProduct(id){
  setsendindLoader(true)
const res =  await addProdactToCart(id)

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
setsendindLoader(false)
// console.log(res);
}
async function addWishlist(id){
  const res= await addProdactToWishList(id)

  if(res.status === "success"){
    toast.success(res.message,{
      position: "top-center",
      duration: 2000,
    }) 
    
      document.getElementById("heart").style.color = "red";
    
    // alert('Product Added to cart')
}
else{
  toast.error("error happend",{
    position: "top-center",
    duration: 2000,
  })
}
 
}



function getProductDetails(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

}

  const {data,isLoading} = useQuery("ProductDetails",getProductDetails)
console.log(data?.data.data);

if(isLoading){

    return<div className="vh-100 d-flex align-items-center justify-content-center">

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


  return <>

<Helmet>
  <title>product Details</title>
  <meta name="product Details" />
</Helmet>
  
  
  <div className="container py-5">
    <div className="row align-items-center">
        <div className="col-md-3">
            <figure>
                <img className='w-100 ' src={data.data.data.imageCover} alt={data.data.data.title} />

            </figure>

        </div>
        <div className="col-md-9">
            <div className="Detdils text-center">
                <h1>{data.data.data.title}</h1>
                <p className=' text-muted'>{data.data.data.description}</p>
                <h5 className='main-color'>Price: {data.data.data.price} EGP</h5>
                {/* <p>{data.data.data.id}</p> */}
                <div className="icon ">
                <span onClick={()=>addWishlist(data.data.data.id)} id="heart" ><i className="fa-solid fa-heart h3"></i></span>
                </div>
                
                <button onClick={()=>addProduct(data.data.data.id)}   className='w-100 p-3 main-bg-color rounded-3 border text-white '>
                  
                  {sendindLoader ? 
                  <>
                   <Bars
                      height="50"
                      width="50"
                      color="#fff"
                      
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                  />
                  </>:"+Add To Cart"}
                  
                  </button>

                {/* <button className='w-100 p-3 rounded-3 border border-none main-bg-color'></button> */}

            </div>
        </div>
    </div>
  </div>
  
  </>
}
