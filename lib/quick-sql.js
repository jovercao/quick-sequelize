const Sequelize = require('sequelize')
const generator = require('./generator')
const _ = require("lodash")
require('./model')


const db = Symbol('EasyDB#db')

class QuickSql {
  constructor(sequelize) {
    this[db] = sequelize
  }

  get(table, where) {
    return generator.select(table, '*', where)
  }

  insert(table, values) {
    const sql = generator.insert(table, values);

    return this[db].query(sql, { type: Sequelize.QueryTypes.INSERT });
  }

  update(table, assignments, where) {
    const sql = generator.update(table, assignments, where);

    return this[db].query(sql, { type: Sequelize.QueryTypes.UPDATE });
  }

  delete(table, where) {
    const sql = generator.delete(table, where);

    return this[db].query(sql, { type: Sequelize.QueryTypes.DELETE });
  }

  options() {

  }

  select(table, fields, where, options) {
    const sql = generator.select(table, fields, where);

    return this[db].query(sql, { type: Sequelize.QueryTypes.SELECT });
  }

  query(statments, ...params) {
    if (!_.isArray(statments)) {
      return this[db].query(statments, ...params);
    }

    const sql = generator.query(statments, ...params)

    this[db].query(sql, { type: Sequelize.QueryTypes.SELECT });
  }

  trans(isolationLevel) {
    return this[db].transaction({
      isolationLevel: isolationLevel
    })
  }
}

QuickSql.prototype = {
  READ_UNCOMMITTED: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
  READ_COMMITTED: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  REPEATABLE_READ: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  SERIALIZABLE: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
}

module.exports = QuickSql;
module.exports.EasyDB = QuickSql;
module.exports.default = QuickSql;
