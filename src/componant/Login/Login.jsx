import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { authContext } from '../../Context/authentication';
import './Login.css'
import { Helmet } from 'react-helmet';



export default function Login() {
const[errmsg,setErrMsg]= useState(null);
const[successmsg,setSuccessMsg]= useState(null);
const[isLoading,setIsLoading]= useState(false);
const navigate =useNavigate();

const {setToken}= useContext(authContext);

let user={
  email:"",
  password:"",
}

 async function logInUser(values){
  setIsLoading(true);
  console.log( "sending to back end");
  
  try {
    const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    
    console.log(data);
    if(data.message==="success"){
      
      localStorage.setItem('tkn',data.token);
      setToken(data.token);


      setSuccessMsg("welcome back")
      setTimeout(() => {
        navigate('/Products')
      }, 1000);
      
    }


  } catch (error) {
  setErrMsg(error.response.data.message)
  }
  setIsLoading(false);
}



const formikObj=useFormik({

 initialValues:user,
  onSubmit:logInUser,

  validate:function(values){
   setErrMsg(null);

    let errors={};
   
    if(values.email.includes('@')===false||values.email.includes('.')===false){
      errors.email='email must be valid'
    }
    if(values.password.length<8||values.password.length>15){
      errors.password='password must be more than 8 char'
    }
    
       

  console.log(errors);
    return errors;
  }

})

  return<>

<Helmet>
  <title>log in</title>
  <meta name="log in" />
</Helmet>

  {errmsg?<div className="alert alert-danger">{errmsg}</div>:""}
    {successmsg?<div className="alert alert-success">{successmsg}</div>:""}
  <div className="all">
  <div className="wrapper">
    <form action="" onSubmit ={ formikObj.handleSubmit }>
      <h1>log In :</h1>
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
  <div className="remember-forget p-3">
      <Link to="/FogetPassword">forget password</Link>
      </div>
  <button disabled={formikObj.isValid===false||formikObj.dirty===false } type='submit' className='btn'>{isLoading? <FallingLines
  color="#4fa74f"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"Login"}  </button>
    <div className="register-link">
      <p>i donot have account <Link  to={'/Register'} >Register</Link></p>
    </div>

    </form>
  </div>
  </div>
  




  {/* <div className=' w-75 m-auto py-5'>
    {errmsg?<div className="alert alert-danger">{errmsg}</div>:""}
    {successmsg?<div className="alert alert-success">{successmsg}</div>:""}

  <h2>Login :</h2>
  
    <form onSubmit ={ formikObj.handleSubmit } >
    
    <label htmlFor="email">Email:</label> 
    <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange}  id='email' type="email" name='email' placeholder="Email" className=' form-control mb-3' />
    {formikObj.errors.email && formikObj.touched.email ?<div className="alert alert-danger ">{formikObj.errors.email}</div>:""}

    <label htmlFor="password">Password:</label>
    <input onBlur={formikObj.handleBlur} onChange={ formikObj.handleChange } value={ formikObj.values.password }  id='password' name='password' type="password" placeholder="Password" className=' form-control mb-3' />
    {formikObj.errors.password && formikObj.touched.password ?<div className="alert alert-danger ">{formikObj.errors.password}</div>:""}


    <div className="links d-flex justify-content-between">

    <button type='submit' disabled={formikObj.isValid===false||formikObj.dirty===false } className=' btn btn-success m-5'>
      
      {isLoading? <FallingLines
  color="#fff"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"Login"} 
      
      </button>
      <Link className=' main-color p-5'  to="/FogetPassword">forgit password</Link>
      <Link className=' main-color p-5'  to="/Register">Register</Link>
      </div>
  </form>
  </div> */}
  </>

}


