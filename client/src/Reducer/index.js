const initialState = {
    dogs: [],
    allDogs: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload

            }
        case "ORDER_ALF":
            let ordenAlf = action.payload === "asc" ? 
                state.dogs.sort(function ( a, b ){
                    if (a.name > b.name) {
                        return 1;
                    }if (a.name < b.name) {
                        return -1;
                    }
                        return 0;
                }) : 
                state.dogs.sort(function ( a, b ){
                    if (a.name > b.name) {
                        return -1;
                    }if (a.name < b.name) {
                        return 1;
                    }
                        return 0;
                })
            return{
                ...state,
                dogs: ordenAlf
            }
        case "FILTER_CREATE" :
            const allDogs = state.allDogs    
            const createfilter = action.payload === "dataB" ? allDogs.filter(el => el.createdInDb) : allDogs.filter(el => !el.createdInDb);

            return {
                ...state,
                dogs: action.payload === "Todos" ? state.allDogs : createfilter
            }     
            default:
                return state;
    }
}

export default rootReducer;