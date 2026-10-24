import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Category实体
export interface Category extends BaseEntity {
  name: string
  color: string | null
  icon: string | null
  parentId: string | null
  householdId: string
  path: string // 路径，用于快速查询
}

// Category创建输入
export const CategoryCreateInputSchema = z.object({
  name: z.string().min(1, '分类名称不能为空'),
  color: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Category更新输入
export const CategoryUpdateInputSchema = CategoryCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Category实体schema
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  icon: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  householdId: z.string().uuid(),
  path: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isCategory(data: unknown): data is Category {
  return CategorySchema.safeParse(data).success
}

// 解析函数
export function parseCategory(data: unknown): Category {
  const result = CategorySchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Category数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'