import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function orderAlf(payload) {
  return {
    type: "ORDER_ALF",
    payload,
  };
}

export function filterByTemp(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function filterCreate(payload) {
  return {
    type: "FILTER_CREATE",
    payload,
  };
}

export function ordenPeso(payload) {
  return {
    type: "ORDEN_PESO",
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var temp = await axios.get("/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temp.data,
    });
  };
}

export function postDogs(payload) {
  return async function (dispatch) {
    var json = await axios.post("/dogs", payload);
    return json;
  };
}

export function searchByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/dogs?name=" + name);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      alert("No se encontro el perro");
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function reload(payload) {
  return {
    type: "RELOAD_DETAILS",
    payload: payload,
  };
}
