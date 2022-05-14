require('dotenv').config();

const environment = {
  development: {
    username: process.env.DB_USERNAME_DEV || 'postgres',
    password: process.env.DB_PASSWORD_DEV || 'postgres',
    database: process.env.DB_DATABASE_DEV || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT) || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME_TEST || 'postgres',
    password: process.env.DB_PASSWORD_TEST || 'postgres',
    database: process.env.DB_DATABASE_TEST || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT) || 5433,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
module.exports = environment;
