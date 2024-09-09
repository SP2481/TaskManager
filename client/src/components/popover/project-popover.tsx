"use client";
import { deleteProject } from "@/utils/projects";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import * as React from "react";

export default function ProjectsPopover({
  projectId,
  setOpen,
}: {
  projectId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const queryClient = useQueryClient();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const token = Cookies.get("accesstoken") as string;
  const open = Boolean(anchorEl);

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId, token),
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(projectId);
  };

  return (
    <div>
      <Button onClick={handleClick} style={{ width: "0.5rem" }}>
        <MoreVertIcon sx={{ color: "black" }} />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack>
          <Button
            sx={{ width: "10rem", padding: 2, cursor: "pointer" }}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ width: "10rem", padding: 2, cursor: "pointer" }}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
    </div>
  );
}
