
import axios from "axios";
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from "react-query";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorieSlider from "../CategorieSlider/CategorieSlider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";


export default function Products() {

  const{addProdactToCart,addProdactToWishList}= useContext(cartContext)

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
async function addWishlist(id){
  const res= await addProdactToWishList(id)

  if(res.status === "success"){
    toast.success(res.message,{
      position: "top-center",
      duration: 2000,
    }) 
    
      document.getElementById(id).style.color = "red";
    
    // alert('Product Added to cart')
}
else{
  toast.error("error happend",{
    position: "top-center",
    duration: 2000,
  })
}
 
}

// async function addWishList(id){
//   const res= await addProdactToWishlist(id)

//   if(res.status === "success"){
//     toast.success(res.message,{
//       position: "top-center",
//       duration: 2000,
//     }) 
//       document.getElementById("heart").style.color = "red";
//       console.log(res.data);
//       return res
// }
// else{
//   toast.error("error happend",{
//     position: "top-center",
//     duration: 2000,
//   })
// }
  
// }


function getAllProducts() {
 return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
 const{isError,isFetching,isLoading,data }= useQuery('AllProducts',getAllProducts,{
  // zrar al Get prodact bnsta5dem refetch fo2
  // enabled:false,
 })
  console.log(isError,isFetching);
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
  <title>products</title>
  <meta name="products" />
</Helmet>
  
  
  
   <div className="container py-5">
    <div className="row gx-0 mb-5">
    <div className="col-md-9"><HomeSlider/></div>
    <div className="col-md-3">
    <img style={{width:"100%",height:"200px"}} src={require('../../images/grocery-banner.png')} alt="slider" />
    <img style={{width:"100%",height:"200px"}} src={require('../../images/grocery-banner-2.jpeg')} alt="slider" />
    </div>
    </div>
    <CategorieSlider/>    
    
  {/* <div onClick={refetch} className="btn btn-success w-100"> Get Products..</div> */}
  
  <div className="row gy-4">
    {data?.data.data.map(function(product,idx){
      return<div key={idx} className="col-md-3">

       
        <div className="product">
        <Link to={`/ProductDetails/${product.id}`}>
          <img src={product.imageCover} className='w-100' alt="product" />
          <h6 className="main-color">{product.category.name}</h6>
          <h5>{product.title.split(' ').slice(0,2).join(" ")} </h5>
          <div className="d-flex justify-content-between align-items-center justify-content-center">
          <p>{product.price} EGP</p>
          <p> <span><i className="fa-solid fa-star star-color"></i> </span>{product.ratingsAverage}</p>
          </div>
          </Link>
          <div className="icon ">
          <span onClick={()=>addWishlist(product.id)} id={product.id} ><i className="fa-solid fa-heart h3"></i></span>
          </div>
          <button onClick={()=>addProduct(product.id)} className='w-100 p-1 main-bg-color rounded-3 border text-white '>+ADD to cart</button>
        </div>
       
      </div>
      

    })}
  </div>
</div>

    </>
}
