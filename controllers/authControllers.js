const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Authentication {
  static async register(req, res) {
    const body = req.body;

    if (!body.username || !body.email || !body.password)
      return res
        .status(400)
        .json({ message: "Username, email, dan password harus diisi" });

    if (body.password.length < 6)
      return res.status(400).json({ message: "Password minimal 6 karakter" });

    const user = await User.findOne({
      where: { email: body.email },
    });

    if (user) return res.status(400).json({ message: "Email sudah terdaftar" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);

    // Create a new user
    await User.create({
      username: body.username,
      email: body.email,
      password: hash,
    });

    return res.status(201).redirect("/login");
  }

  static async login(req, res) {
    const body = req.body;
    if (!body.email || !body.password)
      return res
        .status(400)
        .json({ message: "email dan password harus diisi" });

    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user)
      return res
        .status(401)
        .json({
          message: "email belum terdaftar, silahkan daftar terlebih dahulu",
        });

    const Invalid = await bcrypt.compare(body.password, user.password);

    if (!Invalid)
      return res.status(401).json({ message: "email atau password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
    );

    return res.status(200).json({ message: "berhasil login", token: token });
  }
}

module.exports = Authentication;
