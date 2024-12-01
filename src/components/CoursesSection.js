import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import coursesFunctions from "../utils/coursesFunctions";
import NewCourse from "./modals/NewCourse";
import UpdateCourse from "./modals/UpdateCourse";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const navigate = useNavigate();
  const { user } = useAppContext();

  const getAllCourses = async () => {
    const { data } = await coursesFunctions.getAllCourses();
    setCourses(data);
  };

  const handleUpdate = (course) => {
    setCourseToUpdate(course);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (courseId) => {
    try {
      console.log(courseId);
      await coursesFunctions.deleteCourse(courseId);
      await getAllCourses();
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
    }
  };

  useEffect(() => {
    if (!user.token) {
      return navigate("/login");
    }
    getAllCourses();
  }, [navigate, user]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setCourseToUpdate(null);
  };

  return (
    <div>
      <h3 className="title">Gerenciamento de Disciplinas</h3>

      <div className="action-buttons">
        <button className="btn-add" onClick={handleModalOpen}>
          Adicionar
        </button>
        <button className="btn-delete">
          <FaTrashAlt size={16} style={{ marginRight: 8 }} />
        </button>
      </div>

      {/* <button className="btn-report" disabled>
        Relatório
      </button> */}

      <div className="search-filters">
        <input type="text" placeholder="Procurar" className="search-input" />
        <select className="filter-select">
          <option value="">Filtro</option>
          {/* Adicionar funcionalidade */}
        </select>
      </div>

      <ul className="courses-list">
        {courses.map((course) => (
          <li className="course-item" key={course.id}>
            <div className="course-info-container">
              <div className="course-info">
                <input type="checkbox" className="course-checkbox" />
                <div className="course-details">
                  <h5 className="course-name">{course.courseName} | Turma 1A24</h5>
                  <p className="course-workload">Carga Horária: {course.workload}</p>
                </div>
              </div>

              <button
                className="btn-edit"
                onClick={() => handleUpdate(course)}
              >
                <FaEdit size={16} style={{ marginRight: 8 }} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button className="pagination-btn">← Anterior</button>
        <span className="pagination-page">1</span>
        <button className="pagination-btn">Próximo →</button>
      </div>
      <NewCourse
        open={isModalOpen}
        handleClose={handleModalClose}
        getAllCourses={getAllCourses}
      />
      <UpdateCourse
        open={isUpdateModalOpen}
        handleClose={handleUpdateModalClose}
        courseToUpdate={courseToUpdate}
        getAllCourses={getAllCourses}
      />
    </div>
  );
}