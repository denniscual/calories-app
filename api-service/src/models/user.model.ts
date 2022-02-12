import RootSequelize from 'sequelize';

// TODO:
// - continue adding/updating models like the user and the food entry.

export default function UserModel(sequelize: RootSequelize.Sequelize): any {
  return sequelize.define('users', {
    id: {
      type: RootSequelize.UUID,
      defaultValue: RootSequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: RootSequelize.STRING,
    },
    email: {
      allowNull: false,
      type: RootSequelize.STRING,
    },
    password: {
      allowNull: false,
      type: RootSequelize.STRING,
    },
    fullName: {
      allowNull: false,
      type: RootSequelize.STRING,
    },
    maxCalories: {
      allowNull: false,
      type: RootSequelize.INTEGER,
    },
    maxPricePerMonth: {
      allowNull: false,
      type: RootSequelize.INTEGER,
    },
  });
}
