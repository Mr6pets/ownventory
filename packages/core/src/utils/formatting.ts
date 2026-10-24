/**
 * 格式化函数集合
 */

/**
 * 格式化货币金额
 */
export function formatCurrency(amount: number, currency: string = 'CNY'): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100) // 转换为最小货币单位
}

/**
 * 格式化日期
 */
export function formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const options: Intl.DateTimeFormatOptions = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  }
  return new Intl.DateTimeFormat('zh-CN', options[format]).format(date)
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 格式化状态
 */
export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'active': '活跃',
    'archived': '已归档',
    'deleted': '已删除',
    'returned': '已归还',
    'overdue': '已逾期',
    'cancelled': '已取消',
  }
  return statusMap[status] || status
}

/**
 * 格式化提醒类型
 */
export function formatReminderType(type: string): string {
  const typeMap: Record<string, string> = {
    'warranty': '保修提醒',
    'maintenance': '维护提醒',
    'loan': '借用提醒',
  }
  return typeMap[type] || type
}

/**
 * 格式化树形路径
 */
export function formatLocationPath(path: string): string {
  return path.split('/').filter(Boolean).join(' > ')
}

/**
 * 格式化分类颜色
 */
export function formatCategoryColor(color: string | null): string {
  if (!color) return '默认'
  return color
}