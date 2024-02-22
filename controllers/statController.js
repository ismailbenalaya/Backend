const Condidat = require("../models/Condidat");
const Formateur = require("../models/Formateur");
const Formation = require("../models/Formation");

module.exports.calculFormation = async (req, res) => {
    try {
        const count = await Formation.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.calculNombreCondidat = async (req, res) => {
    try {
        const count = await Condidat.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.calculNombreFormateur = async (req, res) => {
    try {
        const count = await Formateur.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

