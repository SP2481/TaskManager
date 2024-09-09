"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useState } from "react";
import LoginComponent from "./sections/login";
import RegisterComponent from "./sections/register";

const LogIn = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "30rem",
          maxWidth: "35rem",
          height: "30rem",
          padding: "2rem",
        }}
      >
        {isLogin ? (
          <LoginComponent onToggleForm={toggleForm} />
        ) : (
          <RegisterComponent onToggleForm={toggleForm} />
        )}
      </Card>
    </Box>
  );
};

export default LogIn;
