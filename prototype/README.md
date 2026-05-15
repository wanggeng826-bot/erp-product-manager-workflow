# Prototype Output Directory

本目录用于存放主线临时 HTML 可交互原型输出。具体业务案例的长期原型应放到 `cases/<case-name>/prototype/`。

默认约定：

- 主线演示或临时原型可输出到本目录
- 具体案例原型必须输出到对应 `cases/<case-name>/prototype/`
- 可按功能模块创建子目录
- 同一功能如有多版，可增加版本后缀
- 云效需求中不直接嵌 HTML 原型；原型发布到 OSS 静态站点后，在云效正文里填写链接和关键截图

示例：

- `prototype/order-management/`
- `prototype/<module-name>/`
- `prototype/product-import-prototype-v1/`

## 发布到 OSS

发布说明见：

- `ops/oss-static-site/README.md`

示例：

```bash
OSS_BUCKET=erp-prototypes OSS_DOMAIN=https://prototype.example.com \
  scripts/deploy-prototype-oss.sh prototype/oms-system prototypes/oms-system
```
