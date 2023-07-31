import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Container, CssBaseline } from "@mui/material";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const fullName = Cookies.get("fullName");
        const decodeToken = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET
        );
        const { email } = decodeToken;
        setUser({ email, fullName });
      } catch (error) {
        console.error("Ivalid token: ", error);
        Cookies.remove("token");
        Cookies.remove("fullName");
        setUser(null);
        router.push("/login");
      }
    } else {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
      />
      <Navbar user={user} />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </>
  );
};

export default App;
