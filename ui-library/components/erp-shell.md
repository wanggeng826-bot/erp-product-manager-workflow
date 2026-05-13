# ErpShell

ERP 后台壳层——所有业务页面都先长在这上面。

## 用途

承载侧边栏导航、顶栏、面包屑、内容区四块。这是 Ant Design `Layout + Sider + Header + Menu + Breadcrumb` 的项目特化版。

## 何时用 / 何时不用

| 场景 | 用 ErpShell？ |
|---|---|
| 任何业务后台页面 | ✅ 默认用 |
| 登录、注册、忘记密码 | ❌ 单独全屏布局 |
| 大屏看板（电视墙） | ❌ 用独立 LayoutFullscreen（待后续补） |
| Modal / Drawer 内嵌内容 | ❌ 抽屉/弹窗里不再嵌壳 |

## 关键尺寸

- 侧边栏：`200px` 展开 / `64px` 折叠
- 顶栏：`56px`
- 面包屑：`40px`
- 内容区：`padding: 24px`，独立滚动

所有尺寸都从 `tokens.css` 的 `--layout-*` 变量来。

## 关键交互

- 点顶栏的「≡」→ 切换 `data-collapsed="true|false"`，侧栏宽度自动变化
- 侧栏菜单 `--active` 表示当前页，颜色用 `--color-primary-6`
- 面包屑最后一级是当前页，不可点击；前面层级都是 `<a>`
- 顶栏右侧固定三件套：帮助 / 通知 / 用户头像

## 状态覆盖

| 状态 | 适用？ | 实现 |
|---|---|---|
| 默认 | ✅ | 这就是默认 |
| 加载 | ✅ 整页加载时 | 把 `<main>` 替换为骨架屏组件 |
| 空 | ❌ | 不在 Shell 层面，下沉到 DataTablePanel |
| 错误 | ⚠️ 整站异常 | 用 Ant Design `Result` 占整个 main |
| 无权限 | ✅ | 侧栏对应菜单项不渲染；顶栏功能按权限显隐 |

## 与 PRD 的来源映射

每个原型的 ErpShell 里的「菜单项」必须能映射到 PRD 或已确认的菜单清单。**禁止自创菜单**。如果发现某个原型需要的菜单 PRD 里没写，先停下问需求方。

## 复制粘贴指引

1. 复制 `<!-- BEGIN COMPONENT -->` 到 `<!-- END COMPONENT -->` 之间的 HTML
2. 把 `<style>` 里所有 `.c-shell__*` 规则一起复制（暂时没拆 CSS 文件，下个迭代会拆）
3. 把 `<script>` 末尾的折叠交互一起带上
4. 在 `<main class="c-shell__content">` 里替换为你的页面内容

## 子项目改造

| 改造 | 方式 |
|---|---|
| 换 logo | 改 `.c-shell__brand-logo` 的内容和颜色 |
| 改产品名 | 改 `.c-shell__brand-text` |
| 换深色侧栏为浅色 | 在 `.c-shell__sider` 改 `background` 和 `color` |
| 加多级菜单 | 当前是平铺。多级时需引入 `Submenu` 模式（v0.2 补） |

## 已知不足（v0.1）

- 暂只支持一级菜单 + 分组标题（没真正的多级折叠）
- 折叠态下没用真正的图标库，只用了 emoji 占位
- 没做窄屏（< 768px）适配——B 端默认桌面，但需要时另开 `c-shell--narrow`

## Changelog

- 2026-05-12 · v0.1 初版
