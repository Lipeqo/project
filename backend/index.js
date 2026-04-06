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
  server: "db", // 👈 Docker
  port: 1433,
  database: "master",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

/* =========================
   🔁 RETRY POŁĄCZENIA
========================= */
async function connectWithRetry() {
  try {
    await sql.connect(config);
    console.log("Połączono z bazą danych ✔");

    // 👉 tworzenie tabeli
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tasks' AND xtype='U')
      CREATE TABLE Tasks (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(255)
      )
    `);

    console.log("Tabela Tasks gotowa ✔");

    /* =========================
       🚏 ROUTING
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

  } catch (err) {
    console.log("⏳ Czekam na bazę danych...");
    setTimeout(connectWithRetry, 3000); // 👈 retry
  }
}

// 👉 START
connectWithRetry();