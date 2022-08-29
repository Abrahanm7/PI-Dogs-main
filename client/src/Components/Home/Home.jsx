import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreate,
  getDogs,
  orderAlf,
  ordenPeso,
  filterByTemp,
  getTemperaments,
} from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../Cards/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import h from "./Home.module.css";
import logo from "../../Imagenes/logo.png"

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperament);
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [perrosPorPagina] = useState(8);
  const indiceUltimoPerro = paginaActual * perrosPorPagina;
  const indicePrimerPerro = indiceUltimoPerro - perrosPorPagina;
  const perrosActuales = allDogs.slice(indicePrimerPerro, indiceUltimoPerro);
  const paginado = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    setPaginaActual(1);
    dispatch(filterByTemp(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreate(e.target.value));
  }

  function handleOrdenAlfabetico(e) {
    e.preventDefault();
    dispatch(orderAlf(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleOrdenPeso(e) {
    e.preventDefault();
    dispatch(ordenPeso(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  useEffect(() => {
    if (!allDogs[0]) {
      dispatch(getDogs());
    }
  }, [dispatch, allDogs]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={h.contenedor}>
      <div className={h.titulo}>
      <img src={logo} alt="" />
      <h1 className={h.title}>huellitas</h1>
      </div>
      <div className={h.search}>
        <SearchBar />
      </div>
      <div className={h.filtros}>
        <div className={h.filt}>
          <select
            className={h.botones}
            onChange={(e) => handleOrdenAlfabetico(e)}
          >
            <option value="asc">Ascendente a descendente</option>
            <option value="desc">Descendente a ascendente</option>
          </select>
        </div>
        <div className={h.filt}>
          <select
            className={h.botones}
            onChange={(e) => handleFilterTemperament(e)}
          >
            <option key={0} value="all">
              Temperamentos
            </option>
            {temperaments?.map((el) => {
              return (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={h.filt}>
          <select className={h.botones} onChange={(e) => handleOrdenPeso(e)}>
            <option value="menorPeso">Menor peso a mayor peso</option>
            <option value="mayorpeso">Mayor peso a menor peso</option>
          </select>
        </div>
        <div className={h.filt}>
          <select
            className={h.botones}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option value="Todos">Todos</option>
            <option value="api">Existentes</option>
            <option value="dataBase">Creados</option>
          </select>
        </div>
        <Link to="/dogs">
          <button className={h.filt}>Crear Perro</button>
        </Link>
        <button
          className={h.filt}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recargar
        </button>
      </div>
      <Paginado
        perrosPorPagina={perrosPorPagina}
        allDogs={allDogs.length}
        paginado={paginado}
        
      />
      <div className={h.cartas}>
        {perrosActuales &&
          perrosActuales.map((el) => {
            return (
              <div className={h.carta}>
                <Link className={h.carta} to={"/home/" + el.id}>
                  <Card
                    className={h.carta}
                    key={el.id}
                    name={el.name}
                    image={el.image}
                    temperament={el.temperament}
                    weightMin={el.weightMin}
                    weightMax={el.weightMax}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
