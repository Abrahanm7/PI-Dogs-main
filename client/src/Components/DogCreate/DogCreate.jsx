import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!/^[A-Z]+$/i.test(input.name)) {
    errors.name = "Sólo se puede insertar caracteres de la a-z";
  } else if (!/[0-9]/.test(input.weightMin)) {
    errors.weightMin = "Solo se puede ingresar numeros";
  } else if (!/[0-9]/.test(input.weightMax)) {
    errors.weightMax = "Solo se puede ingresar numeros";
  } else if (input.weightMin > input.weightMax) {
    errors.weightMax = "Debe ser mayor que el peso mínimo";
  } else if (!/[0-9]/.test(input.heightMin)) {
    errors.heightMin = "Se requiere una altura mínima";
  } else if (!/[0-9]/.test(input.heightMax)) {
    errors.heightMax = "Se requiere una altura máxima";
  } else if (input.heightMin > input.heightMax) {
    errors.heightMax = "Debe ser mayor que la altura mínima";
  } else if (!/[0-9]/.test(input.life_span)) {
    errors.life_span = "Se requiere una esperanza de vida";
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperament);
  const history = useHistory();
  const [errors, setErrors] = useState({});

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
      input.name === "" ||
      input.heightMin === "" ||
      input.heightMax === "" ||
      input.weightMin === "" ||
      input.weightMax === "" ||
      input.life_span === ""
    ) {
      alert("No se puede crear, faltan campos por rellenar");
      reload();
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
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu perro</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Peso mínimo:</label>
          <input
            type="number"
            value={input.weightMin}
            name="weightMin"
            placeholder="12"
            onChange={handleChange}
          />
          {errors.weightMin && <p>{errors.weightMin}</p>}
        </div>
        <div>
          <label>Peso máximo:</label>
          <input
            type="number"
            value={input.weightMax}
            name="weightMax"
            onChange={handleChange}
          />
          {errors.weightMax && <p>{errors.weightMax}</p>}
        </div>
        <div>
          <label>Altura mínima:</label>
          <input
            type="number"
            value={input.heightMin}
            name="heightMin"
            onChange={handleChange}
          />
          {errors.heightMin && <p>{errors.heightMin}</p>}
        </div>
        <div>
          <label>Altura máxima:</label>
          <input
            type="number"
            value={input.heightMax}
            name="heightMax"
            onChange={handleChange}
          />
          {errors.heightMax && <p>{errors.heightMax}</p>}
        </div>
        <div>
          <label>Esperanza de vida:</label>
          <input
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={handleChange}
          />
          {errors.life_span && <p>{errors.life_span}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <select onChange={(e) => handleSelect(e)}>
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
              <li>
                <p>
                  <strong>{el}</strong>
                </p>
                <button onClick={() => handleDeleteTemperament(el)}>X</button>
              </li>
            </ul>
          );
        })}
        <button type="submit">Crear Perro</button>
      </form>
    </div>
  );
}
