# 第 1 周｜Web3 基础与职位画像

适合已有 React、Next.js、TypeScript 经验的前端工程师。预计 **10 小时**：技术 7 小时（其中动手与调试约 4.5 小时）、英语 2 小时、岗位调查与复盘 1 小时。本周不需要部署合约、连接钱包或花费真实资金。

## 一、本周完成后，你应该能做到

1. 描述账户、钱包、网络、RPC、区块和交易之间的关系。
2. 看懂一笔公开交易的 hash、chain ID、nonce、状态、gas 和 confirmations，并区分提交、执行成功及最终确定。
3. 独立分析 5 笔公开交易，保存证据和自己的解释。
4. 完成一个不依赖库的 TypeScript 交易状态与手续费练习。
5. 用英语做 60 秒自我介绍，并解释什么是交易。
6. 记录 10 个职位，将中国大陆远程资格标为「明确接受／明确不接受／待确认」，不把 Worldwide 自动视为接受。

## 二、10 小时安排

| 时段 | 内容 | 时间 | 输出 |
|---|---|---:|---|
| 1 | 阅读账户、钱包与网络；画关系图 | 1 h | 一张关系图与关键词 |
| 2 | 学交易生命周期、区块与确认；分析第 1 笔 | 1.5 h | 第 1 条交易记录 |
| 3 | 学 gas 和失败状态；分析另 4 笔 | 2 h | 共 5 条交易记录 |
| 4 | 完成 TypeScript 练习、手动运行与调试 | 2 h | 代码与运行结果 |
| 5 | 整理笔记、自测并复盘 | 0.5 h | `notes/week01.md` |
| 6 | 英语输入、练习和录音 | 2 h | 自我介绍与交易解释 |
| 7 | 收集职位并记录结论 | 1 h | 10 条职位记录 |

时间紧时先完成核心理解、代码和 5 笔交易；职位先记录实际找到的数量，不虚构凑数，剩余项下周补齐。

## 三、核心知识讲解

### 1. 账户、密钥和钱包

- **地址 address**：链上账户标识，可以公开分享用于查询或接收资产。地址相同不意味着不同链上的余额、交易或合约状态相同。
- **私钥 private key**：用于生成签名的秘密，泄露可能导致账户失控。公钥由私钥通过密码学算法派生，普通 EOA 地址由公钥派生。
- **助记词 seed phrase / mnemonic**：通常用于恢复一组派生账户，不是登录密码。离线安全保存；任何网站、招聘方、学习工具都不应要求你提供它。
- **钱包 wallet**：帮助管理账户、请求签名与连接网络的软件或设备。钱包不是区块链本身；连接钱包也不等于发送交易。实际账户控制形式不止一种。
- **EOA（外部拥有账户）**：传统模型中由密钥控制的账户。**合约账户 contract account**：地址上有智能合约代码，行为由代码控制；智能合约钱包等账户抽象方案会让两者交互更复杂，本周先掌握基本区别。

前端类比：地址像公开的资源标识，私钥像不可泄露的签名能力，钱包像受用户控制的签名界面；它们都不等同于服务器会话或可撤销的普通密码。

### 2. 链、节点、RPC 与 EVM

**区块链**维护一组按协议更新的共享状态；**区块**组织交易并连接历史。**EVM** 是执行以太坊智能合约代码的虚拟机。主网处理真实资产；测试网用于测试，有独立状态和测试资产。不同 EVM 链即使地址格式相同，也有独立状态。

**节点 node** 运行协议软件并提供网络视图；**RPC** 是应用与节点或服务商通信的接口，常用 JSON-RPC。例如 `eth_chainId` 查询网络 ID，`eth_getTransactionReceipt` 查询已打包交易的执行回执。RPC 服务可能延迟、限流或返回错误，前端不能假设它永远可靠，也不能只依靠用户界面上显示的链名判断当前网络。

关系示意：

```text
用户 → 钱包（账户、签名与网络选择）
         ↓ 签名交易                 ↑ 请求授权/结果
前端 DApp → RPC 服务 → 节点与网络 → 区块 → 交易回执/状态
                ↑
       浏览器也可通过索引服务展示链上信息
```

### 3. 交易与状态

