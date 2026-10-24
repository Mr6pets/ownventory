import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// CustomFieldValue实体
export interface CustomFieldValue extends BaseEntity {
  itemId: string
  fieldId: string
  value: string | number | boolean | Date | null
}

// CustomFieldValue创建输入
export const CustomFieldValueCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  fieldId: z.string().uuid('字段ID必须是UUID'),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.date(),
  ]).nullable(),
})

// CustomFieldValue更新输入
export const CustomFieldValueUpdateInputSchema = CustomFieldValueCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// CustomFieldValue实体schema
export const CustomFieldValueSchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  fieldId: z.string().uuid(),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.date(),
  ]).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isCustomFieldValue(data: unknown): data is CustomFieldValue {
  return CustomFieldValueSchema.safeParse(data).success
}

// 解析函数
export function parseCustomFieldValue(data: unknown): CustomFieldValue {
  const result = CustomFieldValueSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的CustomFieldValue数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'