const { User } = require('../models');
const bcrypt = require('bcryptjs');

class Authentication {

    static async register(req, res) {
        const body = req.body;

        if (!body.username || !body.email || !body.password) return res.status(400).json({message: 'Username, email, dan password harus diisi'});
        
        if (body.password.length < 6) return res.status(400).json({message: 'Password minimal 6 karakter'});

        const user = await User.findOne({
            where: {email: body.email}
        });

        if (user) return res.status(400).json({message: 'Email sudah terdaftar'});

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);

        // Create a new user
        await User.create({ 
            username: body.username,
            email: body.email,
            password: hash
            });

        return res.status(201).redirect('login');
    }
}

module.exports = Authentication;