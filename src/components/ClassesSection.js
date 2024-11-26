import React, { useEffect, useState } from 'react';
import classesFunctions from '../utils/classesFunctions';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ClassesSection() {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const { user } = useAppContext();

    const getAllClasses = async () => {
        const { data } = await classesFunctions.getAllClasses();
        setClasses(data);
      };
    
      useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
        getAllClasses();
      }, [navigate, user]);
    return (
        <div>
            <h3>Gerenciamento de Turmas</h3>
            <ul>
                {
                    classes.map((notification) => (
                        <li>
                            <h5>{notification.title}</h5>
                            <p>{notification.content}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}