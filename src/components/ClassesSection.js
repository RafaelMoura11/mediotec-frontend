import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <h3>Gerenciamento de Turmas</h3>
      <button onClick={handleModalOpen}>Adicionar</button>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem.classId}>
            <h5>{classItem.className}</h5>
            <p>{classItem.year}</p>
            <div>
              {/* <button onClick={() => handleUpdate(classItem)}>Atualizar</button> */}
              <button onClick={() => handleDelete(classItem.classId)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <NewClass open={isModalOpen} handleClose={handleModalClose} getAllClasses={getAllClasses} />
      {/* <UpdateClass open={isUpdateModalOpen} handleClose={handleUpdateModalClose} classToUpdate={classToUpdate} getAllClasses={getAllClasses} /> */}
    </div>
  );
}
