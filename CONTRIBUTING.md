# Contributing

感谢你参与这个 ERP 产品经理工作流项目。

## 你可以改什么

外部贡献者默认只修改：

- `knowledge/**`

适合补充的内容包括：

- ERP 业务术语
- 模块知识
- 字段解释
- 流程说明
- 操作经验
- 已确认的产品设计偏好

## 你不要直接改什么

请不要在 PR 里直接改这些目录：

- `skills/**`
- `.codex/**`
- `.github/**`
- `ui-library/**`
- `prototype/**`
- `cases/**`
- `package.json`
- `package-lock.json`

这些属于核心工作流、原型、工具链或历史案例。确实需要修改时，先在 PR 描述中说明原因，由维护者决定是否接收。

## 推荐流程

1. Fork 本仓库。
2. 在你的 fork 里新建分支。
3. 只修改 `knowledge/**`。
4. 提 Pull Request。
5. 在 PR 描述里写清楚：你改了什么、为什么改、信息来源是什么。

## PR 标题建议

```text
docs(knowledge): add inventory module terms
docs(knowledge): update refund flow notes
```

## Codex / GitHub 新手提醒

如果你正在用 Codex 协助修改：

- 开始前先让 Codex 看 `git status`。
- 一次 PR 只做一类改动。
- 不要把多个目标混在一个分支里。
- 大改之前先 checkpoint。
- 如果 Codex 提醒 Stop Gate，请先修正分支、范围或配置。
