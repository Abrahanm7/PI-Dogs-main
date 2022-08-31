import React from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDetail, reload } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import d from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  console.log(props);
  const id = props.location.pathname.split("/")[2];
  const history = useHistory()

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(reload([]));
  }, [dispatch, id]);

  const dogId = useSelector((state) => state.details);

  return (
    <div className={d.cont}>
      {dogId.length === 0 ? 
        <img
          src="https://acegif.com/wp-content/uploads/gif/dog-chasing-tail-41.gif"
          alt="img not found"
        />
       : (
        <div className={d.contenedor}>
          <img className={d.image} src={dogId[0].image} alt="Img not found" />
          <h3>{dogId[0].name}</h3>
          <p>
            Peso: {dogId[0].weightMin} - {dogId[0].weightMax} Kg
          </p>
          <p>
            Altura: {dogId[0].heightMin} - {dogId[0].heightMax} Cm
          </p>
          <p>
            Temperamento:{" "}
            {dogId[0].createdInDb
              ? dogId[0].temperament.map((e) => e.name).join(", ")
              : dogId[0].temperament}
          </p>
          <p>Esperanza de vida: {dogId[0].life_span}</p>
        </div>
      )}
      <Link to={"/home"}>
        <button className={d.filt}>Volver</button>
      </Link>
    </div>
  );
}
