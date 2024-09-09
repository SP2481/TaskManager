import axios from "axios";

export const getAllProjects = async (token: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}projects/`, {
      headers: {
        accesstoken: token,
      },
    });
    const projects = await response.json();
    return projects.data;
  } catch (err) {
    return null;
  }
};

export const AddProject = async (
  data: { title: string; description: string },
  token: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}projects/`,
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

export const deleteProject = async (projectId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}projects/delete/${projectId}`,
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

export const updateProject = async (
  data: { title: string; description: string },
  token: string,
  projectId: string,
) => {
  try {
    const response = await axios.patch(
      `${process.env.BASE_URL}projects/update/${projectId}`,
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
