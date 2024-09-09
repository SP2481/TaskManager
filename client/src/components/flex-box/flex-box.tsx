import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

interface FlexBoxCenteredProps extends BoxProps {
  children: ReactNode;
}

export const FlexBoxCentered = ({
  children,
  ...props
}: FlexBoxCenteredProps) => {
  return (
    <Box
      {...props}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {children}
    </Box>
  );
};

export const FlexBoxColumnCentered = ({
  children,
  ...props
}: FlexBoxCenteredProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const FlexBox = ({ children, ...props }: FlexBoxCenteredProps) => {
  return (
    <Box sx={{ display: "flex" }} {...props}>
      {children}
    </Box>
  );
};
