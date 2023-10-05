import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import './Register.css'
import { Helmet } from 'react-helmet';



export default function Register() {

const[errmsg,setErrMsg]= useState(null);
const[successmsg,setSuccessMsg]= useState(null);
const[isLoading,setIsLoading]= useState(false);

const navigate =useNavigate();

let user={
  name: "",
  email:"",
  password:"",
  rePassword:"",
  phone:""
}

 async function registernewuser(values){
  setIsLoading(true);
  console.log( "sending to back end");
  
  try {
    const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    console.log(data);
    if(data.message==="success"){
      setSuccessMsg("register success")
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      
    }


  } catch (error) {
    
    console.log(error.response.data.message);
    setErrMsg(error.response.data.message)
  }
  setIsLoading(false);
}


const formikObj=useFormik({

 initialValues:user,
  onSubmit:registernewuser,

  validate:function(values){
   setErrMsg(null);

    let errors={};
    if(values.name.length<4 || values.name.length>15){
    errors.name='name must be more than 4 char'
    }
    if(values.email.includes('@')===false||values.email.includes('.')===false){
      errors.email='email must be valid'
    }
    if(!values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
      errors.phone='phone must be valid'
    }
    if(values.password.length<8||values.password.length>15){
      errors.password='password must be more than 8 char '
    }
    if(values.rePassword!==values.password){
      errors.rePassword='password must be match'
    }
       

  console.log(errors);
    return errors;
  }

})

  return<>

<Helmet>
  <title>register</title>
  <meta name="register" />
</Helmet>


  {errmsg?<div className="alert alert-danger">{errmsg}</div>:""}
    {successmsg?<div className="alert alert-success">{successmsg}</div>:""}
  <div className="all">
  <div className="wrapper">
    <form action="" onSubmit ={ formikObj.handleSubmit }>
      <h1>register now: </h1>
      <div className="input-box">
        <input onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange}id='name' type="name" name='name' placeholder="name" required />
       <i className=' fa fa-user'></i>
       {formikObj.errors.name && formikObj.touched.name ?<p className=" text-danger"> {formikObj.errors.name} </p>:""}
      </div>
      <div className="input-box">
        <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange}id='email' type="email" name='email' placeholder="Email" required />
        <i class="fa-solid fa-envelope"></i>
       {formikObj.errors.email && formikObj.touched.email ?<p className=" text-danger"> {formikObj.errors.email} </p>:""}
      </div>

      <div className="input-box">
        <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.password } id='password' name='password' type="password" placeholder="Password" required />
        <i className=' fa-solid fa-lock'></i>
        {formikObj.errors.password && formikObj.touched.password ?<p className=" text-danger"> {formikObj.errors.password} </p>:""}
      </div>
      <div className="input-box">
        <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.rePassword } id='rePassword' name='rePassword' type="password" placeholder="RePassword" required />
        <i className=' fa-solid fa-lock'></i>
        {formikObj.errors.rePassword && formikObj.touched.rePassword ?<p className=" text-danger"> {formikObj.errors.rePassword} </p>:""}
      </div>
      <div className="input-box">
        <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.phone } id='phone' name='phone' type="phone" placeholder="phone" required />
        <i class="fa-solid fa-phone"></i>
        {formikObj.errors.phone && formikObj.touched.phone ?<p className=" text-danger"> {formikObj.errors.phone} </p>:""}
      </div>
  <button disabled={formikObj.isValid===false||formikObj.dirty===false } type='submit' className='btn'>{isLoading? <FallingLines
  color="#4fa74f"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"Register"}  </button>
    

    </form>
  </div>
  </div>




  

  {/* <div className=' w-75 m-auto py-5'>
    {errmsg?<div className="alert alert-danger">{errmsg}</div>:""}
    {successmsg?<div className="alert alert-success">{successmsg}</div>:""}

  <h2>register now:</h2>
  
    <form onSubmit ={ formikObj.handleSubmit } >
    
    <label htmlFor="name">Name:</label>
    <input  onBlur={formikObj.handleBlur}  onChange={ formikObj.handleChange } value={ formikObj.values.name } id='name' name='name' type="text" placeholder="Name" className=' form-control mb-3' />
    {formikObj.errors.name && formikObj.touched.name ?<div className="alert alert-danger ">{formikObj.errors.name}</div>:""}

    <label htmlFor="email">Email:</label> 
    <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange}  id='email' type="email" name='email' placeholder="Email" className=' form-control mb-3' />
    {formikObj.errors.email && formikObj.touched.email ?<div className="alert alert-danger ">{formikObj.errors.email}</div>:""}

    <label htmlFor="password">Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.password }  id='password' name='password' type="password" placeholder="Password" className=' form-control mb-3' />
    {formikObj.errors.password && formikObj.touched.password ?<div className="alert alert-danger ">{formikObj.errors.password}</div>:""}

    <label htmlFor="rePassword">Repassword:</label>
    <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.rePassword }  id='rePassword' name='rePassword' type="password" placeholder="Repassword" className=' form-control mb-3' />
    {formikObj.errors.rePassword && formikObj.touched.rePassword ?<div className="alert alert-danger ">{formikObj.errors.rePassword}</div>:""}

    <label htmlFor="phone">Phone:</label>
    <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.phone } id='phone' name='phone' type="tel" placeholder="Phone" className=' form-control mb-3' />
    {formikObj.errors.phone && formikObj.touched.phone ?<div className="alert alert-danger ">{formikObj.errors.phone}</div>:""}

    <button type='submit' disabled={formikObj.isValid===false||formikObj.dirty===false } className=' btn btn-success'>
      
      {isLoading? <FallingLines
  color="#fff"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"Register"} 
      
      </button>
  </form>
  </div> */}
  </>

}

