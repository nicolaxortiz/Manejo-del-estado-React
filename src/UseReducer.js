import React from "react";

function UseReducer({name}) {

    //Contraseña
    const SECURITY_CODE = 'paradigma';

    //Valores iniciales
    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }

    //Estados
    const [getState, dispatch] = React.useReducer(reducer, initialState);

    //Funciones
    function OnChange(e) {
        dispatch({
            type: 'CHANGE', payload: e.target.value
        })
    }

    function OnConfirm(){
        dispatch({
            type: 'CONFIRM'
        })
    }

    function OnDelete(){
        dispatch({
            type: 'DELETE'
        })
    }

    function OnRegret(){
        dispatch({
            type: 'REGRET'
        })
    }

    function OnChecked(){
        dispatch({
            type: 'CHECKED'
        })
    }

    function OnError(){
        dispatch({
            type: 'ERROR'
        })
    }

    //UseEfetc Loading
    React.useEffect(() => {
        if(getState.loading){
            setTimeout(() => {
                if(getState.value === SECURITY_CODE){
                    OnChecked();
                } else{
                    OnError();
                }
            }, 3000)
        }
    }, [getState.loading])


    //Router?
    if(!getState.deleted && !getState.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el codigo de seguridad</p>
    
                {getState.error && <p>Error!!!</p>}
    
                {getState.loading && <p>Espera, ya casi carga :)</p>}
    
                {!getState.loading && <div>
                    <input placeholder="Codigo de seguridad" 
                    value={getState.value} 
                    onChange={(event) => {OnChange(event)}}/>

                <button onClick={() => {OnConfirm()}}>Comprobar</button></div>}
            </div>
        );
    } else if(getState.confirmed && !getState.deleted){
        return(
            <div>
                <p>¿Seguro que quieres eliminar UseState?</p>
                <button onClick={() => {OnDelete()}}>Si</button>
                <button onClick={() => {OnRegret()}}>No</button>
            </div>
        );
    } else if(getState.confirmed && getState.deleted){
        return(
            <div>
                <h1>UseReducer fue eliminado</h1>
                <button onClick={() => {OnRegret()}}>Recuperar</button>
            </div>
        );
    }
  
}


//Reducer
const reducerObject = (state, payload) => ({
    'ERROR': {...state, loading: false, error:true},
    'CHECKED': {...state, loading: false, confirmed: true},
    'REGRET': {...state, deleted: false, confirmed: false, value:''},
    'DELETE': {...state, deleted: true},
    'CONFIRM': {...state, loading: true, error:false},
    'CHANGE': {...state, value: payload} 
});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }