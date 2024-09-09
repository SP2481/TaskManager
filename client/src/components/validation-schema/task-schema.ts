import * as Yup from "yup";

export type TaskInput = {
  title: string;
  description: string;
  status: string;
};

export const TasksSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Title must be one character length")
    .max(10, "Title must be maximum 10 characters length")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Title must be 5 character length")
    .max(20, "Title must be maximum 20 characters length")
    .required("Description is required"),
  status: Yup.string().required("Project type is required"),
});
