const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  getAll = async (req, res) => {
    const [data] = await userModel.get();
    if (data.length > 0)
      res.send({ status: true, message: "Data ditemukan", data: data });
    else res.send({ status: false, message: "Data kosong" });
  };
  findById = async (req, res) => {
    const { id } = req.params;
    const [data] = await userModel.find({ nim: id });
    if (data.length > 0)
      res.send({ status: true, message: "Data ditemukan", data: data });
    else res.send({ status: false, message: "Data kosong" });
  };
  register = async (req, res) => {
    const { body } = req;
    try {
      if (!(body.nama && body.email && body.password))
        throw Error("DATA TIDAK LENGKAP");

      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
      console.log(salt);
      const hashPassword = await bcrypt.hash(body.password, salt);
      const data = {
        name: body.nama,
        email: body.email,
        password: hashPassword,
      };
      const result = await userModel.create(data);
      if (result[0]?.affectedRows > 0)
        res.send({
          status: true,
          message: "Registrasi berhasil",
        });
      else res.status(500).send({ status: false, message: "Registrasi gagal" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: false, message: "Registrasi gagal " + error?.message });
    }
  };
  login = async (req, res) => {
    const { body } = req;
    try {
      if (!(body.email && body.password))
        throw Error("MASUKKAN USERNAME DAN PASSWORD");

      const [data] = await userModel.find({ email: body.email });
      if (data.length > 0) {
        // console.log(data[0]);
        const isValid = await bcrypt.compare(body.password, data[0].password);
        if (!isValid)
          throw { code: 401, message: "Username & Password tidak cocok" };

        //create access token
        const userData = {
          id: data[0].id,
          username: data[0].name,
          email: data[0].email,
        };
        const token = jwt.sign(userData, process.env.ACCESS_TOKEN_KEY, {
          expiresIn: "24h",
        });
        res.send({
          status: true,
          message: "Login berhasil",
          token,
        });
      } else res.status(500).send({ status: false, message: "Login gagal" });
    } catch (error) {
      console.log(error);
      if (!error.code) {
        error.code = 500;
      }
      res
        .status(error.code)
        .send({ status: false, message: "Login gagal " + error?.message });
    }
  };
}
module.exports = new AuthController();
