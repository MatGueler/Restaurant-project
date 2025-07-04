'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const db = {}

const sequelize = require('../connection/database.cjs')

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

db.Customer.hasMany(db.Order, { foreignKey: 'customer_id' })
db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id' })

db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id' })
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id' })

db.OrderItem.belongsTo(db.MenuItem, { foreignKey: 'menu_item_id' })
db.MenuItem.hasMany(db.OrderItem, { foreignKey: 'menu_item_id' })
