"use client";
import { StyledRow } from "@/components/cards/style";
import { TaskRow } from "@/components/cards/tasks";
import AddTasksPopup from "@/components/popup/add-tasks";
import { TaskInput } from '@/components/validation-schema/task-schema';
import { ITask } from "@/response-types/tasks";
import { AddTask, getTasks } from "@/utils/tasks";
import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";

interface Props {
  initialtasks: ITask[];
  projectId: string;
}

const Tasks = ({ initialtasks, projectId }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();
  console.log(queryClient, "cl;ienttt");
  const token = Cookies.get("accesstoken") as string;
  const { data: tasks } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(token as string, projectId),
    initialData: initialtasks,
    refetchOnWindowFocus: false,
  });

  const addMutation = useMutation({
    mutationFn: (data: TaskInput) => AddTask(data, token, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <Box height={"80vh"}>
      <Stack gap={1}>
        {tasks?.map((task: ITask) => <TaskRow task={task} key={task.title} />)}
        <StyledRow
          sx={{
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Add onClick={handleOpen} />
        </StyledRow>
      </Stack>
      <AddTasksPopup
        open={open}
        setOpen={setOpen}
        handleTaskSubmit={addMutation.mutate}
      />
    </Box>
  );
};
export default Tasks;
