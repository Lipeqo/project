const express = require("express");
const cors = require("cors");
const sql = require("mssql");

// 👉 IMPORT KONTROLERA
const tasksController = require("./controllers/TasksController");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   🔌 KONFIGURACJA DB
========================= */
const config = {
  user: "sa",
  password: "YourStrong!Pass123",
  server: "localhost", // 👉 jeśli lokalnie
  port: 1433,
  database: "master",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

/* =========================
   🔌 POŁĄCZENIE Z DB
========================= */
sql.connect(config)
  .then(() => console.log("Połączono z bazą danych ✔"))
  .catch(err => console.error("Błąd DB:", err));

/* =========================
   🚏 ROUTING (KONTROLER)
========================= */

app.get("/tasks", tasksController.getAllTasks);
app.get("/tasks/:id", tasksController.getTaskById);
app.post("/tasks", tasksController.createTask);
app.put("/tasks/:id", tasksController.updateTask);
app.delete("/tasks/:id", tasksController.deleteTask);

/* =========================
   🚀 START
========================= */
app.listen(8081, "0.0.0.0", () => {
  console.log("API działa na porcie 8081");
});