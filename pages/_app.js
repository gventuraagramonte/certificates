import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Container, CssBaseline } from "@mui/material";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    checkTokenValidity();
    const tokenCheckInterval = setInterval(checkTokenValidity, 10 * 60 * 1000);
    return () => {
      // Clear the timer when the app is unmounted
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const checkTokenValidity = () => {
    const token = Cookies.get("token");
    const fullName = Cookies.get("fullName");

    if (token && fullName) {
      try {
        jwt.decode(token);
      } catch (error) {
        console.error("Invalid token: ", error);
        // If token is invalid o expired
        Cookies.remove("token");
        Cookies.remove("fullName");
        router.push("/login");
      }
    } else {
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
      <Navbar />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </>
  );
}
