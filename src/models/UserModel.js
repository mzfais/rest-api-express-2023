const dbPool = require("../db");

class UserModel {
  get = () => dbPool.query("SELECT * FROM users");
  find = (params) => dbPool.query("SELECT * FROM users WHERE ?", params);
  create = (params) => dbPool.query("INSERT INTO users SET ?", params);
}
module.exports = new UserModel();
