import React, { useEffect, useState } from 'react'
import { IClientes } from '../../interface/IClientes';
import { ICompras } from '../../interface/ICompras';
import clienteService from '../../services/cliente.service';




const Compras: React.FC = (props) => {
    const initialStateCompras: ICompras = {
        id: null,
        cliente_id: null,
        produtos: []
        
    } 

    useEffect(() => {
        
    }, [])

    const [compras, setCompras] = useState<ICompras>(initialStateCompras);
   
    return (
        <>
            <br />
            <p>Lista de Compras</p>

           
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th><abbr title="Id">Id</abbr></th>
                        <th><abbr title="Nome do Produto">Nome do Produto</abbr></th>
                        <th><abbr title="Nome do cliente">Nome do Cliente</abbr></th>
                        <th><abbr title="Qtd">Quantidade</abbr></th>
                        <th><abbr title="OPT">Opções</abbr></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>

        </>
    )
}

export default Compras;
