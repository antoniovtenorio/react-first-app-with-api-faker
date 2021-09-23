import React, { Component, useState } from 'react';
import http from "../../http-common";
import { IoIosAddCircle } from "react-icons/io";

type Props = {};

interface IClientes {
    id?: number,
    nome: string,
    idade: string
}

type State = {
    clientes: Array<IClientes>
}

export default class Clientes extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            clientes: []
        };
    }

    render() {
        return (
            <>
                <h1>Clientes { }</h1>
                <section className="hero is-link">
                    <div className="hero-body">
                        <p className="title">
                            Cadastro de Clientes
                        </p>
                        <p className="subtitle">
                        <button className="button">Novo <IoIosAddCircle/></button>
                        </p>
                    </div>
                </section>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="Id">Id</abbr></th>
                            <th><abbr title="Nome">Nome</abbr></th>
                            <th><abbr title="Idade">Idade</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getClientesRow()}
                    </tbody>
                </table>
            </>
        );
    }

    componentDidMount = async () => {
        let response = await http.get<IClientes[]>("/clientes")
            .then(res => {
                this.setState({ clientes: res.data });
                console.log(this.state);
            });
    }

    getClientesRow = () => {
        return this.state.clientes.map(cli => {
            return (
                <tr key={cli.id}>
                    <th onClick={() => { console.log(cli.id) }}>{cli.id}</th>
                    <td>{cli.nome}</td>
                    <td>{cli.idade}</td>
                </tr>
            );
        });
    }
};


