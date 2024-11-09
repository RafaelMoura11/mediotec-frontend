import { NavLink } from "react-router-dom";

export default function NavBar() {

    return (
        <nav>
            <NavLink to="/">
                <button>Home</button>
            </NavLink>
            <NavLink to="/disciplinas">
                <button>Disciplinas</button>
            </NavLink>
            <NavLink to="/turma">
                <button>Turma</button>
            </NavLink>
            <NavLink>
                <button to="/usuarios">Usuários</button>
            </NavLink>
            <NavLink>
                <button to="/notificacoes">Notificações</button>
            </NavLink>
        </nav>
    )
}