import React, { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";

const NewCourse = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    nomeDisciplina: "",
    cargaHoraria: "",
    professor: "",
    turma: "",
    ementa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Dados salvos:", formData);
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
          name="nomeDisciplina"
          fullWidth
          margin="normal"
          value={formData.nomeDisciplina}
          onChange={handleChange}
        />
        <TextField
          label="Carga horária"
          name="cargaHoraria"
          select
          fullWidth
          margin="normal"
          value={formData.cargaHoraria}
          onChange={handleChange}
        >
            <MenuItem value="40h">40h</MenuItem>
            <MenuItem value="60h">60h</MenuItem>
            <MenuItem value="80h">80h</MenuItem>
        </TextField>
        <TextField
          label="Professor"
          name="professor"
          select
          fullWidth
          margin="normal"
          value={formData.professor}
          onChange={handleChange}
        >
            <MenuItem value="Rafael">Rafael</MenuItem>
            <MenuItem value="Amália">Amália</MenuItem>
            <MenuItem value="Abraão">Abraão</MenuItem>
        </TextField>
        <TextField
          label="Turma"
          name="turma"
          select
          fullWidth
          margin="normal"
          value={formData.turma}
          onChange={handleChange}
        >
          <MenuItem value="Turma A">Turma A</MenuItem>
          <MenuItem value="Turma B">Turma B</MenuItem>
          <MenuItem value="Turma C">Turma C</MenuItem>
        </TextField>
        <TextField
          label="Ementa"
          name="ementa"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={formData.ementa}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
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
