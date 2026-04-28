# 新需求方案与 PRD 工作流

## 1. 触发条件

当用户出现以下意图时，进入本流程：

- 做新需求
- 梳理需求方案
- 对齐需求背景
- 输出 PRD

## 2. 默认读取文件

- `docs/ui-system/跨境电商IT产品专家（用于新需求方案输出）.md`
- `docs/prompts/new-requirement-prompt-template.md`
- `docs/templates/prd-template.md`
- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`

## 3. 输入信息

优先收集以下内容：

- 需求背景
- 业务目标
- 目标用户
- 核心场景
- 当前问题
- 约束条件
- 是否有参考方案

如果用户信息不完整，先按需求对齐方式补齐，不急于直接写 PRD。

## 4. 执行步骤

1. 对齐背景与目标
2. 明确用户、场景、问题和边界
3. 输出方案框架
4. 生成正式 PRD
5. 询问用户是否继续生成原型

## 5. 默认产物

- 需求对齐结论
- 方案建议
- PRD 文档
 
当前优先采用用户提供的“跨境电商IT产品专家”主提示词来驱动上述产物。

## 6. 结束动作

PRD 输出后，必须追加一句明确确认：

“PRD 已完成，是否继续基于当前规范生成可交互原型？”
