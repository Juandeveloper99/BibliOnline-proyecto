const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '6012',
  database: 'Biblioteca_proyecto'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Define una ruta para obtener datos de la base de datos
app.get('/api/libros', (req, res) => {
  connection.query('SELECT * FROM libros', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from database');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
