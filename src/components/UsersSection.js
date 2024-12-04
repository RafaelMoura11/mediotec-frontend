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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const getAllUsers = async () => {
    const data = await usersFunctions.getAllUsers(user.token);
    console.log(user);
    setUsers(data);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const handleUpdate = (user) => {
    setUserToUpdate(user);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (userIds) => {
    try {
      for (const userId of userIds) {
        await usersFunctions.deleteUserById(userId, user.token);
      }
      await getAllUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.userId));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
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

  // Define as permissões baseadas no papel do usuário
  const isCoordinator = user.role === "COORDINATOR";
  const isTeacher = user.role === "TEACHER";
  const isStudent = user.role === "STUDENT";

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

        {isCoordinator && (
          <div className="action-buttons">
            <button className="btn-add">Adicionar</button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(selectedUsers)}
              disabled={selectedUsers.length === 0}
            >
              <FaTrashAlt size={16} style={{ marginRight: 8 }} />
            </button>
          </div>
        )}
      </div>

      <ul className="users-list">
        {Array.isArray(users) && users.length > 0 ? (
          <>
            {isCoordinator && (
              <li className="user-bar">
                <div className="user-info-container">
                  <div className="user-info-page">
                    <input
                      className="user-checkbox"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <h5 className="user-bar-name">Selecionar Todos</h5>
                  </div>
                </div>
              </li>
            )}
            {users.map((user) => (
              <li className="user-item" key={user.userId}>
                <div className="user-info-container">
                  <div className="user-info-page">
                    {isCoordinator && (
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleSelectUser(user.userId)}
                        className="user-checkbox"
                      />
                    )}
                    <h5 className="user-name">{user.userName}</h5>
                  </div>

                  <div className="user-details">
                    <div className="user-contact">
                      <p className="user-detail-contact">{user.role}</p>
                      <p className="user-detail-contact">{user.email}</p>
                      <p className="user-detail-contact">{user.phone}</p>
                    </div>

                    {/* Botão "Conceitos" disponível apenas para professores */}
                    {isTeacher && user.role === "STUDENT" && (
                      <button
                        className="concept-btn"
                        onClick={() => handleNavigateToConcepts(user.userId)}
                      >
                        Conceitos
                      </button>
                    )}

                    {/* Botões de editar e excluir disponíveis apenas para coordenadores */}
                    {isCoordinator && (
                      <>
                        <button
                          className="btn-edit"
                          onClick={() => handleUpdate(user)}
                        >
                          <FaEdit size={16} style={{ marginRight: 8 }} />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete([user.userId])}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </>
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
