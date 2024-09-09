"use client";
import { IProject } from "@/response-types/project";
import { updateProject } from "@/utils/projects";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { FlexBox } from "../flex-box/flex-box";
import ProjectsPopover from "../popover/project-popover";
import AddProjectPopup from "../popup/add-project";
import { ProjectInput } from "../validation-schema/project-schema";
import { StyledCard, StyledDesc } from "./style";

export const ProjectCard = ({ project }: { project: IProject }) => {
  const token = Cookies.get("accesstoken") as string;
  const [open, setOpen] = useState(false);
  const initialValues = {
    title: project?.title,
    description: project?.description,
  };
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (data: ProjectInput) => updateProject(data, token, project._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleEdit = (data: ProjectInput) => {
    editMutation.mutate(data);
  };

  const createdAt = new Date(project?.createdAt ?? new Date());
  const formattedData = new Date(createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
    hour: "2-digit",
    minute: "numeric",
  });
  return (
    <>
      <StyledCard>
        <FlexBox
          alignItems={"start"}
          pl={1}
          gap={1}
          justifyContent={"space-around"}
          width={"100%"}
          height={"100%"}
        >
          <Avatar
            sx={{ height: "5rem", width: "5rem", mt: 2, backgroundColor: "" }}
          >
            S
          </Avatar>
          <Stack flexGrow={1} pl={1} gap={1} pr={1}>
            <FlexBox alignItems={"center"} justifyContent={"space-between"}>
              <Link href={`${project._id}`}>
                <Typography
                  variant="h4"
                  component={"h4"}
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {project?.title}
                </Typography>
              </Link>
              <ProjectsPopover projectId={project._id} setOpen={setOpen} />
            </FlexBox>
            <StyledDesc>
              <Typography variant="subtitle2" component={"p"} color="#7B7B7B">
                {project?.description}
              </Typography>
            </StyledDesc>
            <small style={{ color: "#AAA" }}>{formattedData}</small>
            <small style={{ color: "#AAA" }}>2 tasks</small>
          </Stack>
        </FlexBox>
      </StyledCard>
      <AddProjectPopup
        open={open}
        setOpen={setOpen}
        handleProjectSubmit={handleEdit}
        initialValues={initialValues}
      />
    </>
  );
};
