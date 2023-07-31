import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Box, Typography } from "@mui/material";

const { useRouter } = require("next/router");

const UserDetails = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const fullName = Cookies.get("fullName");

    if (!token) {
      console.log("No hay token");
      router.push("/login");
    } else {
      try {
        console.log("Si hay token", process.env.JWT_SECRET);
        const decodeToken = jwt.verify(
          token,
          "shjagdcvhjgcdajsdvtyvwer2356312jhwgfved867123vds"
        );
        const { email } = decodeToken;
        setUser({ email, fullName });
      } catch (error) {
        console.error("Invalid token: ", error);
        router.push("/login");
      }
    }
  }, []);

  if (!user) {
    return (
      <Box p={2}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Bienvenido {user.fullName}</Typography>
    </Box>
  );
};

export default UserDetails;
