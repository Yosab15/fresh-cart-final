import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Helmet } from 'react-helmet';

export default function FogetPassword() {

    const navi =useNavigate();
    const [errorMassage, setErrorMassage] = useState("")
    const[isLoading,setIsLoading]= useState(false);



    let validationSchema = yup.object({

        email: yup.string().required("email is required").email('enter valid emil'),
    })
   

    const forgetform=useFormik({
        initialValues:{
            email:""
        },
        validationSchema,
        onSubmit:sendForgitApi

    })
    async function sendForgitApi(val){
        // setIsLoading(true);

        try {
          let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,val)
          
          if(data.statusMsg==="success"){
             toast.success('email sent')
              document.getElementById('forgitForm').classList.add('d-none');
              document.getElementById('resetForm').classList.remove('d-none');
            }
  
          
        } catch (e) {
          console.log('error',e);
          
        }
      }




      let validationSchema2 = yup.object({

        resetCode: yup.string().required("resetCode is required").matches(/^[0-9]+$/, "Must be only digits")
    })
    const resetForm=useFormik({
        initialValues:{
            resetCode:""
        },
        validationSchema:validationSchema2,
        onSubmit:sendResetCode

    })
    async function sendResetCode(val){
        setIsLoading(true);
        
        try {
            let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,val)
            
            console.log(data); 

            if(data.status==="Success"){
                toast.success('code verified')
                navi('/Respassword')

            }
    
            
          } catch (e) {
            setErrorMassage(e.response.data.message)
            console.log('error',e.response.data.message);
            
          }

    }


   

  return <>

<Helmet>
  <title>forgotPasswords</title>
  <meta name="forgotPasswords" />
</Helmet>




<div id='forgitForm' className="all">
  <div  className="wrapper">
    <form action="" onSubmit={forgetform.handleSubmit}>
      <h1>forget password :</h1>
      <h1> Enter emil :</h1>
      
      <div className="input-box">
        <input onChange={forgetform.handleChange} onBlur={forgetform.handleBlur} type="text" id='email' name='email' placeholder="Email" required />
        <i class="fa-solid fa-envelope"></i>
       {forgetform.touched.email ? <p className=' text-danger'>{forgetform.errors.email}</p>:""}
      </div>

      
 
  <button type='success' disabled={!(forgetform.isValid&&forgetform.dirty)}  className='btn'>{isLoading? <FallingLines
  color="#4fa74f"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"send"}  </button>
    

    </form>
  </div>
  </div>
  

  {/* <div id='forgitForm' className=" container">
        <form onSubmit={forgetform.handleSubmit}>
        <h1>enter emil</h1>
        <input onChange={forgetform.handleChange} onBlur={forgetform.handleBlur} type="text" id='email' name='email' className=' form-control' />

        {forgetform.touched.email ? <p className=' text-danger'>{forgetform.errors.email}</p>:""}
        <button type='success' disabled={!(forgetform.isValid&&forgetform.dirty)} className='btn btn-success'>
            
        {isLoading? <FallingLines
  color="#fff"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"send"} 

            </button>
        </form>
  </div> */}


<div id='resetForm' className="all d-none">
  <div  className="wrapper">
    <form action=""  onSubmit={resetForm.handleSubmit}>
      <h1>forget password :</h1>
      <h1>enter resetCode :</h1>
      {errorMassage?<div className="alert alert-danger">{errorMassage}</div>:""}
      
      <div className="input-box">
        <input onChange={resetForm.handleChange} onBlur={resetForm.handleBlur} type="text" id='resetCode' name='resetCode' placeholder="ResetCode" required />
        <i class="fa-regular fa-envelope-open"></i>
        {resetForm.touched.resetCode ? <p className=' text-danger'>{resetForm.errors.resetCode}</p>:""}
      </div>

      
 
  <button type='success' disabled={!(resetForm.isValid&&resetForm.dirty)}  className='btn'>{isLoading? <FallingLines
  color="#4fa74f"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:"verify Code"}  </button>
    

    </form>
  </div>
  </div>


  {/* <div id='resetForm' className="container d-none">
  <div className="my-3">
         <h1>enter resetCode</h1>
         {errorMassage?<div className="alert alert-danger">{errorMassage}</div>:""}
         <form onSubmit={resetForm.handleSubmit}>
        <input onChange={resetForm.handleChange} onBlur={resetForm.handleBlur}  type="text" id='resetCode' name='resetCode' className=' form-control' />

        {resetForm.touched.resetCode ? <p className=' text-danger'>{resetForm.errors.resetCode}</p>:""}

        <button type='success' disabled={!(resetForm.isValid&&resetForm.dirty)} className='btn btn-success'>
            
        {isLoading? <FallingLines
  color="#fff"
  width="50"
  visible={true}
  ariaLabel='falling-lines-loading'
/>:" verify Code"} 
           </button>
        </form>

  </div>
  </div> */}


  </>
}
