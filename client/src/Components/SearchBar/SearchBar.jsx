import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Actions";
import s from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleImputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByName(search));
  };

  return (
    <div className={s.contenedor}>
      <input
        className={s.inp}
        type="text"
        placeholder="Buscar por nombre..."
        onChange={(e) => handleImputChange(e)}
      />
      <button className={s.butt} type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
