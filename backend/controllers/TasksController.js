const sql = require("mssql");

// 📦 dane (tymczasowe)
let tasks = [
  { id: 1, name: "Zadanie 1" },
  { id: 2, name: "Zadanie 2" }
];

// GET all (z DB)
const getAllTasks = async (req, res) => {
  try {
    const result = await sql.query("SELECT name FROM sys.databases");
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd DB");
  }
};

// GET by id
const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });

  res.status(200).json(task);
};

// POST
const createTask = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name required" });
  }

  const newTask = {
    id: tasks.length + 1,
    name: req.body.name
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT
const updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });

  if (!req.body.name) {
    return res.status(400).json({ message: "Name required" });
  }

  task.name = req.body.name;
  res.status(200).json(task);
};

// DELETE
const deleteTask = (req, res) => {
  const exists = tasks.find(t => t.id == req.params.id);
  if (!exists) return res.status(404).json({ message: "Not found" });

  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};