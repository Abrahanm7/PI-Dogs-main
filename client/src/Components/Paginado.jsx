import React from "react";

export default function Paginado({perrosPorPagina, allDogs, paginado}){
    const numeroPagina = []

    for (let i = 1 ; i < Math.ceil(allDogs/perrosPorPagina) + 1; i++){
        numeroPagina.push(i)
    }

    return (
        <nav>
            <ul>
                {numeroPagina && numeroPagina.map(
                    numero => {return (
                        <li>
                            <a onClick={()=> paginado(numero)}>{numero}</a>
                        </li>
                    )}
                )}
            </ul>
        </nav>
    )
}