import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";

export const Navbar = () => {
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
};
