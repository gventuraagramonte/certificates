import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { UserContext } from "@/context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  //const { email, fullName } = user;
  const fullName = Cookies.get("fullName");
  const email = Cookies.get("email");
  console.log("Estoy en el navbar iniciando: ", user);
  console.log("Etoy en el navbar buscnado el ful: ", email);
  // Esto sirve
  // const [usuario, setUsuario] = useState("");
  // const token = Cookies.get("token");
  // const fullName = Cookies.get("fullName");
  // const user = token ? jwt.decode(token) : null;
  // const userModify = JSON.stringify(user);

  // useEffect(() => {
  //   setUsuarioPaUsarlo();
  // }, []);

  // // TODO!: Modificar para que luego valide el token
  // const setUsuarioPaUsarlo = async () => {
  //   if (userModify.length > 10) {
  //     setUsuario(fullName);
  //   } else {
  //     console.error("no se pudo F");
  //   }
  // };

  // Cuando cerramos sesion borramos el token
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("email");
    window.location.reload();
  };

  // if (!user) {
  //   return (
  //     <>
  //       <div>Loading...</div>
  //     </>
  //   );
  // }
  if (!user) {
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

          <NextLink href="/login" passHref legacyBehavior>
            <Button color="inherit" component={Link}>
              Login
            </Button>
          </NextLink>
        </Toolbar>
      </AppBar>
    );
  }

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

        <>
          <NextLink href={`/user/${email}`} passHref legacyBehavior>
            <Button color="inherit" component={Link}>
              {fullName}
            </Button>
          </NextLink>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
