import { sqliteTable, text, integer, real, blob, boolean, primaryKey } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Item表
export const items = sqliteTable('items', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  quantity: integer('quantity', { mode: 'number' }).notNull().default(1),
  status: text('status', { enum: ['active', 'archived', 'deleted'] }).notNull().default('active'),
  serialNumber: text('serial_number'),
  purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
  purchasePrice: integer('purchase_price'), // 最小货币单位整数
  currency: text('currency', { length: 3 }).notNull().default('CNY'),
  notes: text('notes'),
  householdId: text('household_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  version: integer('version').notNull().default(1),
}, (table) => {
  return {
    // 复合索引
    householdIdx: primaryKey({ columns: [table.householdId, table.id] }),
  }
})

// Item仓库接口
export interface ItemRepository {
  create(item: any): Promise<any>
  update(id: string, item: any): Promise<any>
  delete(id: string): Promise<any>
  findById(id: string): Promise<any>
  findByHouseholdId(householdId: string): Promise<any[]>
  search(query: any): Promise<any[]>
}