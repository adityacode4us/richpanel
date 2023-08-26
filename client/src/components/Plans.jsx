import React, { useState } from "react";
import {
  Title,
  Box,
  Flex,
  Tabs,
  createStyles,
  rem,
  Group,
  Text,
  Button,
} from "@mantine/core";
import PlanView from "./PlanView.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, setActivePlan } from "../features/RichpanelSlice.js";

const useStyles = createStyles((theme) => ({
  tabs: {
    // height: "100%",
    width: "80%",
    marginTop: theme.spacing.sm,
    color: theme.white,
    "& 	.mantine-Tabs-tab": {
      color: theme.white,
      padding: rem(10),
      paddingLeft: 0,
      fontSize: theme.fontSizes.xs,
      fontWeight: 400,
    },
    "& 	.mantine-Tabs-tab[data-active='true']": {
      backgroundColor: theme.white,
      color: "#184d99",
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
      "&:hover": {
        backgroundColor: theme.white,
        color: "#184d99",
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
      },
    },
    "& 	.mantine-Tabs-tab:hover": {
      backgroundColor: theme.white,
      color: "#184d99",
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },
    "& .mantine-Tabs-panel": {
      height: "90%",
      overflow: "auto",
    },
  },
  tablist: {
    backgroundColor: "#184d99",
    borderRadius: rem(30),
    width: "12rem",
    padding: rem(10),
    height: rem(60),
    border: `1px solid ${theme.colors.gray[4]}`,
  },
}));

const Plans = () => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeTab, activePlan } = useSelector((state) => state.counter);

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
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title order={3}>Choose the right plan for you</Title>
      <Tabs
        variant="pills"
        radius="xl"
        value={activeTab}
        onTabChange={(value) => dispatch(setActiveTab(value))}
        className={classes.tabs}
      >
        <Flex align={"center"} justify={"space-between"}>
          <Box width="37%">
            <Tabs.List grow className={classes.tablist}>
              <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
              <Tabs.Tab value="yearly">Yearly</Tabs.Tab>
            </Tabs.List>
          </Box>

          <Group grow sx={{ width: "63%" }}>
            {planNames.map((plan, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => dispatch(setActivePlan(index))}
                  sx={{
                    backgroundColor: "#184d99",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: rem("7rem"),
                    height: rem("7rem"),
                    marginRight: index === 3 ? 0 : theme.spacing.md,
                    position: "relative",
                    opacity: index === activePlan ? 1 : 0.5,
                    cursor: "pointer",
                  }}
                >
                  <Text>{plan}</Text>
                  <Box
                    sx={{
                      position: "absolute",
                      height: "10px",
                      width: "10px",
                      bottom: "-5px",
                      backgroundColor: "#184d99",
                      transform: "rotate(45deg)",
                      display: index === activePlan ? "" : "none",
                    }}
                  ></Box>
                </Box>
              );
            })}
          </Group>
        </Flex>

        <Tabs.Panel value="monthly">
          <PlanView data={data} activePlan={activePlan} />
        </Tabs.Panel>
        <Tabs.Panel value="yearly">
          <PlanView data={yearlydata} activePlan={activePlan} />
        </Tabs.Panel>
        <Flex justify={"center"}>
          <Button
            my="xl"
            fz="sm"
            fw={400}
            sx={{ width: "400px", backgroundColor: "#184d99" }}
            styles={(theme) => ({
              root: {
                "&:hover": {
                  backgroundColor: "#184d99",
                },
              },
            })}
            onClick={() => navigate("/payment")}
          >
            Next
          </Button>
        </Flex>
      </Tabs>
    </Box>
  );
};

export default Plans;
