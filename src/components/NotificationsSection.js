import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import notificationsFunctions from "../utils/notificationsFunctions";

export default function NotificationsSection() {
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
    <div className="notifications-container">
      <h3>Comunicados</h3>

      {/* Barra de busca e botão adicionar */}
      <div className="header-actions">
        <input
          type="text"
          placeholder="Procurar"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="btn-add">Adicionar</button>
      </div>

      {/* Lista de notificações */}
      <ul className="notifications-list">
        {paginatedNotifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <div className="notification-content">
              <h5>{notification.title}</h5>
              <p>{notification.content}</p>
            </div>
            <div className="notification-actions">
              {/* Botões de ação */}
              <button className="btn-edit-classes">
                <FaPen size={14} />
              </button>
              <button className="btn-delete-classes">
                <FaTrashAlt size={14} />
              </button>
            </div>
            {/* Tag de tipo */}
            <div
              className={`notification-type ${
                notification.type === "event" ? "event" : "announcement"
              }`}
            >
              {notification.type === "event" ? "Evento" : "Comunicado"}
            </div>
          </li>
        ))}
      </ul>

      {/* Paginação */}
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePagination("previous")}
        >
          ← Anterior
        </button>
        <span className="pagination-page">{currentPage}</span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePagination("next")}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
