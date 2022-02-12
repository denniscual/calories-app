import RootSequelize from 'sequelize';

export default function FoodEntryModel(sequelize: RootSequelize.Sequelize) {
  return sequelize.define('foodEntries', {
    id: {
      type: RootSequelize.UUID,
      defaultValue: RootSequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
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
