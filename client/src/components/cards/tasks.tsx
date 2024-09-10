"use client";
import { ITask } from "@/response-types/tasks";
import { deleteTask, updateTask } from "@/utils/tasks";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Checkbox, FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { FlexBox } from "../flex-box/flex-box";
import AddTasksPopup from "../popup/add-tasks";
import { TaskInput } from "../validation-schema/task-schema";
import { StyledRow } from "./style";

export const TaskRow = ({ task }: { task: ITask }) => {
  const acccestoken = Cookies.get("accesstoken") || "";
  const [status, setStatus] = useState(task?.status);
  const [checked, setChecked] = useState<boolean>(task?.status === "Done");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const initialValues = {
    title: task?.title,
    description: task?.description,
    status: task?.status,
  };

  const mutation = useMutation({
    mutationFn: (newStatus: string) =>
      updateTask(task._id, { status: newStatus } as TaskInput, acccestoken),
    onError: (error) => {
      console.error("Error updating task status:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleStatusChange = (value: string) => {
    if (value !== task.status) {
      setStatus(value);
      setChecked(value === "Done");
      mutation.mutate(value);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId, acccestoken),
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: TaskInput) => updateTask(task?._id, data, acccestoken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(task._id);
  };

  const handleEdit = (data: TaskInput) => {
    editMutation.mutate(data);
  };

  return (
    <>
      <StyledRow
        style={{
          opacity: status === "Done" ? 0.5 : 1,
        }}
      >
        <FlexBox
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={1}
          gap={1}
        >
          <FlexBox alignItems={"center"} gap={1}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              onChange={(e) =>
                handleStatusChange(e.target.checked ? "Done" : "Todo")
              }
              checked={checked}
            />
            <h3
              style={{
                textDecoration: status === "Done" ? "line-through" : "none",
              }}
            >
              {task?.title}
              <small style={{display:'block', color:'#AAA', marginTop:3}}>
                {task?.project_id.title}
              </small>
            </h3>
          </FlexBox>
          <FlexBox alignItems={"center"} gap={{xs:2, sm:3.5}}>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                labelId="task-status"
                id={`task-status-${task?._id}`}
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <MenuItem value={"Todo"}>Todo</MenuItem>
                <MenuItem value={"InProgress"}>InProgress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title='Delete task'>
              <DeleteIcon onClick={handleDelete} style={{ cursor: "pointer" }} />
            </Tooltip>
            <Tooltip title='Edit task'>
              <FlexBox onClick={() =>{ task?.status !== 'Done' && setOpen(true)}} alignItems={'center'}>
                <ModeEditIcon style={{ cursor: "pointer" }} />
              </FlexBox>

            </Tooltip>
          </FlexBox>
        </FlexBox>
      </StyledRow>
      <AddTasksPopup
        open={open}
        setOpen={setOpen}
        handleTaskSubmit={handleEdit}
        initialValues={initialValues}
      />
    </>
  );
};
