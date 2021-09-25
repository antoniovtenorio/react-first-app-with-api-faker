import { Component } from "react";

import { IClientes } from "../../interface/IClientes";
import clienteService from "../../services/cliente.service";
import Child from "./Child";

type Props = {}

type State = {
    modal?: {
        open: boolean,
        ishown: string
    },
    clientes: IClientes;
} 

export default class ClientesAdd extends Component<Props, State> {
   
    constructor(props: any) {
        super(props)
        this.state = {
            clientes: {
                id: null,
                nome: "",
                idade: ""
            },
            modal: {
                open: false,
                ishown: ""
            }
        };
    }
    
    render() {
        const { nome, idade } = this.state.clientes;
        return (
            <div className="content is-two-fifths">
                <fieldset>
                    <div className="field">
                        <button onClick={this.callModal}></button>
                        <label className="label">Nome</label>
                        <div className="control">
                            <input className="input"
                                name="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => { this.setState({ clientes: {nome: e.target.value} })}}
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
                                onChange={(e) => { this.setState({ clientes: {idade: e.target.value}})}}
                                placeholder="12"
                            />
                        </div>
                    </div>
                    <button className="button is-dark" onClick={this.saveCliente}>SALVAR</button>

                </fieldset>
                <Child nome={this.state}></Child>
                <div className={`modal ${this.state.modal?.ishown}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Modal title</p>
                            <button className="delete" onClick={this.callModal} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button" onClick={this.callModal}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }

    // Modal Comands
    callModal = () => {
        if (this.state.modal?.open === false) {
            this.setState({
                modal: {
                    ishown: "is-active",
                    open: true   
                }
            });
        } else {
            this.setState({
                modal: {
                    ishown: "",
                    open: false   
                }
            });
        }
    }

    // adicionando cliente.
    saveCliente = () => {
        if (this.state.clientes.nome === "" || this.state.clientes.idade === "") {
            alert("ALl the fields are mandatory!");
            return;
        }
        const data: IClientes = {
            id: this.state.clientes.id,
            nome: this.state.clientes.nome,
            idade: this.state.clientes.idade
        }
        //console.log(data);

        clienteService.create(data)
            .then(response => {
                this.setState({
                    clientes: {
                        id: response.data.id,
                        nome: response.data.nome,
                        idade: response.data.idade
                    }
                });
                // console.log("response", response);
            }).catch(error => console.log(error));
    }
}


