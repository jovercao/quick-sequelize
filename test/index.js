// const Sequelize = require('sequelize')
// const DataTypes = Sequelize.DataTypes
// const Module = require('sequelize/lib/model')
const Sequelize = require('../index')
const assert = require('assert')

// describe.skip('Sequelize 查询测试', function () {
//   before(function () {
//     this.db = new Sequelize('mssql://sa:124578@localhost/j3')
//     const User = this.db.define(
//       'User',
//       {
//         username: DataTypes.STRING,
//         password: DataTypes.STRING,
//         email: DataTypes.STRING,
//         mobile: DataTypes.STRING,
//         registeDate: DataTypes.DATE,
//       },
//       {}
//     );

//     this.db.User = User;

//   });

//   it('查询', async function() {
//     const result = await this.db.query('select top 50 * from users', {
//       type: Sequelize.QueryTypes.SELECT
//     })
//     console.dir(result);
//   })

//   it('查询所有', async function() {
//     const result = await this.db.User.findAll();
//     console.dir(result);
//   })

//   after(async function() {
//     console.dir(Object.keys(Module))
//     this.db.close();
//   })
// })


describe('db CRUD/Query 测试', function() {
  before(function () {
    this.db = new Sequelize('mssql://sa:124578@localhost/j3')
    this.q = this.db.sql;
    // const User = this.db.define(
    //   'User',
    //   {
    //     username: DataTypes.STRING,
    //     password: DataTypes.STRING,
    //     email: DataTypes.STRING,
    //     mobile: DataTypes.STRING,
    //     registeDate: DataTypes.DATE,
    //   },
    //   {}
    // );

    // this.db.User = User;

  });

  it('C', async function() {
    const ret = await this.q.insert('users', { username: '$', password: 'efg', createdAt: new Date(), updatedAt: new Date() })
    console.dir(ret)
  })
  
  it('R', async function() {
    const ret = await this.q.select('users', [ 'username', 'password' ], { username: '$'})
    console.dir(ret)
  })

  it('U', async function() {
    const ret = await this.q.update('users', { username: '#', password: 'efg', updatedAt: new Date() }, { username: '$' })
    console.dir(ret)
  })

  it('D', async function() {
    const ret = await this.q.delete('users', { username: '#' })
    console.dir(ret)
  })

  it('Query', async function() {
    const trans = await this.q.trans(this.q.SERIALIZABLE)
    try {
      let ret = await this.q.query`select * from users`
      console.dir(ret)
      ret = await this.q.query`update users set password = 'x'`
      console.dir(ret)
      trans.commit();
    } catch(err) {
      trans.rollback();
      throw err;
    }
  })

  after(async function() {
    this.db.close();
  })
  
})
