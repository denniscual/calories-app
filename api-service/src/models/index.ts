import config from '../config/db.config';
import UserModel from './user.model';
import RoleModel from './role.model';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
  role: RoleModel(sequelize, Sequelize),
  user: UserModel(sequelize, Sequelize),
  ROLES: ['ROLE_ADMIN', 'ROLE_USER'],
};

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.ROLES = ['ROLE_ADMIN', 'ROLE_USER'];

export default db;
