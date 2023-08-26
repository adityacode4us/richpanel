import React, { useState } from "react";
import {
  Box,
  Flex,
  createStyles,
  rem,
  Text,
  TextInput,
  Button,
  Stack,
} from "@mantine/core";
import { BsCreditCard } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { setIsSubscribe } from "../features/RichpanelSlice";

const FirstPayment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const { activeTab, activePlan } = useSelector((state) => state.counter);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const baseUrl = "https://fair-lime-yak-shoe.cyclic.cloud";
  const addSubscription = async () => {
    try {
      console.log({ activePlan, activeTab });
      const { data } = await axios.post(
        `${baseUrl}/api/addSubscription`,
        { activePlan, activeTab },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("auth-token")),
          },
        }
      );
      const result = data.subscribed;
      console.log("result is", result);
      notifications.show({
        title: "Subscription added successfully",
        message: "Successfully Added Subscription",
        color: "teal",
      });
      dispatch(setIsSubscribe(true));

      navigate("/home/content");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      justify={"center"}
      align={"center"}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#184d99",
      }}
    >
      <Box
        sx={{
          width: rem("23rem"),
          height: "15rem",
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          color: "black",
          padding: "30px 20px",
        }}
      >
        <Text fz="xl" fw={700}>
          Complete Payment
        </Text>
        <Text fz="xs" fw={400} color="gray">
          Enter your credit or debit cards below
        </Text>
        <TextInput
          my="md"
          color="#8f8f8d"
          value={cardNumber}
          leftIcon={<BsCreditCard size="1.15rem" />}
          placeholder="Card number"
          rightSection={<Text color="#8f8f8d">MM / YY CVC</Text>}
          rightSectionWidth={120}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <Button
          fz="sm"
          fw={400}
          mt="sm"
          sx={{ backgroundColor: "#184d99" }}
          styles={(theme) => ({
            root: {
              "&:hover": {
                backgroundColor: "#184d99",
              },
            },
          })}
          onClick={() => {
            if (cardNumber.length != 16) {
              notifications.show({
                title: "Please enter correct card number",
                message: "Please enter correct card number",
                color: "red",
              });
            } else {
              addSubscription();
            }
            // navigate("/payment-confirm");
          }}
        >
          Confirm Payment
        </Button>
      </Box>
      <Box
        sx={{
          width: rem("16.5rem"),
          height: "15rem",
          backgroundColor: "#f6f5f4",
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          color: "black",
          padding: "30px 20px",
        }}
      >
        <Text fz="xl" fw={700}>
          Order Summary
        </Text>
        <Stack
          sx={{
            fontSize: "13px",
            fontWeight: 400,
            color: "black",
            marginTop: 20,
          }}
        >
          <Flex
            sx={{
              borderBottom: `1px solid #e6e6e6`,
              justifyContent: "space-between",
            }}
          >
            <Text>Plan Name</Text>
            <Text fw={500}>{planNames[activePlan]}</Text>
          </Flex>
          <Flex
            sx={{
              borderBottom: `1px solid #e6e6e6`,
              justifyContent: "space-between",
            }}
          >
            <Text>Billing Cycle</Text>
            <Text fw={500}>{activeTab}</Text>
          </Flex>
          <Flex
            sx={{
              borderBottom: `1px solid #e6e6e6`,
              justifyContent: "space-between",
            }}
          >
            <Text>Plan Price</Text>
            <Text fw={500}>
              {activeTab === "monthly"
                ? data[0].attributes[activePlan][0]
                : yearlydata[0].attributes[activePlan][0]}
            </Text>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default FirstPayment;
