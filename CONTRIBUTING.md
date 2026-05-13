# Contributing

感谢你参与这个产品经理 AI 工作流项目。

## 新手安全流程

如果你正在用 Codex 或其他 AI 帮你改文件，先记两个词：

```text
守护一下
```

开始前检查分支、未提交改动和污染风险。

```text
存档
```

当前成果可用或准备大改前，保存 checkpoint。

没有 GitHub 的用户也可以做本地 checkpoint；有 GitHub 的用户建议 push 到云端并通过 PR 合并。

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

- 开始前先说 `守护一下`。
- 大改之前先说 `存档`。
- 一次 PR 只做一类改动。
- 不要把多个目标混在一个分支里。
- 如果 Codex 提醒 Stop Gate，请先修正分支、范围或配置。
