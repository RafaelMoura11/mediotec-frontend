import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import notificationsFunctions from "../utils/notificationsFunctions";

export default function NotificationsCard() {
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();
    const { user } = useAppContext();

    // Função para buscar as notificações
    const getAllNotifications = async () => {
        try {
            const { data } = await notificationsFunctions.getAllNotifications();
            setNotifications(data);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        }
    };

    // Manipular a busca
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtrar notificações com base na busca
    const filteredNotifications = notifications.filter((notification) =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginação
    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePagination = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else if (direction === "previous" && currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    useEffect(() => {
        if (!user.token) {
            return navigate("/login");
        }
        getAllNotifications();
    }, [navigate, user]);

    return (
        <div >
            <h4 className='header-bar-notification'>Notificações</h4>
            <ul className="notifications-list">
                {paginatedNotifications.map((notification) => (
                    <li key={notification.id} className="notification-item">
                        <div className="notification-content">
                            <h5>{notification.title}</h5>
                            <p>{notification.content}</p>
                        </div>
                        <div className="notification-actions">
                            <button className="detail-notification">
                                Ver mais
                            </button>
                        </div>
                        {/* Tag de tipo */}
                        <div
                            className={`notification-type ${notification.type === "event" ? "event" : "announcement"
                                }`}
                        >
                            {notification.type === "event" ? "Evento" : "Comunicado"}
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}
