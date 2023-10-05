import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner';
import {  useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { Helmet } from 'react-helmet';

export default function Respassword() {
    const[isLoading,setIsLoading]= useState(false);
    const nav =useNavigate();

    const validationSchema = yup.object({
        email: yup.string().required("email is required").email('enter valid emil'),
        newPassword: yup.string().required("newPassword is required").min(8, "password must be at least 8 characters").max(15, "password must be at most 15 characters"),
    })
    const repasswordForm= useFormik({

        initialValues:{
            email:"",
            newPassword:""
        },
        validationSchema,
        onSubmit:resetPassword
        
    })
    async function resetPassword(val){
        setIsLoading(true);

       let{data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,val)
        console.log(data);
        if(data.token){
            toast.success('password reseted')
            nav('/Login')
        }
        
    }

  return <>

  
<Helmet>
  <title>Repassword</title>
  <meta name="Repassword" />
</Helmet>


<div className="all">
  <div className="wrapper">
    <form action="" onSubmit={repasswordForm.handleSubmit}>
      <h1>Add new password:</h1>
      <div className="input-box">
        <input onChange={repasswordForm.handleChange} onBlur={repasswordForm.handleBlur}id='email' type="email" name='email' placeholder="Email" required />
        <i class="fa-solid fa-envelope"></i>
       {repasswordForm.errors.email && repasswordForm.touched.email ?<p className=' text-danger'>{repasswordForm.errors.email}</p>:""}
      </div>

      <div className="input-box">
        <input onChange={repasswordForm.handleChange} onBlur={repasswordForm.handleBlur} id='newPassword' name='newPassword' type="password" placeholder="newPassword" required />
        <i className=' fa-solid fa-lock'></i>
        {repasswordForm.errors.password && repasswordForm.touched.password ?<p className=' text-danger'>{repasswordForm.errors.newPassword}</p>:""}
      </div>
  
  <button disabled={repasswordForm.isValid===false||repasswordForm.dirty===false } type='submit' className='btn'>{isLoading? <FallingLines
  color="#4fa74f"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"reset password"}  </button>
    

    </form>
  </div>
  </div>








  {/* <div className=" container">
  <form onSubmit={repasswordForm.handleSubmit}>
        <label htmlFor="email">email</label>
        <input onChange={repasswordForm.handleChange} onBlur={repasswordForm.handleBlur} type="emil" className=' form-control'name='email' id='email' />
        <p className=' text-danger'>{repasswordForm.errors.email}</p>

        <label htmlFor="newPassword">newPassword</label>
        <input onChange={repasswordForm.handleChange} onBlur={repasswordForm.handleBlur} type="password" className=' form-control'name='newPassword' id='newPassword' />
        <p className=' text-danger'>{repasswordForm.errors.newPassword}</p>
        <button type='success' className='btn btn-success'>
        {isLoading? <FallingLines
    color="#fff"
    width="50"
    visible={true}
    ariaLabel='falling-lines-loading'
        />:" reset password"} 
            </button>

    </form>
  </div> */}
  
  
  
  
  </>
}
