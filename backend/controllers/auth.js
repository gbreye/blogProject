import bcrypt from "bcrypt";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = "1h";

class auth {

  async signup(req, res) {
    try {
      const { username, email, password } = req.body;
      if(!username || username === "" || /[{}]/.test(email)) {
        return res.status(400).json({mes: 'bad request'});
      }
      if(!password || password === "" || /[{}]/.test(password)) {
        return res.status(400).json({mes: 'bad request'});
      }
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(401).json({ message: 'same email!' });
      }
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await User.create({
        username,
        email,
        password: hashedPassword,
        isAdmin: true,
      }); //isAdmin no padrão é falso, mas para uso de teste coloquei no true
      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || email.length > 50) {
        return res.status(400).json({ mes: "bad request!" });
      }
      if (/[{}]/.test(email)) {
        return res.status(400).json({ mes: "bad request!" });
      }
      if (!password || password.length > 50) {
        return res.status(400).json({ mes: "bad request!" });
      }
      if (/[{}]/.test(password)) {
        return res.status(400).json({ mes: "bad request!" });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "Invalid user or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid user or password" });
      }
      const token = jsonwebtoken.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRY },
      );
      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 3600000,
      });
      return res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensage: "controller error" });
    }
  }
}

export default new auth();
