# Web3 前端：12 周执行与复盘计划（Next.js 版）

> 适用对象：能够独立交付 Next.js / React + TypeScript 项目的前端工程师；Web3 零基础，尚未使用钱包或 DApp；英文文档阅读基本无障碍、口语约 B1；优先中文团队和免费资源。
>
> 时间预算：每周 9 小时，共 12 周、108 小时。目标：具备申请匹配的 Web3 前端岗位、独立完成范围明确的钱包与合约交互任务的能力。实际录用取决于岗位匹配、面试及招聘进度。
>
> 制定日期：2026-11-03。课程入口已在本次会话核验；软件版本和岗位状态以实际使用时为准。
>
> 本版本：在原计划基础上改为贴近 Next.js（App Router）技术栈，修改明细见《web3-frontend-12week-nextjs-changelog.md》。
>
> 任务资源补充：已将免费学习资料和具体阅读范围逐项加入 72 个任务节点。资源阅读计入原有工时，总预算仍为 108 小时。

开始日期：________　每周固定 Review 时间：________

## 1. 执行规则：先把时间和范围固定下来

### 每周固定 6 个节点

| 节点 | 建议安排 | 时间 | 做什么 |
|---|---|---:|---|
| A | 周二 | 1.5 小时 | 建立本周概念，按指定主题阅读或听课 |
| B | 周四 | 1.5 小时 | 跟随示例完成一次操作，记录输入与结果 |
| C | 周六 | 2 小时 | 独立实现本周核心功能 |
| D | 周日 | 2 小时 | 补齐场景、调试或测试 |
| E | 分散安排 | 0.5 小时 | 写交付说明、英文摘要或求职材料 |
| F | 周日末 | 1.5 小时 | 按本周脚本 Review，记录证据和下周调整 |
| **合计** | | **9 小时** | **学习、编码、复盘和英语均已计入** |

- 可以调整星期，但尽量保留 A → B → C → D → E → F 的顺序。
- 每周只有 8 小时时：A、B 各减 0.5 小时，其余节点不变，总计 8 小时。核心练习和 Review 保留，未完成内容顺延。
- 每周有 10 小时时：额外 1 小时只修复 Review 暴露的问题，不增加新课程。
- 视频播放、文档阅读和实操都包含在节点预算内。每行按给出的主题选读；先看首个链接，后续链接用于补充或查错，不要求通读整页或刷完整门课。
- A/B 节点按需读课；C/D 节点优先动手，遇到问题再查资料；E 节点使用示例或模板练习表达；F 节点先独立考核，结束后再用对应资料查漏。
- 标注“中文/英文”的资料均为免费公开教材、官方文档或本文件内的免费模板。公开视频平台可能需要免费账号；领取测试币、托管与 RPC 服务的条件另行核对，不要求购买付费课程。
- 节点到时仍未完成，记录具体卡点，下一节点优先解决。不要用熬夜把延期隐藏起来。
- 完成表格中的任务后，把对应的 `[ ]` 改为 `[x]`；每周最后填写实际用时和 Review 结果。
- 可以查官方文档和使用 AI。独立 Review 的 45 分钟内，先自己完成任务，不看课程答案、不让 AI 生成整段解决方案；之后再对照修正。

### 本轮技术范围

- 前端：Next.js（App Router）+ React + TypeScript，沿用你已熟悉的框架，不另学构建工具。
- 渲染边界：Web3 相关逻辑全部隔离在客户端边界内。
  - 钱包连接、账户/网络状态、合约读写、签名和交易状态组件放在 Client Component 边界内；在从 Server Component 引入的客户端入口文件声明 `'use client'`，不要求每个子文件都重复声明。
  - `WagmiProvider`、`QueryClientProvider` 放在单独的 `app/providers.tsx`（`'use client'`），由 `app/layout.tsx` 引用包裹 `children`。
  - 不在 Server Component、Route Handler 或 Server Action 中处理钱包、签名或私钥；服务端拿不到用户钱包。
  - RSC 只用于不依赖钱包的静态内容，如项目说明、README 式介绍页；本轮不研究 SSR 下预取链上数据、cookie 持久化钱包状态等进阶话题。
  - `'use client'` 不等于关闭预渲染。首次服务端 HTML 与客户端首次渲染应一致；钱包持久化状态和浏览器 API 应在适当时机读取。出现 hydration 不一致时，按第 4 周链接检查 Wagmi SSR 配置与挂载时机，必要时用一致的占位 UI 等待挂载。
- 链上交互：Wagmi + Viem。记录实际依赖版本，提交锁文件，使用对应版本文档。
- 网络：先本地开发链，再迁移到官方仍支持的应用测试网。本次核验的 Ethereum 文档推荐 Sepolia。
- 合约：使用 Scaffold-ETH 2 的 Hardhat 工具链，只承担本地链、编译、部署和测试；前端接收它产出的 ABI、地址和链 ID。本轮不同时学习另一套合约工具链。
- 合约学习深度：能读接口、理解状态变化、部署教学合约和排查简单错误。项目使用无收益机制的教学测试合约。
- 初期只支持一个网络、一个测试代币和一个存取款合约。
- 收益计算、跨链、复杂账户抽象、自建索引服务与专职合约审计放在本轮之后。

### 三个操作原则

1. 建立独立学习钱包，只用于本地链和测试网。助记词、私钥不进入代码仓库、截图或对话。
2. 链上金额使用整数及正确的单位转换；展示文本与交易金额分别处理。
3. 钱包连接、签名、代币授权、交易提交、交易执行成功是不同状态，界面必须区分。

## 2. 免费资源与使用方式

