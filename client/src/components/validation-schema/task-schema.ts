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
    .required("Description is required")
    .min(5, "Description must be 5 character length")
    .max(50, "Description must be maximum 50 characters length"),
  status: Yup.string().required("Project type is required"),
});
