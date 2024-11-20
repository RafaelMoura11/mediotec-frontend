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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import loginFunctions from "../utils/loginFunctions";

const LoginSection = () => {
  const [userType, setUserType] = useState("Coordenador");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginFunctions.login({ email, password });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erro desconhecido.");
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
          maxWidth: "400px",
          bgcolor: "white",
          borderRadius: "12px",
          p: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "purple", fontWeight: "bold" }}>
          Login
        </Typography>
        {/* Tipo de Usuário */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <PersonIcon sx={{ mr: 2, color: "gray" }} />
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            fullWidth
            sx={{
              "& .MuiSelect-select": {
                padding: "10px",
              },
            }}
          >
            <MenuItem value="Coordenador">Coordenador</MenuItem>
            <MenuItem value="Professor">Professor</MenuItem>
            <MenuItem value="Aluno">Aluno</MenuItem>
          </Select>
        </Box>
        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <EmailIcon sx={{ mr: 2, color: "gray" }} />
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
          />
        </Box>
        {/* Senha */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <LockIcon sx={{ mr: 2, color: "gray" }} />
          <TextField
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </Box>
        {/* Botão de Login */}
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
          Entrar
        </Button>
      </Box>

      {/* Snackbar para erros */}
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

export default LoginSection;
