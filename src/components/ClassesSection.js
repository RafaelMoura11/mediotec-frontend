import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import classesFunctions from "../utils/classesFunctions";
import NewClass from "./modals/NewClass";

export default function ClassesSection() {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const getAllClasses = async () => {
    const data = await classesFunctions.getAllClasses();
    setClasses(data);
  };

  const handleDelete = async (classId) => {
    try {
      await classesFunctions.deleteClass(classId);
      await getAllClasses();
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
    }
  };

  useEffect(() => {
    if (!user.token) {
      return navigate("/login");
    }
    getAllClasses();
  }, [navigate, user]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Define as permissões baseadas no papel do usuário
  const isCoordinator = user.role === "COORDINATOR";
  const canRead = user.role === "TEACHER" || user.role === "STUDENT";

  return (
    <div>
      <h1 className="title">Gerenciamento de Turmas</h1>

      <div className="search-filters">
        <div>
          <input type="text" placeholder="Procurar" className="search-input" />
          <select className="filter-select">
            <option value="">Filtro</option>
          </select>
        </div>

        {isCoordinator && (
          <div className="action-buttons">
            <button className="btn-add" onClick={handleModalOpen}>
              Adicionar
            </button>
          </div>
        )}
      </div>

      <div className="classes-grid">
        {classes.map((classItem) => (
          <div className="class-card" key={classItem.classId}>
            <div className="class-card-header">
              <h5 className="class-title">{classItem.className}</h5>
              <p className="class-year">{classItem.year}</p>
            </div>
            <div className="class-card-footer">
              {isCoordinator && (
                <>
                  <button
                    className="btn-edit-classes"
                    onClick={() => console.log("Editar turma", classItem.classId)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete-classes"
                    onClick={() => handleDelete(classItem.classId)}
                  >
                    <FaTrashAlt />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn">←</button>
        <span className="pagination-page">1</span>
        <button className="pagination-btn">→</button>
      </div>

      {isCoordinator && (
        <NewClass
          open={isModalOpen}
          handleClose={handleModalClose}
          getAllClasses={getAllClasses}
        />
      )}
    </div>
  );
}
