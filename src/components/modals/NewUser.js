import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useAppContext } from '../../context/AppContext';
import usersFunctions from "../../utils/usersFunctions";

const NewUser = ({ open, handleClose, getAllUsers }) => {
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    dateOfBirth: "",
    role: "STUDENT",  // Exemplo de um campo para definir o papel (ROLE)
    gender: "MALE",  // Exemplo de gender
    image: "",
    familyContact: "",
    affiliation: "",
  });

  useEffect(() => { }, [user.token]);

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      cpf: "",
      phone: "",
      dateOfBirth: "",
      role: "STUDENT",
      gender: "MALE",
      image: "",
      familyContact: "",
      affiliation: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    await usersFunctions.createNewUser({
      userName: formData.name,
      email: formData.email,
      password: formData.password,
      cpf: formData.cpf,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      role: formData.role,
      gender: formData.gender,
      image: formData.image,
      familyContact: formData.familyContact,
      affiliation: formData.affiliation,
    });
    await getAllUsers();
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
          p: 0,
          borderRadius: 2,
          boxShadow: 24,
          width: { xs: "90%", sm: "500px" }, // 90% em telas pequenas
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, bgcolor: "#7326BF", color: "white", p: 3 }}>
          Novo Usuário
        </Typography>

        <div className="imput-modal">
          <TextField
            label="Nome"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Senha"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="CPF"
            name="cpf"
            fullWidth
            margin="normal"
            value={formData.cpf}
            onChange={handleChange}
          />
          <TextField
            label="Telefone"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Data de Nascimento"
            name="dateOfBirth"
            type="date"
            fullWidth
            margin="normal"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Imagem"
            name="image"
            fullWidth
            margin="normal"
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            label="Contato Familiar"
            name="familyContact"
            fullWidth
            margin="normal"
            value={formData.familyContact}
            onChange={handleChange}
          />
          <TextField
            label="Afiliação"
            name="affiliation"
            fullWidth
            margin="normal"
            value={formData.affiliation}
            onChange={handleChange}
          />
          <TextField
            label="Papel"
            name="role"
            select
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="STUDENT">Estudante</MenuItem>
            <MenuItem value="TEACHER">Professor</MenuItem>
          </TextField>
          <TextField
            label="Gênero"
            name="gender"
            select
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="MALE">Masculino</MenuItem>
            <MenuItem value="FEMALE">Feminino</MenuItem>
            <MenuItem value="OTHERS">Outros</MenuItem>
          </TextField>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => {
            clearForm();
            handleClose();
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

export default NewUser;
