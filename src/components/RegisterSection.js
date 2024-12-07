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
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import loginFunctions from "../utils/loginFunctions";
import { useNavigate } from "react-router-dom";

const RegisterSection = () => {
  const navigate = useNavigate();

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
    return formattedDate.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      dateOfBirth: formatDateOfBirth(formData.dateOfBirth),
    };

    try {
      const response = await loginFunctions.register(formattedData);
      console.log(response);
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
        height: "100%",
        bgcolor: "#9747ff",
        margin: 0,
        paddingTop: "70px",
        paddingBottom: "75px"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "60%",
          bgcolor: "white",
          borderRadius: "12px",
          p: 4,
          boxShadow: 3,
          textAlign: "center",
          margin: "60px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "#9747ff", fontWeight: "bold" }}>
          Registro de Usuário
        </Typography>

        <Grid container spacing={2}>
          {/* Nome Completo */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome Completo"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* CPF */}
          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              fullWidth
            />
          </Grid>

          {/* Senha */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              fullWidth
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
          </Grid>

          {/* Telefone */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Data de Nascimento */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Data de Nascimento"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} md={6}>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="STUDENT">Aluno</MenuItem>
              <MenuItem value="TEACHER">Professor</MenuItem>
              <MenuItem value="COORDINATOR">Coordenador</MenuItem>
            </Select>
          </Grid>

          {/* Gender */}
          <Grid item xs={12} md={6}>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="MALE">Masculino</MenuItem>
              <MenuItem value="FEMALE">Feminino</MenuItem>
              <MenuItem value="OTHER">Outro</MenuItem>
            </Select>
          </Grid>

          {/* Contato Familiar */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Contato Familiar"
              name="familyContact"
              value={formData.familyContact}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Afiliação */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Afiliação"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          variant="outlined"
          component="label"
          fullWidth
          startIcon={<UploadFileIcon />}
          sx={{ mt: 3, mb: 3 }}
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
            bgcolor: "#9747ff",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": {
              bgcolor: "#9747ff",
            },
          }}
        >
          Registrar
        </Button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#ffffff",
              color: "#9747ff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Já tem uma conta? Faça login
          </button>
        </div>
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
