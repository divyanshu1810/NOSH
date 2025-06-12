import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import sequelize from '../database';

export class Dish extends Model<InferAttributes<Dish>, InferCreationAttributes<Dish>> {
  declare id: CreationOptional<number>;
  declare dishId: string;
  declare dishName: string;
  declare imageUrl: string;
  declare isPublished: boolean;
}

Dish.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dishId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dishName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize: sequelize,
  modelName: 'Dish',
  tableName: 'dishes',
  timestamps: true,
});