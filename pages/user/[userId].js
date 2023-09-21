import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Box, Typography } from "@mui/material";
import List from "@/components/List";

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
        const decodeToken = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET
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
      <Box p={2} x={{ marginTop: 10 }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h4">Bienvenido {user.fullName}</Typography>
      <List />
    </Box>
  );
};

export default UserDetails;
