const SERVER_CONFIG = {
  IP: '127.0.0.1',
  PORT: process.env.PORT || 3001,
  DB_PATH: './database.sqlite'
};

module.exports = SERVER_CONFIG;