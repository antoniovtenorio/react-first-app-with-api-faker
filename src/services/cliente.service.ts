import { IClientes } from './../interface/IClientes';
import http from "../http-common";

class ClienteService {
    create (data: IClientes) {
        return http.post<IClientes>(`/clientes/`, data);
    }

}
export default new ClienteService();