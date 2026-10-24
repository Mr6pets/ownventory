# 物序 (ownventory)

一个让个人物品有序的个人物品清单、收纳、维护和提醒应用。

## 项目概述

物序是一个隐私优先、本地优先的个人物品管理应用，支持Web、移动端和桌面端。用户可以管理个人物品清单、分类、位置、附件，并设置提醒和借用管理。

## 核心特性

- **隐私优先**：默认本地存储，云同步可选
- **本地优先**：离线可用，无需登录即可使用
- **跨端一致**：Web、移动端、桌面端统一体验
- **数据自主**：可导入导出，不锁定数据
- **全面管理**：物品CRUD、分类标签、位置管理、附件、搜索筛选、提醒、借用、统计

## 技术栈

- **Monorepo**: pnpm + Turborepo
- **Web**: Next.js + React + Tailwind CSS + shadcn/ui
- **移动端**: React Native + Expo Router
- **桌面端**: Tauri
- **后端**: Node.js + Fastify + tRPC
- **数据库**: SQLite (本地) + PostgreSQL (云端)
- **ORM**: Drizzle
- **校验**: Zod
- **数据请求**: TanStack Query
- **测试**: Vitest + Playwright

## 项目结构

```
ownventory/
├── apps/                 # 应用程序
│   ├── web/              # Web应用 (Next.js)
│   ├── mobile/           # 移动端应用 (React Native + Expo)
│   ├── desktop/          # 桌面应用 (Tauri)
│   └── api/              # 后端API服务
├── packages/             # 共享包
│   ├── ui/               # UI组件库
│   ├── core/             # 领域模型和业务逻辑
│   ├── db/               # 数据库抽象
│   ├── sync/             # 同步逻辑
│   └── config/           # 配置管理
├── docs/                 # 文档
│   ├── architecture.md   # 架构文档
│   ├── data-model.md     # 数据模型
│   ├── roadmap.md        # 路线图
│   └── adr/             # 技术决策记录
└── scripts/              # 构建脚本
```

## 开发指南

### 环境要求

- Node.js 18+
- pnpm 8+
- Docker (用于本地开发)

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动所有应用
pnpm dev

# 构建所有应用
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 路线图

- **Phase 0**: 项目初始化与方案 (已完成)
- **Phase 1**: 本地优先MVP
- **Phase 2**: 提醒、借用、统计
- **Phase 3**: 账号与可选同步
- **Phase 4**: 移动端与桌面端完善
- **Phase 5**: 扩展能力

## 贡献指南

请参考 [CONTRIBUTING.md](docs/contributing.md) 获取详细的贡献指南。

## 许可证

本项目采用 MIT 许可证。