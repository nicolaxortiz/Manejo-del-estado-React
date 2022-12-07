import React from "react";

function UseState({name}) {

    //Contraseña
    const SECURITY_CODE = 'paradigma';

    //Estados
    const [getState, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    //Funciones operadores logicos
    function OnChange(e) {
        setState({...getState, value: e.target.value})
    }

    function OnConfirm(){
        setState({...getState, loading: true, error:false})
    }

    function OnDelete(){
        setState({...getState, deleted: true})
    }

    function OnRegret(){
        setState({...getState, deleted: false, confirmed: false, value:''})
    }

    //UseEfetc Loading
    React.useEffect(() => {
        if(getState.loading){
            setTimeout(() => {
                if(getState.value === SECURITY_CODE){
                    setState({...getState, loading: false, confirmed: true})
                } else{
                    setState({...getState, loading: false, error:true})
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
                <h1>UseState fue eliminado</h1>
                <button onClick={() => {OnRegret()}}>Recuperar</button>
            </div>
        );
    }

    
}

export { UseState }