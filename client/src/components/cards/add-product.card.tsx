"use client";
import { AddProject } from "@/utils/projects";
import { Add } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from 'react-toastify';
import AddProjectPopup from "../popup/add-project";
import { ProjectInput } from "../validation-schema/project-schema";

export const AddProjects = ({ token }: { token: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: ProjectInput) => AddProject(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success('Project added successfully')
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Card
        sx={{
          maxWidth: "30rem",
          width: "20rem",
          height: "10rem",
          minHeight: "5rem",
          borderRadius: "0.325rem",
          boxShadow: "1px 2px 1px 1px #CCC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.01)",
            transition: "transform 200ms ease-in",
          },
        }}
        onClick={handleOpen}
      >
        <Stack justifyContent={"center"}>
          <Add sx={{ color: "#1976d2", height: "5rem", width: "5rem" }} />
          <h5>Add project</h5>
        </Stack>
      </Card>
      <AddProjectPopup
        open={open}
        setOpen={setOpen}
        handleProjectSubmit={addMutation.mutate}
      />
    </>
  );
};
