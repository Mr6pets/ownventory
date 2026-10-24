/**
 * 验证函数集合
 */

/**
 * 验证UUID格式
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

/**
 * 验证货币代码格式（ISO 4217）
 */
export function isValidCurrency(currency: string): boolean {
  const currencyRegex = /^[A-Z]{3}$/
  return currencyRegex.test(currency)
}

/**
 * 验证MIME类型格式
 */
export function isValidMimeType(mimeType: string): boolean {
  const mimeTypeRegex = /^[a-z]+\/[a-z0-9\-\+\.]+$/
  return mimeTypeRegex.test(mimeType)
}

/**
 * 验证文件大小（字节）
 */
export function isValidFileSize(fileSize: number): boolean {
  return fileSize >= 0 && fileSize <= 100 * 1024 * 1024 * 1024 // 最大100GB
}

/**
 * 验证路径安全性（防止路径穿越）
 */
export function isValidPath(path: string): boolean {
  // 简单的路径安全检查，防止../等
  return !path.includes('..') && !path.includes('//') && !path.startsWith('/')
}

/**
 * 验证电子邮件格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证URL格式
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证日期范围
 */
export function isValidDateRange(startDate: Date, endDate: Date): boolean {
  return startDate <= endDate
}

/**
 * 验证数值范围
 */
export function isValidNumberRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}