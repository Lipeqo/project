import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/tasks") // 👈 poprawione
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
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista zadań</h1>

      {/* 🔴 komunikat błędu */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;