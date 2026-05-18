# Codex Checkpoints

## 2026-05-14 01:53 CST - 销售人员管理原型闭环

- Mode: Local Git checkpoint
- Branch: `codex/销售人员管理`
- Scope: `prototype/salesperson-management/`
- Saved:
  - 销售人员管理 HTML 原型页面
  - 业务单元配置、订单归属处理、销售目标三个模块
  - 销售目标树表格、强弱校验、年度目标导入三阶段方案
  - 原型规格与上下文压缩记录
- Verification:
  - `node --check prototype/salesperson-management/data.js`
  - in-app browser checked sales target summary, tree expand/collapse, import drawer flow
- Rollback:
  - 查看记录：`git log --oneline -n 10`
  - 回退本次提交：`git revert <commit>`

## 2026-05-17 00:50 CST - AI 工作台 v2 原型

- Mode: GitHub Cloud
- Branch: `AI-工作台`
- Scope: `prototype/ai-workspace-v2/`
- Saved:
  - `index.html` — AI 工作台主页面（欢迎页 + 对话框 + Agent 市场 + 工作管理 + Listing/图片工具页）
  - `styles.css` — Ant Design v6 风格自定义样式
  - `script.js` — 页面切换、聊天交互、Agent 切换、模型选择、Listing/图片工具交互
  - `tokens.css` — UI Library Foundation Tokens 副本
- Key Features:
  - 对话框欢迎页：卡片式 Agent 推荐，初次进入不加载历史消息
  - Agent 切换：顶部标题区下拉切换当前对话绑定的 Agent
  - Agent 搭建弹窗：类 GPTs 创建界面（头像/名称/指令/模型/知识库/分享设置）
  - Agent 市场：企业内部共享 Agent 卡片展示，支持 Fork
  - 工作管理：对话历史 / 我的 Agent / 任务记录 / 收藏 四 Tab
  - 多模型支持：Claude 4 / GPT-4o / Gemini 2.5 / DeepSeek V3
  - Listing 优化 & 图片工坊：简化版工具页，保留核心交互
- Online Preview:
  - https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/ai-workspace-v2/
- Rollback:
  - 查看记录：`git log --oneline -n 10`
  - 回退本次提交：`git revert 59b1a8c`
  - 强制回退到前版本：`git reset --hard ec2762d`

## 2026-05-18 CST - UI 原型输出可控性规范

- Mode: GitHub Cloud
- Branch: `AI-工作台`
- Commit: `139508f chore: enforce UI prototype contract`
- Scope:
  - `skills/erp-product-manager/`
  - `skills/ui-optimization-master/`
  - `knowledge/prototype-style-guard.md`
  - `scripts/prototype-style-guard.js`
  - `prototype/ai-workspace-v2/`
- Saved:
  - PRD §10 新增 `UI 设计契约` 与 `原型实现约束`，要求明确控件选择、状态语义、尺寸密度、颜色 token 和禁止实现方式。
  - 原型生成指南要求先消费 PRD §10 的 UI 契约，再生成 HTML/CSS，避免不同模型自由决定平台切换、状态标签、按钮层级和颜色语义。
  - UI 正式质量门禁新增阻断项：缺少 UI 契约、控件无法映射、裸浏览器控件、`tag--*` 缺少 `.tag` 基础类。
  - 原型风格守门脚本升级：原生 `<select>` 从 warning 改为 error；新增 `TAG_BASE_MISSING` 检查。
  - 修复 `prototype/ai-workspace-v2` Listing 优化页平台选项，补齐 `.tag` 基础类并清理按钮默认外观。
- Verification:
  - `node --check scripts/prototype-style-guard.js`
  - `node scripts/prototype-style-guard.js prototype/ai-workspace-v2/`
  - 使用临时错误样例验证 `platform-tag tag--processing` 会触发 `TAG_BASE_MISSING`
- GitHub:
  - 已推送到 `origin/AI-工作台`
  - PR 创建依赖 GitHub CLI 授权；当前本机 `gh` token 显示 invalid，需要重新授权后继续。
- Rollback:
  - 查看记录：`git log --oneline -n 10`
  - 回退本次规范改造：`git revert 139508f`

## 2026-05-18 14:36 CST - GitHub 一键发布流程

- Mode: GitHub Cloud
- Branch: `AI-工作台`
- Commit: `1192fe9 chore: GitHub 一键发布流程`
- Scope:
  - `README.md`
  - `START_HERE.md`
  - `scripts/publish-github.sh`
- Saved:
  - 新增单指令发布脚本与文档口令，自动补 checkpoint 日志并推送
- Rollback:
  - 查看记录：`git log --oneline -n 10`
  - 回退本次代码提交：`git revert 1192fe9`
