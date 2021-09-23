import { Component  } from "react";

import { IClientes } from "../../interface/IClientes";
import clienteService from "../../services/cliente.service";



type Props = {};
type State = IClientes;

export default class ClientesAdd extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            nome: "",
            idade: ""
        };
    }
    render() {
        const { nome, idade } = this.state;
        return (
            <div className="content is-two-fifths">
                <fieldset>
                      <div className="field">
                        <label className="label">Nome</label>
                        <div className="control">
                            <input className="input" 
                            name="nome" 
                            type="text"
                            value={nome} 
                            onChange={(e) => { this.setState({ nome: e.target.value } )}} 
                            placeholder="e.g Alex Smith" 
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Idade</label>
                        <div className="control">
                            <input 
                            name="idade" 
                            className="input" 
                            type="text"
                            value={idade} 
                            onChange={(e) => { this.setState({ idade: e.target.value } ); console.log("ola")}}  
                            placeholder="12" 
                            />
                        </div>
                    </div>
                    <button className="button is-dark" onClick={this.saveCliente}>SALVAR</button>
                    
                </fieldset>
            </div>
        )
    }
// adicionando cliente.
    saveCliente = () => {
        if (this.state.nome === "" || this.state.idade === "") {
            alert("ALl the fields are mandatory!");
            return;
          }
        const data: IClientes = {
            id: this.state.id,
            nome: this.state.nome,
            idade: this.state.idade
        }
        console.log(data);
        
        clienteService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                nome: response.data.nome,
                idade: response.data.idade
            });
            console.log("response", response);
        }).catch(error => console.log(error));
    }
}


