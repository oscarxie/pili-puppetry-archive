# 霹雳纪事

「霹雳纪事」是霹雳布袋戏的非官方资料馆，涵盖剧集、电影、人物、世界设定与布袋戏制作技艺。[访问公开网站](https://oscarxie.github.io/pili-puppetry-archive/)

## 本地预览

用浏览器打开 `dist/index.html` 即可。也可以在项目目录运行 `python -m http.server 4273 --bind 127.0.0.1 --directory dist`，再访问 [本地预览](http://127.0.0.1:4273/)。

## 修改站点

- `dist/index.html` 和 `dist/style.css` 定义页面和版式。
- `dist/index-data.js` 保存官方目录条目及来源链接，`dist/work-summaries.js` 保存作品剧情简介，`dist/catalog.js` 保存延伸作品、人物和展区资料。新增作品时，为对应片名补一段介绍开篇设定或主要冲突的简介，并核对作品来源。
- `dist/person-portraits.js` 将人物姓名关联到 `dist/portraits/` 内的 WebP 文件和官方原图链接。增加照片时，用官方人物页核对姓名、戏偶和原图，再确认卡片取景、详情替代文字及图片来源。三位台柱、搜索结果和详情共用同一张照片。
- `dist/person-profiles.js` 维护角色背景、名言锦句、代表武学及物品。用自己的话概述背景；引文注明类型与出处，译意与民间摘录须明确标注。没有可靠资料时保留缺项提示，不补写台词或推测武器。
- 官网明确列出的身份与根据地须完整保留。名言锦句只显示完整条目；不适合全文转载的条目只给原文入口，不能用截句代替。
- `dist/catalog.js` 的 `worldScenes` 与 `dist/scenes/` 一起维护「江湖地图与设定」的场景图。新增场景时填写地点、所属作品、图片类型、出处、说明和替代文字，并在繁简两版检查缩略图与放大弹窗。AI 示意图标明类型，并链接到支撑地点描述的设定资料。官方剧照链接到收录该画面的官方页面。
- 「霹雳大事纪」标题、配图和事件资料在 `dist/catalog.js` 的 `timeline` 中配置。官方照片单独标注图源；`dist/timeline/` 的 WebP 为 AI 示意图，不是档案照片。参考海报的改绘另在图注附原始参考链接。
- 2026 年《涂附世界》节点的事件资料链接至官方专题，图注另链接实际参考的海报。
- `dist/catalog.js` 的 `effectsHistory` 和 `effectsTechniques` 维护「掌中技艺」的特效沿革与制作手法。沿革卡片的来源链接文字与网址均在 `effectsHistory` 中维护。`dist/effects/` 保存官方花絮照片和剧照，图片说明、替代文字及图源链接在 `dist/index.html`。补充技术实例时，分别注明实拍、剪接、合成或声音处理的做法与来源，再检查繁简切换和窄屏图文排列。
- `dist/app.js` 管理搜索、筛选及详情跳转。`dist/language.js` 管理繁简显示和词组用语。
- 更新中文文案或馆藏后，在 Windows 项目目录运行 `python tools/update-character-map.py`。生成的 `dist/character-map.js` 同时服务于简体显示和繁简搜索，并可随静态站点直接运行。
- 繁简转换漏字或误字在生成脚本的 `VARIANTS` 修正；需按词处理的用语（如「數位」→「数字」）在 `dist/language.js` 的 `simplifiedPhrases` 维护，不改繁体原文。
- 检查繁简两版的首页、筛选和详情。使用繁体与简体分别搜索同一条目，并确认切换后保留查询、筛选和锚点。记录实际验证和发布结果。

站点默认显示繁体中文。页头可以切换，浏览器会记住手动选择。网址参数 `?lang=zh-Hans` 可直达简体版，`?lang=zh-Hant` 可直达繁体版。

## GitHub Pages 发布

GitHub Pages 通过 `.github/workflows/pages.yml` 发布 `dist/`。推送 `main` 上的站点文件或工作流更新时会自动运行，也可在 Actions 页面手动运行。部署后用未登录的浏览器打开[公开站点](https://oscarxie.github.io/pili-puppetry-archive/)，核对项目网址下的图片、繁简切换及作品详情。

## 数据与安全

站点使用原生 HTML、CSS 和 JavaScript，搜索在浏览器内完成。`dist/` 的所有文件均可公开下载，只应包含可公开发布的资料，不要写入密钥、私有数据或内部配置。把数据改为 JSON 不会改变其公开性。

页面用 CSP 限制资源来源，只加载同源脚本；样式和字体还允许 Google Fonts 所需的域名。动态馆藏外链只接受不含账号密码的 HTTPS 网址。更新 Pages Actions 时，核对官方仓库的发布版本并固定到完整提交 SHA。浏览器验证默认使用 ego-browser。

## 建站与发布记录

查看 [建站与更新记录](docs/CHANGELOG.md) 和 [维护约定](AGENTS.md)。每次先做本地验证，再更新相关文档，最后把已验证的改动发布到 [GitHub 的 `main` 分支](https://github.com/oscarxie/pili-puppetry-archive/tree/main)，并核对 Pages 部署结果。
