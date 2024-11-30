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
import { useAppContext } from "../context/AppContext";

const LoginSection = () => {
  const [userType, setUserType] = useState("COORDINATOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginFunctions.login({ email, password });
      setUser({ token: user.data.token, role: user.data.role, userName: user.data.userName });
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
        bgcolor: "#9747ff",
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          bgcolor: "#9747ff",
          borderRadius: "12px",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "white", fontWeight: "bold" }}>
          Login
        </Typography>

        {/* Tipo de Usuário */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <PersonIcon sx={{ mr: 2, color: "white" }} />
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            fullWidth
            sx={{
              "& .MuiSelect-select": {
                padding: "10px", 
                bgcolor: 'white'
              },
            }}
          >
            <MenuItem value="STUDENT">Aluno</MenuItem>
            <MenuItem value="TEACHER">Professor</MenuItem>
            <MenuItem value="COORDINATOR">Coordenador</MenuItem>
          </Select>
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <EmailIcon sx={{ mr: 2, color: "white" }} />
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
        </Box>
        {/* Senha */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <LockIcon sx={{ mr: 2, color: "white" }} />
          <TextField
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ bgcolor: 'white', borderRadius: 1 }}
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
            bgcolor: "#FFFFFF",
            color: "#9747FF",
            fontWeight: "bold",
            borderRadius: "5px",
            "&:hover": {
              bgcolor: "#EFE2FF",
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
