const { Op, fn, col } = require("sequelize");

const data = symbol("Condition#data");

class Expression {
  constructor(cond) {
    this.data = cond || {};
    this._cur = this.data;
    this.fn = fn;
    this.col = col;
  }

  and(...args) {
    // args
    if (args.length > 1) {
      Expression.compare(args);
    }
  }

  or() {}

  andNot() {}

  static and(...conditions) {}

  static parse(args) {}

  static compare(field, operator, value) {}
}
