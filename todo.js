const express = require("express");

const app = express();
const PORT = 3000;

// In-memory storage for todos
let todos = [];

// Route to get all todos
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Route to add a new todo
app.post("/todos", (req, res) => {
    const newTodo = { Title: "Learn HTTP Servers", id: todos.length + 1 };
    todos.push(newTodo);
    res.status(201).json({ message: "Todo added successfully!", todo: newTodo });
});

// Route to remove the last todo
app.delete("/todos", (req, res) => {
    if (todos.length === 0) {
        return res.status(404).json({ error: "No todos to remove!" });
    }
    todos.pop();
    res.json({ message: "Last todo removed successfully!" });
});

// Start the Express server
app.listen(3000)   