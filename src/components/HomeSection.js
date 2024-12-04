import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import courses from '../images/courses.png';
import users from '../images/users2.png';
import classes from '../images/classes.png';
import conceitos from '../images/conceito.png';

export default function HomeSection() {
    const navigate = useNavigate();
    const { user } = useAppContext();

    useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
    }, [navigate, user])
    return (

        <div className="row quadrados">
            <div className="col background-roxo d-flex flex-column align-items-center">
                <NavLink className="text-white" to="/turmas">
                    <img src={classes} alt="Turmas" className='icon' />
                    <h5>Turmas</h5>
                </NavLink>
            </div>

            <div className="col background-roxo d-flex flex-column align-items-center">
                <NavLink className="text-white" to="/adicionar-usuario">
                    <img src={users} alt="Usuarios" className='icon' />
                    <h5>Usuário</h5>
                </NavLink>
            </div>

            <div className="col background-roxo d-flex flex-column align-items-center">
                <NavLink className="text-white" to="/usuarios">
                    <img src={users} alt="Usuarios" className='icon' />
                    <h5>Usuários</h5>
                </NavLink>
            </div>

            <div className="col background-roxo d-flex flex-column align-items-center">
                <NavLink className="text-white" to="/documentos">
                    <img src={courses} alt="Disciplinas" className='icon' />
                    <h5>Documentos</h5>
                </NavLink>
            </div>
        </div>


    )
}