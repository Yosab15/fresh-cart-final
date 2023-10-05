import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext= createContext();

export function CartContextProvider({children}){

    const [cartProducts, setCartProduct] = useState(null)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [wishlistProducts, setWishlistProduct] = useState(null)
    const [cartId, setcartId] = useState(null)

    async function getUserCart(){
        try {
        const {data}=  await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {headers:{token:localStorage.getItem('tkn')}});
        setNumOfCartItems(data.numOfCartItems)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartProduct(data.data.products)
        setcartId(data.data._id)
    } catch (e) {
    console.log("error",e);   
    }
    }
    async function getUserWishList(){
        try {
        const {data}=  await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {headers:{token:localStorage.getItem('tkn')}});
        setWishlistProduct(data.data)
    } catch (e) {
    console.log("error",e);   
    }
    }
  
    useEffect(function(){
        getUserCart();
        getUserWishList();
    },[]);
   

    async function addProdactToCart(productId)
    {
        try {
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {"productId": productId}
,{headers:{token:localStorage.getItem('tkn')}});

    getUserCart();
// setNumOfCartItems(data.numOfCartItems)
// setTotalCartPrice(data.data.totalCartPrice)
// setCartProduct(data.data.products)

return data;

        } catch (error) {
    console.log(error);
    
    }
        
    }
    async function addProdactToWishList(productId){
        try {
            const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {"productId": productId},
        {headers:{token:localStorage.getItem('tkn')}})
        getUserWishList();
        return data;
        } catch (e) {
            console.log("error",e);
        }
    }
    async function deleteProductFromWishList(productId){
        try {
           const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {headers:{token:localStorage.getItem('tkn')}})
            getUserWishList();
            // setWishlistProduct(data.data)
            return data;
            
        }catch (e) {
            console.log("error",e);
            
        }

        }
   

       async function deleteProduct(productId){
        try {
           const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {headers:{token:localStorage.getItem('tkn')}})
           
            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProduct(data.data.products)
            return data;
            
        }catch (e) {
            console.log("error",e);
            
        }

        }

        async function clearCard(){
            try {
               const {data} =  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {headers:{token:localStorage.getItem('tkn')}})
               
                setNumOfCartItems(0)
                setTotalCartPrice(0)
                setCartProduct([])
                return data;
                
            }catch (e) {
                console.log("error",e);
                
            }
    
            }

       async function updateCount(productId,count){
         try {
            const {data} =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {"count": count},{headers:{token:localStorage.getItem('tkn')}})
            
            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProduct(data.data.products) 
            return data;

         } catch (e) {
            console.log("error",e);
            
         }
        }


    return<cartContext.Provider value={{ getUserCart, getUserWishList,
    deleteProductFromWishList,
    addProdactToCart,
    deleteProduct,
    addProdactToWishList,
    updateCount,
    clearCard,
    cartProducts ,
    totalCartPrice ,
    numOfCartItems ,
    cartId,
    wishlistProducts,
    setWishlistProduct,
    setNumOfCartItems,
    setTotalCartPrice,
    setCartProduct,
    }}>


    {children}
    
    </cartContext.Provider>

}