# OSS 静态原型站点

本目录记录 HTML 原型发布到阿里云 OSS 静态网站的约定。云效需求不直接承载 HTML 原型，云效正文只放 PRD、截图和原型链接。

## 推荐结构

OSS Bucket 只作为静态原型站点：

```text
oss://<bucket>/
  prototypes/
    order-management/
      index.html
      styles.css
      script.js
    salesperson-management/
      index.html
      styles.css
      script.js
  error.html
```

云效需求正文中填写：

```text
原型地址：https://<prototype-domain>/prototypes/<module-name>/
设计基线：Ant Design ERP UI Library v0.2.1
```

## OSS Bucket 配置

在阿里云 OSS 控制台完成一次性配置：

1. 创建 Bucket，地域按团队访问延迟和合规要求选择。
2. 开启静态网站托管。
3. 默认首页设置为 `index.html`。
4. 默认 404 页设置为 `error.html`。
5. 绑定自定义域名，例如 `prototype.example.com`。
6. 如果 Bucket 在中国内地，绑定域名需要完成 ICP 备案。

注意：直接用 OSS Bucket 域名访问 HTML 可能触发浏览器下载；正式评审建议绑定自定义域名。

参考：

- https://help.aliyun.com/oss/static-website-hosting-overview
- https://help.aliyun.com/zh/oss/developer-reference/cp/

## 本地发布

先安装并配置 `ossutil`，确保当前机器具备目标 Bucket 写权限。

```bash
scripts/deploy-prototype-oss.sh prototype/oms-system prototypes/oms-system
```

参数说明：

- 第 1 个参数：本地原型目录，目录下必须有 `index.html`
- 第 2 个参数：OSS 里的目标前缀

需要环境变量：

```bash
export OSS_BUCKET=<bucket-name>
```

可选环境变量：

```bash
export OSS_DOMAIN=https://prototype.example.com
```

脚本完成后会输出云效可粘贴的原型地址。

## 云效正文模板

```markdown
## 原型

- 原型地址：https://prototype.example.com/prototypes/<module-name>/
- 原型版本：<YYYYMMDD 或 Git commit>
- 设计基线：Ant Design ERP UI Library v0.2.1

## 关键截图

- 默认态：见附件
- 关键交互态：见附件
- 异常/空状态：见附件

## 验收口径

- 需求正文以云效为准
- 交互细节以 OSS 原型为准
- 组件样式以 Ant Design ERP UI Library v0.2.1 为准
```
