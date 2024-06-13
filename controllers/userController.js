const User = require('../models/user');

// Obtener un usuario
const getUser = async (req, res) => {   
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        dni: req.body.dni,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.dni = req.body.dni || user.dni;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
