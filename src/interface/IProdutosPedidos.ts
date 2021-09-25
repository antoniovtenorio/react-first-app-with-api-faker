import { IProdutos } from "./IProdutos";

export interface IProdutosPedidos extends IProdutos {
    qtd: number;
}