交易是经授权、提交到网络的状态变更请求，例如 ETH 转账或调用合约。通常先构造交易，钱包提示用户确认并签名，再广播、等待打包、读取回执，最终达到所需确认程度。用户拒绝签名时不应显示「已提交」。

| 概念 | 含义与前端注意点 |
|---|---|
| Transaction hash / tx hash | 交易的标识，可用于查询；拿到 hash 只说明有一个可追踪的交易标识，不代表成功。 |
| Chain ID | 网络标识，也是受重放保护的交易签名上下文的一部分；同一地址在不同链的状态相互独立。 |
| Nonce | 发送账户的顺序计数；同一账户的交易可能因前面的 nonce 未处理而等待。不同链分别维护状态。 |
| Pending | 尚未取得已打包回执；也可能被替换、丢弃或长时间未被打包。 |
| Receipt / status | 打包后的执行回执；成功和 reverted 都可能有回执。reverted 表示执行失败，并不表示未消耗手续费。 |
| Confirmations | 交易被包含后，随着后续区块增长而增加的确认数；浏览器的计数方式可能略有差异。确认数与以太坊协议的 finalized 状态不是同一概念。 |
| Finality | 协议层面的最终确定；不要把「1 confirmation」或固定确认数直接等同于 finalized。 |

只读请求例如通过 `eth_call` 读取合约状态，通常不需要用户发送链上交易或支付链上 gas；节点仍要执行计算，RPC 服务可能收费或限流。合约内部调用同样的逻辑仍可能消耗交易 gas。

### 4. Gas：计算量和单价分开

- Gas 衡量执行消耗的计算资源；**gas limit** 是交易允许消耗的上限，不是实际消耗量。
- 以太坊普通执行手续费 = `gasUsed × effectiveGasPrice`。`1 ETH = 10^18 wei`，`1 gwei = 10^9 wei`。
- 例如 gas used 为 21,000，实际单价为 20 gwei，费用为 `420,000 gwei = 0.00042 ETH`。这是示例，不是实时价格。
- EIP-1559 交易中，实际价格受 base fee、priority fee 与用户设置的上限约束；base fee 被销毁，priority fee 支付给区块提议者。
- 此公式针对以太坊普通执行 gas；blob 交易及其他链或 L2 可能有额外费用。已打包但执行失败的交易仍可能消耗 gas。

### 5. 对前端工程的直接影响

读取和写入是不同的用户流程；UI 至少要区分等待用户确认、已提交、链上成功、执行失败及查询超时。hash 与成功不能画等号；超时也不能证明失败，应保留 hash 供用户继续查询。显示网络和目标地址；不要请求助记词或私钥。金额使用整数最小单位（JavaScript `bigint`），展示时再格式化。

## 四、动手 1：区块浏览器分析 5 笔交易（约 2.5 小时）

