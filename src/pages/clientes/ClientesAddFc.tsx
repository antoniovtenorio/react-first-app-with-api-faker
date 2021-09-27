import { useState } from "react";
import { IClientes } from "../../interface/IClientes";
import clienteService from "../../services/cliente.service";

const ClientesAddFc: React.FC = () => {
    const initialClientesState = {
        id: null,
        nome: "",
        idade: ""
    }
   
    // Salvando Produto Selecionado

    // adicionando cliente.
    const saveCliente = (): void => {
        if (clienteAdd.nome === "" || clienteAdd.idade === "") {
            alert("ALl the fields are mandatory!");
            return;
        }
        const data: IClientes = {
            id: clienteAdd.id,
            nome: clienteAdd.nome,
            idade: clienteAdd.idade
        }

        clienteService.create(data)
            .then(response => {
                setClienteAdd({
                    id: response.data.id,
                    nome: response.data.nome,
                    idade: response.data.idade
                });

            }).catch(error => console.log(error));
    }

    const [clienteAdd, setClienteAdd] = useState<IClientes>(initialClientesState);
   
    return (
        <div className="content is-two-fifths">
            <fieldset>
                <div className="field">

                    <label className="label">Nome</label>
                    <div className="control">
                        <input className="input"
                            name="nome"
                            type="text"
                            value={clienteAdd.nome}
                            onChange={(e) => { setClienteAdd({ nome: e.target.value }) }}
                            placeholder="e.g Alex Smith"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Idade</label>
                    <div className="control">
                        <input
                            name="idade"
                            className="input"
                            type="text"
                            value={clienteAdd.idade}
                            onChange={(e) => { setClienteAdd({ idade: e.target.value }) }}
                            placeholder="12"
                        />
                    </div>
                </div>
                <button className="button is-dark" onClick={saveCliente}>SALVAR</button>
            </fieldset>
        </div>
    );
}
export default ClientesAddFc;



