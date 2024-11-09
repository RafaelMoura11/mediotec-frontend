import React, { useEffect, useState } from 'react';
import notificationsFunctions from '../utils/notificationsFunctions';

export default function NotificationsSection() {
    const [notifications, setNotifications] = useState([]);

    const getAllNotifications = async () => {
        const { data } = await notificationsFunctions.getAllNotifications();
        setNotifications(data);
      };
    
      useEffect(() => {
        getAllNotifications();
      }, []);
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