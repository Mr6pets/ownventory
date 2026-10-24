import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// PurchaseInfo实体
export interface PurchaseInfo extends BaseEntity {
  itemId: string
  storeName: string | null
  receiptNumber: string | null
  warrantyPeriod: number | null // 保修期（月）
  warrantyExpires: Date | null
  householdId: string
}

// PurchaseInfo创建输入
export const PurchaseInfoCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  storeName: z.string().nullable().optional(),
  receiptNumber: z.string().nullable().optional(),
  warrantyPeriod: z.number().int().nullable().optional(),
  warrantyExpires: z.date().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// PurchaseInfo更新输入
export const PurchaseInfoUpdateInputSchema = PurchaseInfoCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// PurchaseInfo实体schema
export const PurchaseInfoSchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  storeName: z.string().nullable(),
  receiptNumber: z.string().nullable(),
  warrantyPeriod: z.number().int().nullable(),
  warrantyExpires: z.date().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isPurchaseInfo(data: unknown): data is PurchaseInfo {
  return PurchaseInfoSchema.safeParse(data).success
}

// 解析函数
export function parsePurchaseInfo(data: unknown): PurchaseInfo {
  const result = PurchaseInfoSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的PurchaseInfo数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'