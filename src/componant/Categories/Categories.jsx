import axios from 'axios';
import React from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import './Categories.css'
import { Helmet } from 'react-helmet';


export default function Categories() {


  async function getAllCategories() {
      try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        return data;
      } catch (e) {
        console.log('error', e);
        
      }
   }
   const{isError,isFetching,isLoading,data }= useQuery('AllCategories',getAllCategories,{
    // zrar al Get prodact bnsta5dem refetch fo2
    // enabled:false,
   })
    console.log(isError,isFetching);
    console.log(data?.data);

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
    function allCatrgoryAlert(categoryName,categoryImage){
      Swal.fire({
        imageUrl: categoryImage,
        imageHeight: 150,
         title: categoryName, color:'#4fa74f',
      })
     }
  return <>
  {/* <h1 className=' text-center main-color p-5'>All Brandes</h1> */}


  <Helmet>
  <title>categories</title>
  <meta name="categories" />
</Helmet>


  <div className=" container py-3 ">
    <div className="row " >
      {data?.data.map((Categorie,idx)=>{
        return <div key={idx} className="col-4 py-2" >
        <div onClick={()=>allCatrgoryAlert(Categorie.name,Categorie.image)}  className="card w-100 " >
        <img src={Categorie.image} className="card-img-top"  style={{height:"300px",objectPosition:"center",objectFit:"cover"}} alt="..." />  
        <div className="card-body">
          <h3 className="card-title text-center" style={{color:"#4fa74f"}}>{Categorie.name}</h3>
          {/* <p className="card-text text-center">{brand.description}</p> */}
        </div>
      </div>
      </div>
      }
      )}
     
  
    </div>
  </div>
  </>


 
}


