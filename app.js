const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(express.json());
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

// Endpoint para insertar datos en la tabla 'modulos'
app.post('/api/modulos', async (req, res) => {
  try {
    const modulo = req.body;

    // Validar el objeto modulo según tus necesidades
    if (modulo.hasOwnProperty('nombre_modulo')) {
      if (modulo.nombre_modulo !== null && modulo.nombre_modulo !== 'undefined') {
        if (modulo.hasOwnProperty('estado')) {
          if (modulo.estado !== null && modulo.estado !== 'undefined') {
            // Insertar en la base de datos
            await sql.connect(config);
            const result = await sql.query(`INSERT INTO modulos (nombre_modulo, estado) VALUES ('${modulo.nombre_modulo}', '${modulo.estado}')`);
            // Enviar respuesta
            res.status(201).json({ success: true, message: 'Módulo insertado exitosamente' });
          } else {
            res.status(500).json({ success: false, message: 'El estado del módulo no puede estar vacío.' });
          }
        } else {
          res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad estado.' });
        }
      } else {
        res.status(500).json({ success: false, message: 'El nombre del módulo no puede estar vacío.' });
      }
    } else {
      res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad nombre_modulo.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al insertar el módulo' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Endpoint para modificar datos en la tabla 'modulos'
app.put('/api/modulos', async (req, res) => {
  try {
    const modulo = req.body;

    // Validar el objeto modulo según tus necesidades
    if (modulo.hasOwnProperty('id')) {
      if (modulo.id !== null && modulo.id !== 'undefined') {
        if (modulo.hasOwnProperty('nombre_modulo')) {
          if (modulo.nombre_modulo !== null && modulo.nombre_modulo !== 'undefined') {
            if (modulo.hasOwnProperty('estado')) {
              if (modulo.estado !== null && modulo.estado !== 'undefined') {
                // Modificar en la base de datos
                await sql.connect(config);
                const result = await sql.query(`UPDATE modulos SET nombre_modulo = '${modulo.nombre_modulo}', estado = '${modulo.estado}' WHERE id = ${modulo.id};`);
                // Enviar respuesta
                res.status(201).json({ success: true, message: 'Módulo modificado exitosamente' });
              } else {
                res.status(500).json({ success: false, message: 'El estado del módulo no puede estar vacío.' });
              }
            } else {
              res.status(500).json({ success: false, message: 'El objeto a modificar no tiene la propiedad estado.' });
            }
          } else {
            res.status(500).json({ success: false, message: 'El nombre del módulo no puede estar vacío.' });
          }
        } else {
          res.status(500).json({ success: false, message: 'El objeto a modificar no tiene la propiedad nombre_modulo.' });
        }
      } else {
        res.status(500).json({ success: false, message: 'El id del módulo no puede estar vacío.' });
      }
    } else {
      res.status(500).json({ success: false, message: 'El objeto a modificar no tiene la propiedad id.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al modificar el módulo' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Endpoint para eliminar datos de la tabla 'modulos'
app.delete('/api/modulos/:id_modulo', async (req, res) => {
  try {
    const id_modulo = req.params.id_modulo;
    if (id_modulo !== null && id_modulo !== 'undefined') {
      // Insertar en la base de datos
      await sql.connect(config);
      const result1 = await sql.query(`DELETE FROM preguntas WHERE id_modulo = ${id_modulo}`);
      const result2 = await sql.query(`DELETE FROM modulos WHERE id = ${id_modulo}`);
      // Enviar respuesta
      res.status(201).json({ success: true, message: 'Módulo eliminado exitosamente' });
    } else {
      res.status(500).json({ success: false, message: 'El id del modulo a eliminar no puede estar vacío.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el módulo' });
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

// Endpoint para insertar datos en la tabla 'preguntas'
app.post('/api/preguntas', async (req, res) => {
  try {
    const pregunta = req.body;

    // Validar el objeto pregunta según tus necesidades
    if (pregunta.hasOwnProperty('pregunta')) {
      if (pregunta.pregunta !== null && pregunta.pregunta !== 'undefined') {
        if (pregunta.hasOwnProperty('id_modulo')) {
          if (pregunta.id_modulo !== null && pregunta.id_modulo !== 'undefined') {
            // Insertar en la base de datos
            await sql.connect(config);
            const result = await sql.query(`INSERT INTO preguntas (pregunta, id_modulo) VALUES ('${pregunta.pregunta}', '${pregunta.id_modulo}')`);
            // Enviar respuesta
            res.status(201).json({ success: true, message: 'Pregunta insertada exitosamente' });
          } else {
            res.status(500).json({ success: false, message: 'El id del módulo no puede estar vacío.' });
          }
        } else {
          res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad id_modulo.' });
        }
      } else {
        res.status(500).json({ success: false, message: 'La pregunta no puede estar vacía.' });
      }
    } else {
      res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad pregunta.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al insertar la pregunta' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Endpoint para modificar datos en la tabla 'preguntas'
app.put('/api/preguntas', async (req, res) => {
  try {
    const pregunta = req.body;

    // Validar el objeto pregunta según tus necesidades
    if (pregunta.hasOwnProperty('id')) {
      if (pregunta.pregunta !== null && pregunta.pregunta !== 'undefined') {
        if (pregunta.hasOwnProperty('pregunta')) {
          if (pregunta.pregunta !== null && pregunta.pregunta !== 'undefined') {
            if (pregunta.hasOwnProperty('id_modulo')) {
              if (pregunta.id_modulo !== null && pregunta.id_modulo !== 'undefined') {
                // Insertar en la base de datos
                await sql.connect(config);
                const result = await sql.query(`UPDATE preguntas SET pregunta  = '${pregunta.pregunta}', id_modulo = ${pregunta.id_modulo}`);
                // Enviar respuesta
                res.status(201).json({ success: true, message: 'Pregunta modificada exitosamente' });
              } else {
                res.status(500).json({ success: false, message: 'El id del módulo no puede estar vacío.' });
              }
            } else {
              res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad id_modulo.' });
            }
          } else {
            res.status(500).json({ success: false, message: 'La pregunta no puede estar vacía.' });
          }
        } else {
          res.status(500).json({ success: false, message: 'El objeto a insertar no tiene la propiedad pregunta.' });
        }
      } else {
        res.status(500).json({ success: false, message: 'El id de la pregunta no puede estar vacío.' });
      }
    } else {
      res.status(500).json({ success: false, message: 'El objeto a modificar no tiene la propiedad id.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al modificar la pregunta' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Endpoint para eliminar datos de la tabla 'modulos'
app.delete('/api/preguntas/:id_pregunta', async (req, res) => {
  try {
    const id_pregunta = req.params.id_pregunta;
    if (id_pregunta !== null && id_pregunta !== 'undefined') {
      // Insertar en la base de datos
      await sql.connect(config);
      const result2 = await sql.query(`DELETE FROM preguntas WHERE id = ${id_pregunta}`);
      // Enviar respuesta
      res.status(201).json({ success: true, message: 'Pregunta eliminada exitosamente' });
    } else {
      res.status(500).json({ success: false, message: 'El id de la pregunta a eliminar no puede estar vacío.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar la pregunta' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

//ARDUINO
// Endpoint para obtener datos de la tabla 'consumos'
app.get('/api/consumos/detalleDia/:id_dispositivo/:anio/:mes/:dia', async (req, res) => {

  const id_dispositivo = req.params.id_dispositivo;
  const anio = req.params.anio;
  const mes = req.params.mes;
  const dia = req.params.dia;

  try {
    // Conexión a la base de datos
    await sql.connect(config);

    // Consulta SQL
    const result = await sql.query(`SELECT	co.id_dispositivo,
                                            ho.hogar,
		                                        CONVERT(varchar,co.fecha,20) as fecha,
                                            co.corriente,
                                            co.potencia,
                                            co.kwh
                                      FROM 	consumos co,
                                            dispositivos_hogares dh,
                                            hogares ho
                                     WHERE 	co.id_dispositivo = ${id_dispositivo}
                                            AND YEAR(fecha) = ${anio}
                                            AND MONTH(fecha) = ${mes}
                                            AND DAY(fecha) = ${dia}
                                            AND dh.id_dispositivo = co.id_dispositivo
		                                        AND ho.id = dh.id_hogar
                                    ORDER BY co.id ASC`);

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

// Endpoint para obtener datos de la tabla 'consumos'
app.get('/api/consumos/totalConsumo/:id_dispositivo/:anio/:mes', async (req, res) => {

  const id_dispositivo = req.params.id_dispositivo;
  const anio = req.params.anio;
  const mes = req.params.mes;

  try {
    // Conexión a la base de datos
    await sql.connect(config);

    // Consulta SQL
    const result = await sql.query(`SELECT  dh.id_dispositivo,
                                            di.nombre_dispositivo,
                                            dh.id_hogar,
                                            ho.hogar,
                                            CONCAT(FORMAT(fecha, 'MMMM', 'es-es'),' de ', YEAR(fecha)) fecha_facturacion,
                                            co1.kwh
                                      FROM	consumos co1,
                                            dispositivos_hogares dh,
                                            dispositivos di,
                                            hogares ho
                                     WHERE 	co1.id = (SELECT	MAX(co.id)
                                                        FROM 	consumos co
                                                       WHERE 	co.id_dispositivo = ${id_dispositivo}
                                                              AND YEAR(co.fecha) = ${anio}
                                                              AND MONTH(co.fecha) = ${mes})
                                            AND dh.id_dispositivo = co1.id_dispositivo
                                            AND di.id = dh.id_dispositivo
                                            AND ho.id = dh.id_hogar`);

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

app.post('/api/consumos/:id_dispositivo/:corriente/:potencia/:kwh', async (req, res) => {

  const id_dispositivo = req.params.id_dispositivo;
  const corriente = req.params.corriente;
  const potencia = req.params.potencia;
  const kwh = req.params.kwh;

  try {
    // Validar el objeto modulo según tus necesidades
    if (id_dispositivo !== null && id_dispositivo !== 'undefined') {
      if (corriente !== null && corriente !== 'undefined') {
        if (potencia !== null && potencia !== 'undefined') {
          if (kwh !== null && kwh !== 'undefined') {
            // Insertar en la base de datos
            await sql.connect(config);
            const result = await sql.query(`INSERT INTO consumos (id_dispositivo, corriente, potencia, kwh) VALUES (${id_dispositivo}, ${corriente}, ${potencia}, ${kwh})`);
            // Enviar respuesta
            res.status(201).json({ success: true, message: 'Registro insertado exitosamente' });
          } else {
            res.status(500).json({ success: false, message: 'El kwh del dispositivo no puede estar vacío.' });
          }
        } else {
          res.status(500).json({ success: false, message: 'La potencia del dispositivo no puede estar vacío.' });
        }
      } else {
        res.status(500).json({ success: false, message: 'La corriente del dispositivo no puede estar vacío.' });
      }
    } else {
      res.status(500).json({ success: false, message: 'El id del dispositivo no puede ser nulo.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al insertar el regitro' });
  } finally {
    // Cerrar la conexión a la base de datos
    sql.close();
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
