import React, { useState } from "react";
import { Box, Flex } from "@mantine/core";
import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  SimpleGrid,
  rem,
} from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const images = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
];

const Home = () => {
  const [activeImage, setActiveImage] = useState(
    "https://images.unsplash.com/photo-1444084316824-dc26d6657664?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
  );
  const { isSubscribe } = useSelector((state) => state.counter);
  return (
    <Flex
      sx={{
        width: "100vw",
        color: "black",
      }}
      justify="center"
      align="center"
    >
      <Box sx={{ width: "30rem", height: "60%" }}>
        <Card
          size="sm"
          withBorder
          shadow="sm"
          radius="md"
          sx={{ width: "30rem" }}
        >
          <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
              <Text weight={500}>Review pictures</Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size="1rem" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconFileZip size={rem(14)} />}>
                    Download zip
                  </Menu.Item>
                  <Menu.Item icon={<IconEye size={rem(14)} />}>
                    Preview all
                  </Menu.Item>
                  <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Text mt="sm" color="dimmed" size="sm">
            <Text component="span" inherit color="blue">
              200+ images uploaded
            </Text>{" "}
            since last visit, review them to select which one should be added to
            your gallery
          </Text>

          <Card.Section mt="sm">
            <Image src={activeImage} />
          </Card.Section>

          <Card.Section inheritPadding mt="sm" pb="md">
            <SimpleGrid cols={3}>
              {images.map((image) => (
                <Image
                  src={image}
                  key={image}
                  radius="sm"
                  onClick={() => isSubscribe && setActiveImage(image)}
                />
              ))}
            </SimpleGrid>
          </Card.Section>
        </Card>
      </Box>
    </Flex>
  );
};

export default Home;
