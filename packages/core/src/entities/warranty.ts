import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Warranty实体
export interface Warranty extends BaseEntity {
  itemId: string
  provider: string | null
  coverage: string | null // 保修范围
  startDate: Date | null
  endDate: Date | null
  householdId: string
}

// Warranty创建输入
export const WarrantyCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  provider: z.string().nullable().optional(),
  coverage: z.string().nullable().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Warranty更新输入
export const WarrantyUpdateInputSchema = WarrantyCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Warranty实体schema
export const WarrantySchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  provider: z.string().nullable(),
  coverage: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isWarranty(data: unknown): data is Warranty {
  return WarrantySchema.safeParse(data).success
}

// 解析函数
export function parseWarranty(data: unknown): Warranty {
  const result = WarrantySchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Warranty数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'