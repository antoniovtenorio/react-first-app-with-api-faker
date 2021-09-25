import { IProdutos } from "./IProdutos";

export interface ICompras {
    id?: number | null,
    cliente_id?: number | any,
    produtos?: IProdutos[],
    qtd: number
}