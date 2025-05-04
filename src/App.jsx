import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState,useEffect } from "react"
import { use } from "react"
import { db } from "./data/db"


function App() {


  //State
  const [auth,setAuth]=useState(false) //El que modifica el estado es la variable de la derecha (setAuth)

  const [data,setData]=useState(db)


  return (
    <>
     <Header />   {/*Invocacion del componente */}
    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
      {/* Un prop es la manera en la que se comunican entre si los diferentes componentes de react */}
          {data.map((guitar)=>( 
             <Guitar 
              key={guitar.id}
              guitar={guitar}
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
