const sql = require("mssql");
const TaskReadDto = require("../dto/TaskReadDto");

// GET ALL (z DB)
const getAllTasks = async (req, res) => {
  try {
    const result = await sql.query("SELECT Id, Name FROM Tasks");

    const dto = result.recordset.map(t => 
      new TaskReadDto({ id: t.Id, name: t.Name })
    );

    res.status(200).json(dto);
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd DB");
  }
};

// GET BY ID (z DB)
const getTaskById = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT Id, Name FROM Tasks WHERE Id = ${req.params.id}
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    const task = result.recordset[0];

    res.status(200).json(
      new TaskReadDto({ id: task.Id, name: task.Name })
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd DB");
  }
};

// POST (ZAPIS DO DB)
const createTask = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name required" });
  }

  try {
    await sql.query(`
      INSERT INTO Tasks (Name)
      VALUES ('${req.body.name}')
    `);

    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd zapisu");
  }
};

// PUT
const updateTask = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Name required" });
  }

  try {
    await sql.query(`
      UPDATE Tasks
      SET Name='${req.body.name}'
      WHERE Id=${req.params.id}
    `);

    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd update");
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    await sql.query(`
      DELETE FROM Tasks WHERE Id=${req.params.id}
    `);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd delete");
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};