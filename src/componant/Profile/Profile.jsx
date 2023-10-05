import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


export default function Profile() {
  const [name, setname] = useState(null)

  useEffect(() => {

   const x= jwtDecode(localStorage.getItem("tkn"));
console.log(x);

setname(x.name);
  }, [])

  if(name===null){
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



  return <>

<Helmet>
  <title>profile</title>
  <meta name="profile" />
</Helmet>


<div className="all">
  <div className=" container">
  <div className="vh-100 d-flex align-items-center justify-content-center " >
    <h1 >Hello ya <span className=' main-color'> {name} </span></h1>



    </div>
    </div>

 
    

    </div>
    </>
}
