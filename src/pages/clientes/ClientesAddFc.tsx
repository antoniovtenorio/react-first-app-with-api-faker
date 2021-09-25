import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IClientes } from "../../interface/IClientes";
import { ICompras } from "../../interface/ICompras";
import { IProdutos } from "../../interface/IProdutos";
import clienteService from "../../services/cliente.service";
import ProdutoService from "../../services/produto.service";
import Compras from "../compras/Compras";
import ClientesAdd from "./ClientesAdd";

interface IModalState {
    modal?: {
        open: boolean,
        ishown: string
    }
}

const ClientesAddFc: React.FC = (props) => {
    const initialClientesState = {
        id: null,
        nome: "",
        idade: ""

    }

    const initialModalState = {
        modal: {
            open: false,
            ishown: ""
        }
    }

    const initialStateCompras = {
        id: null,
        cliente_id: null,
        produtos: [],
        qtd: 0
    }

    const initialStateClientes: IClientes[] = [
        {
            id: null,
            nome: "",
            idade: ""
        }
    ];

    // Modal Comands
    const callModal = (): void => {
        if (modalState.modal?.open === false) {
            setModalState({
                modal: {
                    ishown: "is-active",
                    open: true
                }

            })
        } else {
            setModalState({
                modal: {
                    ishown: "",
                    open: false
                }
            })
        }
    }
    // CARREGAR LISTAS

    const carregarListaDeProdutos = () => {
        ProdutoService.getAllProdutos()
            .then(response => {
                setProdutos(response.data);
                console.log(response.data);
            }).catch(error => console.log(error));

    }

    // CAPTURANDO PRODUTO SELECIONADO

    const captureProduto = (prod: IProdutos) => {
        if (clienteSelecionadoByCombo.id === null) {
            return alert("selecione um cliente primeiro");
        }
       // console.log(prod);
        addProduto(prod);
    }

    // Salvando Produto Selecionado
    const addProduto = (prod: IProdutos) => {
        console.log("produto", prod);
        const exist = compras.find((z) => z.produtos?.filter(s => s.id === prod.id));
        console.log(exist);
        if (exist) {
            setCompras(
                compras.map((x) => x.produtos?.filter(c => c.id === prod.id) ? { ...exist, qtd: exist.qtd + 1 } : x)
            );
        } else {
            setCompras([...compras, {
                cliente_id: clienteSelecionadoByCombo.id,
                produtos: [...produtos, {
                    nome: prod.nome,
                    preco: prod.preco
                }],
                qtd: 1
            }]);
        }
        console.log(compras);
    }
    //     // adicionando cliente.
    const saveCliente = (): void => {
        if (clienteAdd.nome === "" || clienteAdd.idade === "") {
            alert("ALl the fields are mandatory!");
            return;
        }
        const data: IClientes = {
            id: clienteAdd.id,
            nome: clienteAdd.nome,
            idade: clienteAdd.idade
        }

        clienteService.create(data)
            .then(response => {
                setClienteAdd({
                    id: response.data.id,
                    nome: response.data.nome,
                    idade: response.data.idade
                });

            }).catch(error => console.log(error));
    }

    useEffect(() => {
        carregarListaDeProdutos()
        capturarClientes()
    }, [])

    const clienteSelecionado = (event: any) => {
        console.log(event.target.value)
        if (event.target.value === "") {
            return alert("Selecione uma opção por favor");
        }
        
        getClientById(event.target.value);
               
        setCompras([{
            cliente_id: event.target.value,
            qtd: 0
        }])
    }

    const getClientById = (id: number) => {
        clienteService.getClienteById(id)
        .then(res => {
            setClienteSelecionadoByCombo({
                id: res.data.id,
                nome: res.data.nome,
                idade: res.data.idade

            })
             console.log(res.data);
        }).catch(err => console.log(err));
    }

    const capturarClientes = () => {
        clienteService.getAll()
            .then(response => {
                setClientes(response.data);
                console.log(response.data);
            })
    }

    const [clienteAdd, setClienteAdd] = useState<IClientes>(initialClientesState);
    const [clienteSelecionadoByCombo, setClienteSelecionadoByCombo] = useState<IClientes>(initialClientesState);
    const [modalState, setModalState] = useState<IModalState>(initialModalState);
    const [compras, setCompras] = useState<ICompras[]>([initialStateCompras]);
    const [clientes, setClientes] = useState<IClientes[]>(initialStateClientes);
    const [produtos, setProdutos] = useState<IProdutos[]>([
        {
            id: null,
            nome: "",
            preco: null
        }
    ]);
    return (
        <div className="content is-two-fifths">
            <fieldset>
                <div className="field">

                    <label className="label">Nome</label>
                    <div className="control">
                        <input className="input"
                            name="nome"
                            type="text"
                            value={clienteAdd.nome}
                            onChange={(e) => { setClienteAdd({ nome: e.target.value }) }}
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
                            value={clienteAdd.idade}
                            onChange={(e) => { setClienteAdd({ idade: e.target.value }) }}
                            placeholder="12"
                        />
                    </div>
                </div>
                <button className="button is-dark" onClick={saveCliente}>SALVAR</button>

            </fieldset>
            <br /><br />
            <button className="button is-primary" onClick={callModal}>Adicionar Novo Produto</button>


            <div className="box">
                <label>Selecione o cliente</label>
                <div className="select is-link">
                    <select id="selectedCliente" onChange={(e) => clienteSelecionado(e)}>
                        <option value="">Selecione uma opção</option>
                        {clientes.map(cliente => {
                            return (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <Compras />
            <div className={`modal ${modalState.modal?.ishown}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Lista de Produtos</p>
                        <button className="delete" onClick={callModal} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><abbr title="Id">Id</abbr></th>
                                    <th><abbr title="Produto">Produto</abbr></th>
                                    <th><abbr title="Preco">Preço</abbr></th>
                                    <th><abbr title="Opções">Opções</abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(prod => {
                                    return (
                                        <tr key={prod.id}>
                                            <td>{prod.id}</td>
                                            <td>{prod.nome}</td>
                                            <td>{prod.preco}</td>
                                            <td>
                                                <IoIosAddCircle onClick={() => captureProduto(prod)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={callModal}>Fechar</button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default ClientesAddFc;



