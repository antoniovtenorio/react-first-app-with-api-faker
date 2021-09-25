import React, { Component } from 'react';
import http from "../../http-common";
import { IoIosAddCircle } from "react-icons/io";
import { IClientes } from '../../interface/IClientes';
import { Link } from 'react-router-dom';

type Props = {};

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
                <section className="hero is-link">
                    <div className="hero-body">
                        <p className="title">
                            Cadastro de Clientes
                        </p>
                        <p className="subtitle">
                            <Link to="/clientes-add">
                                <button className="button">Novo <IoIosAddCircle /></button>
                            </Link>
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
        await http.get<IClientes[]>("/clientes")
            .then(res => {
                this.setState({ clientes: res.data });
                //console.log(this.state);
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


