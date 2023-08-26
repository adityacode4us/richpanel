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
  Flex,
} from "@mantine/core";

import Plans from "./Plans.jsx";
import Navbar from "./Navbar.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import SelectedPlan from "./SelectedPlan.jsx";
import Checkout from "./CheckoutForm.jsx";
import PaymentPanel from "./PaymentPanel.jsx";
import FirstPayment from "./FirstPayment.jsx";
import HomeContent from "./HomeContent.jsx";
import { setIsSubscribe } from "../features/RichpanelSlice.js";
import { useDispatch, useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  header: {},
}));

const Layout = () => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const { isSubscribe } = useSelector((state) => state.counter);
  console.log("user is subscribed", isSubscribe);
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";
  const dispatch = useDispatch();
  const isUserSubscribed = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/isUserSubscribed`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
      });
      const result = data.subscribed;
      dispatch(setIsSubscribe(result));
      if (result === true) {
        navigate("/home/content");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isUserSubscribed();
  }, []);
  return (
    <AppShell
      styles={{
        main: {
          color: theme.white,
          padding: 0,
          margin: 0,
          paddingTop: theme.spacing.md,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      // layout="alt"
      header={
        <Header height={{ base: 50, md: 50 }} className={classes.header}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Navbar />
          </div>
        </Header>
      }
    >
      <Flex h="100%" w="100%">
        <Box h="100%" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Plans />} />
            <Route path="/selected-plan" element={<SelectedPlan />} />
            <Route path="/payment" element={<FirstPayment />} />
            <Route path="/payment-confirm" element={<PaymentPanel />} />
            <Route path="/home/content" element={<HomeContent />} />
          </Routes>
        </Box>
      </Flex>
    </AppShell>
  );
};

export default Layout;
