# Phase 1A 任务清单

## 概述
实现本地优先MVP的核心功能，包括领域模型、SQLite数据层、基础测试和最小Web验证入口。

## 任务列表

### 1. packages/core - 领域模型和Zod schema
- [ ] 创建Item实体和schema
- [ ] 创建Category实体和schema  
- [ ] 创建Tag和ItemTag实体和schema
- [ ] 创建Location树形结构实体和schema
- [ ] 创建Attachment元数据实体和schema
- [ ] 创建PurchaseInfo和Warranty实体和schema
- [ ] 创建Loan实体和schema
- [ ] 创建Reminder实体和schema
- [ ] 创建CustomField和CustomFieldValue实体和schema
- [ ] 实现通用字段：id、createdAt、updatedAt、deletedAt、version
- [ ] 实现schemaVersion导出
- [ ] 区分创建/更新输入schema与实体schema
- [ ] 提供类型守卫和解析函数

### 2. packages/db - SQLite数据层
- [ ] 选择ORM方案并记录ADR
- [ ] 创建Drizzle schema和迁移
- [ ] 实现仓储接口
- [ ] 实现Item CRUD
- [ ] 实现Category CRUD
- [ ] 实现Tag CRUD
- [ ] 实现Location树形CRUD
- [ ] 实现Attachment元数据CRUD
- [ ] 实现Loan CRUD
- [ ] 实现Reminder CRUD
- [ ] 实现CustomField CRUD
- [ ] 支持软删除和时间戳
- [ ] 实现基础搜索和筛选
- [ ] 为同步预留字段和接口

### 3. 测试
- [ ] core schema校验测试
- [ ] 金额处理测试
- [ ] 树形位置测试
- [ ] 软删除测试
- [ ] version测试
- [ ] 导出schemaVersion测试
- [ ] db迁移测试
- [ ] CRUD操作测试
- [ ] 软删除测试
- [ ] 筛选功能测试
- [ ] 树形位置测试
- [ ] 种子数据脚本

### 4. 最小Web验证入口
- [ ] 创建开发用页面
- [ ] 实现种子数据加载
- [ ] 展示物品列表
- [ ] 展示位置树
- [ ] 基础UI展示

### 5. 文档更新
- [ ] 更新docs/data-model.md
- [ ] 更新docs/phase1-tasks.md状态
- [ ] 更新docs/roadmap.md进度
- [ ] 新增必要ADR
- [ ] 更新README开发指南

## 验收标准
- [ ] 仓库已有lint、test、build命令通过
- [ ] 空数据库可初始化，迁移可重复执行
- [ ] core schema与db类型一致
- [ ] 至少有一个可运行的种子数据流程
- [ ] 最小Web页面能展示种子物品和位置树
- [ ] 文档与实际代码一致

## 状态
- [ ] 待开始
- [ ] 进行中
- [ ] 已完成

## 下一步
开始实现packages/core领域模型。