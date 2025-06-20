const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const deseosRoutes = require('./routes/deseos'); // Importamos las rutas

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/deseos', deseosRoutes);

// Sincronizar base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
