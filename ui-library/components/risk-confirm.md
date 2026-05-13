# RiskConfirm

高风险动作统一二次确认组件。

## Ant Design 对应

`Popconfirm` / `Modal.confirm`。

## 必填信息

- 作用对象（对谁生效）
- 影响范围（影响多少条）
- 可恢复性（是否可撤回）
- 执行后后果（渠道/状态变化）

## 交互规则

- 主按钮使用危险样式。
- 默认焦点在“取消”或“返回检查”。
- 确认后必须给反馈（Message/Notification/Result）。
