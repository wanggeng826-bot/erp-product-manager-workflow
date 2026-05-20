# 团队成员上手说明

这份说明给第一次使用本项目的新同学。

目标很简单：

1. 用 Codex 输出 PRD
2. 生成 HTML 可交互原型
3. 需要分享时，发布原型并拿到在线链接
4. 把稳定规则沉淀到 knowledge 并发 PR

## 一次性配置

### 1. 拉取项目

```bash
git clone https://github.com/wanggeng826-bot/erp-product-manager-workflow.git
cd erp-product-manager-workflow
```

### 2. 接受原型托管仓库邀请

管理员会邀请你加入这个仓库：

- [wanggeng826-bot/seabost-prototype-hosting](https://github.com/wanggeng826-bot/seabost-prototype-hosting)

你需要在 GitHub 通知或邮件里接受邀请。没有 `Write` 权限时，`分享原型` 会失败。

### 3. 打开固定配置页面

把这个链接保存下来：

- [原型分享配置引导](https://wanggeng826-bot.github.io/seabost-prototype-hosting/setup/)

它会告诉你如何完成 GitHub CLI 登录和环境变量配置。

### 4. 本机登录 GitHub CLI

```bash
gh auth login -h github.com
gh auth status
```

选择方式：

- Git protocol: `HTTPS`
- Authenticate Git with your GitHub credentials: `Y`
- Login method: `Login with a web browser`

### 5. 配置原型发布环境变量

```bash
echo 'export PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting' >> ~/.zshrc
echo 'export PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting' >> ~/.zshrc
source ~/.zshrc
```

### 6. 自检

```bash
npm run team:doctor
```

如果这条正常，说明你已经具备原型分享和 knowledge 协作能力。

## 日常怎么用

### 1. 做 PRD

直接告诉 Codex 你的需求背景、目标、角色、流程和约束。  
如果你已经有方案文档或历史 PRD，把文件路径一起给它。

### 2. 生成原型

说：

```text
生成原型
```

这里的“原型”默认指：

- HTML 可交互原型
- 输出到 `prototype/<name>/index.html`
- 默认本地交付

不是 Figma 设计稿。

只有你明确说：

- `生成 Figma 设计稿`
- `输出 UI 设计稿`
- `写到 Figma`

才会进入 Figma 流程。

### 3. 分享原型

说：

```text
分享原型
```

Codex 这时才会把本地 HTML 发布到托管仓库，并返回在线链接。

### 4. 沉淀 knowledge

PRD 或原型确认后，Codex 会主动问：

```text
是否把这次稳定规则沉淀为 knowledge 草稿？
```

你确认草稿无误后，执行：

```bash
npm run knowledge:publish -- --title "docs(knowledge): update <module>"
```

这条命令会自动：

1. 新建 knowledge-only 分支
2. 提交 `knowledge/**`
3. push 到 GitHub
4. 创建一个指向 `main` 的 PR

## 你要记住的 4 条规则

1. `生成原型` 只等于本地 HTML，不等于自动发布。
2. `分享原型` 才会生成在线链接。
3. Figma 设计稿不是默认产物，只有明确要求才生成。
4. PRD / 原型确认后，要补 knowledge 草稿并发 PR 到 `main`。
5. 复杂需求、多页面原型、正式 UI 审查才维护 planning 文件。

## 常见失败原因

### 1. `分享原型` 失败

通常是这几个原因：

- `gh auth login` 没做
- `gh auth status` 已失效
- 没接受托管仓库邀请
- `PROTOTYPE_HOSTING_REPO` 没配置
- `PROTOTYPE_BASE_URL` 没配置

### 2. 让它生成了 Figma，不是 HTML

说明你说法不够明确，或者上下文里混入了 Figma 诉求。  
要直接说：

```text
生成 HTML 可交互原型
```

### 3. 对话越聊越乱

这是长上下文污染。处理方式：

- 先做 checkpoint 或 commit
- 开新分支
- 新开一个更聚焦的对话

做需求方案：

```text
帮我输出 PRD
```

做 HTML 原型：

```text
生成 HTML 可交互原型
```

发布链接：

```text
分享原型
```

## 相关链接

- [项目首页](../README.md)
- [START_HERE](../START_HERE.md)
- [原型托管说明](./prototype-hosting.md)
- [原型分享配置引导](https://wanggeng826-bot.github.io/seabost-prototype-hosting/setup/)
