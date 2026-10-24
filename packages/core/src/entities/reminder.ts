import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Reminder实体
export interface Reminder extends BaseEntity {
  itemId: string
  type: 'warranty' | 'maintenance' | 'loan'
  title: string
  message: string
  dueAt: Date
  sentAt: Date | null // 提醒发送时间
  householdId: string
}

// Reminder创建输入
export const ReminderCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  type: z.enum(['warranty', 'maintenance', 'loan']),
  title: z.string().min(1, '提醒标题不能为空'),
  message: z.string().min(1, '提醒消息不能为空'),
  dueAt: z.date(),
  sentAt: z.date().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Reminder更新输入
export const ReminderUpdateInputSchema = ReminderCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Reminder实体schema
export const ReminderSchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  type: z.enum(['warranty', 'maintenance', 'loan']),
  title: z.string(),
  message: z.string(),
  dueAt: z.date(),
  sentAt: z.date().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isReminder(data: unknown): data is Reminder {
  return ReminderSchema.safeParse(data).success
}

// 解析函数
export function parseReminder(data: unknown): Reminder {
  const result = ReminderSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Reminder数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'