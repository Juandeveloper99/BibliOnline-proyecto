import { fetchLibros } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const libros = await fetchLibros();
    const librosList = document.getElementById('libros-list');

    libros.forEach(libro => {
      const listItem = document.createElement('li');
      listItem.textContent = libro.nombre; // Asume que 'nombre' es una columna en tu tabla 'libros'
      librosList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching libros:', error);
  }

  const cors = require('cors');
app.use(cors());

});
