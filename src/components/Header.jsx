
export default function Header(){

    const name="Dyl"
    const total=100

    return (//Lo que esta en el return se muestra en pantalla
        <>
            <p>Total a pagar es de: ${total}</p>
            <p>Despues {name}</p>
        </>
    )
}

