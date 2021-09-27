import React from 'react'
import { IProdutosPedidos } from '../../interface/IProdutosPedidos'
import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';
import { IProdutos } from '../../interface/IProdutos';
type Props = {
    produtoPedidos?: IProdutosPedidos[];
    handleAddProduct: (prod: IProdutos) => void;
    handleRemoveProduct: (prod: IProdutosPedidos) => void;
}

const converterProdutoPedidoToProduto = (produtoPedido: IProdutosPedidos): IProdutos => {
    const produto: IProdutos = {
        id: produtoPedido.id,
        nome: produtoPedido.nome,
        preco: produtoPedido.preco
    }
    return produto;
}

const ProdutoItem: React.FC<Props> = ({produtoPedidos, handleAddProduct, handleRemoveProduct}) => {
    return (
        <>
           <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th><abbr title="Id">Id</abbr></th>
                        <th><abbr title="Nome do Produto">Nome do Produto</abbr></th>
                        <th><abbr title="Nome do cliente">Nome do Cliente</abbr></th>
                        <th><abbr title="Qtd">Quantidade</abbr></th>                        
                    </tr>
                </thead>
                <tbody>
                    {produtoPedidos?.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.preco}</td>
                            <td>
                            <IoRemoveCircleSharp 
                                    className="mr-1" 
                                    onClick={()=> handleRemoveProduct(item)} 
                                    />
                               {item.qtd}
                               <IoAddCircleSharp 
                                    onClick={()=> handleAddProduct(converterProdutoPedidoToProduto(item))} 
                                    className="ml-1"
                                    />
                                    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProdutoItem;
