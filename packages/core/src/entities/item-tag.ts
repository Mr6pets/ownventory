import { z } from 'zod'

// ItemTag关联实体
export interface ItemTag {
  itemId: string
  tagId: string
  createdAt: Date
}

// ItemTag创建输入
export const ItemTagCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  tagId: z.string().uuid('标签ID必须是UUID'),
})

// ItemTag实体schema
export const ItemTagSchema = z.object({
  itemId: z.string().uuid(),
  tagId: z.string().uuid(),
  createdAt: z.date(),
})

// 类型守卫
export function isItemTag(data: unknown): data is ItemTag {
  return ItemTagSchema.safeParse(data).success
}

// 解析函数
export function parseItemTag(data: unknown): ItemTag {
  const result = ItemTagSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的ItemTag数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'