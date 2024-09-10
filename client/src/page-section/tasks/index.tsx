"use client";
import { StyledRow } from "@/components/cards/style";
import { TaskRow } from "@/components/cards/tasks";
import { FlexBox } from '@/components/flex-box/flex-box';
import AddTasksPopup from "@/components/popup/add-tasks";
import { TaskInput } from "@/components/validation-schema/task-schema";
import { ITask } from "@/response-types/tasks";
import { AddTask, getTasks } from "@/utils/tasks";
import { Add } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { toast } from 'react-toastify';

interface Props {
  initialtasks: ITask[];
  projectId: string;
}

const Tasks = ({ initialtasks, projectId }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const router = useRouter()
  const queryClient = useQueryClient();
  const token = Cookies.get("accesstoken") as string;
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(token as string, projectId),
    initialData: initialtasks,
    refetchOnWindowFocus: false,
  });

  const addMutation = useMutation({
    mutationFn: (data: TaskInput) => AddTask(data, token, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success('Task added successfully')

    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <Box height={"80vh"} mt={2}>
      {
        isLoading && (
          <CircularProgress color='primary'  />
        )
      }
      <FlexBox alignItems={'center'}>
        <ArrowBackIcon sx={{ height:'2rem', width:'2rem', cursor:'pointer' }} onClick={() => router.push('/') } />
        <h1 style={{ marginLeft: "0.5rem",fontWeight:'500'  }}>Tasks</h1>
      </FlexBox>
      <Stack gap={1} mt={2}>
        {tasks && tasks.length > 0 ? (
          tasks?.map((task: ITask) => <TaskRow task={task} key={task.title} />)
        ) : (
          <h3 style={{ textAlign: "center" }}>
            No tasks found! assign some tasks to your project
          </h3>
        )}
        <StyledRow
          sx={{
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleOpen}
        >
          <Add />
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
