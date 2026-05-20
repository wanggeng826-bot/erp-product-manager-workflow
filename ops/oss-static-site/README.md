# OSS 静态站点发布（备用）

目标：一条命令把本地 HTML 可交互原型上传到 OSS 静态站点。

本项目默认原型发布走团队统一 GitHub Pages 托管流程，见 `docs/prototype-hosting.md` 和 `npm run prototype:publish`。

本目录只保留 OSS 备用方案。除非用户明确指定 OSS，否则 Codex 不应优先使用本流程。无论使用哪种托管，发布原型都不是 Figma 发布，也不是生成 zip 包。

## 前置条件

1. OSS Bucket 已开启静态网站托管。
2. Bucket 默认首页为 `index.html`。
3. 本机已安装并配置好 `ossutil`。
4. `OSS_BUCKET` 环境变量指向目标 Bucket。

可选：配置 `OSS_DOMAIN`，脚本会输出可直接访问的 HTTPS 地址。

## 发布目录

目录内必须包含 `index.html`。

```bash
OSS_BUCKET=erp-prototypes OSS_DOMAIN=https://prototype.example.com \
  scripts/deploy-prototype-oss.sh prototype/oms-system prototypes/oms-system
```

上传后访问：

```text
https://prototype.example.com/prototypes/oms-system/
```

## 发布单个 HTML 文件

脚本会把该文件上传为目标目录下的 `index.html`。

```bash
OSS_BUCKET=erp-prototypes OSS_DOMAIN=https://prototype.example.com \
  scripts/deploy-prototype-oss.sh prototype/demo.html prototypes/demo
```

上传后访问：

```text
https://prototype.example.com/prototypes/demo/
```

## Codex 执行规则

当用户说“发布原型 / 上线预览 / 给我在线地址”时，Codex 应先尝试：

```bash
npm run prototype:publish -- --source prototype/<name> --title <原型名> --business-system <系统名>
```

只有用户明确选择 OSS 备用方案时，才改用 `scripts/deploy-prototype-oss.sh`。

如果失败，只能返回明确阻塞原因，例如缺少 GitHub CLI 授权、`PROTOTYPE_HOSTING_REPO`、托管仓库写权限、Pages 配置，或 OSS 备用方案中的 `OSS_BUCKET` / `ossutil`。不要改成生成 Figma 设计稿，不要把 zip 包当作发布完成。
