// 数据库配置
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'ownventory.db',
  DATABASE_PATH: process.env.DATABASE_PATH || './ownventory.db',
}

// 数据库配置选项
export const dbConfig = {
  client: 'better-sqlite3',
  connection: {
    filename: env.DATABASE_PATH,
  },
  useNullAsDefault: true,
}