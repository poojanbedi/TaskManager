import React, { useState } from "react";
import { AddTask, ListAllTasks } from "./components/tasks";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <AddTask onTaskAdded={() => setRefreshKey((k) => k + 1)} />
        <ListAllTasks refreshKey={refreshKey} />
      </main>
    </div>
  );
};

export default App;