import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import d from "./DogCreate.module.css";


export default function DogCreate() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperament);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const validate = function (input) {
    const errors = {};
    if (!input.name) {
      errors.name = "Nombre debe ser ingresado";
    } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = "Solo puede ingresar letras y espacios";
    }
    if (!input.heightMin) {
      errors.heightMin = "Se debe ingresar la altura minima";
    }
    if (input.heightMin.length > 4 ) {
      errors.heightMin = "Altura maxima de 9999cm";
    }
    if (!input.heightMax) {
      errors.heightMax = "Se debe ingresar la altura maxima";
    }
    if (input.heightMax.length > 4 ) {
      errors.heightMax = "Altura maxima de 9999cm";
    }
    if (!input.weightMin) {
      errors.weightMin = "Se debe ingresar el peso minimo";
    }
    if (!input.weightMax) {
      errors.weightMax = "Se debe ingresar el peso maximo";
    }
    if (input.weightMax.length > 4) {
      errors.weightMax = "Peso maximo 9999kg";
    }
    if (input.weightMin.length > 4) {
      errors.weightMin = "Peso maximo 9999kg";
    }
    if (input.heightMin < 0) {
      errors.heightMin = "La altura minima debe ser mayor que 0";
    }
    if (parseInt(input.heightMin) > parseInt(input.heightMax)) {
      errors.heightMax = "Altura minima deberia ser menor que la altura maxima";
    }
  
    if (input.heightMax < 0) {
      errors.heightMax = "La altura maxima debe ser mayor que 0";
    }
  
    if (input.weightMin < 0) {
      errors.weightMin = "El peso minimo debe ser mayor que 0";
    }
    if (parseInt(input.weightMin) > parseInt(input.weightMax)) {
      errors.weightMax = "Peso maximo deberia ser mayor que el peso minimo";
    }
    if (input.weightMax < 0) {
      errors.weightMax = "Peso maximo debe ser mayor que 0";
    }
    if (!/[0-9]/.test(input.weightMin)) {
      errors.weightMin = "Solo se puede ingresar numeros";
    } 
    if (!/[0-9]/.test(input.weightMax)) {
      errors.weightMax = "Solo se puede ingresar numeros";
    }
    if (input.life_span < 0) {
      errors.lifes_pan = "Debe ser mayor que 0";
    }
    if (!/[0-9]/.test(input.life_span)) {
      errors.lifes_pan = "Solo se puede ingresar numeros";
    } else if (
      !input.image.length > 0 ||
      !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ) {
      errors.image = "Solo se puede ingresar una url";
    }
    return errors;
  };

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function reload() {
    window.location.href = window.location.href;
  }

  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      errors.name ||
      errors.heightMin ||
      errors.heightMax ||
      errors.weightMin ||
      errors.weightMax ||
      errors.life_span ||
      errors.image ||
      input.name === "" ||
      input.heightMin === "" ||
      input.heightMax === "" ||
      input.weightMin === "" ||
      input.weightMax === "" ||
      input.life_span === "" ||
      input.image === ""
    ) {
      alert("No se puede crear, faltan campos por rellenar");
    } else {
      dispatch(postDogs(input));
      alert("Creado con exito");
      setInput({
        ...input,
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        temperament: [],
        image: "",
      });
      history.push("/home");
      reload();
    }
  }
  function handleDeleteTemperament(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={d.contenedor}>
      <Link to="/home">
        <button className={d.filt}>Volver</button>
      </Link>
      <h1>Crea tu perro</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={d.form}>
          <div className={d.contfilt}>
            <label>Nombre:</label>
            <input
              className={d.inp}
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              placeholder="Nombre"
            />
            {errors.name && <p className={d.error}>{errors.name}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Peso mínimo:</label>
            <input
              className={d.inp}
              type="text"
              value={input.weightMin}
              name="weightMin"
              onChange={handleChange}
              placeholder="Kg"
            />
            {errors.weightMin && <p className={d.error}>{errors.weightMin}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Peso máximo:</label>
            <input
              className={d.inp}
              type="text"
              value={input.weightMax}
              name="weightMax"
              onChange={handleChange}
              placeholder="Kg"
            />
            {errors.weightMax && <p className={d.error}>{errors.weightMax}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Altura mínima:</label>
            <input
              className={d.inp}
              type="number"
              value={input.heightMin}
              name="heightMin"
              onChange={handleChange}
              placeholder="Cm"
            />
            {errors.heightMin && <p className={d.error}>{errors.heightMin}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Altura máxima:</label>
            <input
              className={d.inp}
              type="number"
              value={input.heightMax}
              name="heightMax"
              onChange={handleChange}
              placeholder="Cm"
            />
            {errors.heightMax && <p className={d.error}>{errors.heightMax}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Esperanza de vida:</label>
            <input
              className={d.inp}
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
              placeholder="Años"
            />
            {errors.life_span && <p className={d.error}>{errors.life_span}</p>}
          </div>
          <div className={d.contfilt}>
            <label>Imagen:</label>
            <input
              className={d.inp}
              type="text"
              value={input.image}
              name="image"
              onChange={handleChange}
              placeholder="URL"
            />
            {errors.image && <p className={d.error}>{errors.image}</p>}
          </div>
          <select className={d.contfilt} onChange={(e) => handleSelect(e)}>
            <option value="selected" hidden>
              Temperaments
            </option>
            {temperamentos?.map((el) => {
              return (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {input.temperament.map((el) => {
            return (
              <ul key={el}>
                <li className={d.lista}>
                  <button
                    className={d.filt}
                    onClick={() => handleDeleteTemperament(el)}
                  >
                    {el}
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
        <button className={d.filt} type="submit">
          Crear Perro
        </button>
      </form>
    </div>
  );
}
