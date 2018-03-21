const Sequelize = require('sequelize')
const generator = require('./generator')
const _ = require("lodash")
require('./model')

class DB extends Sequelize {
  /**
   * 
   * @param {string} table
   */
  insert(table, values) {
    const sql = generator.insert(table, values);

    return this.query(sql, { type: Sequelize.QueryTypes.INSERT });
  }

  update(table, assignments, where) {
    const sql = generator.update(table, assignments, where);

    return this.query(sql, { type: Sequelize.QueryTypes.UPDATE });
  }

  delete(table, where) {
    const sql = generator.delete(table, where);

    return this.query(sql, { type: Sequelize.QueryTypes.DELETE });
  }

  select(table, fields, where) {
    const sql = generator.select(table, fields, where);

    return this.query(sql, { type: Sequelize.QueryTypes.SELECT });
  }

  query(statments, ...params) {
    if (!_.isArray(statments)) {
      return super.query(statments, ...params);
    }

    const sql = generator.query(statments, ...params)

    super.query(sql, { type: Sequelize.QueryTypes.SELECT });
  }

  get trans() {
    return this.transaction;
  }
}

module.exports = DB;
