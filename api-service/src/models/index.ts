import config from '../config/db.config';
import UserModel from './user.model';
import RoleModel from './role.model';
import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  },
);

const db = {
  Sequelize,
  sequelize,
  role: RoleModel(sequelize),
  user: UserModel(sequelize),
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
