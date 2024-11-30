import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import classesFunctions from "../../utils/classesFunctions";

const UpdateClass = ({ open, handleClose, classToUpdate, getAllClasses }) => {
  const [formData, setFormData] = useState({
    className: "",
    year: "",
  });

  useEffect(() => {
    if (classToUpdate) {
      setFormData({
        className: classToUpdate.className,
        year: classToUpdate.year,
      });
    }
  }, [classToUpdate]);

  const clearForm = () => {
    setFormData({
      className: "",
      year: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await classesFunctions.updateClass(classToUpdate.classId, {
        className: formData.className,
        year: Number(formData.year),
      });
      await getAllClasses();
      clearForm();
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
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
          Atualizar Turma
        </Typography>
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

export default UpdateClass;
