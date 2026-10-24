import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schemas'
import { env } from '../config'

// 数据库配置
const db = new Database(env.DATABASE_URL || 'ownventory.db')

// 创建drizzle实例
export const dbClient = drizzle(db, {
  schema,
  logger: env.NODE_ENV === 'development',
})

// 关闭数据库连接
export function closeDatabase() {
  db.close()
}

// 获取数据库实例
export function getDatabase() {
  return db
}

// 初始化数据库
export async function initializeDatabase() {
  // 创建表（如果不存在）
  await dbClient.run(sql`PRAGMA foreign_keys = ON;`)
  
  console.log('数据库初始化完成')
}