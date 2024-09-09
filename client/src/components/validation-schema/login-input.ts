import * as Yup from "yup";

export type Inputs = {
  username: string;
  email: string;
  password: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export const RegisterValiDationSchema = Yup.object().shape({
  username: Yup.string()
    .required("username is required")
    .min(4, "username must be at least 4 characters")
    .max(10, "username cannot be more than 10 characters"),
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Minimum 4 characters is required")
    .max(10, "Maximum 10 character allowed"),
});

export const LoginValiDationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Minimum 4 characters is required")
    .max(10, "Maximum 10 character allowed"),
});
