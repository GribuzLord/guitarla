import { useState,useEffect,useMemo } from "react"
import { db } from "../data/db"

export const useCart=()=>{

    const initialCart = () => {
        const localStorageCart=localStorage.getItem('cart') //Busca en local storage
        return localStorageCart ? JSON.parse(localStorageCart) : [] //Si tiene algo convierte ese valor y si no el valor inicial esta vacio
    }
    
      //State
    const [data]=useState(db) //El que modifica el estado es la variable de la derecha (setAuth)
    const [cart,setCart]=useState(initialCart)
    
    const MAXITEMS=5
    
    useEffect(()=>{//Similar a la funcion watch, va a ejecutar lo que este dentro cada que detecte cambios en cierto componente
        localStorage.setItem('cart',JSON.stringify(cart));
    },[cart])
    
    
    
    function addToCart(item){
    
        const itemExists=cart.findIndex(guitar=>guitar.id===item.id)
        
        if(itemExists>=0){//existe en el carrito
            if(cart[itemExists].quantity>=MAXITEMS) return
            const updatedCart=[...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        
            }else{
            item.quantity=1
            setCart([...cart,item])
            }
    }
    
    function removeFromCart(id){
        setCart(prevCart=>prevCart.filter(guitar=>guitar.id!==id))
    }
    
    function increaseQuantity(id){
        const updatedCart=cart.map(item=>{
        if(item.id===id && item.quantity<MAXITEMS){
            return{
              ...item,
              quantity:item.quantity+1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id){
        const updatedCart=cart.map(item=>{
          if(item.id===id && item.quantity>1){
            return{
              ...item,
              quantity:item.quantity-1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart(e){
        setCart([])
      }

        //State derivado
        const isEmpty =useMemo( () => cart.length === 0,[cart])
        const cartTotal=useMemo(()=>cart.reduce((total,item)=>total+(item.quantity*item.price),0),[cart])
    
    

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

