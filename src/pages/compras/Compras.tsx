import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io';
import ProdutoItem from '../../components/produtos/ProdutoItem';
import { IClientes } from '../../interface/IClientes';
import { ICompras } from '../../interface/ICompras';
import { IProdutos } from '../../interface/IProdutos';
import { IProdutosPedidos } from '../../interface/IProdutosPedidos';
import clienteService from '../../services/cliente.service';
import ComprasService from '../../services/compras.service';
import ProdutoService from '../../services/produto.service';

const Compras: React.FC = (props) => {
 
//modal
    const initialModalState = {
        modal: {
            open: false,
            ishown: ""
        }
    }

    interface IModalState {
        modal?: {
            open: boolean,
            ishown: string
        }
    }

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
//fim modal

    // FUNCOES CLIENTES
    const carregarListaDeClientes = () => {
        clienteService.getAll()
        .then(res => {
            setClientes(res.data);
        })
        .catch(err => console.log("Erro ao Carregar Clientes", err));
    }

    const verificarClienteSelecionado = (event: any) => {
        if (event.target.value === "") {
            return alert("Selecione uma opção por favor");
        }
        setCompras({
            cliente_id: event.target.value,
            produtos: compras.produtos            
        })     
        getClientById(event.target.value);
    }
      
    const getClientById = (id: number) => {
        clienteService.getClienteById(id)
        .then(res => {
            setClienteSelecionado({
                id: res.data.id,
                nome: res.data.nome,
                idade: res.data.idade

            });
        }).catch(err => console.log(err));
    }

 //////////////////////// fim Funções Clientes

//////////////////// Produtos /////////////////////
    const carregarListaDeProdutos = () =>{
        ProdutoService.getAllProdutos()
        .then(res => {
            setProdutos(res.data);
        }).catch(err => console.log("erro ao obter produtos", err));
    }

     // CAPTURANDO PRODUTO SELECIONADO

     const captureProduto = (prod: IProdutos) => {
        if (clienteSelecionado === undefined || clienteSelecionado?.id === 0) {
            return alert("selecione um cliente primeiro");
        }
        addProduto(prod);
    }

    const addProduto = (prodClicado: IProdutos) => {
        
        setProdutosPedidos(prev =>{
            // 1. se ja estiver adicionado
            const produtoExistente = prev.find(item => item.id === prodClicado.id);

            if(produtoExistente) {
                return prev.map(item => 
                    item.id === prodClicado.id 
                    ? { ...item, qtd: item.qtd + 1 } 
                    : item
                );
            }
            // se for o primeiro
            return [...prev, {...prodClicado, qtd: 1}]
        });
    }
    
    const removeProduto = (produtoSelect: IProdutosPedidos) => {
        let allProdutos = [...produtosPedidos];
        let index = allProdutos.indexOf(produtoSelect);
        
        if(allProdutos[index].qtd > 1) {
            allProdutos[index].qtd--;
            setProdutosPedidos(allProdutos);
        } else {
            deleteProduto(produtoSelect);
        }
    }

    const deleteProduto = (produtoSelect: IProdutosPedidos) => {
        let allProdutos: IProdutosPedidos[] = [...produtosPedidos];
        let index = allProdutos.indexOf(produtoSelect);
        
        //  let AllProductFiltered: IProdutosPedidos[] = allProdutos.filter(x => x.id !== produtoSelect.id);
        //  let allProductFiltered = allProdutos.filter(x => x.id !== produtoSelect.id);
      
        allProdutos.splice(index, 1);
        
        setProdutosPedidos(allProdutos);
    }
    const salvarCompra = () => {
        console.log("as compras são", compras);
        ComprasService.saveCompra(compras)
        .then(res => {
            console.log("comprasalva", res);
        }).catch(err => console.log("não foi possível salvar", err));
        limparStatesParaNovoRegistro();
    }

    const limparStatesParaNovoRegistro = () => {
        setCompras({
            id: null, cliente_id: null, produtos:[]
        });
        setClienteSelecionado({id:""});
        setProdutosPedidos([]);
    }
///////////////// FIM Produtos ///////////////////

    const [compras, setCompras] = useState<ICompras>({id: null, cliente_id: null, produtos:[]} as ICompras);
    const [clienteSelecionado, setClienteSelecionado] = useState<IClientes>();
    const [modalState, setModalState] = useState<IModalState>(initialModalState);
    const [produtosPedidos, setProdutosPedidos] = useState<IProdutosPedidos[]>([]);
    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [clientes, setClientes] = useState<IClientes[]>([]);

    useEffect(() => {
        carregarListaDeClientes();
        carregarListaDeProdutos();
        if(produtosPedidos.length || Array.isArray(produtosPedidos)) {
            setCompras({
                id: null,
                cliente_id: clienteSelecionado?.id,
                produtos: produtosPedidos
            })
        }
    }, [clienteSelecionado, produtosPedidos])

    return (
        <>
            <nav className="panel">
                <p className="panel-heading">
                    Compras Para Cliente
                </p>
                <div className="panel-block">
                <label className="label mr-1">Selecione o cliente</label>
                <div className="select is-link">
                    <select id="selectedCliente" name="selectedCliente" value={clienteSelecionado?.id} onChange={(e) => verificarClienteSelecionado(e)}>
                        <option value="">Selecione uma opção</option>
                        {clientes.map(cliente => {
                            return (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            )
                        })}
                    </select>
                </div>
                </div>
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth">
                        Selecionar Cliente
                    </button>
                </div>
            </nav>
            <br /><br />
            <button className="button is-primary" onClick={callModal}>Adicionar Novo Produto</button>
           <ProdutoItem 
                produtoPedidos={compras.produtos} 
                handleRemoveProduct={removeProduto} 
                handleAddProduct={addProduto} 
            />
              
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
            <div className="control">
                <button 
                name="buttonSave" 
                className="button is-primary" 
                disabled={clienteSelecionado === undefined 
                    && produtosPedidos.length === 0 ? true : false}
                    onClick={salvarCompra} 
                >Finalizar Os</button>
            </div>
        </>
    )
}
export default Compras;
