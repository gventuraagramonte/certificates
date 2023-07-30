import { Container, CssBaseline } from "@mui/material";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </>
  );
}
