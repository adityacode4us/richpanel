import { useState, useEffect } from "react";
import {
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
  rem,
  Box,
  Loader,
} from "@mantine/core";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Plans from "./components/Plans.jsx";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout.jsx";

const useStyles = createStyles((theme) => ({
  header: {},
}));

function App() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      navigate("/login");
    }
  }, []);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      {localStorage.getItem("auth-token") === null ? (
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login onLogin={(value) => setAuthToken(value)} />}
          />
          <Route
            exact
            path="/register"
            element={<Register onLogin={(value) => setAuthToken(value)} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" exact element={<Layout />}></Route>
        </Routes>
      )}
    </Box>
  );
}

export default App;
