import { NavLink } from "react-router-dom";

export default function HomeSection() {
    return (
        <div>
            <NavLink to="/turma">
                <button>Turmas</button>
            </NavLink>
            <NavLink>
                <button to="/adicionar-usuario">Usuário</button>
            </NavLink>
            <NavLink>
                <button to="/usuarios">Usuários</button>
            </NavLink>
            <NavLink>
                <button to="/documentos">Documentos</button>
            </NavLink>
        </div>
    )
}