'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Board);
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "名前は必須です。"
        }
      }
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "メールアドレスは必須です"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "パスワードは必須です"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {msg: "整数を入力してください。"},
        min: {
          args: [0],
          msg: "0以上の値が必要です。"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};