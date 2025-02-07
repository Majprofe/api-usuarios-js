const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "GoRest API Clone",
            version: "1.0.0",
            description: "API de usuarios basada en GoRest",
        },
    },
    apis: ["./app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
app.get("/users", (req, res) => {
    res.json(usuarios);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener detalles de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de un usuario
 */
app.get("/users/:id", (req, res) => {
    const user = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
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

// El resto de los endpoints siguen igual...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
