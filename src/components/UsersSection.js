import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <h3>Gerenciamento de Usuários</h3>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            <h5>{user.userName}</h5>
            <p>{user.email}</p>
            <div>
              <button onClick={() => handleUpdate(user)}>Atualizar</button>
              <button onClick={() => handleDelete(user.userId)}>Deletar</button>
              {user.role === "STUDENT" && (
                <button onClick={() => handleNavigateToConcepts(user.userId)}>
                  Adicionar Conceitos
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <UpdateUser
        open={isUpdateModalOpen}
        handleClose={handleUpdateModalClose}
        userToUpdate={userToUpdate}
        getAllUsers={getAllUsers}
      />
    </div>
  );
}
