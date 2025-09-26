const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ msg: "Formulario guardado correctamente", contact });
  } catch (err) {
    console.error("Error al guardar contacto:", err);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ fecha: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
};
