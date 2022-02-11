import RootSequelize from 'sequelize';

export default function RoleModel(sequelize: RootSequelize.Sequelize): any {
  return sequelize.define('roles', {
    id: {
      type: RootSequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: RootSequelize.STRING,
    },
  });
}
