# OSS 静态站点发布

目标：一条命令把本地 HTML 原型上传到 OSS 静态站点。

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
