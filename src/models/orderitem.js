'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    order_id: DataTypes.INTEGER,
    menu_item_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_at_order: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};