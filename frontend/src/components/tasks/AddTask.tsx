import React, { useState } from "react";
import { Task, tasksApi } from "../../api";
import { useApi } from "../../hooks/useApi";

interface AddTaskProps {
  onTaskAdded?: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { execute: createTask, loading, error } = useApi(tasksApi.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const task = await createTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
    });

    if (task) {
      setTitle("");
      setDescription("");
      onTaskAdded?.(task);
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddTask;