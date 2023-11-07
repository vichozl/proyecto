const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "materiales_crud"
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Ruta para eliminar un material
app.delete("/material/:id", (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM materiales WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el material');
        }
        if (result.affectedRows === 0) {
            // No se encontró el material con el ID dado.
            return res.status(404).send('No se encontró el material con el ID proporcionado.');
        }
        res.send("Material eliminado con éxito");
    });
});


// Ruta para actualizar materiales
app.put("/update", (req, res) => {
    const { id, nombre, cantidad, proveedor, fecha, precio } = req.body;
    if (!id) {
        return res.status(400).send('El ID del material es requerido.');
    }
    const query = 'UPDATE materiales SET nombre=?, cantidad=?, proveedor=?, fecha=?, precio=? WHERE id=?';
    db.query(query, [nombre, cantidad, proveedor, fecha, precio, id], (err, result) => {
        if (err) {
            console.error("Failed error (Update query): "+err);
            return res.status(500).send('Error al actualizar el material');
        }
        if (result.affectedRows === 0) {
            // No se encontró el material con el ID dado, o no se realizó la actualización porque los datos son iguales.
            return res.status(404).send('No se encontró el material con el ID proporcionado.');
        }
        res.send("¡Datos actualizados con éxito!");
    });
});

// Ruta para obtener todos los materiales
app.get("/materiales", (req, res) => {
    db.query('SELECT * FROM materiales', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener los materiales');
        }
        res.send(result);
    });
});

// Ruta para crear nuevos materiales
app.post("/create", (req, res) => {
    const { nombre, cantidad, proveedor, fecha, precio } = req.body;
    const query = "INSERT INTO materiales (nombre, cantidad, proveedor, fecha, precio) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nombre, cantidad, proveedor, fecha, precio], (err, result) => {
        if (err) {
            console.error("Failed error (Insert query): "+err);
            return res.status(500).send('Error al crear el material');
        }
        res.status(201).send('Material creado con éxito');
    });
});

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});