import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleImputChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchByName(search))
    }

    
    return (
        <div>
            <input type="text" placeholder="Buscar por nombre..." onChange={(e) => handleImputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}