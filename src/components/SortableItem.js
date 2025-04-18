import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ListItemText,
  Checkbox,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import dayjs from "dayjs";

const priorityColors = {
  High: "#ff6b6b", // Red
  Medium: "#ffa502", // Orange
  Low: "#1dd1a1", // Green
};

const SortableItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: transition || "transform 0.2s ease-out",
    }),
    [transform, transition]
  );

  const isOverdue =
    task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), "day");

  return (
    <Paper
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      elevation={4}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "50px",
        backgroundColor: task.completed ? "#ffe6e9" : "#fff",
        minWidth: "300px",
        transform: style.transform,
        transition: style.transition,
        borderLeft: `10px solid ${priorityColors[task.priority] || "#ccc"}`,
        borderRight: `10px solid ${priorityColors[task.priority] || "#ccc"}`,
        "&:hover": {
          backgroundColor: task.completed ? "#ffd6da" : "#ffe0ec",
          boxShadow: "0px 4px 8px rgba(255, 182, 193, 0.5)",
        },
      }}
    >
      {/* Heart Checkbox */}
      <Checkbox
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        icon={<FavoriteBorderIcon sx={{ color: "#ff69b4" }} />}
        checkedIcon={<FavoriteIcon sx={{ color: "#ff69b4" }} />}
      />

      {/* Task Text */}
      <ListItemText
        primary={task.text}
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "16px",
          fontWeight: "500",
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "#333",
          transition: "0.3s",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          flexGrow: 1,
        }}
      />
      {task.dueDate && (
        <Typography
          sx={{
            marginLeft: "7px",
            fontSize: "12px",
            color: isOverdue ? "red" : "gray",
          }}
        >
          Due: {task.dueDate}
        </Typography>
      )}
      <Button
        onClick={() => deleteTask(task.id)}
        sx={{ color: "#ffb6c1", marginLeft: "10px" }}
      >
        <DeleteIcon />
      </Button>
    </Paper>
  );
};

export default SortableItem;
