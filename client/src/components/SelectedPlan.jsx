import React, { useState, useEffect } from "react";
import {
  Box,
  createStyles,
  rem,
  Card,
  Badge,
  Text,
  Image,
  Button,
  Flex,
  Group,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useSelector, useDispatch } from "react-redux";
import { setIsSubscribe } from "../features/RichpanelSlice";

const useStyles = createStyles((theme) => ({}));

const SelectedPlan = () => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";
  const [activeOrCancelled, setActiveOrCancelled] = useState("Active");
  const [subscriptionState, setSubscriptionState] = useState({
    activeTab: "",
    activePlan: -1,
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);
  const planNames = ["Mobile", "Basic", "Standard", "Premium"];
  const data = [
    {
      param: "Monthly Price",
      attributes: [["₹ 100"], ["₹ 200"], ["₹ 500"], ["₹ 700"]],
    },
    {
      param: "Video Quality",
      attributes: [["Good"], ["Good"], ["Better"], ["Best"]],
    },
    {
      param: "Resolution",
      attributes: [["480p"], ["480p"], ["1080p"], ["4K+HDR"]],
    },
    {
      param: "Devices you can use to watch",
      attributes: [
        ["Phone", "Tablet"],
        ["Phone", "Tablet", "Computer", "TV"],
        ["Phone", "Tablet", "Computer", "TV"],
        ["Phone", "Tablet", "Computer", "TV"],
      ],
    },
  ];
  const yearlydata = [
    {
      param: "Yearly Price",
      attributes: [["₹ 1000"], ["₹ 2000"], ["₹ 5000"], ["₹ 7000"]],
    },
    {
      param: "Video Quality",
      attributes: [["Good"], ["Good"], ["Better"], ["Best"]],
    },
    {
      param: "Resolution",
      attributes: [["480p"], ["480p"], ["1080p"], ["4K+HDR"]],
    },
    {
      param: "Devices you can use to watch",
      attributes: [
        ["Phone", "Tablet"],
        ["Phone", "Tablet", "Computer", "TV"],
        ["Phone", "Tablet", "Computer", "TV"],
        ["Phone", "Tablet", "Computer", "TV"],
      ],
    },
  ];
  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/cancelSubscriptions`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("auth-token")),
          },
        }
      );
      setLoading(false);
      notifications.show({
        title: "Subscription Canceled",
        message: "Kindly choose any plan to continue watching",
        color: "red",
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const isUserSubscribed = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/isUserSubscribed`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
      });
      const result = data;
      setSubscriptionState(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isUserSubscribed();
  }, []);
  return (
    <Flex
      justify="center"
      align="center"
      sx={{ width: "100%", height: "100%", backgroundColor: "#174d98" }}
    >
      {subscriptionState.activePlan === -1 ? (
        <Text>
          You are a New Customer! Please choose any payment option to continue
        </Text>
      ) : (
        <Box>
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            w={rem("30rem")}
          >
            <Flex sx={{ display: "flex", justifyContent: "space-between" }}>
              <Group spacing={5}>
                <Text color={theme.colors.dark} fz="md" fw={550}>
                  Current Plan Details
                </Text>
                <Text
                  fz={12}
                  px="xs"
                  py={3}
                  sx={{
                    backgroundColor:
                      activeOrCancelled === "Active" ? "#bddcff" : "#fff0eb",
                    borderRadius: theme.radius.sm,
                    color:
                      activeOrCancelled === "Active" ? "#2665b7" : "#ff6446",
                    fontWeight: "bold",
                  }}
                >
                  {activeOrCancelled}
                </Text>
              </Group>
              <Button
                size="xs"
                variant="subtle"
                styles={(theme) => ({
                  root: {
                    padding: 0,
                    fontWeight: 400,
                    color: "#174d98",
                    display: activeOrCancelled === "Cancelled" ? "none" : "",
                    "&:hover": {
                      backgroundColor: theme.white,
                      color: "#174d98",
                    },
                  },
                })}
                onClick={() => {
                  cancelSubscription();
                  dispatch(setIsSubscribe(false));
                  setActiveOrCancelled("Cancelled");
                }}
              >
                Cancel
              </Button>
            </Flex>

            <Box py="sm">
              <Text color={theme.colors.gray[9]} fz="sm" fw={400}>
                {planNames[subscriptionState.activePlan]}
              </Text>
              <Text color={theme.colors.gray[6]} fz="xs" fw={300}>
                {data[3].attributes[subscriptionState.activePlan].join("+")}
              </Text>
            </Box>
            <Title order={3}>
              {subscriptionState.activeTab === "monthly"
                ? `${data[0].attributes[subscriptionState.activePlan]}/mo`
                : `${
                    yearlydata[0].attributes[subscriptionState.activePlan]
                  }/yr`}
            </Title>

            <Button
              fz="sm"
              fw={400}
              variant="outline"
              color="#174d98"
              mt="md"
              mb="xs"
              radius="sm"
              styles={(theme) => ({
                root: {
                  border: "1.76px solid #174d98",
                  color: "#174d98",
                },
              })}
              onClick={() => navigate("/")}
            >
              {activeOrCancelled === "active" ? "Change Plan" : "Choose Plan"}
            </Button>
            <Text
              my="xs"
              fz="xs"
              fw={400}
              px="xs"
              py={3}
              sx={{
                backgroundColor: "#f7f7f4",
                borderRadius: theme.radius.md,
                color: theme.colors.gray[8],
              }}
            >
              Your Subscription has started on Jul 11th, 2022 and will auto
              renew on July 12th 2023
            </Text>
          </Card>
        </Box>
      )}
    </Flex>
  );
};

export default SelectedPlan;
