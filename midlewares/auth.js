const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function auth(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        console.log("authheader yang masuk", authHeader);

        if (!authHeader) {
        return res.status(401).redirect('/login')
    }

        const token = authHeader && authHeader.split(' ')[1];

        
        if (!token || token === "null") return res.status(401).redirect('/login');

        const payload = jwt.verify(token, "inisangat@@rahasia");
        
        const user = await User.findOne({where: {id: payload.id}});

        console.log(user.username);

        if (!user) return res.status(401).json({message: "unautorized"});

        req.user = user;
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "unautorized"});
    }

    next();

}

module.exports = auth;