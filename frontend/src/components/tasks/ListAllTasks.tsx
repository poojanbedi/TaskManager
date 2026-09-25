import React, { useEffect } from "react";
import { tasksApi } from "../../api";
import { useApi } from "../../hooks/useApi";

interface ListAllTasksProps {
  // Change this value to re-fetch the list (e.g. after a task is added).
  refreshKey?: number;
}

const ListAllTasks: React.FC<ListAllTasksProps> = ({ refreshKey = 0 }) => {
  const { execute: fetchTasks, data: tasks, loading, error } = useApi(tasksApi.getAll);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshKey]);

  return (
    <section className="task-list">
      <h2>All Tasks</h2>

      {loading && !tasks && <p>Loading tasks...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {tasks && tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks && tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : "incomplete"}>
              <span
                role="img"
                aria-label={task.completed ? "Completed" : "Not completed"}
                title={task.completed ? "Completed" : "Not completed"}
                style={{ color: task.completed ? "green" : "red", marginRight: "0.5rem" }}
              >
                {task.completed ? "✔" : "✘"}
              </span>
              <strong>{task.title}</strong>
              {task.description && <span> — {task.description}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ListAllTasks;