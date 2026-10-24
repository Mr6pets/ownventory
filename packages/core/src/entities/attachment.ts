import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Attachment实体
export interface Attachment extends BaseEntity {
  itemId: string
  fileName: string
  mimeType: string
  fileSize: number
  storageType: 'local' | 's3'
  storagePath: string
  householdId: string
}

// Attachment创建输入
export const AttachmentCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  fileName: z.string().min(1, '文件名不能为空'),
  mimeType: z.string().min(1, 'MIME类型不能为空'),
  fileSize: z.number().int().min(0, '文件大小不能为负数'),
  storageType: z.enum(['local', 's3']).default('local'),
  storagePath: z.string().min(1, '存储路径不能为空'),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Attachment更新输入
export const AttachmentUpdateInputSchema = AttachmentCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Attachment实体schema
export const AttachmentSchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  fileName: z.string(),
  mimeType: z.string(),
  fileSize: z.number().int(),
  storageType: z.enum(['local', 's3']),
  storagePath: z.string(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isAttachment(data: unknown): data is Attachment {
  return AttachmentSchema.safeParse(data).success
}

// 解析函数
export function parseAttachment(data: unknown): Attachment {
  const result = AttachmentSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Attachment数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'