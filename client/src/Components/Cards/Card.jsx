import React from 'react';
import { Link } from 'react-router-dom';


export default function Card ({image, name, temperament, weightMin, weightMax, id}) {
  return (
      <div >
            <div >
              <img src={image} alt="img not found" />
            </div>
        <div >
          <Link to={"/dogs/" + id}>
          <h3 >{name}</h3>
          </Link>
            <div>
              <p>Peso:</p>
              <p>{weightMin}-{weightMax} kg</p>
            </div>
            <div>
              <p>Temperamento: {function (temperament){
                if (typeof(temperament) === "string") return temperament
                if (Array.isArray(temperament)){
                  let temp = temperament.map(el => el.name);
                  return temp.join(', ');
                }}(temperament)}</p>
            </div>
        </div>
      </div>
    );
};


// className={contenedor}
// className={imagen}
// className={imagenperro}
// className={cardbody}
// className={cardtitle}
// className={heightMin}
// className={heightMax}

