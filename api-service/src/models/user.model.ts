export default function UserModel(sequelize: any, Sequelize: any) {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return User;
}
