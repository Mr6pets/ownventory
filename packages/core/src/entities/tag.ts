import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Tag实体
export interface Tag extends BaseEntity {
  name: string
  color: string | null
  householdId: string
}

// Tag创建输入
export const TagCreateInputSchema = z.object({
  name: z.string().min(1, '标签名称不能为空'),
  color: z.string().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Tag更新输入
export const TagUpdateInputSchema = TagCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Tag实体schema
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isTag(data: unknown): data is Tag {
  return TagSchema.safeParse(data).success
}

// 解析函数
export function parseTag(data: unknown): Tag {
  const result = TagSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Tag数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'