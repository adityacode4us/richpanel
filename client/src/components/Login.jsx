import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  createStyles,
  rem,
  Paper,
  Text,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  registerBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#174d98",
  },
  paper: {
    width: rem("22rem"),
    borderRadius: theme.radius.md,
    padding: 40,
  },
}));

const Login = ({ onLogin }) => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const [windowAuth, setWindowAuth] = useState(
    localStorage.getItem("auth-token")
  );
  const [userLoading, setUserLoading] = useState(false);
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";

  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const accessUser = async () => {
    const authToken = localStorage.getItem("auth-token");
    console.log(authToken);
    setUserLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/access`,
        {},

        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("auth-token")),
          },
        }
      );
      setUser(data);
      setUserLoading(false);
    } catch (error) {
      console.log(error);
      setUserLoading(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    accessUser();
  }, []);
  useEffect(
    () => {
      if (user !== null) {
        navigate("/");
      }
    },
    { user }
  );
  return (
    <Flex align={"center"} justify={"center"} className={classes.registerBox}>
      <Paper shadow="xs" className={classes.paper}>
        <form>
          <Text align="center" fz="lg" fw={600}>
            Login to your Account
          </Text>
          <TextInput
            mt="sm"
            placeholder="Your Email"
            label="Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />

          <PasswordInput
            mt="sm"
            value={userInfo.password}
            label="Password"
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            placeholder="Type Password"
          />
          <Checkbox
            mt="sm"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            label="Remember Me"
          />
          <Button
            mt="lg"
            w="100%"
            fz="sm"
            fw={400}
            sx={{ backgroundColor: "#184d99" }}
            styles={(theme) => ({
              root: {
                "&:hover": {
                  backgroundColor: "#184d99",
                },
              },
            })}
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const { data } = await axios.post(
                `${baseUrl}/api/login`,
                userInfo,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(data);
              localStorage.setItem(
                "auth-token",
                JSON.stringify(data.authtoken)
              );
              notifications.show({
                title: "Logged in Successfully",
                message: "Login Successfully, Cheers",
              });
              navigate("/");
            }}
          >
            Login
          </Button>
          <Group
            mt="lg"
            align="center"
            spacing={3}
            sx={{ justifyContent: "center" }}
            fz="xs"
          >
            <Text>New to MyApp?</Text>
            <Button
              size="xs"
              variant="subtle"
              styles={(theme) => ({
                root: {
                  padding: 0,
                  fontWeight: 400,
                  "&:hover": {
                    backgroundColor: theme.white,
                  },
                },
              })}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
};

export default Login;
