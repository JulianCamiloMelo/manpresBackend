const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configuración de conexión a la base de datos
const config = {
  server: 'servermanpresdev.database.windows.net',
  database: 'DBManpresDev',
  user: 'administrador',
  password: '$ManpresDev1',
  options: {
    encrypt: true, // Para conexiones a Azure, se requiere esto
  },
};

// Endpoint para obtener datos de la tabla 'modulos'
app.get('/api/modulos', async (req, res) => {
  try {
    // Conexión a la base de datos
    await sql.connect(config);

    // Consulta SQL
    const result = await sql.query('SELECT * FROM modulos');

    // Devolver resultados como JSON
    res.json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Endpoint para obtener datos de la tabla 'modulos'
app.get('/api/preguntas/:id_modulo', async (req, res) => {
  const id_modulo = req.params.id_modulo;
  try {
    // Conexión a la base de datos
    await sql.connect(config);

    // Consulta SQL
    const result = await sql.query('SELECT * FROM preguntas WHERE id_modulo = ' + id_modulo);

    // Devolver resultados como JSON
    res.json(result.recordset);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
