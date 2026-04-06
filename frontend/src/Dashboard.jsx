import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState("");

  // 🔄 pobieranie danych
  const fetchTasks = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error(err);
        setError("Błąd pobierania danych");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ dodawanie zadania
  const handleAddTask = () => {
    if (!newTask) {
      setError("Podaj nazwę zadania");
      return;
    }

    axios
      .post(import.meta.env.VITE_API_URL + "/tasks", {
        name: newTask,
      })
      .then(() => {
        setNewTask("");     // czyści input
        setError("");
        fetchTasks();       // odświeża listę
      })
      .catch((err) => {
        console.error(err);
        setError("Błąd dodawania zadania");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista zadań</h1>

      {/* 🔴 błąd */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ➕ INPUT + BUTTON */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nowe zadanie..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Dodaj</button>
      </div>

      {/* 📋 lista */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;