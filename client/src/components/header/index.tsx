import { Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FlexBox } from "../flex-box/flex-box";
import { StyledBox } from "./style";

export const Header = () => {
  const router = useRouter();
  const [accesstoken, setAccestoken] = useState("");
  const token = Cookies.get("accesstoken");

  useEffect(() => {
    setAccestoken(token ?? "");
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("accesstoken");
    router.push("/login");
  };
  return (
    <StyledBox>
      <Link href={'/'}>
        <Typography variant="h4" color="primary">
          TaskManager
        </Typography>
      </Link>
      {accesstoken ? (
        <FlexBox alignItems={"center"}>
          <Button variant="contained" color="primary" onClick={handleLogout}>
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
