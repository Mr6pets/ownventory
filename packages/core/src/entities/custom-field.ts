import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// CustomField实体
export interface CustomField extends BaseEntity {
  name: string
  fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select'
  options: string[] | null // 选择项（仅select类型）
  householdId: string
}

// CustomField创建输入
export const CustomFieldCreateInputSchema = z.object({
  name: z.string().min(1, '字段名称不能为空'),
  fieldType: z.enum(['text', 'number', 'date', 'boolean', 'select']),
  options: z.array(z.string()).nullable().optional(), // 仅select类型使用
  householdId: z.string().uuid('家庭ID必须是UUID'),
}).refine(data => {
  if (data.fieldType === 'select' && (!data.options || data.options.length === 0)) {
    throw new Error('选择类型字段必须提供选项')
  }
  return true
})

// CustomField更新输入
export const CustomFieldUpdateInputSchema = CustomFieldCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// CustomField实体schema
export const CustomFieldSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  fieldType: z.enum(['text', 'number', 'date', 'boolean', 'select']),
  options: z.array(z.string()).nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isCustomField(data: unknown): data is CustomField {
  return CustomFieldSchema.safeParse(data).success
}

// 解析函数
export function parseCustomField(data: unknown): CustomField {
  const result = CustomFieldSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的CustomField数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'