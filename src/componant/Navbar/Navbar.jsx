import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoimg from '../../images/freshcart-logo.svg';
import { authContext } from '../../Context/authentication';
import { cartContext } from '../../Context/cartContext';


export default function Navbar() {


const{token,setToken}= useContext(authContext);
const{numOfCartItems} =  useContext(cartContext);
const navFunc= useNavigate();

function logout(){

localStorage.removeItem('tkn');
setToken(null);
navFunc('/Login');
}

  return<>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/Products">
      <img src={logoimg} alt="logoimg" />

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       {token?<> <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brandes">brandes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/WishList">WishList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AllOrders">AllOrders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart">
          <i className="fa-solid fa-cart-shopping main-color"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {numOfCartItems}
            <span className="visually-hidden">unread messages</span>
            </span>
            </Link>
        </li>
        
        </> :""}
       
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item">
      <a href="https://www.facebook.com/profile.php?id=100009523706210"><i className="fa-brands me-2 fa-facebook-f"></i></a>
      <i className="fa-brands me-2 fa-twitter"></i>
      <i className="fa-brands me-2 fa-whatsapp"></i>
         <a href="https://www.linkedin.com/in/yosab-mena-7783a8237"> <i className="fa-brands me-2 fa-linkedin"></i></a>
        </li>
        
        {token?<> <li className="nav-item">
          <Link className="nav-link" to="/Profile">Profile</Link>
        </li>
     
        <li className="nav-item">
          <span onClick={logout} style={{cursor:'pointer'}} className="nav-link">Logout</span>
        </li>
        </>: 
        <>
             <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        </>}

       
      </ul>
      
    </div>
  </div>
</nav>
  
  </>
}
