import RootSequelize from 'sequelize';

export default function FoodEntryModel(sequelize: RootSequelize.Sequelize) {
  return sequelize.define('users', {
    username: {
      type: RootSequelize.STRING,
    },
    name: {
      type: RootSequelize.STRING,
    },
    numOfCalories: {
      type: RootSequelize.INTEGER,
    },
    price: {
      type: RootSequelize.INTEGER,
    },
    meal: {
      type: RootSequelize.STRING,
    },
  });
}
