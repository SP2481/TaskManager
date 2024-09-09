import {
  Inputs,
  LoginInputs,
} from "@/components/validation-schema/login-input";
import axios from "axios";

export const createAnUser = async (data: Inputs) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}user/signup`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (data: LoginInputs) => {
  try {
    const response = await axios.post(`${process.env.BASE_URL}user/`, data, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const VerifyUser = async (token: string) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}user/verifyUser`,
      {
        headers: {
          accesstoken: token,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
