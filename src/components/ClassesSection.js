import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import classesFunctions from "../utils/classesFunctions";
import NewClass from "./modals/NewClass";
// import UpdateClass from "./modals/UpdateClass";

export default function ClassesSection() {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  //   const [classToUpdate, setClassToUpdate] = useState(null);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const getAllClasses = async () => {
    const data = await classesFunctions.getAllClasses();
    setClasses(data);
  };

  //   const handleUpdate = (classItem) => {
  //     setClassToUpdate(classItem);
  //     setIsUpdateModalOpen(true);
  //   };

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

  //   const handleUpdateModalClose = () => {
  //     setIsUpdateModalOpen(false);
  //     setClassToUpdate(null);
  //   };

  return (
    <div>
      <h1 className="title">Gerenciamento de Turmas</h1>

      <div className="action-buttons">
        <div className="search-filters">
          <input type="text" placeholder="Procurar" className="search-input" />
          <select className="filter-select">
            <option value="">Filtro</option>
            {/* Adicionar funcionalidade */}
          </select>
          <button className="btn-add" onClick={handleModalOpen}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="classes-grid">
        {classes.map((classItem) => (
          <div className="class-card" key={classItem.classId}>
            <div className="class-card-header">
              <h5 className="class-title">{classItem.className}</h5>
              <p className="class-year">{classItem.year}</p>
            </div>
            <div className="class-card-footer">
              <button
                className="btn-edit"
                onClick={() => console.log("Editar turma", classItem.classId)}
              >
                <FaEdit />
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(classItem.classId)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn">← Anterior</button>
        <span className="pagination-page">1</span>
        <button className="pagination-btn">Próximo →</button>
      </div>

      <NewClass
        open={isModalOpen}
        handleClose={handleModalClose}
        getAllClasses={getAllClasses}
      />
    </div>
  );
}