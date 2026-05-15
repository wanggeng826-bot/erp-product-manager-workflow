# GitHub Pages 原型托管方案

## 当前状态

- `gh-pages` 分支已创建并推送到 GitHub
- 分支内包含所有原型文件（`prototype/` 目录）
- 路径已修正为相对路径，可独立访问

## 你需要手动完成的 1 步

GitHub Pages 需要在仓库设置里开启，我（AI）无法代劳。

### 开启步骤（2 分钟）

1. 打开仓库设置页面：
   ```
   https://github.com/wanggeng826-bot/erp-product-manager-workflow/settings/pages
   ```

2. 在 **"Build and deployment"** 区域：
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `gh-pages` / `/(root)`
   - 点击 **Save**

3. 等待 1-2 分钟，页面会显示你的站点地址：
   ```
   https://wanggeng826-bot.github.io/erp-product-manager-workflow/
   ```

## 原型访问地址（开启后即可用）

| 原型 | 访问地址 |
|------|----------|
| OMS 订单履约系统 | `https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/oms-system/` |
| OMS Router Demo | `https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/oms-router-demo/` |
| 销售人员管理 | `https://wanggeng826-bot.github.io/erp-product-manager-workflow/prototype/salesperson-management/` |

## 后续新增原型的流程

1. 切到 `gh-pages` 分支：`git checkout gh-pages`
2. 把新原型放到 `prototype/<新原型名>/` 目录
3. 确保 `index.html` 存在且路径为相对路径
4. 提交并推送：`git add . && git commit -m "add prototype: xxx" && git push origin gh-pages`
5. 自动部署，1-2 分钟后即可访问

## 与阿里云 OSS 方案对比

| 项目 | GitHub Pages | 阿里云 OSS |
|------|-------------|-----------|
| 费用 | 免费 | 需购买存储包 + 流量费 |
| 域名 | 自带 `github.io` | 需购买域名 + 备案 |
| 配置难度 | 点一下即可 | 需配置 Bucket、CDN、域名 |
| 国内访问速度 | 一般（可接受）| 快 |
| 适合场景 | 原型分享、团队协作 | 生产环境 |

> 原型阶段用 GitHub Pages 完全够用，等上线前再切到 OSS + 自定义域名。