| 编号 | 资源 | 使用范围 |
|---|---|---|
| R0 | [MetaMask 官方安装入口](https://metamask.com/download) / [添加网络的中文说明](https://support.metamask.io/zh-cn/configure/networks/how-to-add-a-custom-network-rpc/) | 本计划默认浏览器钱包；第 1 周安装、第 2 周连接本地网络 |
| R1 | [Ethereum 官方中文开发文档](https://ethereum.org/zh/developers/docs/intro-to-ethereum/) | 第 1–2 周建立概念；按侧栏查账户、交易、Gas、合约、网络 |
| R2 | [Cyfrin Blockchain Basics](https://updraft.cyfrin.io/courses/blockchain-basics) | 免费视频与文字入门；只看本周相关主题，与 R1 互补 |
| R3 | [WTF Academy Solidity 101](https://www.wtf.academy/zh/course/solidity101) | 免费公开中文教材；第 3 周学习基础类型、函数、存储和权限等内容 |
| R4 | [Cyfrin Solidity](https://updraft.cyfrin.io/courses/solidity) | 免费课程；R3 未覆盖或看不懂时，选 Simple Storage 等对应片段补充 |
| R5 | [Wagmi 入门](https://wagmi.sh/react/getting-started) | 第 4 周起的主资料，按当前版本查 API；留意文档中 Next.js / SSR 相关说明 |
| R5n | [Next.js 官方文档：Server 与 Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | 第 4 周确认 `'use client'` 边界与 Provider 放置方式；只查需要的段落 |
| R5a | [Wagmi 连接钱包](https://wagmi.sh/react/guides/connect-wallet) | 钱包连接与连接状态 |
| R5b | [Wagmi 写入合约](https://wagmi.sh/react/guides/write-to-contract) | 发起合约交易与等待交易回执 |
| R6 | [Viem 官方文档](https://viem.sh/) | 按需查客户端、金额转换、模拟调用、回执和错误 |
| R7 | [Scaffold-ETH 2 文档](https://docs.scaffoldeth.io/) | 需要现成合约工具链时，使用其本地链、部署和调试能力；其自带前端本身也是 Next.js，可作为结构参考，但作品仓库自己搭 |
| R7a | [Scaffold-ETH 2 安装说明](https://docs.scaffoldeth.io/quick-start/installation) / [官方 Quickstart](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md) | 第 2 周环境搭建，选择 Hardhat 路线；按该项目要求使用包管理器 |
| R7b | [Scaffold-ETH 2 合约部署](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts) | 第 9 周迁移到测试网，保留同一工具链 |
| R8 | [SpeedRunEthereum](https://speedrunethereum.com/) | 遇到项目组织困难时选一个挑战参考；作为替代练习，不额外加课 |
| R9 | [Ethereum 中文网络说明](https://ethereum.org/zh/developers/docs/networks/) | 确认测试网络的用途与状态 |
| R10 | [OpenZeppelin ERC-20 教程](https://docs.openzeppelin.com/contracts/5.x/erc20) | 第 7 周制作标准测试代币，理解初始分配与整数精度 |
| R11 | [OpenZeppelin ERC-20 API](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20) | 页面内搜索 SafeERC20；DemoVault 使用安全转账封装，仍需单独验证权限与记账 |

选课规则：概念阶段以 R1 为主，视频帮助理解时再用 R2；Solidity 阶段以 R3 为主，R4 查漏补缺；实战阶段以 R5、R6 为主，Next.js 相关问题只查 R5n。不要同时完整刷多门入门课程。

第 2 周添加本地网络时，从正在运行的链配置中确认 RPC URL、链 ID 和币种标识，按 R0 填写。默认本地 RPC 常见为 `http://127.0.0.1:8545`，以终端输出为准。本地链提供的预置账户密钥属于公开测试数据，只用于本地链；公共测试网使用自己的独立学习账户。

## 3. 最终作品规格：测试代币充值与提现台

从第 4 周开始使用同一个 Next.js（App Router）前端仓库，持续迭代到第 12 周。

建议目录（可按习惯调整）：

```text
app/
  layout.tsx          # Server Component，引用 <Providers>
  providers.tsx       # 'use client'：WagmiProvider + QueryClientProvider
  page.tsx            # 可为 Server Component：项目说明 + 挂载客户端 DApp 组件
components/web3/      # 'use client'：钱包、余额、授权、存取、交易状态
lib/wagmi.ts          # wagmi config：chains、transports（RPC URL 来自 NEXT_PUBLIC_*）
lib/contracts.ts      # ABI、地址、链 ID、部署区块
```

### 必须具备的产品流程

1. 未连接钱包时展示明确入口；连接后显示账户与网络。
2. 网络错误时提示并支持切换，不允许误向其他网络发送交易。
3. 读取测试代币名称、符号、精度、钱包余额及用户已存入数量。
4. 输入存入金额，检查金额格式、余额、授权额度。
5. 授权不足时先完成指定额度的授权，再由用户明确发起存入操作。
6. 允许提取不超过自己已存入数量的代币。
7. 展示等待钱包确认、已提交、等待链上结果、成功、失败等状态。
8. 成功后刷新相关余额；支持查看交易详情及基础事件记录。
9. 覆盖拒签、错误网络、余额不足、合约拒绝、网络服务异常和刷新恢复。

### 教学合约的最小规格

合约只是前端练习的依赖。优先使用可读懂、来源明确的标准库和教学实现，不在此阶段扩展金融功能。

| 合约 | 必须提供的能力 | 验证方式 |
|---|---|---|
| TestToken | 标准 ERC-20 查询、转账、授权；本地部署时给测试账户分配余额 | 账户 A 有余额；能读取 decimals、balanceOf、allowance，并授权指定额度 |
| DemoVault | 固定接收一个 TestToken；按账户记录存入量；deposit、withdraw；存取事件 | 未授权存入失败；授权后存入成功；不能超额提取；不能提取他人的余额 |

DemoVault 可按以下接口约定实现或适配教学代码：

```text
token() → 代币地址
deposits(address) → 该账户存入量
deposit(uint256 amount) → 从调用者转入代币并记账
withdraw(uint256 amount) → 扣减调用者存入量并返还代币
Deposited(user, amount) / Withdrawn(user, amount) → 事件
```

- 存入依赖授权；提取只允许操作调用者自己的余额。
- 授权的 spender 是 DemoVault 地址；额度已经足够时跳过授权。提取不需要用户再次授权。
- 分别核对钱包里的代币余额、Vault 持有的代币总额、每个用户在 Vault 的可提取量。
- 示例只接收普通测试 ERC-20，不承诺兼容收取转账费或自动改变余额的代币。
- 源码、ABI、地址、链 ID、部署区块应记录在项目中；不记录任何私钥。
- 若借助 AI 编写合约，必须阅读代码并验证上述规则；生成成功不等于正确。
- 演示明确标注“教学测试网项目”；本计划的验证不等于生产安全审计。

### 最终交付包

- [ ] 可访问的前端演示地址。
- [ ] 可公开阅读的源码与依赖锁文件。
- [ ] README：用途、技术栈、启动步骤、网络、合约来源与地址、测试方法、已知限制。
- [ ] 不连接钱包也能看到产品说明；没有测试币的访客可观看演示录像。
- [ ] 3–5 分钟演示录像：主要流程、一个异常场景、一个技术取舍。
- [ ] 每周 Review 记录与最终测试记录。
- [ ] 至少一个可量化且真实的项目描述，例如完成多少个验证场景；不虚构用户量或生产使用情况。

## 4. 每周执行清单

### 第 1 周：理解账户、钱包与链，完成第一次链上观察

**周目标：**能用自己的话说明钱包、账户、区块链和应用的关系；建立独立学习环境。

**资源：**R0；R1 的以太坊简介、账户、网络；R2 的钱包与交易入门片段。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W01-A | 1.5 | 阅读区块链、以太坊、账户、钱包、主网/测试网；写出每个概念的一句话解释<br>**免费资料：**[以太坊简介](https://ethereum.org/zh/developers/docs/intro-to-ethereum/)（中文；只读区块链、以太坊、智能合约）；[账户](https://ethereum.org/zh/developers/docs/accounts/)（中文；账户类型、公私钥、账户与钱包的区别）；[网络](https://ethereum.org/zh/developers/docs/networks/)（中文；主网、测试网、Sepolia）。<br>**先学后做：**前 45 分钟读指定段落，后 45 分钟不用原文写术语解释。 | 8–10 个术语的小词表 |
| [ ] | W01-B | 1.5 | 从 R0 官方入口安装 MetaMask 浏览器扩展并建立独立学习钱包；查看地址、当前网络及网络切换<br>**免费资料：**[MetaMask 下载](https://metamask.com/download)（英文；选 Browser Extension）；[建立新钱包](https://support.metamask.io/start/creating-a-new-wallet/)（英文；只读创建流程与 SRP 的作用）；[切换网络](https://support.metamask.io/zh-cn/configure/networks/how-to-change-networks/)（中英混排；只看 Extension）。<br>**先学后做：**先读 20 分钟，再安装、创建与切换；环境记录只写版本、地址和网络，不记录助记词。 | 不含敏感信息的环境记录 |
| [ ] | W01-C | 2 | 在区块浏览器查看一笔公开测试交易；辨认发送方、接收方、状态、金额、手续费、区块<br>**免费资料：**[区块浏览器](https://ethereum.org/zh/developers/docs/data-and-analytics/block-explorers/)（中文；只看交易、区块及 Gas 字段）；[测试网资源入口](https://ethereum.org/zh/developers/docs/networks/)（中文；在 Sepolia 的资源列表进入浏览器）。<br>**先学后做：**读 20 分钟后选一笔已确认的公开测试交易，逐项解释 from、to、status、value、fee、block；不用自己的钱包也能完成。 | 一笔交易的中文解读 |
| [ ] | W01-D | 2 | 获取测试币并尝试转给第二个学习账户；记录提交与成功的变化<br>**免费资料：**[Sepolia 与水龙头](https://ethereum.org/zh/developers/docs/networks/)（中文；只读 Sepolia 和其水龙头列表）；[显示测试网络](https://support.metamask.io/zh-cn/configure/networks/how-to-view-testnets-in-metamask/)（中英混排；只看 Extension）；[发送代币](https://support.metamask.io/zh-cn/manage-crypto/move-crypto/send/how-to-send-tokens-from-your-metamask-wallet/)（中英混排；只读 Steps 与 Notes，跳过兑换）。<br>**先学后做：**先读 15 分钟；确认 Sepolia 后发送少量测试 ETH。领币超过 30 分钟就按本周卡点方案转做公开交易观察。 | 交易哈希和操作笔记；资源受限时使用下方替代方案 |
| [ ] | W01-E | 0.5 | 写 5 句英文介绍本周所学，录一段 60 秒口述<br>**免费资料：**[Ethereum wallets](https://ethereum.org/wallets/)（英文；只读钱包、账户、密钥的概念）。<br>**先学后做：**读 5 分钟；用自编句式写 5 句：I learned… / A wallet helps me… / My public address… / A testnet… / Next week I will…；最后录 60 秒，回听并修正一句不清楚的话。 | 文本与录音，可保留本地 |
| [ ] | W01-F | 1.5 | 执行本周 Review，并记分<br>**免费资料：**[本周 Review 脚本](#review-w01)（中文；按 15/45/20/10 分钟执行）；[账户](https://ethereum.org/zh/developers/docs/accounts/)（查漏：地址、私钥、钱包）；[网络](https://ethereum.org/zh/developers/docs/networks/)（查漏：不同网络的余额）。<br>**先做后查：**先独立回答与操作，最后再查错点；本节点不新增课程。 | 第 1 周 Review 记录 |

<a id="review-w01"></a>

**Review 脚本（90 分钟）：**

- 15 分钟解释：钱包是否保存代币本身？地址和私钥有什么不同？测试网的作用是什么？
- 45 分钟独立操作：打开一笔未分析过的测试交易，指出关键字段，解释交易是否成功以及判断依据。
- 20 分钟异常检查：切换网络，说明同一个地址为什么可能显示不同余额；指出哪些信息不能放进仓库。
- 10 分钟总结：给自己评分，列出最多 2 个问题。

**通过条件：**能独立解读交易，区分地址与私钥、主网与测试网，不暴露密钥。亲自发送测试交易最迟在第 2 周补齐。

**卡点处理：**领测试币尝试超过 30 分钟就停止反复尝试；先完成公开交易分析，第 2 周用本地链预置账户补齐交易练习。不得为了本任务购买主网资产。

### 第 2 周：交易、Gas、签名、RPC 与本地链

**周目标：**能描述交易生命周期；有一套不依赖公共测试币领取的本地练习环境。

**资源：**R1 的交易、Gas、节点/客户端、智能合约；R7a 本地开发说明。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W02-A | 1.5 | 理解交易哈希、nonce、Gas、回执；认识 RPC 是应用访问节点的接口<br>**免费资料：**[交易](https://ethereum.org/zh/developers/docs/transactions/)（中文；交易字段、nonce、交易生命周期）；[Gas 与费用](https://ethereum.org/zh/developers/docs/gas/)（中文；Gas、Gas limit、费用）；[JSON-RPC](https://ethereum.org/zh/developers/docs/apis/json-rpc/)（中文；只看定义及 eth_getTransactionReceipt 返回值）。<br>**先学后做：**读 45 分钟，再画“钱包签名→RPC 广播→交易哈希→入块→回执 status”的流程；不通读 RPC 方法大全。 | 一张交易流程草图 |
| [ ] | W02-B | 1.5 | 按 R7 建立本地链与示例部署环境，记录实际启动方法和版本<br>**免费资料：**[Scaffold-ETH 2 官方 Quickstart](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md)（英文；只读 Requirements、Quickstart 与三个本地启动命令）；[工具链与目录说明](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/AGENTS.md)（英文；只查 Hardhat、contracts、deploy、compile）。<br>**先学后做：**读 15 分钟，选择 Hardhat 路线后启动、部署示例；记录 Node、包管理器、命令和版本，保留锁文件。 | 本地环境启动说明 |
| [ ] | W02-C | 2 | 将学习钱包连接到本地网络；用已提供测试资金的本地账户完成转账<br>**免费资料：**[手工添加网络](https://support.metamask.io/zh-cn/configure/networks/how-to-add-a-custom-network-rpc/)（中英混排；只看 Adding a network manually，理解 RPC URL、chain ID、币种）；[发送步骤](https://support.metamask.io/zh-cn/manage-crypto/move-crypto/send/how-to-send-tokens-from-your-metamask-wallet/)（中英混排；Extension 的 Send 与交易状态）。<br>**先学后做：**读 15 分钟，按本地终端输出填网络参数，用本地预置账户做转账；不要照抄网页中的主网参数。 | 本地转账结果与回执 |
| [ ] | W02-D | 2 | 在课程示例中分别尝试取消钱包请求、读取数据、发送交易；观察是否收费、是否改变状态<br>**免费资料：**[与智能合约交互](https://ethereum.org/zh/developers/docs/smart-contracts/interacting/)（中文；只读“从合约中读取”“写入合约”）；[JSON-RPC](https://ethereum.org/zh/developers/docs/apis/json-rpc/)（中文；只对照 eth_call 与 eth_sendRawTransaction）。<br>**先学后做：**读 20 分钟后，在本地示例中依次读取、在钱包确认前拒绝写入、确认写入。比较是否广播、是否有回执、余额与状态是否改变；拒绝尚未提交的请求不等于取消已上链交易。 | 三种操作的对照笔记 |
| [ ] | W02-E | 0.5 | 用 5–8 句英文描述一次交易流程，整理环境恢复步骤<br>**免费资料：**[Transactions 英文原版](https://ethereum.org/developers/docs/transactions/)（英文；只读 The transaction lifecycle）；[Quickstart](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md)（英文；复核启动顺序）。<br>**先学后做：**读 5 分钟，再按自编句式 First… / Then the wallet… / The RPC… / A transaction hash… / The receipt… / To restart… 写 5–8 句；将自己实际使用的恢复命令写进清单。 | 流程说明与恢复清单 |
| [ ] | W02-F | 1.5 | 执行本周 Review<br>**免费资料：**[本周 Review 与 G1](#review-w02)（中文；从停止状态恢复环境并完成转账）；[Quickstart](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md)（查漏：启动顺序）；[JSON-RPC](https://ethereum.org/zh/developers/docs/apis/json-rpc/)（查漏：eth_getTransactionReceipt 与 status）。<br>**先做后查：**独立阶段先不看自己的操作笔记；完成后用文档纠错，保留恢复失败的具体报错。 | 第 2 周 Review 记录 |

<a id="review-w02"></a>

**Review 脚本：**

- 15 分钟解释：连接钱包、消息签名、发送交易有什么不同？读取合约一定需要钱包吗？
- 45 分钟独立操作：从停止状态启动已有本地环境，连接正确网络，完成转账并定位回执。
- 20 分钟异常检查：取消一次请求；停止 RPC 服务，描述用户会看到什么，并恢复服务。
- 10 分钟总结：更新启动说明与评分。

**门槛 G1：**能够完成实际交易，知道“有交易哈希”不等于“执行成功”，并能独立恢复本地环境。未通过时，第 3 周先用 A/B 共 3 小时补齐，合约内容相应顺延。

### 第 3 周：读懂简单合约和 ABI

**周目标：**知道前端究竟在调用什么，能区分只读函数、写入函数、事件和错误。

**资源：**R3；R4 中 Simple Storage 及相关片段；继续使用第 2 周环境。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W03-A | 1.5 | 学习地址、整数、函数、可见性、view、映射、调用者身份和权限的基础用途<br>**免费资料：**[智能合约剖析](https://ethereum.org/zh/developers/docs/smart-contracts/anatomy/)（中文；只读数据、环境变量、函数）；[Solidity 入门](https://docs.soliditylang.org/en/stable/introduction-to-smart-contracts.html)（英文；只读 Storage Example，以及 Subcurrency Example 中 address、mapping、msg.sender、权限检查）；[WTF Solidity 101](https://www.wtf.academy/zh/course/solidity101)（中文备查；第 2、3、7、11 讲对应类型、函数、映射、修饰器）。<br>**先学后做：**前 50 分钟读指定代码，后 40 分钟给合约加自己的注释；备查课程只补不懂的概念。 | 注释过的简单合约 |
| [ ] | W03-B | 1.5 | 部署课程中的 Simple Storage，调用读取和修改方法；认识 ABI 与合约地址<br>**免费资料：**[SimpleStorage 官方示例](https://docs.soliditylang.org/en/stable/introduction-to-smart-contracts.html)（英文；只看 Storage Example 的 set/get）；[Cyfrin Solidity](https://updraft.cyfrin.io/courses/solidity)（英文视频与文字；只选 Simple Storage 章节的部署、读取与写入片段）；[ABI 的 JSON 格式](https://docs.soliditylang.org/en/stable/abi-spec.html)（英文；页面内找 JSON，只看 name、inputs、outputs、stateMutability）。<br>**先学后做：**读/看 25 分钟，再把同一个 SimpleStorage 放入已有 Hardhat 工具链部署；不另搭第二套环境。 | 部署信息和 ABI |
| [ ] | W03-C | 2 | 自己修改一个状态变量和函数；增加一个值变化事件并重新部署<br>**免费资料：**[WTF Solidity 101](https://www.wtf.academy/zh/course/solidity101)（中文；只读第 12 讲“事件”的 event、emit、indexed）；[ABI 事件说明](https://docs.soliditylang.org/en/stable/abi-spec.html)（英文；只看 Events 与 JSON 中 event 描述）。<br>**先学后做：**读 20 分钟，再给 SimpleStorage 增加值变化事件、重新部署并触发一次；从回执日志核对参数，同时保存新的 ABI 与地址。 | 一次可解释的代码改动 |
| [ ] | W03-D | 2 | 为写入增加简单约束，例如数值范围；分别验证合法输入和会被拒绝的输入<br>**免费资料：**[WTF Solidity 101](https://www.wtf.academy/zh/course/solidity101)（中文；只读第 15 讲“异常”的 require、error、revert）；[Solidity 错误处理](https://docs.soliditylang.org/en/stable/control-structures.html)（英文；只读 Error handling 中 require/revert 与状态回滚，跳过 try/catch 深入内容）。<br>**先学后做：**读 20 分钟，再设一个明确上限，验证正常值、上限值、超限值；解释失败后状态是否改变。 | 成功与失败案例记录 |
| [ ] | W03-E | 0.5 | 用英文写合约用途、输入、输出和限制，各 1–2 句<br>**免费资料：**[Solidity NatSpec](https://docs.soliditylang.org/en/stable/natspec-format.html)（英文；只读 Documentation Example 与 Tags 中 @notice、@param、@return）。<br>**先学后做：**读 8 分钟，用自编句式 This contract stores… / The function accepts… / It returns… / It rejects… 描述自己的接口；暂不研究编译器输出格式。 | 接口说明 |
| [ ] | W03-F | 1.5 | 执行本周 Review<br>**免费资料：**[本周 Review 脚本](#review-w03)（中文；修改约束、重部署、验证配置错误）；[ABI JSON](https://docs.soliditylang.org/en/stable/abi-spec.html)（查漏：函数名、参数、返回值、stateMutability）；[JSON-RPC](https://ethereum.org/zh/developers/docs/apis/json-rpc/)（查漏：eth_getCode 用于核对目标地址是否有合约代码）。<br>**先做后查：**独立完成后再对照接口与部署记录；旧地址可能仍有效，不能把“旧”当成配置错误的证据。 | 第 3 周 Review 记录 |

<a id="review-w03"></a>

**Review 脚本：**

- 15 分钟解释：ABI、地址、链 ID 各解决什么问题？view 与修改状态的函数有何区别？
- 45 分钟独立操作：在现有合约中调整一个约束，重新部署，验证合法与非法输入。
- 20 分钟异常检查：使用确认没有合约代码的地址；再尝试 ABI 中声明但目标合约没有的函数，观察并定位配置问题。旧地址仍可能有效，不能用“旧”直接判断错误。
- 10 分钟总结：记录合约变更后的前端配置更新步骤。

**通过条件：**能根据 ABI 找到函数参数与返回值，识别读取/写入方法，并解释失败原因。暂时不要求掌握复杂 Solidity 语法。

### 第 4 周：搭建前端，连接钱包与切换网络

**周目标：**开始最终作品仓库，建立可靠的钱包和网络状态处理。

**资源：**R5、R5a、R5n；第 3 周的 Simple Storage 地址与 ABI。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W04-A | 1.5 | 阅读当前版本 Wagmi 入门，理解配置、连接器和查询状态<br>**免费资料：**[Wagmi 配置](https://wagmi.sh/react/api/createConfig)（英文；只读 chains、transports、connectors）；[查询与缓存](https://wagmi.sh/react/guides/tanstack-query)（英文；只读 Queries、Mutations、Query Keys）；[v2→v3 变化](https://wagmi.sh/react/guides/migrate-from-v2-to-v3)（英文；只查账户 Hook 与 mutate 命名）。<br>**具体知识点：**RPC 与链配置、连接器职责、查询与写入的区别；本次主文档使用 useConnection，旧教程需按锁定版本核对。资料查阅最多 30 分钟，计入本节点。 | 技术版本记录 |
| [ ] | W04-B | 1.5 | 用 `create-next-app` 创建 Next.js + TS（App Router）工程；安装 `wagmi`、`viem`、`@tanstack/react-query`；新建 `'use client'` 的 `app/providers.tsx` 包裹 WagmiProvider 与 QueryClientProvider，并在 `app/layout.tsx` 中使用<br>**免费资料：**[Next.js 安装](https://nextjs.org/docs/app/getting-started/installation)（英文；只看 create-next-app 与 App Router）；[Server / Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)（英文；只看 Using Client Components、Context providers）；[Wagmi 手动接入](https://wagmi.sh/react/getting-started)（英文；只看配置、WagmiProvider、QueryClientProvider）。<br>**具体知识点：**layout 保持 Server Component，Provider 放客户端入口，children 可保留服务端内容；Provider 实例需稳定。阅读最多 25 分钟，其余时间搭建；不另建 create-wagmi 工程。 | 能启动的 Next.js 前端仓库 |
| [ ] | W04-C | 2 | 在 Client Component 中实现连接/断开、账户地址、网络名称、原生币余额展示；确认刷新页面无 hydration 报错<br>**免费资料：**[连接钱包](https://wagmi.sh/react/guides/connect-wallet)（英文；只看 Build Your Own 的连接、连接状态及断开示例）；[useBalance](https://wagmi.sh/react/api/hooks/useBalance)（英文；只看 address、chainId、返回值）；[Wagmi SSR](https://wagmi.sh/react/guides/ssr)（英文；只看开头 ssr 配置，跳过 Cookies）。<br>**具体知识点：**当前账户、连接状态、原生币余额；Client Component 初次仍会预渲染，使用 ssr: true 延迟外部状态恢复，首屏占位保持一致；浏览器对象只在挂载后或事件中使用。阅读最多 25 分钟，余下时间实现与刷新检查。 | 钱包状态区域 |
| [ ] | W04-D | 2 | 实现错误网络提示、切换网络、账户变化时清理旧数据<br>**免费资料：**[useSwitchChain](https://wagmi.sh/react/api/hooks/useSwitchChain)（英文；只看 Usage、chainId、错误返回）；[useConnection](https://wagmi.sh/react/api/hooks/useConnection)（英文；只看 address、chainId、status）。<br>**具体知识点：**请求切链与切链完成是两步；账户/网络变化后更新查询参数、清理旧输入和交易提示，重新读取余额；切链被拒绝时继续禁止错误网络写入。查阅最多 15 分钟，重点验证四种状态变化。 | 网络与账户切换流程 |
| [ ] | W04-E | 0.5 | 写 README 初稿：用途、启动方法、支持网络、依赖版本（含 Next.js 版本）；建立 `.env.example`，列出 `NEXT_PUBLIC_*` 变量<br>**免费资料：**[Next.js 环境变量](https://nextjs.org/docs/app/guides/environment-variables)（英文；只看 Bundling Environment Variables for the Browser）；[GitHub README 要点](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)（英文；只看 About READMEs 的内容清单）。<br>**具体知识点：**NEXT_PUBLIC_* 会进入浏览器包，并在构建时固定；.env.example 只放公开配置示例，写清安装、启动、链与版本。读资料最多 5 分钟，余下 25 分钟写出能照做的 README。 | 可复现的启动说明 |
| [ ] | W04-F | 1.5 | 执行本周 Review<br>**免费资料：**[Review 评分表](#review-rubric)、[记录模板](#review-template)（中文；使用本周脚本和五项评分）。<br>**具体知识点：**拿切账户、断开、拒绝连接、切错网络的实际结果作证据；检查首屏/刷新一致性。90 分钟按解释 15＋独立操作 45＋异常 20＋总结 10 执行，不新增课程。 | 第 4 周 Review 记录 |

<a id="review-w04"></a>

**Review 脚本：**

- 15 分钟解释：钱包连接后，应用获得了什么权限？链 ID 为什么需要检查？为什么钱包相关组件必须在 `'use client'` 边界内？
- 45 分钟独立操作：在现有页面增加一个网络信息字段；切换账户后，展示新账户信息。
- 20 分钟异常检查：断开钱包、拒绝连接、切错网络；确认没有错误地展示旧账户余额。
- 10 分钟总结：记录发现的状态问题。

**通过条件：**连接、断开、切账户、切网络均有可理解的界面反馈。错误网络下禁止写入操作。Provider 位于客户端入口，首次渲染状态一致，页面刷新无 hydration 错误。

### 第 5 周：合约读写与交易状态

**周目标：**前端能正确读写合约，能够辨认各个交易阶段。

**资源：**R5b、R6；继续使用 Simple Storage，先练通交互。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W05-A | 1.5 | 阅读合约读取、写入、模拟调用和等待回执的流程；区分查询与交易<br>**免费资料：**[读取合约](https://wagmi.sh/react/guides/read-from-contract)（英文；只看 ABI、address、functionName、args）；[写入合约](https://wagmi.sh/react/guides/write-to-contract)（英文；只看提交与等待回执）；[模拟调用](https://wagmi.sh/react/api/hooks/useSimulateContract)（英文；只看 Usage 与 request）。<br>**具体知识点：**只读查询、模拟写入、钱包确认、交易哈希、回执的职责；模拟通过不保证未来执行成功。查阅最多 35 分钟，随后画出项目调用流程。 | 调用流程草图 |
| [ ] | W05-B | 1.5 | 在页面读取 Simple Storage，并展示加载、空值与错误状态<br>**免费资料：**[useReadContract](https://wagmi.sh/react/api/hooks/useReadContract)（英文；只查输入参数、query.enabled、返回状态与 refetch）；[Wagmi 查询缓存](https://wagmi.sh/react/guides/tanstack-query)（英文；只看 Query Keys 与缓存刷新）。<br>**具体知识点：**用 ABI 获得参数类型，参数不足时禁用查询；区分加载、错误、合法的 0 值；账户/链进入查询条件。查阅最多 20 分钟，剩余时间完成读取组件。 | 可刷新数据的读取组件 |
| [ ] | W05-C | 2 | 实现修改数值：输入校验、模拟调用、请求钱包、提交、等待回执<br>**免费资料：**[useSimulateContract](https://wagmi.sh/react/api/hooks/useSimulateContract)（英文；只看模拟结果 request）；[useWriteContract](https://wagmi.sh/react/api/hooks/useWriteContract)（英文；只看 Usage、mutate、data、error）；[useWaitForTransactionReceipt](https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt)（英文；只看 hash、chainId、等待状态）。<br>**具体知识点：**先校验再模拟，用当前账户/网络提交；哈希只代表提交，回执结果决定成功或失败。按所装版本使用 mutation API。查阅最多 25 分钟，其余时间打通一次写入。 | 一次完整写入流程 |
| [ ] | W05-D | 2 | 实现状态提示、重复提交保护、成功后刷新读取数据；有浏览器时显示交易链接<br>**免费资料：**[等待交易回执](https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt)（英文；只查等待、成功、错误状态）；[查询失效与刷新](https://wagmi.sh/react/guides/tanstack-query)（英文；只看 Invalidating Queries / After User Interaction）。<br>**具体知识点：**分别显示等待钱包、已提交、等待执行、执行成功、失败；等待期间限制重复提交；成功后按正确 queryKey 刷新读取结果。查阅最多 15 分钟，剩余时间验证状态转换。 | 交易状态组件 |
| [ ] | W05-E | 0.5 | 用英文写一条变更说明：完成内容、验证方法、已知问题<br>**免费资料：**[英文异步更新模板](#async-update)（中英；只用 Completed、Verified by、Blocked by、Next step 字段）。<br>**具体知识点：**用具体功能说明改了什么，以实际操作说明如何验证，列出尚未处理的情况；将模板改写成 5–8 句模拟 PR 描述。模板阅读不超过 3 分钟，全文写作与检查共 30 分钟。 | 一份模拟 PR 描述 |
| [ ] | W05-F | 1.5 | 执行本周 Review<br>**免费资料：**[Review 评分表](#review-rubric)、[记录模板](#review-template)（中文；对应本周输入校验与交易状态任务）。<br>**具体知识点：**解释模拟与真实执行的差别，证明拒签、回退、重复点击均有正确反馈；成功必须对应链上结果。按既定 90 分钟 Review 分配执行。 | 第 5 周 Review 记录 |

<a id="review-w05"></a>

**Review 脚本：**

- 15 分钟解释：模拟调用成功是否保证交易成功？为什么收到哈希后不能立即显示“操作完成”？
- 45 分钟独立操作：给现有合约页面增加一个输入校验规则，完成读写并验证数据刷新。
- 20 分钟异常检查：取消钱包请求、输入会触发约束失败的值、连续点击按钮。
- 10 分钟总结：逐项核对界面文案与实际交易状态。

**通过条件：**回执确认执行成功后才显示成功；拒签与合约失败能区分；成功后界面数据一致。

### 第 6 周：金额精度与故障排查，检查前半程能力

**周目标：**能独立完成简单合约交互，正确处理金额与常见错误。

**资源：**R6 的 BigInt、parseUnits / formatUnits 等单位转换和错误处理资料；R5 的错误处理说明。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W06-A | 1.5 | 理解 ERC-20、decimals、整数金额和授权；练习 6 位与 18 位精度转换<br>**免费资料：**[ERC-20 与 decimals](https://docs.openzeppelin.com/contracts/5.x/erc20)（英文；只看 A Note on decimals）；[parseUnits 官方文档原文](https://raw.githubusercontent.com/wevm/viem/main/site/pages/docs/utilities/parseUnits.md)（英文；只看字符串输入、精度参数、bigint 输出）；[formatUnits 官方文档原文](https://raw.githubusercontent.com/wevm/viem/main/site/pages/docs/utilities/formatUnits.md)（英文；只看 bigint 输入、字符串输出）。<br>**具体知识点：**链上整数和展示小数分开；分别手算并验证 6/18 位精度往返转换，不用 Number 参与资产计算。查阅最多 25 分钟，其余时间做转换样例。 | 单位转换示例 |
| [ ] | W06-B | 1.5 | 给金额输入写校验：空、负数、0、超精度、超过余额；最后 20 分钟部署第 10 节 Counter 练习合约，暂不写其前端<br>**免费资料：**[parseUnits 官方用法](https://raw.githubusercontent.com/wevm/viem/main/site/pages/docs/utilities/parseUnits.md)（英文；只核对参数和返回类型）；[Counter 与 Review 准备材料](#review-fixtures)（中文＋Solidity；只读 Counter 和部署准备）。<br>**具体知识点：**先校验十进制输入、正数、小数位数，再转换并用 bigint 比较余额；不要把转换函数当成全部业务校验。前 70 分钟含最多 10 分钟资料查阅，后 20 分钟部署 Counter，保持总计 1.5 小时。 | 金额工具、验证用例及 Review 合约地址 |
| [ ] | W06-C | 2 | 故障演练：RPC 不可用、地址错误、网络错误、合约拒绝、钱包拒签<br>**免费资料：**[Wagmi 错误处理](https://wagmi.sh/react/guides/error-handling)（英文；只看 Hook error 的读取与展示）；[Viem 错误分类](https://viem.sh/docs/glossary/errors)（英文；只查 UserRejectedRequestError、HttpRequestError、ChainMismatchError、ContractFunctionRevertedError）。<br>**具体知识点：**区分钱包拒绝、RPC 失败、错误链、地址/ABI 问题、合约回退；保存技术诊断信息，界面给出可操作提示，不能把所有错误都叫余额不足。查阅最多 20 分钟，随后逐项制造并恢复故障。 | 错误分类和用户文案 |
| [ ] | W06-D | 2 | 前 1.5 小时按第 10 节制造待确认交易，保存哈希/链/账户并刷新恢复查询；后 0.5 小时收集 3 个岗位样本<br>**免费资料：**[待确认交易故障演练](#review-fixtures)（中文；只看暂停出块、刷新恢复、手动出块与恢复自动出块）；[等待回执](https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt)（英文；只查 hash、chainId 和启用条件）；[DeJob 岗位列表](https://dejob.ai/job)（中文；只筛前端/React/远程）。<br>**具体知识点：**按链、账户、哈希恢复查询；本地记录不等于链上成功；localStorage 只在客户端挂载后访问。前 1.5 小时包含最多 15 分钟资料查阅，后 0.5 小时记录 3 个 JD 的地区、时区、语言与技能要求。 | 恢复流程和岗位表初稿 |
| [ ] | W06-E | 0.5 | 录制 2 分钟英文项目介绍，允许看提纲；整理一条求助信息<br>**免费资料：**[英文异步更新模板](#async-update)（中英；只用完成项、验证方式、卡点和求助）。<br>**具体知识点：**2 分钟介绍覆盖项目用途、技术栈、已完成交互、一个真实问题；求助写环境、最小复现、预期/实际及已尝试方案，避免只说“不能用”。准备与录制合计 30 分钟，允许看提纲。 | 录音与结构化问题描述 |
| [ ] | W06-F | 1.5 | 执行门槛 G2 Review<br>**免费资料：**[Counter 接入需求](#review-fixtures)、[评分与门槛](#review-rubric)、[记录模板](#review-template)（中文；只读 G2 对应材料）。<br>**具体知识点：**已有运行环境中独立读写 Counter；验证一次 6 位金额转换及刷新恢复；金额错误或提交即成功不能靠总分抵消。严格使用原有 90 分钟，不在独立操作环节重新部署工具链。 | 第 6 周 Review 记录 |

<a id="review-w06"></a>

**Review 脚本：**

- 15 分钟解释：链上金额为什么用整数？用户拒签、RPC 失败、合约拒绝分别处于哪个环节？
- 45 分钟独立操作：在已经运行的工程中，接入一个准备好的 Counter 合约，显示计数并调用 increment；提供 ABI、地址和可用本地网络。
- 20 分钟异常检查：取消一次请求；验证一次 6 位精度金额转换；刷新页面恢复一次交易查询。
- 10 分钟总结：评分，决定进入第 7 周还是补救。

**门槛 G2：**Counter 读写独立完成；金额转换正确；界面不会把提交误判为成功；知道从哪里定位失败。

**未通过处理：**第 7 周 A/B 共 3 小时修复最多 2 项问题并重测；暂停增加新业务。若核心读写仍无法独立完成，插入一周补课，后续节点顺延。

### 第 7 周：确定业务规格，准备测试代币和存取款合约

**周目标：**将通用交互练习升级为明确的作品，准备可重复验证的链上环境。

**资源：**第 3 节合约规格、R7、R10、R11。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W07-A | 1.5 | 写页面草图和用户流程；明确 deposit 与 withdraw 的输入、结果和失败条件<br>**免费资料：**[ERC-20 标准](https://eips.ethereum.org/EIPS/eip-20)（英文；只读 balanceOf、transfer、transferFrom、approve、allowance 的行为）；[OpenZeppelin ERC-20 API](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)（英文；只查 IERC20 方法）。<br>**具体知识点：**画出用户、Token、Vault 的调用与代币流向；deposit/withdraw 属于自己 Vault 的接口，不能与标准 ERC-20 方法混淆；写明成功与失败后的余额变化。阅读最多 20 分钟，主要时间写规格和草图。 | 一页需求说明 |
| [ ] | W07-B | 1.5 | 在现有工具链部署标准测试代币，给本地账户 A/B 分配测试余额<br>**免费资料：**[OpenZeppelin 创建 ERC-20](https://docs.openzeppelin.com/contracts/5.x/erc20)（英文；只看 Constructing an ERC-20 Token Contract、_mint 和 decimals）；[Scaffold-ETH 官方部署脚本](https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/packages/hardhat/deploy/00_deploy_your_contract.ts)（英文代码；只看部署参数、构造参数和部署结果）。<br>**具体知识点：**继承标准 ERC20，按整数单位分配测试供应量；给 A/B 分配余额并核对地址与 ABI。脚本以已安装模板版本为准，不升级工具链。查阅最多 20 分钟，其余时间部署与验证。 | TestToken 地址、ABI、余额 |
| [ ] | W07-C | 2 | 按最小规格实现或适配 DemoVault；阅读存入、提取、记账和事件代码<br>**免费资料：**[SafeERC20 API](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)（英文；页内查 SafeERC20，只读 safeTransfer、safeTransferFrom）；[Solidity 调用顺序](https://docs.soliditylang.org/en/latest/security-considerations.html)（英文；只看 Reentrancy 与 Checks-Effects-Interactions 示例）。<br>**具体知识点：**固定测试代币、按 msg.sender 记账，先验证提取权限与额度再更新状态、返还代币；存入使用 safeTransferFrom；理解错误回退与事件。仅适配教学 Vault，查阅最多 25 分钟，不扩展审计或收益功能。 | 注释过的合约与来源说明 |
| [ ] | W07-D | 2 | 验证未授权失败、授权后存入成功、提取成功、超额提取失败、账户隔离；读第 2 批 3 个 JD<br>**免费资料：**[Scaffold-ETH 官方合约测试](https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/packages/hardhat/test/YourContract.ts)（英文代码；只看部署 fixture、读取与断言结构）；[ERC-20 allowance / transferFrom](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)（英文；只查授权与扣减规则）；[DeJob 岗位列表](https://dejob.ai/job)（中文；筛选第二批 3 个岗位）。<br>**具体知识点：**将现有测试结构换成未授权拒绝、存取成功、超额拒绝、A/B 隔离，记录钱包余额、Vault 持币量和用户记账。前 1.5 小时含最多 15 分钟查资料并验证，后 0.5 小时看 JD。 | 可重复的验证步骤与岗位差距 |
| [ ] | W07-E | 0.5 | 写接口表，记录地址、ABI、链 ID、部署区块和如何重置环境<br>**免费资料：**[Solidity ABI 的 JSON 格式](https://docs.soliditylang.org/en/latest/abi-spec.html#json)（英文；只看 type、name、inputs、outputs、stateMutability）；[Scaffold-ETH 部署结果示例](https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/packages/hardhat/deploy/00_deploy_your_contract.ts)（英文代码；核对构造参数与返回的部署信息）。<br>**具体知识点：**接口表覆盖参数、返回值、只读/写入和失败条件；部署信息补链 ID、地址、ABI、部署区块、重置方法。资料阅读最多 5 分钟，余下 25 分钟整理自己的真实信息。 | 合约接入说明 |
| [ ] | W07-F | 1.5 | 执行本周 Review<br>**免费资料：**[评分与硬性门槛](#review-rubric)、[记录模板](#review-template)（中文；用本周 A/B 账户脚本留证据）。<br>**具体知识点：**解释 spender 是 Vault、授权不移动代币、提取无需另行授权；核对未授权失败与账户隔离。按解释 15＋部署操作 45＋异常 20＋总结 10 分钟执行。 | 第 7 周 Review 记录 |

<a id="review-w07"></a>

**Review 脚本：**

- 15 分钟解释：授权给谁？授权额度表示什么？授权后是否已经完成存入？
- 45 分钟独立操作：从干净本地状态部署合约，完成 A 账户授权、存入、提取，核对钱包与合约内余额。
- 20 分钟异常检查：B 账户尝试提取超过自己余额的金额；确认失败且 A 的余额不变。
- 10 分钟总结：核对合约接口表。

**通过条件：**能解释权限与资产流向，验证金额守恒和账户隔离。核心行为未验证前，不进入前端存取款集成。

**范围控制：**合约工作超过预算时，先保留标准测试代币与最小存取功能，删除额外管理功能和可选页面；不以跳过验证换进度。

### 第 8 周：完成授权与存入流程

**周目标：**用户能够在页面上完成指定额度授权并存入测试代币。

**资源：**R5、R6、自己的合约接口表。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W08-A | 1.5 | 读取代币名称、符号、精度、余额、授权额度和已存入量<br>**免费资料：**[useReadContract](https://wagmi.sh/react/api/hooks/useReadContract)（英文；只查 ABI、address、args、chainId、query.enabled）；[ERC-20 查询接口](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)（英文；只看 name、symbol、decimals、balanceOf、allowance）。<br>**具体知识点：**先用已有读取方式完成各字段；allowance 的参数是 owner 与 Vault 地址，deposits 属于 Vault；区分 0 值与未加载，切账户后重新读。查阅最多 20 分钟，不为批量优化增加新工具。 | 真实链上数据展示 |
| [ ] | W08-B | 1.5 | 将输入转换为整数金额；根据授权额度决定显示授权还是存入入口<br>**免费资料：**[parseUnits 官方用法](https://raw.githubusercontent.com/wevm/viem/main/site/pages/docs/utilities/parseUnits.md)（英文；只看输入字符串、精度、bigint）；[ERC-20 approve / allowance](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)（英文；只查 IERC20 的对应接口）。<br>**具体知识点：**先校验输入再转换；使用整数比较 amount、balance、allowance；授权足够时跳过授权；金额、账户或网络变化后重新计算按钮条件。查阅最多 15 分钟，其余时间实现并验证条件分支。 | 输入与按钮状态逻辑 |
| [ ] | W08-C | 2 | 实现指定额度 approve，等待确认后刷新 allowance，再由用户确认发起 deposit<br>**免费资料：**[写合约流程](https://wagmi.sh/react/guides/write-to-contract)（英文；只看 useWriteContract 与交易状态）；[等待回执](https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt)（英文；只看按哈希等待结果）；[查询刷新](https://wagmi.sh/react/guides/tanstack-query)（英文；只看 Invalidating Queries）。<br>**具体知识点：**approve 的目标是 Token、spender 是 Vault；确认授权成功并刷新 allowance 后，再由用户发起 Vault.deposit；两笔交易分别管理状态与错误。查阅最多 20 分钟，其余时间贯通流程。 | 授权→存入完整流程 |
| [ ] | W08-D | 2 | 验证小额、余额全额、授权不足、重复点击；成功后刷新余额和存入量<br>**免费资料：**[useWriteContract 状态与重置](https://wagmi.sh/react/api/hooks/useWriteContract)（英文；只查 isPending、error、reset）；[查询刷新](https://wagmi.sh/react/guides/tanstack-query)（英文；只看 queryKey 与 invalidateQueries）；[Review 记录模板](#review-template)（中文；只用预期/实际表）。<br>**具体知识点：**小额与全额都按 ERC-20 整数核对；全额存 Token 后仍需原生币支付 Gas；等待期间避免重复提交，成功后刷新 balanceOf、allowance、deposits。查阅最多 15 分钟，主要时间做场景验证。 | 交互验证记录 |
| [ ] | W08-E | 0.5 | 写 5–8 句英文描述授权和存入的区别；更新 README<br>**免费资料：**[ERC-20 approve / transferFrom](https://eips.ethereum.org/EIPS/eip-20)（英文；只重读两个方法的含义，不照抄旧版 Solidity 语法）；[英文异步更新模板](#async-update)（中英；参考短句结构）。<br>**具体知识点：**用 owner、spender、allowance、deposit 解释授权额度与实际资产移动的差别，写清用户为何需确认两次；将自己的 5–8 句说明放进 README。阅读最多 5 分钟，写作与自查共 30 分钟。 | 业务说明 |
| [ ] | W08-F | 1.5 | 执行本周 Review<br>**免费资料：**[Review 评分表](#review-rubric)、[记录模板](#review-template)（中文；使用新账户从零授权、存入的本周脚本）。<br>**具体知识点：**核对账户余额、授权额度、Vault 记账；拒签重试与授权后切账户都要实际操作；授权成功不能误报存入成功。完整 Review 仍为 90 分钟，不新增学习时长。 | 第 8 周 Review 记录 |

<a id="review-w08"></a>

**Review 脚本：**

- 15 分钟解释：直接转账与通过合约存入有什么不同？为什么只授权需要的额度？
- 45 分钟独立操作：给一个未使用过的测试账户分配余额，从零授权并存入指定金额，核对三类余额/额度。
- 20 分钟异常检查：拒绝授权，再重试；授权完成后切换账户，确认旧账户状态不会用于新账户。
- 10 分钟总结：检查是否存在“授权成功即显示存入成功”的错误。

**通过条件：**授权与存入是清楚的两个步骤；账户、网络、金额变化后状态仍正确。

### 第 9 周：完成提取、记录与演示版本

**周目标：**作品形成完整闭环，并可供他人查看。

**资源：**R5、R6 的事件/日志查询；R7b、R9。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W09-A | 1.5 | 实现提取金额校验、交易反馈和成功后的数据刷新<br>**免费资料：**[Wagmi 写入合约](https://wagmi.sh/react/guides/write-to-contract)（英文；阅读发送交易、等待回执和错误展示，把参数替换为 `withdraw(amount)`）；[Wagmi 读取合约](https://wagmi.sh/react/guides/read-from-contract)（英文；阅读 Loading & Error States、refetch 示例，成功后重新读取钱包余额和可提取量）；[最终测试清单](#final-checklist)（中文；对照空值、负数、超精度与超额提取场景，校验原始输入后再转链上整数）。 | 提取流程 |
| [ ] | W09-B | 1.5 | 从部署区块开始查询存取事件；限定区块范围并处理加载/失败，不扫描整条链<br>**免费资料：**[Viem：getContractEvents](https://viem.sh/docs/contract/getContractEvents.html)（英文；阅读 Scoping、Arguments、Block Range；按合约地址和事件名过滤，`fromBlock` 不早于部署区块，设置有限 `toBlock`；只对 indexed 参数使用 `args` 过滤，分段查询并展示加载、空态与失败态）。 | 基础操作记录 |
| [ ] | W09-C | 2 | 将合约迁移到应用测试网，验证链 ID、地址、ABI、部署区块和测试余额<br>**免费资料：**[Scaffold-ETH 2：Deploy Smart Contracts](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts)（英文；只读 Hardhat 路线的网络配置、独立部署账户、测试余额及 `yarn deploy --network sepolia` 步骤；沿用已安装版本的脚本，记录本次地址、ABI、链 ID 和部署区块；密钥仅由本地合约工具链管理，不进入 Next.js）。 | 测试网部署配置 |
| [ ] | W09-D | 2 | 将前端部署到 Vercel（或你熟悉的平台）；在平台配置 `NEXT_PUBLIC_` 开头的 RPC URL、链 ID、合约地址；检查手机宽度、首次访问提示和完整存取流程；选出 3 个匹配岗位<br>**免费资料：**[Next.js：Deploying](https://nextjs.org/docs/app/getting-started/deploying)（英文；阅读与你所选托管方式对应的部署段落，确认构建与启动方式）；[Next.js：Environment Variables](https://nextjs.org/docs/app/guides/environment-variables)（英文；阅读 Bundling Environment Variables for the Browser，理解 `NEXT_PUBLIC_*` 在构建时公开内联，修改后需要重新构建部署）；[岗位筛选表](#job-screening)（中文；只选地区、协作时区、语言与经验可匹配的 3 个岗位）。 | 在线演示候选版 |
| [ ] | W09-E | 0.5 | 写一段真实的中文项目介绍；录制临时演示<br>**免费资料：**[GitHub：关于仓库 README 文件](https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)（中文；阅读 README 应说明的用途与使用方式，将介绍写成“解决什么问题—我实现了什么—如何验证”）；[Google Technical Writing：Short sentences](https://developers.google.com/tech-writing/one/short-sentences)（英文；只读 Focus each sentence on a single idea，给临时演示写简短解说，明确教学测试网范围）。 | 简历项目素材 |
| [ ] | W09-F | 1.5 | 执行本周 Review<br>**免费资料：**[统一评分标准](#review-rubric)（中文；按本周脚本检查完整存取流程、日志范围和外部体验，未完成的测试网操作记为待补）；[Review 记录模板](#review-template)（中文；记录交易/截图证据、实际结果、评分及最多 2 个卡点）。 | 第 9 周 Review 记录 |

<a id="review-w09"></a>

**Review 脚本：**

- 15 分钟解释：日志记录和当前状态分别适合展示什么？为什么事件查询要限制范围？
- 45 分钟独立操作：使用另一浏览器或新账户，按 README 完成连接、授权、存入、提取和查看记录。
- 20 分钟异常检查：提取超过存入量、拒签、刷新页面；确认提示清楚且数据不会误显示。
- 10 分钟总结：记录外部体验者最可能卡住的步骤。

**部署环境变量规则：**`NEXT_PUBLIC_*` 会被打包进浏览器代码，只放公开信息（RPC URL、链 ID、合约地址）。私钥、助记词、部署账户密钥绝不放进 Next.js 的任何 env 文件或托管平台变量；合约部署在本地终端通过 Hardhat 工具链完成。带密钥的 RPC 地址视为公开，使用有限额/域名限制的免费额度。

**通过条件：**完整流程可演示；没有测试币的访客也能理解项目。公共测试网领取或部署遇阻时保留本地演示录像和在线只读说明，但将“测试网完整操作”列为待补，不能宣称已完成。

### 第 10 周：质量验收与陌生接口接入

**周目标：**证明作品能正确处理关键场景，发现并修复真实缺陷。

**资源：**现有前端测试工具、R5/R6；第 6 节测试清单。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W10-A | 1.5 | 给金额转换、输入校验和交易状态映射增加有意义的自动化测试<br>**免费资料：**[Next.js：设置 Vitest](https://nextjs.org/docs/app/guides/testing/vitest)（英文；按 Manual Setup 和运行测试段落配置现有工程，只测金额、输入和状态映射纯函数）；[Vitest：Getting Started](https://vitest.dev/guide/)（英文；阅读 Writing Tests、运行方式，使用 `test`、`expect` 和 `vitest run`；覆盖 6/18 位精度、超精度拒绝、pending 与成功的区别，不仅测试正常输入）。 | 测试代码与执行命令 |
| [ ] | W10-B | 1.5 | 用本地链脚本或集成测试验证存取及拒绝路径；最后 20 分钟部署第 10 节 Guestbook 合约，暂不写其前端<br>**免费资料：**[Scaffold-ETH 2 官方 Hardhat 测试示例](https://raw.githubusercontent.com/scaffold-eth/scaffold-eth-2/main/packages/hardhat/test/YourContract.ts)（英文代码；阅读 fixture、部署后读取、调用后断言的组织方式；按你已安装版本的同名示例改写，增加拒绝路径以及失败前后余额不变断言，不另换合约工具链）；[Review 准备材料](#review-fixtures)（中文；阅读 Guestbook 源码与部署要求，确认 ABI、地址、链 ID 及非空留言规则；140 为 UTF-8 字节上限）。 | 集成检查及 Review 合约地址 |
| [ ] | W10-C | 2 | 执行最终测试清单，记录预期/实际结果；执行项目 lint 脚本（底层使用 `eslint .`）、`tsc --noEmit` 和 `next build` 检查<br>**免费资料：**[最终测试清单](#final-checklist)（中文；逐项记录环境、步骤、预期、实际和证据）；[Next.js：ESLint](https://nextjs.org/docs/app/api-reference/config/eslint)（英文；阅读 Setup ESLint；通过项目脚本直接执行 `eslint .`，Next.js 16 已删除 `next lint`）；[Next.js：CLI](https://nextjs.org/docs/app/api-reference/cli/next)（英文；阅读 `next build`、`next typegen`；支持该命令的版本先生成路由类型，再运行 `tsc --noEmit`，分别完成类型与生产构建检查）。 | 验证记录 |
| [ ] | W10-D | 2 | 优先修复金额、交易结果、账户/网络污染、刷新恢复等问题<br>**免费资料：**[最终测试清单](#final-checklist)（中文；先复现一个失败项，修复后重跑该项及主流程，记录修复前后证据）；[React：对 state 进行保留和重置](https://zh-hans.react.dev/learn/preserving-and-resetting-state)（中文；按实际缺陷查状态与组件身份、key 重置；区分组件局部状态和链上查询缓存，检查账户/网络变化后是否仍引用旧数据）。 | 修复提交及回归结果 |
| [ ] | W10-E | 0.5 | 写一份故障复盘：现象、原因、定位、修复、验证<br>**免费资料：**[Google SRE：Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)（英文；只读开头对复盘及后续行动的说明；用真实缺陷写现象、影响、原因、定位证据、修复与回归验证，避免只写“已解决”）；[Review 记录模板](#review-template)（中文；从本周异常记录提取事实和证据，不编造生产事故）。 | 技术案例 |
| [ ] | W10-F | 1.5 | 执行门槛 G3 Review<br>**免费资料：**[Review 准备材料](#review-fixtures)（中文；使用已部署的 Guestbook 完成陌生 ABI 接入，不在考核中重新搭环境）；[统一评分标准](#review-rubric)（中文；逐项核对 G3、金额和权限等不可抵消问题）；[Review 记录模板](#review-template)（中文；写清已验证、未验证及是否进入投递准备）。 | 第 10 周 Review 记录 |

<a id="review-w10"></a>

**Review 脚本：**

- 15 分钟解释：哪些路径已自动验证，哪些需要人工操作，仍存在哪些限制？
- 45 分钟独立操作：在现有应用接入准备好的 Guestbook 合约，读取留言数，提交非空留言，展示交易结果；提供 ABI、地址和字段说明。
- 20 分钟异常检查：空留言应失败；拒签应保留输入；账户切换后不复用旧交易状态。
- 10 分钟总结：评分并给出“可进入投递准备/需要补救”的结论。

**门槛 G3：**核心业务与金额正确，最终测试清单的必过项通过，能独立接入一个简单陌生接口。未通过时，第 11 周优先补救，减少新增投递准备。

### 第 11 周：求职材料与项目面试

**周目标：**将实际能力转化为可核验的求职材料，能够讲清项目。

**资源：**自己的作品、目标 JD；第 8 节招聘入口与筛选表。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W11-A | 1.5 | 按 Web3 前端岗位调整简历；保留既有前端商业经验，用作品证明新增能力<br>**免费资料：**[Harvard MCS：Create a Strong Resume](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/)（英文；只读 Quick Tips、Action Verbs，练习针对岗位、事实化和结果可验证的项目描述；沿用适合已有工作经验的简历结构）；[岗位筛选表](#job-screening)（中文；把每条必要技能对应到商业前端经历或作品证据，明确哪些只是教学项目）。 | 一份针对性简历 |
| [ ] | W11-B | 1.5 | 补齐 README、`.env.example`、网络与合约说明、测试方法、限制；检查新环境启动<br>**免费资料：**[GitHub：关于仓库 README 文件](https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)（中文；阅读用途、使用步骤和相对链接，补齐依赖版本、启动、测试、网络及已知限制）；[Next.js：Environment Variables](https://nextjs.org/docs/app/guides/environment-variables)（英文；阅读加载位置与浏览器公开变量，`.env.example` 只写变量名和安全占位值；按说明在新环境实际启动一次）。 | 完整项目说明 |
| [ ] | W11-C | 2 | 录制 3–5 分钟演示；准备金额精度、交易状态、账户切换三个技术故事<br>**免费资料：**[Google Technical Writing：Short sentences](https://developers.google.com/tech-writing/one/short-sentences)（英文；阅读每句一个观点、删掉多余表达的示例，应用到演示提纲）；[最终测试清单](#final-checklist)（中文；从金额精度、交易状态、账户切换中选真实证据，按“问题—选择—实现—验证”讲解，每个故事指向对应代码或操作结果）。 | 演示录像和讲解提纲 |
| [ ] | W11-D | 2 | 阅读并筛选 5 个岗位，确认所在地、协作时区和语言；符合条件时开始少量投递<br>**免费资料：**[岗位筛选表](#job-screening)（中文；沿表内登链、DeJob 入口搜前端/React/钱包/DApp；逐条核对正式 JD、发布日期、所在地可雇、时区、语言和必要经验；中文 JD 与 Remote 标签都不能替代这些条件）；[Harvard MCS 简历与求职信指南](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/)（英文；按 Quick Tips 和 Cover Letter Tips，把投递说明对应到岗位需求与作品链接）。 | 岗位与投递记录 |
| [ ] | W11-E | 0.5 | 练习 90 秒英文自我介绍和一条英文异步进度更新<br>**免费资料：**[British Council：You're Hired，Episode 05](https://learnenglish.britishcouncil.org/free-resources/business/youre-hired/episode-05)（英文免费视频、字幕与练习；只看介绍当前岗位和举工作实例的片段，替换成自己的前端经历、Web3 作品和求职目标，练 90 秒介绍）；[异步更新模板](#async-update)（中文说明/英文模板；填 Completed、Verified by、Blocked by、Next step、Help needed，附可检查的提交或测试证据）。 | 可复用沟通文本 |
| [ ] | W11-F | 1.5 | 执行本周 Review<br>**免费资料：**[统一评分标准](#review-rubric)（中文；按本周模拟面试和现场变更脚本评估，检查每个技术声明能否解释并验证）；[Review 记录模板](#review-template)（中文；记录 README 启动疑点、简历证据缺口及修正动作）。 | 第 11 周 Review 记录 |

<a id="review-w11"></a>

**Review 脚本：**

- 15 分钟解释：为什么选这套技术（含为何用 Next.js 但把 Web3 限制在客户端）？最难的问题是什么？你亲自完成了哪些内容？
- 45 分钟独立操作：模拟面试，讲解项目后修改一个小需求，例如增加最大可提取金额按钮并解释校验。
- 20 分钟异常检查：让朋友或 AI 只依据 README 提出启动疑点，自己补充并验证。
- 10 分钟总结：标记简历中每个技术声明对应的代码或演示证据。

**通过条件：**没有夸大经验；项目能运行；能解释代码及取舍；投递岗位的基本约束已确认。

### 第 12 周：综合考核与投递迭代

**周目标：**判断自己能够承担的任务范围，形成持续求职与补课节奏。

**资源：**自己的测试记录、Review 记录、目标岗位反馈。

| 完成 | 节点 | 小时 | 具体任务 | 留下的成果 |
|---|---|---:|---|---|
| [ ] | W12-A | 1.5 | 回看前 11 周记录，选择最影响工作交付的 2 个问题修复<br>**免费资料：**[Review 记录模板](#review-template)（中文；回看自己保存的 11 周记录，按交付影响选出 2 个反复出现的问题）；[最终测试清单](#final-checklist)（中文；将问题绑定到具体失败场景，按“复现—修复—重测”保留证据，不用多看课程代替修复）。 | 补救结果 |
| [ ] | W12-B | 1.5 | 从第 10 节需求池中选一项并实现，不看现成答案；为最终 Review 留另一项<br>**免费资料：**[Review 准备材料与小需求池](#review-fixtures)（中文；只选一项实现，另一项留给最终考核）；[Wagmi：Read from Contract](https://wagmi.sh/react/guides/read-from-contract)（英文；按所选需求查 `args`、`query.enabled`、加载/失败和 refetch，保持地址/链与结果一致）；[Wagmi：Write to Contract](https://wagmi.sh/react/guides/write-to-contract)（英文；需要交易详情时只查哈希、回执和错误状态，不照抄完整界面答案）。 | 独立需求变更提交 |
| [ ] | W12-C | 2 | 根据匹配度完成约 3–5 次针对性投递或处理真实面试；没有合适岗位则分析 3 个差距<br>**免费资料：**[岗位筛选表](#job-screening)（中文；逐岗记录匹配证据、投递日期和反馈；无合适岗位时按地区、时区、经验、技术区分差距）；[Harvard MCS 简历与求职信指南](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/)（英文；只查针对岗位调整与 Cover Letter Tips，用真实项目证据说明契合点，不批量套用空泛自荐）。 | 投递/面试/差距记录 |
| [ ] | W12-D | 2 | 练习前端与 Web3 混合面试；整理收到的反馈并修正文档或代码<br>**免费资料：**[React：对 state 进行保留和重置](https://zh-hans.react.dev/learn/preserving-and-resetting-state)（中文；用账户切换实例解释组件身份、局部状态保留和重置）；[Wagmi：Write to Contract](https://wagmi.sh/react/guides/write-to-contract)（英文；自问连接、写入提交、等待回执、执行结果有什么区别，再到代码中演示）；[统一评分标准](#review-rubric)（中文；把回答不清或现场编码失败的问题记录为可验证的补救任务）。 | 面试错题与改进记录 |
| [ ] | W12-E | 0.5 | 写下一阶段两周计划，仅选 2 个优先项<br>**免费资料：**[Review 记录模板](#review-template)（中文；使用“结论与下周调整”，仅选 2 个问题，各写现有证据、补救动作及验收方式）；[岗位筛选表](#job-screening)（中文；区分技能不足与地区/时区不匹配，根据真实反馈安排后两周，不把没有回复等同于技术不合格）。 | 后续计划 |
| [ ] | W12-F | 1.5 | 执行门槛 G4 最终 Review<br>**免费资料：**[统一评分标准](#review-rubric)（中文；核对最终可申请标准及不可用总分抵消的问题）；[最终测试清单](#final-checklist)（中文；抽查两个失败场景与作品交付证据）；[Review 准备材料](#review-fixtures)（中文；选 W12-B 未做过的小需求独立完成，给出任务范围、已验证能力和剩余限制）。 | 最终能力结论 |

<a id="review-w12"></a>

**Review 脚本：**

- 15 分钟解释：用图或口述串起页面、钱包、RPC、合约、回执和界面刷新。
- 45 分钟独立操作：在现有项目中完成一个未提前演练的小需求；例如增加指定地址的只读存入量查询、交易状态详情或带校验的“最大金额”操作。
- 20 分钟异常检查：随机选择 2 个失败场景，现场定位并解释处理方式。
- 10 分钟总结：给出评分、证据及下一步。

**门槛 G4：**达到第 5 节最终标准，并完成可核验的作品交付包。通过后持续投递与改进；未通过则明确延长 1–2 周的补救范围。没有收到面试回复不能单独作为技术不合格的证据。

<a id="review-rubric"></a>

## 5. Review 方法与通过标准

### 每周统一评分：10 分

| 维度 | 0 分 | 1 分 | 2 分 |
|---|---|---|---|
| 概念解释 | 关键概念混淆 | 能描述，但需要提示 | 能用自己的例子说明，并回答追问 |
| 独立操作 | 无法完成核心任务 | 依赖提示完成 | 在已有可用环境中查文档独立完成 |
| 结果正确 | 关键结果错误或未验证 | 主流程正确，边界欠缺 | 结果可核对，金额/状态等关键点正确 |
| 异常处理 | 不知道出错环节 | 能识别但处理不完整 | 能定位并给出清楚反馈或恢复办法 |
| 可复现交付 | 无记录，别人无法理解 | 有记录但步骤不全 | 步骤、证据、已知限制清楚 |

- **8–10 分且所有本周硬性条件通过：**进入下一周。
- **6–7 分，或任一硬性条件未通过：**下一周先用 1.5–3 小时补救并重测；新内容相应缩减或顺延。
- **0–5 分：**暂停新增功能，插入一周复习；12 周是计划长度，不是强行结业日期。
- 前期“结果正确”和“异常处理”按本周操作评估，不要求第 1 周掌握后续工程能力。

### 第 6、10、12 周不可用总分抵消的问题

出现以下任意问题，相关门槛判定为未通过：

- [ ] 不能独立完成基本合约读取和写入。
- [ ] 金额精度或余额计算错误。
- [ ] 将“交易已提交”直接显示为“执行成功”。
- [ ] 切换账户或网络后，仍使用旧身份/网络的状态进行操作。
- [ ] 无法区分钱包拒签、网络服务失败和合约拒绝。
- [ ] 第 10/12 周仍无法验证存取款权限与账户隔离。

若在代码、日志、截图中发现敏感密钥，立即停止分享相关内容并更换学习账户；修复后重新核对。

### 最终“可申请岗位”标准

- [ ] 能根据给定 ABI、地址和需求，独立完成常见合约交互。
- [ ] 能处理交易过程、正确金额、错误网络、账户变化与关键失败场景。
- [ ] 有一个可演示、可解释、可复现的作品。
- [ ] 有基础自动化验证和完整的人工场景记录。
- [ ] 能讲清一个排障案例和一个技术选择。
- [ ] 能读英文文档、写简短技术更新，并用中文清楚讲解项目。
- [ ] 目标岗位的地域、时区、语言和经验要求与你匹配。

这些标准支持申请与试岗判断，不表示已经具备所有高级岗位要求，也不等于获得录用承诺。

<a id="final-checklist"></a>

## 6. 第 10 周最终测试清单

每条都记录：环境、步骤、预期、实际结果、证据位置。每次改变相关代码后只重跑受影响路径及主流程。

| 必过 | 场景 | 预期结果 |
|---|---|---|
| [ ] | 未连接钱包 | 不能误发交易，有连接提示 |
| [ ] | 错误网络 | 清楚提示并禁止写入，切换后重新读取 |
| [ ] | 账户 A 切换到 B | 余额、授权、存入量与交易提示不串号 |
| [ ] | 0、负数、空输入、超过精度、超过余额 | 明确校验，链上金额转换正确 |
| [ ] | 6 位和 18 位精度样例 | 金额工具均正确，可用单元测试验证 |
| [ ] | 授权不足 | 先授权指定额度，确认后允许存入 |
| [ ] | 授权完成 | 不误显示存入成功，用户明确确认下一次交易 |
| [ ] | 用户拒绝签名/交易 | 显示取消状态，能重新操作 |
| [ ] | 正常存入与提取 | 等回执执行成功后再显示成功，余额及时刷新 |
| [ ] | A 存入 10，B 存入为 0；B 调用 withdraw(1) | 调用失败，A 的记录及 Vault 持币量不变 |
| [ ] | B 存入 2，再尝试提取 3 | 调用失败，B 的存入量不变；数值均按代币精度转换 |
| [ ] | 原生币不足支付手续费 | 有清楚提示，不无限等待 |
| [ ] | 合约执行拒绝 | 显示失败原因或可理解说明，允许修正重试 |
| [ ] | RPC 不可用 | 显示服务异常，恢复后可重试，不自动重发交易 |
| [ ] | 连续点击提交 | 不产生意外重复提交 |
| [ ] | 交易提交后刷新 | 能按正确链/账户恢复查询，不凭本地记录宣称成功 |
| [ ] | 页面与事件记录 | 有加载/空态/失败态；日志查询范围受限 |
| [ ] | 项目启动和部署 | 新环境能按 README 启动；`next build` 及类型、lint 检查通过；线上环境变量只含 `NEXT_PUBLIC_*` 公开信息 |
| [ ] | 客户端边界 | 钱包/交易组件均在 `'use client'` 内；刷新页面无 hydration 报错；未连接时服务端渲染的说明内容可见 |

建议自动化优先覆盖：金额转换与输入、交易状态映射、合约存取与权限。钱包弹窗、真实网络切换和视觉提示先保留人工检查；不为了工具搭建挤掉业务验证。

<a id="review-template"></a>

## 7. 每周 Review 记录模板

每周复制一份，建议保存在项目中的 `docs/reviews/week-XX.md`。

```markdown
# 第 __ 周 Review

日期：
计划时间：9 小时
实际时间：__ 小时
环境与版本：
提交记录 / 演示地址：

## 本周交付
- [ ] 本周核心任务完成
- [ ] 独立 Review 完成
- [ ] 异常场景已验证
- [ ] README / 学习说明已更新

## 时间记录
| 节点 | 计划 | 实际 | 未完成原因 |
|---|---:|---:|---|
| A | 1.5h | | |
| B | 1.5h | | |
| C | 2h | | |
| D | 2h | | |
| E | 0.5h | | |
| F | 1.5h | | |

## 三个口头问题的回答
1.
2.
3.

## 独立任务
- 任务：
- 是否完成 / 花费时间：
- 查阅了什么文档：
- 哪一步需要提示：
- 结果证据：

## 异常检查
| 场景 | 预期 | 实际 | 证据/问题 |
|---|---|---|---|
| | | | |
| | | | |

## 评分
- 概念解释：__/2
- 独立操作：__/2
- 结果正确：__/2
- 异常处理：__/2
- 可复现交付：__/2
- 总分：__/10
- 本周硬性条件：通过 / 未通过

## 结论与下周调整
- 结论：进入下一周 / 先补救 / 插入复习周
- 最多两个问题：
  1.
  2.
- 补救动作、占用下周哪个节点、验收方式：
- 本周最重要的一条认识：
```

<a id="review-ai-prompt"></a>

### 请 AI 或同伴帮助 Review 的提示词

```text
我正在执行 Web3 前端 12 周计划，目前第 __ 周。
本周目标：__
本周任务及 Review 脚本：__
我提供的材料：代码片段/提交差异、README、测试记录、演示截图或录像、我的解释。

请按以下顺序帮助我 Review：
1. 先检查证据是否足够，不要只依据“我说完成了”给通过结论。
2. 问我 3 个与本周内容相关的问题，逐个等待回答。
3. 在已运行的项目里给我一个 45 分钟内的小任务；不要求重建环境。
4. 先不给答案或完整代码；我提交结果后再点评。
5. 检查 2 个异常场景，用预期与实际结果判断。
6. 按概念解释、独立操作、结果正确、异常处理、可复现交付各 0–2 分评分。
7. 不能实际运行的部分标注“未验证”，不要假定通过。
8. 最后给出最多 2 项补救任务，总耗时不超过下一周预留的 3 小时。
不要索取或使用我的私钥、助记词。
```

## 8. 求职准备与英语练习

<a id="job-screening"></a>

### 岗位筛选

入口：[登链社区招聘](https://learnblockchain.cn/jobs)、[DeJob](https://dejob.ai/job)。岗位可能失效，最终核对公司官网或正式招聘页。中文 JD 不代表所有协作都用中文；Remote 需要继续核对可雇地区和时区。

| 公司/岗位链接 | 核验日期 | 地区可雇？ | 核心协作时间 | 语言 | 必要经验 | 我已有证据 | 差距/下一步 |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

优先搜索：前端、Frontend、React、TypeScript、钱包、DApp。优先考虑重视已有前端经验并需要合约集成能力的岗位；逐条判断 Web3 年限要求，不用岗位标题替代正文判断。

### 英语练习：每周 E 节点的一部分

前 6 周练清楚解释一个概念或一次操作；后 6 周练说明进度、问题和技术选择。口语可以先看提纲，逐渐减少依赖。

<a id="async-update"></a>

可复用的异步更新模板：

```text
Completed: …
Verified by: …
Blocked by: …
Next step: …
Help needed: …
```

### 投递后的判断

- 没回复：检查岗位是否仍有效、基本条件是否匹配、作品入口是否清楚；不要仅据此重写技术路线。
- 项目面试解释不清：回到相关代码，补一段可验证的讲解与演示。
- 编码或排障不通过：把真实问题转成下周补救任务。
- 地区或时区不匹配：调整岗位池。
- 每两周复盘一次投递反馈，每次只优先解决 1–2 个问题。

<a id="progress-tracker"></a>

## 9. 每周完成追踪

| 周 | 预算 | 实际 | Review 分数 | 硬性条件 | 下周动作 |
|---|---:|---:|---:|---|---|
| 01 | 9h | | /10 | | |
| 02 · G1 | 9h | | /10 | | |
| 03 | 9h | | /10 | | |
| 04 | 9h | | /10 | | |
| 05 | 9h | | /10 | | |
| 06 · G2 | 9h | | /10 | | |
| 07 | 9h | | /10 | | |
| 08 | 9h | | /10 | | |
| 09 | 9h | | /10 | | |
| 10 · G3 | 9h | | /10 | | |
| 11 | 9h | | /10 | | |
| 12 · G4 | 9h | | /10 | | |
| **合计** | **108h** | | | | |

开始时只打开第 1 周任务。每周 Review 后，再决定下一周是否按原计划推进。

<a id="review-fixtures"></a>

## 10. Review 准备材料与故障演练

<a id="review-contracts"></a>

### Counter 与 Guestbook：已有环境内的接入练习

下面两个合约用于学习，不处理资产。把源码放入现有 Hardhat 合约目录，复用第 3 周已经会使用的部署方式。第 6 周 W06-B 和第 10 周 W10-B 各包含 20 分钟准备预算；不要在 Review 的 45 分钟里重新安装工具链。

可以请同伴或 AI 协助生成适配现有项目的部署脚本，自己确认部署结果。准备完成后记录 ABI、地址和链 ID；接入练习期间不让 AI 编写前端答案。独自执行时，目标是“未接入过的接口”，无需刻意隐藏合约源码。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReviewCounter {
    uint256 public count;

    function increment() external {
        count += 1;
    }
}

contract ReviewGuestbook {
    uint256 public messageCount;
    event MessageAdded(address indexed author, string message);

    function addMessage(string calldata message) external {
        require(bytes(message).length > 0, "EMPTY_MESSAGE");
        require(bytes(message).length <= 140, "MESSAGE_TOO_LONG");
        messageCount += 1;
        emit MessageAdded(msg.sender, message);
    }
}
```

第 6 周需求：展示 `count`，点击按钮调用 `increment`，等执行成功后刷新。

第 10 周需求：展示 `messageCount`，调用 `addMessage`，处理空文本、拒签和交易结果。140 是 UTF-8 字节上限，不等于 140 个中文字符；如实现前端长度校验，应使用相同语义。空文本失败案例可在合约测试或模拟调用中验证，前端校验本身不证明链上约束有效。

以上是提供给练习者的源码，尚未在你的未来学习工程中编译；准备时须用该工程配置的兼容 Solidity 编译器编译并部署成功，再进入 Review。

<a id="pending-drill"></a>

### 稳定制造“交易待确认”：W06-D 内完成

本地链通常立即出块，先暂停出块才能可靠验证 pending 和刷新恢复。以下命令只发往本机 Hardhat RPC；端口不同时替换为自己的本地地址。方法说明见 [Hardhat 3 JSON-RPC 官方文档](https://hardhat.org/docs/reference/json-rpc-methods)；使用 Hardhat 2 时参考[对应版本文档](https://v2.hardhat.org/hardhat-network/docs/reference)。

1. 确认本地链和前端已经运行，钱包有本地测试资金，相关合约已经部署。
2. 在终端关闭自动出块和定时出块，每条命令应返回成功结果。返回错误时先检查节点版本与地址，不继续后续验收。

```bash
curl -sS http://127.0.0.1:8545 -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"evm_setAutomine","params":[false]}'
curl -sS http://127.0.0.1:8545 -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":2,"method":"evm_setIntervalMining","params":[0]}'
```

3. 在前端只提交一笔简单写入交易，拿到哈希后确认显示“等待链上结果”，而非成功。
4. 刷新页面，检查能按保存的链 ID、账户和哈希恢复查询，仍显示待确认。
5. 手动出一个块，确认页面根据回执转为成功并刷新数据。

```bash
curl -sS http://127.0.0.1:8545 -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":3,"method":"evm_mine","params":[]}'
```

6. 无论演练是否成功，结束后都恢复自动出块，避免后续练习一直等待。

```bash
curl -sS http://127.0.0.1:8545 -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":4,"method":"evm_setAutomine","params":[true]}'
```

若只测试了“已经完成的交易刷新后再次查询”，应如实记为这一场景通过；不能据此宣称已验证 pending 恢复。

<a id="requirement-pool"></a>

### 第 12 周小需求池

在 W12-B 完成一项，最终 Review 使用另一项；全部在已有工程中实现。

1. **按地址查询存入量：**输入合法地址，只读显示其在 Vault 的存入量；处理无效地址、空值与查询失败。
2. **最大可提取金额：**按钮填写当前账户可提取量；账户变化后更新；仍执行正确的整数转换与校验。
3. **交易详情：**展示当前账户最近一次操作的哈希、网络与实际结果，提供对应区块浏览器链接；缺少记录时有空态。

验收要求：需求可操作、金额与身份正确、至少验证一个异常、能解释实现。任务准备和 Review 都包含在原有 9 小时预算内。
