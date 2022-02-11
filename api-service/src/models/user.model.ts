import RootSequelize from 'sequelize';

// TODO:
// - continue adding/updating models like the user and the food entry.

export default function UserModel(sequelize: RootSequelize.Sequelize): any {
  return sequelize.define('users', {
    username: {
      type: RootSequelize.STRING,
    },
    email: {
      type: RootSequelize.STRING,
    },
    password: {
      type: RootSequelize.STRING,
    },
    fullName: {
      type: RootSequelize.STRING,
    },
    maxCalories: {
      type: RootSequelize.INTEGER,
    },
    maxPricePerMonth: {
      type: RootSequelize.INTEGER,
    },
  });
}
