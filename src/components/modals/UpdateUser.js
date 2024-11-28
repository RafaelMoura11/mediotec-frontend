import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useAppContext } from '../../context/AppContext';
import usersFunctions from "../../utils/usersFunctions";

const UpdateUser = ({ open, handleClose, userToUpdate, getAllUsers }) => {
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "",
    cpf: "",
    phone: "",
    dateOfBirth: "",
    image: "",
    gender: "",
    familyContact: "",
    affiliation: "",
  });

  useEffect(() => {
    if (userToUpdate) {
      setFormData({
        userName: userToUpdate.userName,
        email: userToUpdate.email,
        role: userToUpdate.role,
        cpf: userToUpdate.cpf,
        phone: userToUpdate.phone || "",
        dateOfBirth: userToUpdate.dateOfBirth || "",
        image: userToUpdate.image || "",
        gender: userToUpdate.gender,
        familyContact: userToUpdate.familyContact || "",
        affiliation: userToUpdate.affiliation || "",
      });
    }
  }, [user.token, userToUpdate]);

  const clearForm = () => {
    return setFormData({
      userName: "",
      email: "",
      role: "",
      cpf: "",
      phone: "",
      dateOfBirth: "",
      image: "",
      gender: "",
      familyContact: "",
      affiliation: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await usersFunctions.updateUserById(userToUpdate.userId, {
        userName: formData.userName,
        email: formData.email,
        role: formData.role,
        cpf: formData.cpf,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        image: formData.image,
        gender: formData.gender,
        familyContact: formData.familyContact,
        affiliation: formData.affiliation,
      }, user.token);
      await getAllUsers();
      clearForm();
      handleClose();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
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
          Atualizar Usuário
        </Typography>
        <TextField
          label="Nome"
          name="userName"
          fullWidth
          margin="normal"
          value={formData.userName}
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
          <MenuItem value="COORDINATOR">Coordenador</MenuItem>
        </TextField>
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
          label="Contato da Família"
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
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

export default UpdateUser;
