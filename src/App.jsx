import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState,useEffect } from "react"
import { use } from "react"
import { db } from "./data/db"


function App() {


  const MAXITEMS=5

  //State
  const [data,setData]=useState(db) //El que modifica el estado es la variable de la derecha (setAuth)
  const [cart,setCart]=useState([])

  function addToCart(item){

    const itemExists=cart.findIndex(guitar=>guitar.id===item.id)

    if(itemExists>=0){//existe en el carrito
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


  return (
    <>


     <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
     />   {/*Invocacion del componente */}
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
      {/* Un prop es la manera en la que se comunican entre si los diferentes componentes de react */}
          {data.map((guitar)=>( 
             <Guitar 
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
             />
          ))}
         
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
