import { yupResolver } from "@hookform/resolvers/yup";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TaskInput, TasksSchema } from "../validation-schema/task-schema";

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

enum ProjectType {
  Todo = "Todo",
  InProgress = "InProgress",
  Done = "Done",
}

export default function AddTasksPopup({
  open,
  setOpen,
  handleTaskSubmit,
  initialValues,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleTaskSubmit: (_data: TaskInput) => void;
  initialValues?: TaskInput;
}) {
  const [loading, setLoading] = useState<boolean>(false);
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
      status: "",
    },
    resolver: yupResolver(TasksSchema),
  });

  const onSubmit = async (data: TaskInput) => {
    setLoading(true);
    await handleTaskSubmit(data);
    setLoading(false);
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
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Status"
                      variant="outlined"
                      fullWidth
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {Object.values(ProjectType).map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Button type="submit" variant="contained" color="primary">
                  {loading ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}{" "}
                </Button>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
