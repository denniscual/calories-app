import RootSequelize from 'sequelize';

export default function RoleModel(sequelize: RootSequelize.Sequelize): any {
  return sequelize.define('roles', {
    id: {
      type: RootSequelize.UUID,
      defaultValue: RootSequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: RootSequelize.STRING,
    },
  });
}
