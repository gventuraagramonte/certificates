import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const Navbar = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Revisamos si el usuario esta logeado en base
  //   // a la presencia del token
  //   const token = Cookies.get("token");
  //   const fullName = Cookies.get("fullName");
  //   if (token) {
  //     const user = getFullNameFromToken(fullName);
  //     console.log({ user });
  //     setUser(user);
  //   } else {
  //     setUser(null);
  //   }
  // }, []);

  // const getUserFromToken = (token) => {
  //   return JSON.parse(atob(token.split(".")[1]));
  // };
  // const getFullNameFromToken = (fullName) => {
  //   return fullName;
  // };

  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const token = Cookies.get("token");
  const fullName = Cookies.get("fullName");
  const email = Cookies.get("email");
  const user = token ? jwt.decode(token) : null;
  const userModify = JSON.stringify(user);

  useEffect(() => {
    setUsuarioPaUsarlo();
  }, []);

  // TODO!: Modificar para que luego valide el token
  const setUsuarioPaUsarlo = async () => {
    if (userModify.length > 10) {
      setUsuario(fullName);
      setCorreo(email);
    } else {
      console.error("no se pudo F");
    }
  };

  // Cuando cerramos sesion borramos el token
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("fullName");
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Monitoreo
        </Typography>
        <NextLink href="/" passHref legacyBehavior>
          <Button color="inherit" component={Link}>
            Home
          </Button>
        </NextLink>
        <NextLink href="/create" passHref legacyBehavior>
          <Button color="inherit" component={Link}>
            Create
          </Button>
        </NextLink>

        {usuario ? (
          <>
            <NextLink href={`/user/${correo}`} passHref legacyBehavior>
              <Button color="inherit" component={Link}>
                {usuario}
              </Button>
            </NextLink>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <NextLink href="/login" passHref legacyBehavior>
            <Button color="inherit" component={Link}>
              Login
            </Button>
          </NextLink>
        )}
      </Toolbar>
    </AppBar>
  );
};
