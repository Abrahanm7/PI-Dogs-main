import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperaments } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
const axios = require("axios");

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Se requiere un Nombre";
    }else if (!input.weightMin){
        errors.weightMin = "Se requiere un peso minimo" 
    }else if (!input.weightMax){
        errors.weightMax = "Se requiere un peso maximo"
    }else if(input.weightMin > input.weightMax){
        errors.weightMin = "Debe ser menor que el peso maximo"
    }else if(input.weightMin > input.weightMax){
        errors.weightMax = "Debe ser mayor que el peso minimo"
    }else if (!input.heightMin){
        errors.heightMin = "Se requiere una altura minima" 
    }else if (!input.heightMax){
        errors.heightMax = "Se requiere una altura maxima"
    }else if (!input.life_span){
        errors.life_span = "Se requiere una esperanza de vida"
    }
    return errors;
}


export default function DogCreate(){
    const dispatch = useDispatch();
    const temperamentos = useSelector((state) => state.temperament)
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState ({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperament:[]
    })

    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }


    function handleSelect(e){ 
        if (!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament:[...input.temperament,e.target.value]
            });
        }
    }

    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postDogs(input))
        alert("Creado con exito")
        setInput({
            ...input,
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            life_span: "",
            temperament: [],
            image:"", 
        })
        history.push("/home")
    } 
    function handleDeleteTemperament(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== e)
        })
    }
    

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);
    
    
    return (
        <div>
            <Link to= "/home"><button>Volver</button></Link>
            <h1>Crea tu perro</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange}/>
                    {errors.name && ( <p>{errors.name}</p> )}
                </div>
                <div>
                    <label>Peso minimo:</label>
                    <input type="number" value={input.weightMin} name="weightMin" onChange={handleChange}/>
                    {errors.weightMin && ( <p>{errors.weightMin}</p> )}
                </div>
                <div>
                    <label>Peso maximo:</label>
                    <input type="number" value={input.weightMax} name="weightMax" onChange={handleChange}/>
                    {errors.weightMax && ( <p>{errors.weightMax}</p> )}
                </div>
                <div>
                    <label>Altura minima:</label>
                    <input type="number" value={input.heightMin} name="heightMin" onChange={handleChange}/>
                    {errors.heightMin && ( <p>{errors.heightMin}</p> )}
                </div>
                <div>
                    <label>Altura maxima:</label>
                    <input type="number" value={input.heightMax} name="heightMax" onChange={handleChange}/>
                    {errors.heightMax && ( <p>{errors.heightMax}</p> )}
                </div>
                <div>
                    <label>Ezperanza de vida:</label>
                    <input type="number" value={input.life_span} name="life_span" onChange={handleChange}/>
                    {errors.life_span && ( <p>{errors.life_span}</p> )}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="text" value={input.image} name="image" onChange={handleChange}/>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                <option value='selected' hidden >Temperaments</option>
                        {temperamentos?.map(el => {
                            return (
                                <option value={el.name} key={el.id}>{el.name}</option>
                            )
                        })}
                </select>
                {input.temperament.map(el => {
                        return (
                            
                                <ul key={el}>
                                    <li>
                                        <p ><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}  
                <button type="submit">Crear Perro</button>
            </form>
        </div>
    )

}   