"use client";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const StyledRow = styled(Card)(() => ({
  width: "100%",
  height: "auto",
  boxShadow: "1px 2px 1px 1px #CCC",
  cursor: "pointer",
}));

export const StyledCard = styled(Card)(() => ({
  maxWidth: "30rem",
  width: "20rem",
  height: "10rem",
  minHeight: "5rem",
  paddingTop: 10,
  borderRadius: "0.325rem",
  boxShadow: "1px 2px 1px 1px #CCC",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.01)",
    transition: "transform 200ms ease-in",
  },
}));

export const StyledDesc = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
}));
