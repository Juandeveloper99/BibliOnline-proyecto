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




document.addEventListener('DOMContentLoaded', () => {
  // URL de la API
  const apiUrl = 'http://localhost:3000/libros';

  // Usar fetch para obtener los datos de la API
  fetch(apiUrl)
      .then(response => {
          // Verifica si la respuesta es exitosa
          if (!response.ok) {
              throw new Error('Error en la red');
          }
          return response.json(); // Convertir la respuesta a JSON
      })
      .then(data => {
          // Manipular los datos de la API
          console.log(data);
          const apiDataDiv = document.getElementById('API-Biblioteca');
          apiDataDiv.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          // Manejar errores
          console.error('Hubo un problema con la solicitud Fetch:', error);
      });
});


document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('fetch-data-button');
  const tableContainer = document.getElementById('table-container');

  button.addEventListener('click', () => {
      // URL de la API que devuelve los datos de la tabla
      const apiUrl = 'http://localhost:3000/libros';

      // Usar fetch para obtener los datos de la API
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error en la red');
              }
              return response.json();
          })
          .then(data => {
              // Llamar a la función para crear la tabla HTML
              createTable(data);
          })
          .catch(error => {
              console.error('Hubo un problema con la solicitud Fetch:', error);
          });
  });

  function createTable(data) {
      // Crear una tabla HTML
      let table = `<libros ="1">
                      <thead>
                          <tr>
                              <th>id_libro</th>
                              <th>nombre</th>
                              <th>fecha_de_publicacion</th>
                              <th>libro_genero</th>
                              <th>  id_libro_autor </th>         
                          </tr>
                      </thead>
                      <tbody>`;

      // Añadir filas de datos a la tabla
      data.forEach(row => {
          table += `<tr>
                      <td>${row.id}</td>
                      <td>${row.nombre}</td>
                      <td>${row.descripcion}</td>
                      <!-- Añade aquí más celdas según tus datos -->
                    </tr>`;
      });

      table += `</tbody></table>`;

      // Insertar la tabla en el contenedor
      tableContainer.innerHTML = table;
  }
});

