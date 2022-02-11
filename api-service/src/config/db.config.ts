export default {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'Irishjane_123',
  DB: 'calories_app',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
