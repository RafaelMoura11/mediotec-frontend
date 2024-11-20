import React, { useEffect, useState } from "react";
import coursesFunctions from "../utils/coursesFunctions";
import NewCourse from "./modals/NewCourse";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllCourses = async () => {
    const { data } = await coursesFunctions.getAllCourses();
    setCourses(data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
          </li>
        ))}
      </ul>

      <NewCourse open={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
}
