const Wish = require('../models/wish');

// Obtener todos los deseos
exports.getDeseos = async (req, res) => {
  try {
    const deseos = await Wish.findAll();
    res.json(deseos);
  } catch (error) {
    console.error('Error al obtener deseos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo deseo
exports.createDeseo = async (req, res) => {
    try {
      let { imagen_url, nombre, enlace, precio } = req.body;
  
      // Validaciones básicas
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
      }
  
      if (imagen_url) {
        // Limpiar imagen_url si viene con más de un link (caso típico de <img srcset>)
        imagen_url = imagen_url.split(' ')[0];
      }
  
      if (precio && isNaN(precio)) {
        return res.status(400).json({ error: 'El campo "precio" debe ser un número' });
      }
  
      const nuevoDeseo = await Wish.create({
        imagen_url,
        nombre,
        enlace,
        precio
      });
  
      res.status(201).json(nuevoDeseo);
    } catch (error) {
      console.error('Error al crear un deseo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  
// Eliminar un deseo
exports.deleteDeseo = async (req, res) => {
  try {
    const id = req.params.id;
    const deseoEliminado = await Wish.destroy({ where: { id } });

    if (deseoEliminado === 0) {
      return res.status(404).json({ error: 'Deseo no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar un deseo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Editar un deseo
exports.updateDeseo = async (req, res) => {
    try {
      const id = req.params.id;
      let { imagen_url, nombre, enlace, precio } = req.body;
  
      // Buscar primero el deseo por ID
      const deseo = await Wish.findByPk(id);
  
      if (!deseo) {
        return res.status(404).json({ error: 'Deseo no encontrado' });
      }
  
      // Si hay imagen nueva, limpiarla
      if (imagen_url) {
        imagen_url = imagen_url.split(' ')[0];
      }
  
      // Actualizar el deseo
      await deseo.update({ imagen_url, nombre, enlace, precio });
  
      res.json({ message: 'Deseo actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar un deseo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
};  