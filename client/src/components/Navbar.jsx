import React from "react";
import { ActionIcon, Box, Flex, createStyles, rem, Group } from "@mantine/core";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import { notifications } from "@mantine/notifications";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex justify={"flex-end"} sx={{ width: "100%" }}>
      <Group sx={{ width: "60%" }} grow>
        <NavLink
          to="/home/content"
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#184d99" : "black",
            };
          }}
        >
          <ActionIcon style={{ color: "inherit" }}>
            <BiHomeAlt2 color="inherit" size="1.5rem" />
          </ActionIcon>
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#184d99" : "black",
            };
          }}
        >
          <ActionIcon style={{ color: "inherit" }}>
            <MdSubscriptions color="inherit" size="1.5rem" />
          </ActionIcon>
        </NavLink>
        <NavLink
          to="/selected-plan"
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#184d99" : "black",
            };
          }}
        >
          <ActionIcon style={{ color: "inherit" }}>
            <VscVmActive color="inherit" size="1.5rem" />
          </ActionIcon>
        </NavLink>
      </Group>

      <ActionIcon
        mr="md"
        onClick={() => {
          localStorage.removeItem("auth-token");

          notifications.show({
            title: "Logged out Successfully",
            message: "Login to Enjoy the App",
          });

          navigate("/login");
        }}
      >
        <FiLogOut size="1.25rem" color="#184d99" />
      </ActionIcon>
    </Flex>
  );
};

export default Navbar;
