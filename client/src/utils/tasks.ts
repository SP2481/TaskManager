/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getTasks = async (token: string, projectId: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}tasks/${projectId}`, {
      headers: {
        accesstoken: token,
      },
    });
    const tasks = await response.json();
    return tasks.data;
  } catch (err) {
    return null;
  }
};

export const updateTask = async (taskId: string, data: any, token?: string) => {
  try {
    const response = await axios.patch(
      `${process.env.BASE_URL}tasks/${taskId}`,
      data,
      {
        headers: {
          accesstoken: token,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTask = async (taskId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}tasks/${taskId}`,
      {
        headers: {
          accesstoken: token,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const AddTask = async (
  data: { title: string; description: string; status: string },
  token: string,
  projectId: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}tasks/${projectId}`,
      data,
      {
        headers: {
          accesstoken: token,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
