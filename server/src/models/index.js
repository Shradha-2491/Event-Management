import { Sequelize } from 'sequelize';
import config from '../config/config.js'


const sequelize = new Sequelize(config['development'].url, config['development'])

sequelize
  .authenticate()
  .then(() => {
    console.log(` Database connection has been established successfully.`);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export const db = sequelize;
