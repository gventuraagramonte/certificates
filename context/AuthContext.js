import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in by reading the token from cookies
    const token = cookies.get("token");
    const fullName = cookies.get("fullName");
    if (token) {
      // If the token exists, fetch the user data using the token
      if (token) {
        try {
          const decodedToken = jwt.verify(
            token,
            process.env.NEXT_PUBLIC_JWT_SECRET
          );
          const { email } = decodedToken;
          setUser({ email, fullName });
        } catch (error) {
          console.error("Token invalido: ", error);
          cookies.remove("token");
          setUser(null);
        }
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://monitoreoniubiz.com/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      const { token, ...userData } = response.data;

      // Store the token in cookies
      cookies.set("token", token, { expires: 1 }); // You can adjust the expiration time here
      cookies.set("fullName", userData.fullName);

      // Set the user state with the fetched user data
      setUser(userData);

      return true; // Login successful
    } catch (error) {
      console.error("Error logging in:", error);
      return false; // Login failed
    }
  };

  const logout = () => {
    // Remove the token from cookies and reset the user state
    cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
