# 数据模型设计

## 概述

物序应用的数据模型设计遵循以下原则：
- 隐私优先：默认本地存储，云同步可选
- 本地优先：支持离线使用，同步是增强能力
- 数据自主：可导入导出，不锁定数据
- 扩展性：为未来功能预留字段和关系

## 实体设计

### 1. 用户与家庭 (User & Household)

```typescript
// 用户
interface User {
  id: string;           // UUID
  email: string | null;  // 邮箱（可选，匿名模式为null）
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null; // 软删除
  preferences: UserPreferences; // 用户偏好设置
}

// 家庭/ households
interface Household {
  id: string;           // UUID
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 家庭成员关系
interface Membership {
  id: string;           // UUID
  householdId: string;
  userId: string;
  role: 'owner' | 'member' | 'viewer'; // 角色
  invitedAt: Date;
  joinedAt: Date | null;
  deletedAt: Date | null;
}
```

### 2. 物品核心模型 (Item)

```typescript
// 物品
interface Item {
  id: string;           // UUID
  householdId: string;   // 所属家庭
  name: string;         // 物品名称
  description: string | null; // 描述
  quantity: number;      // 数量
  status: 'active' | 'archived' | 'deleted'; // 状态
  serialNumber: string | null; // 序列号
  purchaseDate: Date | null; // 购买日期
  purchasePrice: number | null; // 购买价格（最小货币单位，如分）
  currency: string;     // 币种（ISO 4217代码）
  notes: string | null; // 备注
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;      // 用于同步冲突解决
}

// 分类
interface Category {
  id: string;           // UUID
  householdId: string;
  name: string;
  color: string | null; // 分类颜色
  icon: string | null;  // 图标
  parentId: string | null; // 父分类ID（树形结构）
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 标签
interface Tag {
  id: string;           // UUID
  householdId: string;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 物品-标签关系
interface ItemTag {
  itemId: string;
  tagId: string;
  createdAt: Date;
}

// 位置（树形结构）
interface Location {
  id: string;           // UUID
  householdId: string;
  name: string;
  parentId: string | null; // 父位置ID
  path: string;         // 路径，用于快速查询（如"家/卧室/衣柜"）
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### 3. 附件与元数据 (Attachment)

```typescript
// 附件
interface Attachment {
  id: string;           // UUID
  itemId: string;       // 关联的物品ID
  fileName: string;     // 原始文件名
  mimeType: string;     // MIME类型
  fileSize: number;     // 文件大小（字节）
  storageType: 'local' | 's3'; // 存储类型
  storagePath: string;  // 存储路径
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 购买信息
interface PurchaseInfo {
  itemId: string;
  storeName: string | null;
  receiptNumber: string | null;
  warrantyPeriod: number | null; // 保修期（月）
  warrantyExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 保修信息
interface Warranty {
  id: string;           // UUID
  itemId: string;
  provider: string | null;
  coverage: string | null; // 保修范围
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### 4. 借用管理 (Loan)

```typescript
// 借用记录
interface Loan {
  id: string;           // UUID
  itemId: string;
  borrowerName: string; // 借用人姓名
  borrowerContact: string | null; // 联系方式
  borrowedAt: Date;
  expectedReturnAt: Date;
  actualReturnAt: Date | null;
  status: 'active' | 'returned' | 'overdue' | 'cancelled';
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### 5. 维护与提醒 (Maintenance & Reminder)

```typescript
// 维护任务
interface MaintenanceTask {
  id: string;           // UUID
  itemId: string;
  taskType: string;     // 维护类型（如"清洁"、"检查"）
  frequency: number | null; // 频率（天/月/年）
  nextDue: Date | null;  // 下次到期日
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 维护记录
interface MaintenanceRecord {
  id: string;           // UUID
  taskId: string;
  performedAt: Date;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 提醒
interface Reminder {
  id: string;           // UUID
  itemId: string;
  type: 'warranty' | 'maintenance' | 'loan';
  title: string;
  message: string;
  dueAt: Date;
  sentAt: Date | null;   // 提醒发送时间
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### 6. 自定义字段 (Custom Field)

```typescript
// 自定义字段定义
interface CustomField {
  id: string;           // UUID
  householdId: string;
  name: string;
  fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select';
  options: string[] | null; // 选择项（仅select类型）
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// 自定义字段值
interface CustomFieldValue {
  id: string;           // UUID
  itemId: string;
  fieldId: string;
  value: string | number | boolean | Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### 7. 同步与审计 (Sync & Audit)

```typescript
// 同步变更记录（用于离线同步）
interface SyncChange {
  id: string;           // UUID
  householdId: string;
  entityId: string;     // 变更的实体ID
  entityType: string;   // 实体类型（如'item', 'category'）
  operation: 'create' | 'update' | 'delete';
  data: any;            // 变更数据（JSON）
  createdAt: Date;
  appliedAt: Date | null; // 同步应用时间
  deletedAt: Date | null;
}

// 审计日志
interface AuditLog {
  id: string;           // UUID
  householdId: string;
  userId: string | null; // 操作用户（匿名模式为null）
  action: string;       // 操作类型
  entityId: string | null; // 影响的实体ID
  entityType: string | null; // 影响的实体类型
  details: string;      // 操作详情
  ipAddress: string | null; // IP地址
  userAgent: string | null; // 用户代理
  createdAt: Date;
}
```

## 设计原则

1. **ID策略**：使用UUID v4，全局唯一，避免顺序预测
2. **软删除**：所有实体都有deletedAt字段，实际删除前标记为已删除
3. **时间戳**：createdAt和updatedAt用于数据变更跟踪
4. **货币处理**：金额使用最小货币单位（如分），避免浮点数精度问题
5. **树形结构**：位置和分类使用parentId和path字段支持树形结构
6. **附件解耦**：附件与物品解耦，支持多附件和独立管理
7. **同步支持**：version字段和updatedAt用于冲突解决
8. **扩展性**：预留字段和关系，支持未来功能扩展

## 数据库设计考虑

- **本地SQLite**：轻量，嵌入应用，支持离线使用
- **云端PostgreSQL**：功能完整，支持复杂查询和同步
- **索引策略**：为常用查询字段创建索引（如householdId, status, createdAt）
- **外键约束**：确保数据完整性
- **触发器**：用于自动更新updatedAt和path字段

## 导入导出考虑

- 导出格式：支持CSV和JSON
- Schema版本：每个导出文件包含schema版本信息
- 数据完整性：确保导入时数据验证和错误处理
- 附件处理：附件可单独导出或打包

这个数据模型为物序应用提供了坚实的基础，支持MVP功能并预留了未来扩展空间。