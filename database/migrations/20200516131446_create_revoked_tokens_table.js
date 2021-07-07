exports.up = function (knex) {
  return knex.schema.createTable("revoked_tokens", (table) => {
    table.increments();
    table.string("token");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("revoked_tokens");
};
