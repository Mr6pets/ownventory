import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Location实体
export interface Location extends BaseEntity {
  name: string
  parentId: string | null
  path: string // 路径，如"家/卧室/衣柜"
  householdId: string
}

// Location创建输入
export const LocationCreateInputSchema = z.object({
  name: z.string().min(1, '位置名称不能为空'),
  parentId: z.string().uuid().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Location更新输入
export const LocationUpdateInputSchema = LocationCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Location实体schema
export const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  parentId: z.string().uuid().nullable(),
  path: z.string(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isLocation(data: unknown): data is Location {
  return LocationSchema.safeParse(data).success
}

// 解析函数
export function parseLocation(data: unknown): Location {
  const result = LocationSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Location数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'