const dbPool = require("../db");

class MahasiswaModel {
  get = () => dbPool.query("SELECT * FROM mahasiswa");
  find = (params) => dbPool.query("SELECT * FROM mahasiswa WHERE ?", params);
  create = (params) => dbPool.query("INSERT INTO mahasiswa SET ?", params);
}
module.exports = new MahasiswaModel();
