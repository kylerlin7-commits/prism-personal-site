# 棱镜轨迹

从真实困扰出发的个人产品与服务网站。HTML / CSS / JavaScript，适用于 GitHub Pages，无构建依赖。

## 页面

- `/`：问题入口、个人背景、AI / 投研 / 职业 / 成长资料与服务、案例、联系。
- `/assessment/`：三步在线自测，整理问题、目标、现状、限制与支持偏好。
- `/enterprise/`：AI 培训、知识库与 Agent、SaaS 工作流改造。

## 本地使用

```bash
python3 -m http.server 4180 --bind 127.0.0.1
```

访问 http://127.0.0.1:4180/ 。本地字体无需外部网络。

## 产品与数据

产品分为资料 / 工具 → 社群 / 共学 → 专项咨询 → 深度交付。

`assets/` 中的 Markdown 是可直接下载的免费资料样本。完整资料、社群与服务通过咨询了解，不包含预设收费、虚构销售或自动提交接口。

在线自测使用透明规则匹配，结果提供一个行动建议和对应产品路径。草稿自动保存在当前设备的 localStorage，可以清除；不上传。首页问题通过 sessionStorage 传入自测。浏览器不支持存储时仍可填写，并显示提示。

咨询简报由用户复制到微信 `sigmaboy1025` 发送。

## 内容维护

- 首页与背景：`index.html`。
- 企业服务：`enterprise/index.html`。
- 自测问题：`assessment/index.html`。
- 产品、案例、规则与咨询：`assets/site.js`。
- 视觉与字号：`assets/site.css`。
- 域名：`CNAME`；SEO：各页 meta、`sitemap.xml`、`robots.txt`。

公开内容不展示雇主信息。案例为业务场景与方案思路，具体客户效果和交付范围需有可公开资料支持。

## GitHub Pages

发布源采用仓库根目录，保留 `CNAME` 中的 `lazygrowth.top`。推送后核对 Pages 部署与以下访问：

- `https://lazygrowth.top/`
- `https://lazygrowth.top/assessment/`
- `https://lazygrowth.top/enterprise/`

字体许可见 `assets/Manrope-OFL.txt`。
