import { IProdutosPedidos } from "./IProdutosPedidos";

export interface ICompras {
    id?: number | any,
    cliente_id?: number|any,
    produtos: IProdutosPedidos[]
}