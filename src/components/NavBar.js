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
            <NavLink to="/turmas">
                <button>Turmas</button>
            </NavLink>
            <NavLink to="/usuarios">
                <button>Usuários</button>
            </NavLink>
            <NavLink to="/notificacoes">
                <button>Notificações</button>
            </NavLink>
        </nav>
    )
}
