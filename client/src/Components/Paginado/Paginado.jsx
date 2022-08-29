import React from "react";
import p from "./Paginado.module.css";

export default function Paginado({ perrosPorPagina, allDogs, paginado }) {
  const numeroPagina = [];

  for (let i = 0; i < Math.ceil(allDogs / perrosPorPagina); i++) {
    numeroPagina.push(i + 1);
  }

  return (
    <nav>
      <ul className={p.paginas}>
        {numeroPagina &&
          numeroPagina.map((numero) => (
            <li className={p.lista} key={numero}>
              <button className={p.lista} onClick={() => paginado(numero)}>
                {numero}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
