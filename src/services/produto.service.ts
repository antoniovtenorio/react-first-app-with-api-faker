import http from "../http-common";

const getAllProdutos = () => {
    return http.get("/produtos");
}

const getProdutosById = (id: any) => {
    return http.get(`/produtos/${id}`);
}

const ProdutoService = {
    getAllProdutos,
    getProdutosById
}
export default ProdutoService;