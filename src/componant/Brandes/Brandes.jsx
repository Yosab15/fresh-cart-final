import axios from 'axios';
import React  from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import './Brandes.css'
import { Helmet } from 'react-helmet';

export default function Brandes() {
  async function getAllBrands() {
      try {
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        return data;
      } catch (e) {
        console.log('error', e);
        
      }
   }
   const{isError,isFetching,isLoading,data }= useQuery('AllBrands',getAllBrands,{
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
     function allBrandsAlert(brandName,brandImage){
      Swal.fire({
        imageUrl: brandImage,
        imageHeight: 150,
         title: brandName, color:'#4fa74f',
      })
     }


   
  



  return <>

<Helmet>
  <title>Brandes</title>
  <meta name="Brandes" />
</Helmet>

  <h1 className=' text-center main-color p-5'>All Brandes</h1>
  <div className=" container ">
    <div className="row">
      {data?.data.map((brand,idx)=>{
        return <div key={idx} className="col-3 py-2">

        <div onClick={()=>allBrandsAlert(brand.name,brand.image)} className="card" style={{width: "18rem"}}>
        <img src={brand.image} className="card-img-top" alt="..." />  
        <div className="card-body">
          <h5 className="card-title text-center">{brand.name}</h5>
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
