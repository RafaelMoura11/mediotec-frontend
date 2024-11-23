import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function HomeSection() {
    const navigate = useNavigate();
    const { user } = useAppContext();

    useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
    }, [navigate, user])
    return (
        <div>
            <NavLink to="/turmas">
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