import * as Yup from "yup";

export type ProjectInput = {
  title: string;
  description: string;
};

export const ProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Title must be one character length")
    .max(10, "Title must be maximum 10 characters length")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be minimum 5 character length")
    .max(50, "Description must be maximum 50 characters length")
    .required("Description is required"),
});
