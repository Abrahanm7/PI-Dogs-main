const initialState = {
  dogs: [],
  allDogs: [],
  temperament: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "ORDEN_PESO":
      const ordenPeso =
        action.payload === "menorPeso"
          ? state.dogs.sort((a, b) => {
              if ((a.weightMin) < (b.weightMin)) return -1;
              if ((a.weightMin) > (b.weightMin)) return 1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if ((a.weightMin) > (b.weightMin)) return -1;
              if ((a.weightMin) < (b.weightMin)) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: ordenPeso,
      };
    case "ORDER_ALF":
      let ordenAlf =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: ordenAlf,
      };
    case "FILTER_BY_TEMPERAMENT":
      const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
      const temperamentFiltered =
        action.payload === "all"
          ? allDogs
          : allDogs.filter((el) => {
              if (typeof el.temperament === "string")
                return el.temperament.includes(action.payload);
              if (Array.isArray(el.temperament)) {
                let temps = el.temperament.map((el) => el.name);
                return temps.includes(action.payload);
              }
              return true;
            });
      return {
        ...state,
        dogs: temperamentFiltered,
      };

    case "FILTER_CREATE":
      const createfilter =
        action.payload === "dataBase"
          ? state.allDogs.filter((el) => el.createdInDb)
          : state.allDogs.filter((el) => !el.createdInDb);

      return {
        ...state,
        dogs: action.payload === "Todos" ? state.allDogs : createfilter,
      };
    case "SEARCH_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperament: action.payload,
      };
    case "POST_DOGS":
      return {
        ...state,
      };
    case "RELOAD_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
      
    default:
      return state;
  }
}

export default rootReducer;
