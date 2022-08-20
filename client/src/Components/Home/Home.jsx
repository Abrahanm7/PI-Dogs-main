import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterCreate, getDogs, orderAlf } from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import Paginado from "../Paginado";


export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.dogs);
    const [orden, setOrden] = useState("") 
    const [paginaActual, setPaginaActual] = useState(1);
    const [perrosPorPagina, setPerrosPorPagina] = useState(8);
    const indiceUltimoPerro = paginaActual * perrosPorPagina;
    const indicePrimerPerro = indiceUltimoPerro - perrosPorPagina;
    const perrosActuales = allDogs.slice(indicePrimerPerro, indiceUltimoPerro);
    const paginado = (numeroPagina) => {
        setPaginaActual(numeroPagina)
    }


    useEffect(()=> {
        dispatch(getDogs());
    },[dispatch])


    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs()); 
    }


    function handleFilterCreated(e){
        dispatch(filterCreate(e.target.value))
    }


    function handleOrdenAlf(e){
        e.preventDefault()
        dispatch(orderAlf(e.target.value))
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
        <Link to="/dogs">Crear Perro</Link>
        <h1>Huellitas</h1>
        <button onClick={e => {handleClick(e)}}>Recargar</button>
        <div>
            <div>
            <select onChange={e => handleOrdenAlf(e)} >
                <option value="asc">Ascendente a descendente</option>
                <option value="desc">Descendente a ascendente</option>
            </select>
            </div>
            <div>
            <select >
                <option value="menorPeso-mayorpeso">Menor peso a mayor peso</option>
                <option value="mayorpeso-menorPeso">Mayor peso a menor peso</option>
            </select>
            </div>
            <div>
            <select >
                <option value=""></option>
            </select>
            </div>
            <div>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="Todos">Todos</option>
                <option value="api">Existentes</option>
                <option value="dataB">Creados</option>
            </select>
            <Paginado
            perrosPorPagina={perrosPorPagina}
            allDogs={allDogs.length}
            paginado={paginado}
            />
            {
                perrosActuales && perrosActuales.map((el) => {
                    return (
                        <Card name = {el.name} image={el.image} temperament={el.temperament} weightMin={el.weightMin} weightMax={el.weightMax}  id= {el.id}/>
                    )
                })
            }     
            </div>
        </div>
        </div>
    )

}