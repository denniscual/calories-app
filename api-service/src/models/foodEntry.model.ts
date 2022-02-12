import RootSequelize from 'sequelize';

export default function FoodEntryModel(
  sequelize: RootSequelize.Sequelize,
): any {
  return sequelize.define('foodEntries', {
    id: {
      type: RootSequelize.UUID,
      defaultValue: RootSequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: RootSequelize.STRING,
      allowNull: false,
    },
    numOfCalories: {
      type: RootSequelize.FLOAT,
      allowNull: false,
    },
    price: {
      type: RootSequelize.FLOAT,
      allowNull: false,
    },
    meal: {
      type: RootSequelize.STRING,
      allowNull: false,
    },
  });
}
