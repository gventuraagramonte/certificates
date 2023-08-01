import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Monitoreo
        </Typography>
        <NextLink href="/" passHref legacyBehavior>
          <Button color="inherit" component={Link}>
            Home
          </Button>
        </NextLink>
        {!user ? (
          <>
            <NextLink href="/login" passHref legacyBehavior>
              <Button color="inherit" component={Link}>
                Login
              </Button>
            </NextLink>
          </>
        ) : (
          <>
            <NextLink href="/create" passHref legacyBehavior>
              <Button color="inherit" component={Link}>
                Create
              </Button>
            </NextLink>
            <NextLink href={`/user/${user.email}`} passHref legacyBehavior>
              <Button color="inherit" component={Link}>
                Hola
              </Button>
            </NextLink>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
