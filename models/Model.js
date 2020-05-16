const db = require("./../database/dbConfig");

class Model {
  constructor() {
    this.tableName = "";
  }

  query() {
    return db(this.tableName);
  }

  findAll() {
    return this.query();
  }

  findById(id) {
    return this.query().where({ id });
  }

  create(payload) {
    return this.query()
      .insert(payload)
      .then((ids) => this.findById(ids[0]));
  }

  update(id, payload) {
    return this.query().where({ id }).update(payload);
  }

  delete(id) {
    return this.query().where({ id }).del();
  }
}

module.exports = Model;
