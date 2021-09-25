import { IClientes } from './../interface/IClientes';
import http from "../http-common";

class ClienteService {
    create (data: IClientes) {
        return http.post<IClientes>(`/clientes/`, data);
    }

    getAll() {
        return http.get<IClientes[]>("/clientes");
    }

    getClienteById(id: number) {
        return http.get<IClientes>(`/clientes/${id}`);
    }
}
export default new ClienteService();