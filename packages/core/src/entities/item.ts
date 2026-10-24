import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Item实体
export interface Item extends BaseEntity {
  name: string
  description: string | null
  quantity: number
  status: 'active' | 'archived' | 'deleted'
  serialNumber: string | null
  purchaseDate: Date | null
  purchasePrice: number | null // 最小货币单位整数
  currency: string
  notes: string | null
  householdId: string
}

// Item创建输入
export const ItemCreateInputSchema = z.object({
  name: z.string().min(1, '名称不能为空'),
  description: z.string().nullable().optional(),
  quantity: z.number().int().min(0, '数量不能为负数').default(1),
  status: z.enum(['active', 'archived', 'deleted']).default('active'),
  serialNumber: z.string().nullable().optional(),
  purchaseDate: z.date().nullable().optional(),
  purchasePrice: z.number().int().nullable().optional(),
  currency: z.string().length(3, '货币代码必须为3个字符').default('CNY'),
  notes: z.string().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Item更新输入
export const ItemUpdateInputSchema = ItemCreateInputSchema.partial().refine(data => {
  // 至少需要更新一个字段
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Item实体schema（用于导出）
export const ItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  quantity: z.number().int(),
  status: z.enum(['active', 'archived', 'deleted']),
  serialNumber: z.string().nullable(),
  purchaseDate: z.date().nullable(),
  purchasePrice: z.number().int().nullable(),
  currency: z.string(),
  notes: z.string().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isItem(data: unknown): data is Item {
  return ItemSchema.safeParse(data).success
}

// 解析函数
export function parseItem(data: unknown): Item {
  const result = ItemSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Item数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'