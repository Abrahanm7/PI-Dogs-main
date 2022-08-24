import React from "react";

export default function Paginado({perrosPorPagina, allDogs, paginado}){
    const numeroPagina = []

    for (let i = 0 ; i < Math.ceil(allDogs/perrosPorPagina); i++){
        numeroPagina.push(i+1)
    }

    return (
        <nav>
            <ul>
                {numeroPagina && numeroPagina.map(
                    numero =>  (
                        <li key={numero}>
                            <a onClick={()=> paginado(numero)}>{numero}</a>
                        </li>
                    )
                )}
            </ul>
        </nav>
    )
}