const Sequelize = require('sequelize')
const generator = require('./generator')
const QuickSql = require('./quick-sql')
const _ = require("lodash")
require('./model')

const sql = Symbol('sequelize#sql')
class Sq extends Sequelize {
  get sql() {
    if (!this[sql]) {
      this[sql] = new QuickSql(this)
    }
    return this[sql]
  }
}
module.exports = Sq
module.exports.Sequelize = Sq
module.exports.default = Sq