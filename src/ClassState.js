import React from "react";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error:false,
            loading: false,
            value: ''
        }
    }

    

    componentDidUpdate() {
        if(this.state.loading){
            setTimeout(() => {
                if(this.state.value === SECURITY_CODE){
                    this.setState({loading : false})
                } else{
                    this.setState({loading : false, error: true})
                }
            }, 3000)
        }
    }

    render() {


        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el codigo de seguridad</p>

                {this.state.error && <p>Error!!!</p>}

                {this.state.loading && <p>Cargando...</p>}

                <input placeholder="Codigo de seguridad" 
                    value={this.state.value}
                    onChange={(e) => {
                        this.setState({value: e.target.value})
                    }}
                />
                <button onClick={() => this.setState({loading : true, error: false})}>Comprobar</button>
            </div>
        );
    }
}

export { ClassState }