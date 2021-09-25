import { IProdutosPedidos } from "./IProdutosPedidos";

export interface ICompras {
    id?: number | null,
    cliente_id?: number | any,
    produtos?: IProdutosPedidos[]
}