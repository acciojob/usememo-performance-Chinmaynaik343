
import React, { useState, useMemo } from "react";

const generateTasks = () => {
  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    completed: index >= 25,
  }));
};

function App() {
  const [tasks] = useState(generateTasks);
  const [activeTab, setActiveTab] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // Filter tasks only when the tasks or selected tab changes.
  const filteredTasks = useMemo(() => {
    // Artificially simulate an expensive computation.
    const start = performance.now();

    while (performance.now() - start < 300) {
      // Intentional delay for the performance demonstration.
    }

    if (activeTab === "Active") {
      return tasks.filter((task) => !task.completed);
    }

    if (activeTab === "Completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, activeTab]);

  const appStyle = {
    minHeight: "100vh",
    padding: "30px",
    backgroundColor: darkMode ? "#1e1e1e" : "#f5f5f5",
    color: darkMode ? "#ffffff" : "#222222",
    fontFamily: "Arial, sans-serif",
    transition: "background-color 0.2s, color 0.2s",
  };

  const buttonStyle = (selected) => ({
    padding: "10px 18px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: selected ? "#007bff" : darkMode ? "#444" : "#ddd",
    color: selected || darkMode ? "#fff" : "#222",
  });

  return (
    <div style={appStyle}>
      <h1>Todo Application</h1>

      <button
        onClick={() => setDarkMode((previous) => !previous)}
        style={buttonStyle(false)}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <h2>Filter Tasks</h2>

      {["All", "Active", "Completed"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={buttonStyle(activeTab === tab)}
        >
          {tab}
        </button>
      ))}

      <p>
        Showing {filteredTasks.length} tasks
      </p>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              borderRadius: "5px",
              backgroundColor: darkMode ? "#333" : "#fff",
              border: `1px solid ${darkMode ? "#555" : "#ddd"}`,
            }}
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <span
              style={{
                float: "right",
                color: task.completed ? "#28a745" : "#ff9800",
              }}
            >
              {task.completed ? "Completed" : "Active"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
