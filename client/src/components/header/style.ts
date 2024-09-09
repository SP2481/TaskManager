"use client";
import { AppBar, styled } from "@mui/material";
import { FlexBox } from "../flex-box/flex-box";

export const StyledBox = styled(FlexBox)(() => ({
  height: "4rem",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
}));

export const SearchBox = styled(FlexBox)(() => ({
  background: "#AAA",
  height: "2rem",
  width: "10rem",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 1,
}));

export const StyledInput = styled("input")(() => ({
  height: "100%",
  width: "100%",
}));

export const TopBar = styled(AppBar)(() => ({
  height: "4rem",
  width: "100%",
  boxShadow: "2px 2px 2px 1px #CCC",
  backgroundColor: "transparent",
  position: "static",
}));
