import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState(""); // 👈 NOWE

  // 🔄 pobieranie danych
  const fetchTasks = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);

        if (err.response) {
          setError("Błąd API: " + err.response.status);
        } else {
          setError("Brak połączenia z serwerem");
        }
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ➕ DODAWANIE
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
        setNewTask("");
        setError("");
        fetchTasks();
      })
      .catch((err) => {
        console.error(err);
        setError("Błąd dodawania zadania");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista zadań</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 👇 TO DODAJE INPUT I BUTTON */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Nowe zadanie..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Dodaj</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;