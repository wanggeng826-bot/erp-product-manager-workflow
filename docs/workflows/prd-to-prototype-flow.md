# PRD 转原型工作流

## 1. 触发条件

当用户出现以下意图时，进入本流程：

- 已有 PRD，要求生成原型
- 需要 HTML 可交互原型
- 需要页面结构、弹窗、抽屉和交互稿

## 2. 默认读取文件

- `docs/prototype-generation-guide.md`
- `docs/ui-system/ui-interaction-spec.md`
- `docs/ui-system/erp-reference-patterns.md`
- `docs/templates/prototype-template.md`

## 3. 输入信息

优先获取：

- PRD 文件或路径
- 是否已有参考原型
- 是否有特殊输出目录要求

## 4. 执行步骤

1. 获取 PRD 文件
2. 读取规范与 PRD
3. 拆页面、权限、状态、弹窗、抽屉和跳转
4. 生成 HTML 可交互原型
5. 输出到 `prototype/`

## 5. 默认产物

- 原型结构说明
- HTML 可交互原型

## 6. 默认限制

- 不得脱离现有 UI 规范自行发明新的交互模式
- 如 PRD 缺细节，优先按既有规范补齐默认交互
