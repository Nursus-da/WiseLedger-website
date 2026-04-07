const jwt = require("jsonwebtoken");
const { User } = require("../models");
require('dotenv').config();

async function verifyToken(req, res, next) {
    
    try {
        const authHeader = req.headers['authorization'];
        const body = req.body;

        console.log("ini log midleware",body);

        if (!authHeader) {
        return res.status(401).redirect('/login')
    }

        const token = authHeader && authHeader.split(' ')[1];

        if (!token || token === "null") return res.status(401).redirect('/login');

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findOne({where: {id: decode.id}});

        if (!user) return res.status(401).json({message: "unautorized"});

        req.user = user;

    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "unautorized"});
    }

    next();

}

module.exports = verifyToken;