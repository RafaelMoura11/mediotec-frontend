import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import usersFunctions from "../../utils/usersFunctions";
import { useAppContext } from '../../context/AppContext';
import classesFunctions from "../../utils/classesFunctions";
import coursesFunctions from "../../utils/coursesFunctions";
import relationshipFunctions from "../../utils/relationshipFunctions";

const NewCourse = ({ open, handleClose }) => {
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    courseName: "",
    workload: "",
    teacher: "",
    class: "",
    description: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  

  useEffect(() => {
    const getAllTeachersAndClasses = async () => {
      try {
        const allTeachers = await usersFunctions.getAllTeachers(user.token);
        const { data: allClasses} =  await classesFunctions.getAllClasses(user.token);
        setTeachers(allTeachers);
        setClasses(allClasses);
      } catch (e) {
        console.log("Something went wrong.")
      }
    };
    getAllTeachersAndClasses();
  }, [user.token])

  const clearForm = () => {
    return setFormData({
      courseName: "",
      workload: "",
      teacher: "",
      class: "",
      description: "",
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const { data: { course: { courseId } } } = await coursesFunctions.createNewCourse({
      courseName: formData.courseName,
      description: formData.description,
      workload: Number(formData.workload)
    });
    if (formData.teacher && formData.class) {
      await relationshipFunctions.createRelationship({
        courseId,
        userId: formData.teacher,
        classId: formData.class
      });
    }
    clearForm();
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
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "400px",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, bgcolor: "purple", color: "white", p: 1, borderRadius: 1 }}>
          Nova Disciplina
        </Typography>
        <TextField
          label="Nome da disciplina"
          name="courseName"
          fullWidth
          margin="normal"
          value={formData.courseName}
          onChange={handleChange}
        />
        <TextField
          label="Carga horária"
          name="workload"
          select
          fullWidth
          margin="normal"
          value={formData.workload}
          onChange={handleChange}
        >
            <MenuItem value="40">40h</MenuItem>
            <MenuItem value="60">60h</MenuItem>
            <MenuItem value="80">80h</MenuItem>
        </TextField>
        <TextField
          label="Professor"
          name="teacher"
          select
          fullWidth
          margin="normal"
          value={formData.teacher}
          onChange={handleChange}
        >
            {
              teachers.map((teacher) => <MenuItem value={ teacher.userId }>{ teacher.userName }</MenuItem>)
            }
        </TextField>
        <TextField
          label="Turma"
          name="class"
          select
          fullWidth
          margin="normal"
          value={formData.class}
          onChange={handleChange}
        >
          {
            classes.map((c) => <MenuItem value={ c.classId }>{ c.className }</MenuItem>)
          }
        </TextField>
        <TextField
          label="Ementa"
          name="description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => {
            clearForm()
            handleClose()
            }}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewCourse;
