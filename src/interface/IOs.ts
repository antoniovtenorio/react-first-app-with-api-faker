export interface IOs {
    id?: number,
    cliente_id: number,
    produtos?: [{
        id: number,
        produto_id: number,
        qtd: number
    }]
}