使用 [Etherscan](https://etherscan.io/) 的 Ethereum 主网公开数据，只读即可，无需连接钱包。从首页最近区块进入交易列表，或搜索公开交易 hash。浏览器 UI 名称可能变化；找不到的字段标记「未显示」，不要猜测。

选取尽可能不同的 5 笔：①普通 ETH 转账；②调用合约；③ ERC-20 转账；④失败或 reverted 交易；⑤任意另一笔并比较。筛选不到某一类时记录尝试和原因，换一笔并注明局限。

每笔按下列模板记录到 `notes/week01.md`：

```markdown
### 交易 1
- 链与 chain ID：Ethereum mainnet / 1
- 浏览器链接及 tx hash：
- 类型及判断依据：
- From / To（To 是普通账户还是合约？如何判断？）：
- 状态 / 所在区块 / 查询时间：
- Nonce：
- Value（ETH）与 token 转账（若有，分开记录）：
- Gas used / effective gas price / 实际执行费用：
- Confirmations 或 finalized 显示：
- Input data 或 logs 透露了什么？哪些结论不能仅凭它确定？
- 用自己的话解释发生了什么：
```

操作步骤：打开交易详情 → 查看状态、From/To、Value → 展开更多字段查 nonce 与 gas → 查 input 或 token transfers/logs → 记录链接和观察时间 → 手算一笔费用并与页面比较。ETH 的 `Value` 为 0 不代表没有 ERC-20 代币转移；代币转移通常体现在合约调用和事件日志中。浏览器的标签、解码和 token 标识可能是第三方解释，需要谨慎核验。

## 五、动手 2：用 TypeScript 建立交易状态模型（2 小时）

在自己的 TypeScript 项目中新建 `week01.ts`。下面的代码只处理模拟数据，不连接网络、不签名。自行先写再对照，编译目标需支持 ES2020 `bigint`。

```ts
type Receipt = { status: 'success' | 'reverted'; gasUsed: bigint; effectiveGasPriceWei: bigint };
type TxState =
  | { kind: 'awaiting_signature' }
  | { kind: 'rejected' }
  | { kind: 'pending'; hash: string }
  | { kind: 'confirmed'; hash: string; receipt: Receipt }
  | { kind: 'unknown'; hash: string }; // 查询超时不代表失败

function describe(state: TxState): string {
  switch (state.kind) {
    case 'awaiting_signature': return '请在钱包中确认';
    case 'rejected': return '用户拒绝签名，未提交';
    case 'pending': return `已提交，等待回执：${state.hash}`;
    case 'unknown': return `查询超时，请继续查询：${state.hash}`;
    case 'confirmed': return state.receipt.status === 'success'
      ? '交易执行成功' : '交易已打包，但执行失败';
  }
}

function formatEth(wei: bigint): string {
  const unit = 10n ** 18n;
  const fraction = (wei % unit).toString().padStart(18, '0').replace(/0+$/, '');
  return `${wei / unit}${fraction ? '.' + fraction : ''} ETH`;
}

const receipt: Receipt = {
  status: 'reverted', gasUsed: 21000n, effectiveGasPriceWei: 20_000_000_000n,
};
console.log(describe({ kind: 'pending', hash: '0x示例' }));
console.log(describe({ kind: 'confirmed', hash: '0x示例', receipt }));
console.log('执行费用:', formatEth(receipt.gasUsed * receipt.effectiveGasPriceWei));
```

预期结果包括「等待回执」「已打包，但执行失败」与 `0.00042 ETH`。`formatEth` 此处只针对非负费用；生产代码需处理输入校验、格式、网络额外费用及更多状态。

**独立练习**：①增加重试查询提示；②试算 gas used 50,000、单价 12 gwei，预期 `0.0006 ETH`；③解释为何超时不应重新发送交易；④将一次分析得到的 gas 数值代入并比较。不要把模拟状态当作真实链上查询结果。

## 六、英语训练（2 小时）

### 60 秒自我介绍模板

> Hi, I'm [name], a frontend engineer with around eight years of experience building web applications. I work mainly with React, Next.js, and TypeScript. My experience includes [真实项目或职责] and [真实成果或协作经历]. I'm currently learning how Ethereum transactions and wallets work, and I'm building my understanding of Web3 frontend development. I'm interested in roles where I can bring my frontend engineering experience to a team building useful onchain products.

只替换为真实经历；还没完成的项目和没有发生的业绩不要写成已完成。录一遍，再听是否自然、是否能不看稿说出；修改后再录一遍。

### What is a transaction?

> An Ethereum transaction is a signed request that can change the state of the network, such as transferring ETH or calling a smart contract. After a user signs it, the transaction can be broadcast and included in a block. A transaction hash lets us track it, but the hash alone doesn't mean the execution succeeded. We check the receipt and wait for the confirmation level the application requires.

练习追问：What happens if a user rejects the request? / What's the difference between pending and reverted? / Why can a failed transaction still cost gas? 分别先用两句话回答，再对照第三节修正。

**训练安排**：阅读并标注生词 20 分钟；写个人版 25 分钟；两轮录音与纠正 35 分钟；交易问答练习 30 分钟；整理 3–5 句英文学习摘要 10 分钟。

## 七、职位调查（1 小时）

可从 [Web3.career](https://web3.career/) 或 [CryptoJobsList](https://cryptojobslist.com/) 开始，搜索 `frontend engineer`, `React`, `wallet`, `DeFi`。优先查看公司原始招聘页，记录查看日期与原文证据；职位会变动，保存链接不代表仍在招聘。

将以下表头存为 `jobs.csv`，逐条填写；不会确认的项目填写「待确认」：

```csv
公司,职位,职位链接,查看日期,地区限制原文,中国大陆远程资格,时区重叠,薪资及币种,核心技术,英语要求,备注
```

先记录 10 条，目标是理解市场而不是立刻投递。**资格只允许三种值**：明确接受、明确不接受、待确认。`Remote`、`Worldwide`、亚洲时区均不足以单独证明接受中国大陆远程。最后统计 React/TypeScript、钱包、合约交互等技能出现次数，并写下一个待验证的问题。

## 八、关键词速查

| 中文 | English | 记忆点 |
|---|---|---|
| 外部拥有账户 | externally owned account / EOA | 传统模型中由密钥控制 |
| 合约账户 | contract account | 行为由合约代码定义 |
| 钱包 | wallet | 管理账户与签名交互 |
| 交易哈希 | transaction hash | 标识交易，不证明成功 |
| 随机数/交易序号 | nonce | 此处指账户交易顺序计数 |
| 链 ID | chain ID | 标识网络及签名上下文 |
| 交易回执 | transaction receipt | 打包后包含执行状态等信息 |
| 燃料与手续费 | gas / gas fee | 计算量与支付金额不同 |
| 确认数 | confirmations | 后续区块增加带来更多确认 |
| 最终确定 | finality | 协议层面的确定性 |
| 远程过程调用 | remote procedure call / RPC | 应用与节点通信接口 |
| 回滚 | revert | 执行失败；可能仍消耗 gas |

## 九、自测与参考答案

先遮住答案，口头回答：

1. hash 出现是否代表交易成功？
2. 用户拒签、交易 pending、交易 reverted 各有什么区别？
3. 相同地址在主网和测试网是否共享余额？
4. gas limit 与 gas used 有什么区别？
5. 查询超时后应告诉用户什么？
6. `eth_call` 与发送交易有什么区别？
7. 确认数和 finality 是否相同？
8. 私钥、助记词、地址分别是否可公开？

**参考答案**：1. 不代表，需查询回执。2. 拒签通常未提交；pending 尚无已打包回执；reverted 已执行失败且可能消耗 gas。3. 不共享，链状态独立。4. 前者是上限，后者为实际消耗。5. 结果未知，保留 hash 并允许继续查，不应声称失败或成功。6. 前者通常是只读模拟，不需用户发链上交易；后者请求改变链上状态并需要授权和费用。7. 不相同，确认数是区块深度的指标，finality 是协议层面状态。8. 地址可以公开；私钥与助记词应保密。

## 十、交付与复盘

- [ ] `notes/week01.md`：概念图、关键词、自测、5 笔交易及链接、计算过程。
- [ ] TypeScript 文件：状态模型、费用计算、运行结果及一处自己修改。
- [ ] 英语：60 秒录音、交易解释、80–150 词英文学习日志。
- [ ] `jobs.csv`：10 条真实职位或明确记录尚未完成数量；逐条标记大陆资格。
- [ ] 截图或录屏：展示代码运行或浏览器分析；不要包含密钥、个人敏感数据。
- [ ] 复盘：遇到的阻塞、如何解决、仍不确定的问题、下周要问的问题。

英文日志开头示例（续写自己的观察）：

> This week I learned how Ethereum accounts, transactions, and gas fit together. I inspected public transactions and compared a successful transaction with a reverted one. The most useful lesson for frontend development was that a transaction hash does not guarantee success. [Add what you actually observed and what you plan to study next.]

## 官方资料

1. [Ethereum accounts](https://ethereum.org/developers/docs/accounts/)：账户与密钥。
2. [Transactions](https://ethereum.org/developers/docs/transactions/)：字段与生命周期。
3. [Gas and fees](https://ethereum.org/developers/docs/gas/)：执行费用。
4. [JSON-RPC API](https://ethereum.org/developers/docs/apis/json-rpc/)：RPC 方法。
5. [Block explorers](https://ethereum.org/developers/docs/data-and-analytics/block-explorers/)：浏览器字段。
6. [Interacting with smart contracts](https://ethereum.org/developers/docs/smart-contracts/interacting/)：读写与合约交互。

资料核对日期：2026-10-31。各网站界面与岗位内容可能变化，以访问时页面为准。
