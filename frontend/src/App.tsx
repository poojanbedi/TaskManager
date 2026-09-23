import React from "react";
import { AddTask } from "./components/tasks";

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <AddTask />
      </main>
    </div>
  );
};

export default App;