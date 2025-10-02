const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// GET todos
app.get("/todos", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// POST todo
app.post("/todos", (req, res) => {
  const db = readDB();
  const newTodo = { id: Date.now(), task: req.body.task, done: false };
  db.todos.push(newTodo);
  writeDB(db);
  res.json(newTodo);
});

// PUT toggle done
app.put("/todos/:id", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id == req.params.id);
  if (todo) {
    todo.done = !todo.done;
    writeDB(db);
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo no encontrado" });
  }
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const db = readDB();
  const newTodos = db.todos.filter(t => t.id != req.params.id);
  db.todos = newTodos;
  writeDB(db);
  res.json({ message: "Todo eliminado" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
