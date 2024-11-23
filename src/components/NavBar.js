import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePic from '../images/profile.png';
import logo from '../images/logo-mediotec.png';
import { useAppContext } from '../context/AppContext';


export default function NavBar() {
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    const logout = () => {
        setUser({ token: "", role: "", userName: "" });
        navigate("/");
    }

    return (
        <div className="Navbar navbar-expand-lg">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/login">
                        <img src={logo} alt="Mediotec" height="40" />
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/" activeClassName="active-link">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/disciplinas" activeClassName="active-link">
                                    Disciplinas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/turmas" activeClassName="active-link">
                                    Turmas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/usuarios" activeClassName="active-link">
                                    Usuários
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/notificacoes" activeClassName="active-link">
                                    Comunicados
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar-user d-flex align-items-center">
                        <img
                            src={profilePic}
                            alt="User Profile"
                            className="rounded-circle"
                            width="40"
                            height="40"
                        />
                        <div className="user-info ms-2">
                            <span className="d-block">{user.userName}</span>
                            <small className="tipo-usuario">{user.role}</small>
                        </div>
                    </div>
                    <button onClick={ logout }>Logout</button>
                </div>
            </nav>
        </div>

    );
}
