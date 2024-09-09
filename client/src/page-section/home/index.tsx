"use client";
import { AddProjects } from "@/components/cards/add-product.card";
import { ProjectCard } from "@/components/cards/project-card";
import { FlexBox } from "@/components/flex-box/flex-box";
import { IProject } from "@/response-types/project";
import { getAllProjects } from "@/utils/projects";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const HomePage = ({ initialProjects }: { initialProjects: IProject[] }) => {
  const token = Cookies.get("accesstoken") as string;
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(token as string),
    initialData: initialProjects,
    refetchOnWindowFocus: false,
  });
  return (
    <Box height={"80vh"}>
      <FlexBox gap={3} alignItems={"center"} mt={3} flexWrap={"wrap"} p={1}>
        {projects?.map((project: IProject) => (
          <ProjectCard project={project} key={project._id} />
        ))}
        <AddProjects token={token} />
      </FlexBox>
    </Box>
  );
};
export default HomePage;
