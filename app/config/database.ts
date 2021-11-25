const config = require('./index');

interface DB  {
  username: string,
  password: string,
  database: string,
  host: string
}

const db: DB = config.db;
const username: string = db.username;
const password: string = db.password;
const database: string = db.database;
const host: string = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
