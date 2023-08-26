import React, { useState, useEffect } from "react";
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
    height: rem("28rem"),
    borderRadius: theme.radius.md,
    padding: 40,
  },
}));

const Register = ({ onLogin }) => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";
  const [windowAuth, setWindowAuth] = useState(
    localStorage.getItem("auth-token")
  );
  const [userLoading, setUserLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
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
            Create Account
          </Text>
          <TextInput
            mt="sm"
            placeholder="Your name"
            label="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <TextInput
            mt="sm"
            placeholder="Your email"
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
            loading={userLoading}
            onClick={async (e) => {
              e.preventDefault();
              try {
                setUserLoading(true);
                const { data } = await axios.post(
                  `${baseUrl}/api/register`,
                  userInfo,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                setUserLoading(false);
                console.log(data);
                console.log("register data is", data.authToken);
                localStorage.setItem(
                  "auth-token",
                  JSON.stringify(data.access_token)
                );
                notifications.show({
                  title: "Registered Successfully",
                  message: "Register Successful, Cheers",
                });
                navigate("/");
                setUserLoading(false);
              } catch (error) {
                notifications.show({
                  title: error.message,
                  message: error.message,
                });
                setUserLoading(false);
              }
            }}
          >
            Sign Up
          </Button>
          <Group
            mt="lg"
            align="center"
            spacing={3}
            sx={{ justifyContent: "center" }}
            fz="xs"
          >
            <Text>Already have an account?</Text>
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
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
};

export default Register;
