import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import loginFunctions from "../utils/loginFunctions";

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    userName: "",
    cpf: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    role: "",
    image: null,
    gender: "",
    familyContact: "",
    affiliation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const formatDateOfBirth = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString(); // Retorna a data no formato ISO 8601
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatar dateOfBirth para DATETIME
    const formattedData = { ...formData, dateOfBirth: formatDateOfBirth(formData.dateOfBirth) };

    try {
      const response = await loginFunctions.register(formattedData);
      console.log(response); // Certifique-se de ver o que a função retorna no console
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao registrar usuário.");
      setSnackbarOpen(true);
    }
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "purple",
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "500px",
          bgcolor: "white",
          borderRadius: "12px",
          p: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "purple", fontWeight: "bold" }}>
          Registro de Usuário
        </Typography>

        <TextField
          label="Nome Completo"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* Telefone */}
        <TextField
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Data de Nascimento */}
        <TextField
          label="Data de Nascimento"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
        />

        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="STUDENT">Aluno</MenuItem>
          <MenuItem value="TEACHER">Professor</MenuItem>
          <MenuItem value="COORDINATOR">Coordenador</MenuItem>
        </Select>

        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="MALE">Masculino</MenuItem>
          <MenuItem value="FEMALE">Feminino</MenuItem>
          <MenuItem value="OTHER">Outro</MenuItem>
        </Select>

        <TextField
          label="Contato Familiar"
          name="familyContact"
          value={formData.familyContact}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Afiliação"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="outlined"
          component="label"
          fullWidth
          startIcon={<UploadFileIcon />}
          sx={{ mb: 3 }}
        >
          Upload de Foto
          <input
            type="file"
            name="image"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            padding: "10px",
            bgcolor: "purple",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": {
              bgcolor: "darkviolet",
            },
          }}
        >
          Registrar
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterSection;
