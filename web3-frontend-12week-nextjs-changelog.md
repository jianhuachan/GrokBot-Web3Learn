# 修改记录：Web3 前端 12 周计划 → Next.js 版

对照原文件，只做“贴近 Next.js（App Router）”的必要修改，没有增加新的学习主题。

## 标题与适用对象
- 标题加上“（Next.js 版）”。
- 适用对象由“React / Vue + TypeScript”改为“Next.js / React + TypeScript”。
- 开头说明里加了一行“本版本”，指向本修改记录。

## 第 1 节 · 本轮技术范围
- 删除“优先使用简单客户端应用，避免额外引入 SSR 学习成本”。
- 改为：前端默认用 Next.js（App Router）+ React + TS，沿用已熟悉的框架。
- 新增“渲染边界”子条目：
  - 钱包、合约读写、签名、交易状态组件一律是 Client Component（`'use client'`）。
  - `WagmiProvider` / `QueryClientProvider` 放在 `app/providers.tsx`（客户端文件），由 `app/layout.tsx` 引用。
  - 不在 Server Component / Route Handler / Server Action 中处理钱包、签名或私钥。
  - RSC 只用于静态说明页；本轮不研究 SSR 预取链上数据、cookie 持久化等进阶话题。
  - 遇到 hydration 不一致时的排查思路。

## 第 2 节 · 免费资源
- R5 备注加上“留意 Next.js / SSR 相关说明”。
- 新增 R5n：Next.js 官方 Server 与 Client Components 文档（只查边界与 Provider 放置）。
- R7 备注说明 Scaffold-ETH 2 自带前端也是 Next.js，只用来参考结构，作品仓库自己搭。
- 选课规则：Next.js 问题只查 R5n。

## 第 3 节 · 最终作品规格
- “同一个前端仓库”改为“同一个 Next.js（App Router）前端仓库”。
- 新增建议目录结构（layout / providers / page / components/web3 / lib/wagmi / lib/contracts）。

## 第 4 周
- 资源加上 R5n。
- W04-B：改为用 `create-next-app` 创建 Next.js + TS 项目，安装 `wagmi`、`viem`、`@tanstack/react-query`，建好客户端 `providers.tsx` 后在 layout 中使用。
- W04-C：要求在 Client Component 中实现，并确认刷新页面不报 hydration 错误。
- W04-E：README 写明 Next.js 版本，并建立 `.env.example`（列出 `NEXT_PUBLIC_*`）。
- Review 解释题加一问：为什么钱包组件必须放在 `'use client'` 边界内。
- 通过条件加上：Provider 只在客户端初始化，刷新不报 hydration 错误。

## 第 9 周
- W09-D：前端部署优先用 Vercel（或你熟悉的平台），在平台上配置 `NEXT_PUBLIC_*` 形式的 RPC URL、链 ID 和合约地址。
- 新增“部署环境变量规则”：`NEXT_PUBLIC_*` 会进入浏览器代码，只能放公开信息；私钥和助记词绝不放进 Next env 或托管平台；合约在本地用 Hardhat 部署。

## 第 10 周
- W10-C：检查项具体化为 `next lint`/ESLint、`tsc --noEmit`、`next build`。

## 第 11 周
- W11-B：“环境示例”具体化为 `.env.example`。
- Review 解释题加一问：为什么用 Next.js，但把 Web3 限制在客户端。

## 第 6 节 · 最终测试清单
- “项目启动和部署”一行加上 `next build` 通过、线上 env 只含公开的 `NEXT_PUBLIC_*`。
- 新增一行必过项“客户端边界”：钱包组件都在 `'use client'` 内、无 hydration 报错、未连接时说明内容可见。

## 未改动
- 每周 9 小时、A–F 六个节点、12 周共 108 小时的时间结构。
- 第 1–3、5–8、12 周的任务、Review 脚本和通过条件（第 5 周和第 6 周没有改动）。
- 门槛 G1–G4 及“不可用总分抵消”的问题清单。
- Wagmi + Viem、Scaffold-ETH 2 / Hardhat、本地链 → Sepolia 的路线。
- TestToken / DemoVault 合约规格、产品流程和最终交付包。
- 资源 R0–R11 原有链接。
- 第 5 节评分标准、第 7 节 Review 模板与 AI 提示词、第 8 节求职与英语、第 9 节追踪表、第 10 节 Counter/Guestbook、pending 演练和需求池。
- 没有加入 The Graph、账户抽象、SSR 数据预取等新的学习范围。
