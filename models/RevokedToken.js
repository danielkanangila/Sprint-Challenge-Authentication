const Model = require("./Model");

class RevokedToken extends Model {
  constructor() {
    super();
    this.tableName = "revoked_tokens";
  }
}

module.exports = new RevokedToken();
