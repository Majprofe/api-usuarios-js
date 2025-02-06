const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let usuarios = [
    { id: 1, name: "John Doe", gender: "male", email: "john.doe@example.com", status: "active" },
    { id: 2, name: "Jane Smith", gender: "female", email: "jane.smith@example.com", status: "inactive" },
    { id: 3, name: "Alice Johnson", gender: "female", email: "alice.johnson@example.com", status: "active" },
    { id: 4, name: "Robert Brown", gender: "male", email: "robert.brown@example.com", status: "active" },
    { id: 5, name: "Emily Davis", gender: "female", email: "emily.davis@example.com", status: "inactive" },
    { id: 6, name: "Michael Wilson", gender: "male", email: "michael.wilson@example.com", status: "active" },
    { id: 7, name: "Sophia Martinez", gender: "female", email: "sophia.martinez@example.com", status: "active" },
    { id: 8, name: "David Anderson", gender: "male", email: "david.anderson@example.com", status: "inactive" },
    { id: 9, name: "Olivia Thomas", gender: "female", email: "olivia.thomas@example.com", status: "active" },
    { id: 10, name: "James Taylor", gender: "male", email: "james.taylor@example.com", status: "inactive" }
];

// Obtener lista de usuarios
app.get("/users", (req, res) => {
    res.json(usuarios);
});

// Obtener detalles de un usuario
app.get("/users/:id", (req, res) => {
    const user = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
});

// Crear usuario
app.post("/users", (req, res) => {
    const { name, gender, email, status } = req.body;
    const newUser = {
        id: usuarios.length + 1,
        name,
        gender,
        email,
        status
    };
    usuarios.push(newUser);
    res.status(201).json(newUser);
});

// Editar usuario (PUT)
app.put("/users/:id", (req, res) => {
    const user = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    Object.assign(user, req.body);
    res.json(user);
});

// Editar usuario (PATCH)
app.patch("/users/:id", (req, res) => {
    const user = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    Object.assign(user, req.body);
    res.json(user);
});

// Eliminar usuario
app.delete("/users/:id", (req, res) => {
    const userIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "Usuario no encontrado" });
    usuarios.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
