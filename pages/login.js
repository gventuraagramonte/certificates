import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { login } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      const { token, fullName } = response;

      // Guardamos el token en una cookie para hacer
      // la sesion permanente
      Cookies.set("token", token);
      Cookies.set("fullName", fullName);
      Cookies.set("email", email);

      // Mostramos una notificacion
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnFocusLoss: false,
      });

      router.push("/");
    } catch (error) {
      console.log("Error logging in: ", error);
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnFocusLoss: false,
      });
    }
  };

  // Valida si algun campo esta vacio return true o false
  const areFieldsEmpty = Object.values([email, password]).some(
    (value) => value === ""
  );

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: "20px", border: "2px solid grey", borderRadius: "5px" }}
    >
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={areFieldsEmpty}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
