import { Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FlexBox } from '../flex-box/flex-box';
import { StyledBox } from "./style";

export const Header = () => {
  const router = useRouter()
  const [accesstoken , setAccestoken] =  useState('')

  useEffect(() => {
    // Only check for the access token after component has mounted
    const token = Cookies.get('accesstoken');
    setAccestoken(token ?? "");
  }, [accesstoken]);

  const handleLogout = () => {
    Cookies.remove('accesstoken');
    router.push("/login")
  }
  return (
    <StyledBox>
      <Typography variant="h4" color="primary">
        TaskManager
      </Typography>
        { accesstoken ? (
        <FlexBox alignItems={"center"}>
          <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
        </FlexBox>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      )}
    </StyledBox>
  );
};
