# Codex Checkpoints

## 2026-05-20 09:34 CST - HTML First 与 Figma 创建门禁

- Mode: GitHub Cloud checkpoint
- Branch: `codex/主体方案重构`
- Scope: workflow rules for PM prototype generation and Figma handoff
- Saved:
  - Router rule: prototype draft only creates HTML interactive prototypes
  - ERP PM workflow: HTML prototype must be confirmed before Figma UI design creation
  - Prototype guide: added Figma creation gate and clarified “prototype” means HTML by default
  - PRD template: marked Figma section as read-only component reference
  - UI optimization workflow: restricted Figma write operations to post-confirmation UI design tasks
- Verification:
  - Text diff reviewed for the staged workflow files
- Rollback:
  - 查看记录：`git log --oneline -n 10`
  - 回退本次提交：`git revert <commit>`

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
