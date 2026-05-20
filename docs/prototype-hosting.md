# 原型托管流程

目标：员工在本地用本项目生成 PRD 和 HTML 原型后，只有在需要分享时，把原型发布到统一托管仓库，开发通过链接访问。

默认生成原型只产出本地 HTML 文件。需要在线链接时，对 Codex 说：

```text
分享原型
```

## 使用方式

排查 404：

```bash
npm run prototype:doctor -- --url https://wanggeng826-bot.github.io/seabost-prototype-hosting/prototypes/ERP/inventory-query-20260520-120000/
```

发布原型：

```bash
PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting \
npm run prototype:publish
```

也可以跳过交互，直接指定本地原型目录：

```bash
PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting \
npm run prototype:publish -- --source prototype/inventory-query --title 库存查询 --business-system ERP
```

删除自己发布的原型：

```bash
PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting \
npm run prototype:delete
```

其中 `PROTOTYPE_HOSTING_REPO` 替换为实际的公司 GitHub Pages 托管仓库。

推荐先做只读检查：

```bash
npm run prototype:doctor -- --source prototype/<name>
```

## 前置条件

1. 本机已安装 GitHub CLI：`gh`。
2. 本机已通过公司 GitHub 身份登录：`gh auth login`。
3. 已配置专门的 GitHub Pages 托管仓库：`wanggeng826-bot/seabost-prototype-hosting`。
4. GitHub Pages 已发布：`https://wanggeng826-bot.github.io/seabost-prototype-hosting/`。

脚本会使用当前已授权的 GitHub 身份，不要求员工使用个人 GitHub Pages。

## 发布内容

脚本会扫描这些位置中包含 `index.html` 的原型目录：

```text
prototype/**
cases/**
```

发布时需要填写：

- 原型名称
- 业务系统

发布后会写入托管仓库：

```text
prototypes/<业务系统>/<原型名称-时间戳>/
```

并在目录内生成 `manifest.json`，同时更新 `prototypes/index.json` 供统一原型网站读取：

```json
{
  "prototypeId": "refund-management-20260518-100000",
  "title": "退款管理",
  "businessSystem": "ERP 业务系统",
  "owner": "github-user",
  "sourcePath": "prototype/refund-management",
  "createdAt": "2026-05-18T10:00:00+08:00",
  "updatedAt": "2026-05-18T10:00:00+08:00"
}
```

注意：不要把工作流项目仓库自身的 GitHub Pages 链接当作所有人的发布地址。`https://<user>.github.io/erp-product-manager-workflow/prototype/<name>/` 只有在该仓库的 Pages 分支上确实存在 `prototype/<name>/index.html` 时才会打开；否则 GitHub Pages 会返回 404。团队共享应使用上面的统一托管仓库和脚本输出的 URL。

## 删除权限

删除脚本只列出当前 GitHub 用户自己发布的原型，并在删除前校验：

```text
manifest.owner == 当前 GitHub 用户
```

校验不通过时，脚本不会删除。

重要限制：如果员工拥有托管仓库的直接 push 权限，仍然可以绕过本地脚本改仓库。要严格防止绕过，需要对托管仓库开启分支保护，或只允许受控机器人账号写入。

## 推荐仓库配置

- 仓库名：`seabost-prototype-hosting`
- Pages 分支：`main`
- Pages 目录：仓库根目录
- 默认地址：`https://wanggeng826-bot.github.io/seabost-prototype-hosting/`
- 主目录：`prototypes/`

如后续具备 `seabost.com` 的 DNS 控制权，可以再把自定义域名升级成 `prototype.seabost.com`。当前这不是默认主线。

可选环境变量：

```bash
PROTOTYPE_HOSTING_REPO=wanggeng826-bot/seabost-prototype-hosting
PROTOTYPE_HOSTING_BRANCH=main
PROTOTYPE_BASE_URL=https://wanggeng826-bot.github.io/seabost-prototype-hosting
PROTOTYPE_PUBLISH_ROOT=prototypes
```
