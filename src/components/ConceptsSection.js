import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import usersFunctions from "../utils/usersFunctions";
import ViewConceptModal from "./modals/ViewConceptModal";

export default function ConceptsSection() {
  const { studentId } = useParams();
  const [disciplines, setDisciplines] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppContext();

  

  const fetchConcepts = async (courseId) => {
    const data = await usersFunctions.getConceptsByCourseAndStudent(studentId, courseId, user.token);
    setConcepts(data);
    setModalOpen(true);
  };

  const handleDisciplineClick = (discipline) => {
    setSelectedDiscipline(discipline);
    fetchConcepts(discipline.courseId);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDiscipline(null);
  };

  useEffect(() => {
    if (!user.token) {
        return navigate("/login");
      }
      const fetchDisciplines = async () => {
          const data = await usersFunctions.getDisciplinesByStudentId(studentId, user.token);
          setDisciplines(data);
        };
    fetchDisciplines();
  }, [navigate, studentId, user.token]);

  return (
    <div>
      <h3>Disciplinas</h3>
      <ul>
        {disciplines.map((discipline) => (
          <li key={discipline.courseId}>
            <h5>{discipline.course.courseName}</h5>
            <button onClick={() => handleDisciplineClick(discipline.course)}>
              Ver Conceito
            </button>
          </li>
        ))}
      </ul>

      <ViewConceptModal
        open={modalOpen}
        handleClose={handleModalClose}
        selectedDiscipline={selectedDiscipline}
        concepts={concepts}
      />
    </div>
  );
}
