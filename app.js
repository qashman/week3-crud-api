require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //Parse Json bodies

let todos = [
    {id: 1, task: 'Learn Node.js', completed: false},
    {id: 2, task: 'Build a CRUD API', completed: false}
];

//Get All-Read
app.get('/todos', (req, res) => {
    res.status(200).json(todos); //send arrays as Json
});

//POst New -Create
app.post('/todos', (req, res)  => {
    const newTodo = { id: todos.length + 1, ...req.body };
    todos.push(newTodo);
    res.status(201).json(newTodo);//Echo sack
});

//Patch -Update
app.patch('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json ({message: 'Todo not found'});
    Object.assign (todo, req.body);
    res.status(200).json(todo);
})

//Delete Remove
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);
    if (todos.length === initialLength) return res.status(404).json({Error: "not found" });
    res.status(204).send();
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Seerver Error!' });

});
const PORT = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);});