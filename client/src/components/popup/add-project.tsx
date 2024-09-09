import { yupResolver } from "@hookform/resolvers/yup";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ProjectInput,
  ProjectSchema,
} from "../validation-schema/project-schema";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddProjectPopup({
  open,
  setOpen,
  handleProjectSubmit,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleProjectSubmit: (_data: ProjectInput) => void;
  initialValues?: ProjectInput;
}) {
  const handleClose = () => setOpen(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialValues ?? {
      title: "",
      description: "",
    },
    resolver: yupResolver(ProjectSchema),
  });

  const onSubmit = async (data: ProjectInput) => {
    await handleProjectSubmit(data);
    handleClose();
    reset();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      variant="outlined"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
