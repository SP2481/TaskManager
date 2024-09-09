import { FlexBoxCentered } from "@/components/flex-box/flex-box";
import {
  Inputs,
  RegisterValiDationSchema,
} from "@/components/validation-schema/login-input";
import { createAnUser } from "@/utils/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface RegisterComponentProps {
  onToggleForm: () => void; // Add the prop for toggling the form
}

const RegisterComponent = ({ onToggleForm }: RegisterComponentProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(RegisterValiDationSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: Inputs) => {
    try {
      setLoading(true);
      await createAnUser(data);
      router.push("/");
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
        <h2>Create an account</h2>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

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
          {loading ? <CircularProgress /> : "Register"}
        </Button>
        {isError && <small style={{ color: "red" }}>{errMsg}</small>}
        <FlexBoxCentered gap={2}>
          <Divider sx={{ width: "40%", borderWidth: "0.01rem" }} />
          <small style={{ color: "#7B7B7B" }}>or</small>
          <Divider sx={{ width: "40%", borderWidth: "0.01rem" }} />
        </FlexBoxCentered>
        <Typography textAlign={"center"} component={"small"}>
          Already have an account?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={onToggleForm}
          >
            Login
          </span>{" "}
        </Typography>
      </Stack>
    </form>
  );
};

export default RegisterComponent;
