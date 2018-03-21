const assert = require('assert')
const moment = require('moment')
const _ = require('lodash')

module.exports = {
  insert(table, values) {
    return `INSERT INTO ${this.name(table)}(${this.fields(Object.keys(values))}) VALUES(${this.values(Object.values(values))})`
  },
  update(table, values, where) {
    return `UPDATE ${this.name(table)} SET ${this.assignments(values)} ${this.where(where)}`
  },
  delete(table, where) {
    return `DELETE ${this.name(table)} ${this.where(where)}`
  },
  select(table, fields, where) {
    return `SELECT ${this.fields(fields)} FROM ${this.name(table)} ${this.where(where)}`
  },
  where(where) {
    const statements = []
    for(const key in where) {
      const val = where[key]
      if (_.isArray(val)) {
        statements.push(`${this.name(key)} IN (${this.values(val)})`)
        continue
      }
      statements.push(`${this.name(key)} = ${this.value(val)}`)
    }
    return 'WHERE ' + statements.join(' AND ')
  },
  fields(fields) {
    if (_.isArray(fields)) {
      return fields.map(field=>this.name(field)).join(', ')
    }

    if (fields === '*') {
      return '*'
    }

    const statements = [];
    for(const field in fields) {
      const alis = fields[field]
      statements.push(`${this.name(field)} AS ${this.name(alias)}`)
    }
  },
  values(values) {
    return values.map(value => this.value(value)).join(', ')
  },
  assignments(assigns) {
    const statements = []
    for(const key in assigns) {
      const val = assigns[key]
      statements.push(`${key} = ${this.value(val)}`)
    }
    return statements.join(', ')
  },
  value(value) {
    switch (typeof value) {
      case 'string':
        // 单引号替换为两个引号
        return '\'' + value.replace('\'', '\'\'') + '\''
      case 'undefined':
        return 'NULL'
      case 'object':
        if (_.isNull(value)) {
          return 'NULL'
        }
        if (_.isDate(value)) {
          return '\'' + moment(value).format('YYYY-MM-DD HH:mm:ss') + '\''
        }
        if (_.isFunction(value)) {
          return this.value(value())
        }
        // 二进制处理，格式化为 0x129394ABCDEF
        if (_.isBuffer(value) || _.isTypedArray(value)|| _.isArrayBuffer(value)) {
          return toHexString(value)
        }
      case 'boolean':
        return value ? '1' : '0';
      case 'number':
        return value.toString()
      default:
        throw new Error('unsupports data type by sql.')
    }
  },
  name(key) {
    assert(_.isString(key) && !_.isEmpty(key), 'key mast string and not null.')
    return `"${key.replace('"', '""')}"`
  },
  query(statements, ...params) {
    let sql = '';
    for (let i = 0; i < statements.length - 1; i++) {
      sql += statements[i] + this.value(params[i]);
    }
    sql += statements[statements.length - 1];

    return sql;
  }
};

function toHexString(value) {
  let result = '0x';
  let view = value;
  if (_.isTypedArray(value)) {
    view = new Uint8Array(value.buffer)
  } else {
    view = new Uint8Array(value)
  }
  view.forEach(byte => {
    result += byte.toString(16).padStart(2, '0')
  });

  return result;
}