import axios from "axios"
export function getDogs(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
}
export function orderAlf(payload){
    return {
        type: "ORDER_ALF",
        payload
    }
}
export function filterCreate(payload){
    return {
        type: "FILTER_CREATE",
        payload
    }
}