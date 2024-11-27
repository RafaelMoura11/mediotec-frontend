import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useAppContext } from '../../context/AppContext';
import coursesFunctions from "../../utils/coursesFunctions";

const UpdateCourse = ({ open, handleClose, courseToUpdate }) => {
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    courseName: "",
    workload: "",
    description: "",
  });


  useEffect(() => {
    if (courseToUpdate) {
      setFormData({
        courseName: courseToUpdate.courseName,
        workload: courseToUpdate.workload,
        description: courseToUpdate.description,
      });
    }
  }, [user.token, courseToUpdate]);

  const clearForm = () => {
    return setFormData({
      courseName: "",
      workload: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await coursesFunctions.updateCourse(courseToUpdate.id, {
        courseName: formData.courseName,
        description: formData.description,
        workload: Number(formData.workload),
      });

      clearForm();
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
    }
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
          Atualizar Disciplina
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
            clearForm();
            handleClose();
          }}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSave}>
            Atualizar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateCourse;
