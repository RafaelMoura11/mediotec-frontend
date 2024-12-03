import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import usersFunctions from "../utils/usersFunctions";
import UpdateUser from "./modals/UpdateUser";

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const getAllUsers = async () => {
    const data = await usersFunctions.getAllUsers(user.token);
    setUsers(data);
  };

  const handleUpdate = (user) => {
    setUserToUpdate(user);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      console.log(userId);
      await usersFunctions.deleteUserById(userId, user.token);
      await getAllUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleNavigateToConcepts = (studentId) => {
    navigate(`/conceitos/${studentId}`);
  };

  useEffect(() => {
    if (!user.token) {
      return navigate("/login");
    }
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setUserToUpdate(null);
  };

  return (
    <div>
      <h3 className="title">Gerenciamento de Usuários</h3>


      <div className="search-filters">
        <div>
          <input type="text" placeholder="Procurar" className="search-input" />

          <select className="filter-select">
            <option value="">Tipo: Todos</option>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
          </select>

          <select className="filter-select">
            <option>Turma</option>
            <option>Turma A</option>
            <option>Turma B</option>
          </select>
        </div>

        <div className="action-buttons">
          <button className="btn-add">Adicionar</button>
          <button className="btn-delete">
            <FaTrashAlt size={16} style={{ marginRight: 8 }} />
          </button>
        </div>
        {/* Aplicar funcionalidade de filtro por tipo de usuário e Turma */}
      </div>

      <ul className="users-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <li className="user-item" key={user.userId}>
              <div className="user-info-container">

                <div className="user-info-page">
                  <input type="checkbox" className="user-checkbox" />
                  <h5 className="user-name">{user.userName}</h5>
                </div>

                <div className="user-details">
                  <div className="user-contact">
                    <p className="user-email">{user.email}</p>
                    <p className="user-phone">{user.phone}</p>
                  </div>

                  <button
                    className="btn-edit"
                    onClick={() => handleUpdate(user)}
                  >
                    <FaEdit size={16} style={{ marginRight: 8 }} />
                  </button>
                </div>

              </div>
            </li>
          ))
        ) : (
          <p>Carregando usuários ou nenhum usuário encontrado.</p>
        )}
      </ul>


      <div className="pagination">
        <button className="pagination-btn">←</button>
        <span className="pagination-page">1</span>
        <button className="pagination-btn">→</button>
      </div>

      <UpdateUser
        open={isUpdateModalOpen}
        handleClose={handleUpdateModalClose}
        userToUpdate={userToUpdate}
        getAllUsers={getAllUsers}
      />
    </div>
  );
}
