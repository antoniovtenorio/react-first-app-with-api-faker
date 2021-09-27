import http from "../http-common";
import { ICompras } from "../interface/ICompras"

interface itensCompra {
    produto_id: number,
    qtd: number
}
interface IOS {
    id?:number
    cliente_id: number,
    produtos: itensCompra[]
}

const saveCompra = (compras: ICompras) => {
   let produtosPedidos: itensCompra[] = compras.produtos.map(a => {
       return ({
           produto_id: a.id,
           qtd: a.qtd
        })
   });
   let os: IOS = {
       cliente_id: compras.cliente_id,
       produtos: produtosPedidos
   }
   console.log(os);
   return http.post<IOS>("/compras", os);
}

const ComprasService = {
    saveCompra
}

export default ComprasService;