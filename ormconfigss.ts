module.exports = {
  type: 'better-sqlite3',
  database: './Db.sql',
  synchronize: true,
  entities: [__dirname + '**/src/Modules/**/infrastructure/persistence/typeorm/*{.js,.ts}']
};

// entities : [],
