import React, { useEffect, useState } from 'react';
import usersFunctions from '../utils/usersFunctions';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function UsersSection() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { user } = useAppContext();

    const getAllUsers = async () => {
        try {
            const { data } = await usersFunctions.getAllUsers();
            setUsers(data);
        } catch (e) {
            console.log("Erro");
        }
      };
    
      useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
        getAllUsers();
      }, [navigate, user]);
    return (
        <div>
            <h3>Lista de Usuários</h3>
            <ul>
                {
                    users.map((user) => (
                        <li>
                            <h5>{user.userName}</h5>
                            <p>{user.email}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}