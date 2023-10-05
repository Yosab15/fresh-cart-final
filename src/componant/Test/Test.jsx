import React from 'react'
// import { authContext } from '../../Context/authentication';
import { Navigate } from 'react-router-dom';


export default function ProtectedRout({children}) {

// const{token}=useContext(authContext);


// if (token === null) {
//     return <Navigate to="/Login" />
// }

if (localStorage.getItem('tkn') === null) {
    return <Navigate to="/Login" />
}

  return <>
  {children}
  </>
}
