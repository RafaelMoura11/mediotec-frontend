import React, { useEffect, useState } from 'react';
import notificationsFunctions from '../utils/notificationsFunctions';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function NotificationsSection() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const { user } = useAppContext();

    const getAllNotifications = async () => {
        const { data } = await notificationsFunctions.getAllNotifications();
        setNotifications(data);
      };
    
      useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
        getAllNotifications();
      }, [navigate, user]);
    return (
        <div>
            <h3>Comunicados recentes</h3>
            <ul>
                {
                    notifications.map((notification) => (
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