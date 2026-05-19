# Prototype Output Directory

本目录用于存放主线临时 HTML 可交互原型输出。具体业务案例的长期原型应放到 `cases/<case-name>/prototype/`。

默认约定：

- 主线演示或临时原型可输出到本目录
- 具体案例原型必须输出到对应 `cases/<case-name>/prototype/`
- 可按功能模块创建子目录
- 同一功能如有多版，可增加版本后缀

示例：

- `prototype/order-management/`
- `prototype/<module-name>/`
- `prototype/product-import-prototype-v1/`

## OSS 静态站点发布

用脚本把本地 HTML 文件或原型目录上传到 OSS：

```bash
OSS_BUCKET=erp-prototypes OSS_DOMAIN=https://prototype.example.com \
  scripts/deploy-prototype-oss.sh prototype/oms-system prototypes/oms-system
```

更多说明见：

- `ops/oss-static-site/README.md`

## Seabost 统一原型托管

如果要把本地原型发布到公司统一域名，使用：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://prototype.seabost.com \
npm run prototype:publish
```

遇到 GitHub Pages 404 时先检查路径是否真的已发布：

```bash
npm run prototype:doctor -- --url <404-url>
```

删除自己发布的原型：

```bash
PROTOTYPE_HOSTING_REPO=seabost/seabost-prototype-hosting \
PROTOTYPE_BASE_URL=https://prototype.seabost.com \
npm run prototype:delete
```

更多说明见：

- `docs/prototype-hosting.md`
