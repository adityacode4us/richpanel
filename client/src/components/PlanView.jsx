import React from "react";
import {
  Box,
  Flex,
  Text,
  rem,
  createStyles,
  Group,
  Stack,
  Divider,
} from "@mantine/core";
const useStyles = createStyles((theme) => ({}));

const PlanView = ({ data, activePlan }) => {
  const { classes, theme } = useStyles();
  return (
    <Box sx={{ color: theme.black, paddingTop: theme.spacing.lg }}>
      {data.map((d, index) => {
        return (
          <Flex
            key={index}
            justify={"space-between"}
            // align={"center"}
            sx={{
              borderBottom:
                index === data.length - 1 ? "" : "1.5px solid #dadad8",
              paddingTop: theme.spacing.sm,
              paddingBottom: theme.spacing.sm,
            }}
          >
            <Text mt={theme.spacing.md} w={"37%"}>
              {d.param}
            </Text>
            <Group grow align="flex-start" sx={{ width: "63%" }}>
              {d.attributes.map((attribute, ind) => {
                return (
                  <Flex
                    key={ind}
                    sx={{
                      width: rem("7rem"),
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginRight: ind === 3 ? 0 : theme.spacing.md,
                    }}
                  >
                    {attribute.map((a, i) => {
                      return (
                        <Text
                          align="center"
                          color={ind === activePlan ? "#184d99" : "#737372"}
                          key={i}
                          sx={{
                            width: "100%",
                            fontWeight: index === data.length - 1 ? 400 : 600,
                            marginBottom: theme.spacing.md,
                            marginTop: theme.spacing.md,
                            fontSize:
                              index === data.length - 1
                                ? theme.fontSizes.xs
                                : theme.fontSizes.sm,
                          }}
                        >
                          {a}
                        </Text>
                      );
                    })}
                  </Flex>
                );
              })}
            </Group>
          </Flex>
        );
      })}
    </Box>
  );
};

export default PlanView;
