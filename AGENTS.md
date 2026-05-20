# 项目说明

本项目是产品经理 AI 工作流。主线只保留 2 个核心领域 Skill 和 1 个编码约束 Skill：

- 新需求、竞品分析、方案、PRD、原型生成由 `$erp-product-manager` 执行
- UI 评审、原型优化、Ant Design 合规检查由 `$ui-optimization-master` 执行
- 代码生成、代码编辑、代码走查优先使用 `$karpathy-guidelines`
- Skill 源文件在 `skills/erp-product-manager/SKILL.md`、`skills/ui-optimization-master/SKILL.md`、`skills/karpathy-guidelines/SKILL.md`
- 本项目启用 `.codex/` 的 planning-with-files hooks，用于长对话的任务计划、发现和进度维护
- 复杂 PM / UI 任务的长上下文执行规则见 `skills/shared/context-memory-workflow.md`
- 长期用户偏好、公司背景、自研 ERP 信息沉淀到 `knowledge/`
- 新任务默认不读取历史 `cases/**`；只有用户明确要求继续或参考某个案例时，才读取该案例内容
- 主线只承载通用工作流
- 退款管理等具体案例放到 `cases/<case-name>/`

强规则：

- `$erp-product-manager` 内联执行任务分档：快速档只读目标文件，标准档走完整执行流程，重度档才维护 planning 文件
- 原型初稿默认是 `prototype-draft`，只做忠实交付和最小自检，不自动进入正式 UI 审查
- 只有用户明确要求最终审查、正式 UI 审查或定稿 QA 时，才允许正式质量门禁、组件映射校验和自动化审查
- 本项目中用户说“原型 / 原型图 / 生成原型”时，默认指 `prototype/<name>/index.html` 形式的 HTML 可交互原型，不是 Figma 设计稿
- 只有用户明确说“生成 Figma / 写入 Figma / UI 设计稿 / Figma 画面”时，才允许调用 Figma；HTML 原型交付完成后可以提示“如需 Figma 设计稿可再生成”，但不能自动执行
- 口令 `分享原型` 才发布在线链接；除此以外，生成原型默认只产出本地 HTML 文件并返回本地路径
- 用户说“分享原型 / 发布原型 / 上线预览 / 给我在线地址”时，发布 HTML 原型到团队统一托管平台，优先使用 `npm run prototype:publish -- --source prototype/<name> --title <原型名> --business-system <系统名>`；缺少 GitHub CLI 授权、`PROTOTYPE_HOSTING_REPO`、托管仓库写权限或 Pages 配置时必须明确指出缺什么，不能改成只打包 zip 或生成 Figma
- 轻任务禁止开启 root planning files；重任务才允许 `.codex/planning-active`
- 任何工作流主线升级，只要改动 `AGENTS.md`、`skills/**`、`shared-references/**`、`.codex/hooks/**`、`docs/prototype-hosting.md`、`docs/team-onboarding.md`、`README.md`、`START_HERE.md`、`prototype/README.md`、`scripts/prototype-*.js`，都必须在同一变更里同步更新 `CHANGELOG.md`

如需更细的执行规则，统一以对应 Skill 的 `SKILL.md` 和 `references/` 为准。
