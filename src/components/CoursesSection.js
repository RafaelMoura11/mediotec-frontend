import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
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
      await coursesFunctions.deleteCourse(courseId);
      setCourses(courses.filter(course => course.id !== courseId));
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
      <h3>Gerenciamento de Disciplinas</h3>
      <button onClick={handleModalOpen}>Adicionar</button>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h5>{course.courseName}</h5>
            <p>{course.workload}</p>
            <div>
              <button onClick={() => handleUpdate(course)}>Atualizar</button>
              <button onClick={() => handleDelete(course.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>

      <NewCourse open={isModalOpen} handleClose={handleModalClose} />
      <UpdateCourse open={isUpdateModalOpen} handleClose={handleUpdateModalClose} courseToUpdate={courseToUpdate} />
    </div>
  );
}
