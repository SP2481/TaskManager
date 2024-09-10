import { FlexBoxCentered } from "@/components/flex-box/flex-box";
import {
  LoginInputs,
  LoginValiDationSchema,
} from "@/components/validation-schema/login-input";
import { loginUser } from "@/utils/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface LoginComponentProps {
  onToggleForm: () => void;
}

const LoginComponent = ({ onToggleForm }: LoginComponentProps) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginValiDationSchema),
  });
  const onSubmit = async (data: LoginInputs) => {
    try {
      setLoading(true);
      await loginUser(data);
      router.push("/");
      router.refresh()
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);
      setIsError(true);
      setErrMsg(err?.response?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <h2>Login</h2>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary">
          {loading ? <CircularProgress sx={{ color: "white" }} /> : "Login"}
        </Button>
        {isError && <small style={{ color: "red" }}>{errMsg}</small>}
        <FlexBoxCentered gap={2}>
          <Divider sx={{ width: "40%", borderWidth: "0.01rem" }} />
          <small style={{ color: "#7B7B7B" }}>or</small>
          <Divider sx={{ width: "40%", borderWidth: "0.01rem" }} />
        </FlexBoxCentered>
        <Typography textAlign={"center"} component={"small"}>
          Don&apos;t have an account?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={onToggleForm}
          >
            SignUp
          </span>{" "}
        </Typography>
      </Stack>
    </form>
  );
};

export default LoginComponent;
