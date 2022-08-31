import React from "react";
import { Link } from "react-router-dom";
import s from "./Cards.module.css";

export default function Card({
  id,
  image,
  name,
  temperament,
  weightMin,
  weightMax,
})
{
  return (
    <div className={s.contenedor}>
      <div className={s.cardbody}>
      <Link to={"/home/" + id}><img className={s.image} src={image} alt="img not found" /></Link>
        <h3 className={s.cardtitle}>{name}</h3>
        <div>
          <p className={s.heightMin}>
            Peso: {weightMin}-{weightMax} kg
          </p>
        </div>
        <div>
          <p>
            Temperamento:{" "}
            {(function (temperament) {
              if (typeof temperament === "string") return temperament;
              if (Array.isArray(temperament)) {
                let temp = temperament.map((el) => el.name);
                return temp.join(", ");
              }
            })(temperament)}
          </p>
        </div>
        <div>
        
      </div>        
      </div>
    </div>
  );
}
