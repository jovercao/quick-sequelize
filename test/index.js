// const Sequelize = require('sequelize')
// const DataTypes = Sequelize.DataTypes
// const Module = require('sequelize/lib/model')
const DB = require('../lib/db')
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
    this.db = new DB('mssql://sa:124578@localhost/j3')
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
    const ret = await this.db.insert('users', { username: '$', password: 'efg', createdAt: new Date(), updatedAt: new Date() })
    console.dir(ret)
  })
  
  it('R', async function() {
    const ret = await this.db.select('users', [ 'username', 'password' ], { username: '$'})
    console.dir(ret)
  })

  it('U', async function() {
    const ret = await this.db.update('users', { username: '#', password: 'efg', updatedAt: new Date() }, { username: '$' })
    console.dir(ret)
  })

  it('D', async function() {
    const ret = await this.db.delete('users', { username: '#' })
    console.dir(ret)
  })

  it('Query', async function() {
    const ret = await this.db.query`select * set password = 'x'`
    console.dir(ret)
    const ret = await this.db.query`update users set password = 'x'`
    console.dir(ret)
  })

  after(async function() {
    this.db.close();
  })
  
})
