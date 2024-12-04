import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";
import classesFunctions from "../../utils/classesFunctions";
import relationshipFunctions from "../../utils/relationshipFunctions";

const NewClass = ({ open, handleClose, getAllClasses }) => {
  const [formData, setFormData] = useState({
    className: "",
    year: "",
    teacherId: "",
    courseId: "",
    studentIds: [],
  });

  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtendo todos os dados de relacionamento de usuários
        const relationshipsData = await relationshipFunctions.getRelationshipsGroupedByUser();

        // Mapeando professores (role: "TEACHER")
        const teachersData = relationshipsData
          .filter((data) => data.user.role === "TEACHER")
          .map((data) => ({
            id: data.user.userId,
            name: data.user.userName,
          }));

        // Mapeando estudantes (role: "STUDENT")
        const studentsData = relationshipsData
          .filter((data) => data.user.role === "STUDENT")
          .map((data) => ({
            id: data.user.userId,
            name: data.user.userName,
          }));

        // Extraindo disciplinas de todos os relacionamentos
        const coursesData = relationshipsData.flatMap((data) =>
          data.relationships.map((rel) => ({
            id: rel.course.courseId,
            name: rel.course.courseName,
          }))
        );

        // Removendo duplicatas de disciplinas
        const uniqueCourses = coursesData.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c.id === course.id)
        );

        // Atualizando os estados
        setTeachers(teachersData);
        setStudents(studentsData);
        setCourses(uniqueCourses);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStudentChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, studentIds: value });
  };

  const handleSave = async () => {
    console.log(formData);
    const { className, year, teacherId, courseId, studentIds } = formData;
    const { classId } = await classesFunctions.createNewClass({
      className,
      year: Number(year)
    });
    await relationshipFunctions.createRelationship({
      courseId,
      userId: teacherId,
      classId: classId
    });
    studentIds.forEach(async (studentId) => await relationshipFunctions.createRelationship({
      courseId,
      userId: studentId,
      classId: classId
    }))
    await getAllClasses();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
         sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 0,
          borderRadius: 2,
          boxShadow: 24,
          width: { xs: "90%", sm: "500px" }, // 90% em telas pequenas
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, bgcolor: "#7326BF", color: "white", p: 3 }}>
          Nova Turma
        </Typography>

        <div className="imput-modal">
          <TextField
            label="Nome da Turma"
            name="className"
            fullWidth
            margin="normal"
            value={formData.className}
            onChange={handleChange}
          />
          <TextField
            label="Ano"
            name="year"
            type="number"
            fullWidth
            margin="normal"
            value={formData.year}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Professor</InputLabel>
            <Select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Disciplina</InputLabel>
            <Select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Alunos</InputLabel>
            <Select
              multiple
              value={formData.studentIds}
              onChange={handleStudentChange}
              renderValue={(selected) =>
                selected.map((id) => students.find((s) => s.id === id)?.name).join(", ")
              }
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  <Checkbox checked={formData.studentIds.includes(student.id)} />
                  <ListItemText primary={student.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal >
  );
};

export default NewClass;
