const Model = require("./Model");

class User extends Model {
  constructor() {
    super();
    this.tableName = "users";
  }

  findById(id) {
    return this.query().where({ id }).select("id", "username").first();
  }

  async isExists(username) {
    return (await this.query().where({ username }).first()) ? true : false;
  }
}

module.exports = new User();
