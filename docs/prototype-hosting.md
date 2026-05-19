# Seabost 原型托管流程

目标：员工在本地用本项目生成 PRD 和 HTML 原型后，把原型发布到 Seabost 统一域名，开发通过链接访问。

## 使用方式

排查 404：

```bash
npm run prototype:doctor -- --url https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/inventory-query/
```

发布原型：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://prototype.seabost.com \
npm run prototype:publish
```

也可以跳过交互，直接指定本地原型目录：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://prototype.seabost.com \
npm run prototype:publish -- --source prototype/inventory-query --title 库存查询 --business-system ERP
```

删除自己发布的原型：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://prototype.seabost.com \
npm run prototype:delete
```

其中 `PROTOTYPE_HOSTING_REPO` 替换为实际的公司 GitHub Pages 托管仓库。

## 前置条件

1. 本机已安装 GitHub CLI：`gh`。
2. 本机已通过公司 GitHub 身份登录：`gh auth login`。
3. 公司已准备一个专门的 GitHub Pages 仓库。
4. GitHub Pages 仓库绑定统一域名：`https://prototype.seabost.com`。

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
- 绑定域名：`prototype.seabost.com`
- 主目录：`prototypes/`

可选环境变量：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting
PROTOTYPE_HOSTING_BRANCH=main
PROTOTYPE_BASE_URL=https://prototype.seabost.com
PROTOTYPE_PUBLISH_ROOT=prototypes
```
