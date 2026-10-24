import { z } from 'zod'

// 通用字段接口
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  version: number
}

// Loan实体
export interface Loan extends BaseEntity {
  itemId: string
  borrowerName: string // 借用人姓名
  borrowerContact: string | null // 联系方式
  borrowedAt: Date
  expectedReturnAt: Date
  actualReturnAt: Date | null
  status: 'active' | 'returned' | 'overdue' | 'cancelled'
  notes: string | null
  householdId: string
}

// Loan创建输入
export const LoanCreateInputSchema = z.object({
  itemId: z.string().uuid('物品ID必须是UUID'),
  borrowerName: z.string().min(1, '借用人姓名不能为空'),
  borrowerContact: z.string().nullable().optional(),
  borrowedAt: z.date(),
  expectedReturnAt: z.date(),
  actualReturnAt: z.date().nullable().optional(),
  status: z.enum(['active', 'returned', 'overdue', 'cancelled']).default('active'),
  notes: z.string().nullable().optional(),
  householdId: z.string().uuid('家庭ID必须是UUID'),
})

// Loan更新输入
export const LoanUpdateInputSchema = LoanCreateInputSchema.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: '至少需要更新一个字段'
})

// Loan实体schema
export const LoanSchema = z.object({
  id: z.string().uuid(),
  itemId: z.string().uuid(),
  borrowerName: z.string(),
  borrowerContact: z.string().nullable(),
  borrowedAt: z.date(),
  expectedReturnAt: z.date(),
  actualReturnAt: z.date().nullable(),
  status: z.enum(['active', 'returned', 'overdue', 'cancelled']),
  notes: z.string().nullable(),
  householdId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  version: z.number().int(),
})

// 类型守卫
export function isLoan(data: unknown): data is Loan {
  return LoanSchema.safeParse(data).success
}

// 解析函数
export function parseLoan(data: unknown): Loan {
  const result = LoanSchema.safeParse(data)
  if (!result.success) {
    throw new Error(`无效的Loan数据: ${result.error.message}`)
  }
  return result.data
}

// 导出schema版本
export const schemaVersion = '1.0.0'