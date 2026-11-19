# 霹雳纪事

「霹雳纪事」是霹雳布袋戏的非官方资料馆，涵盖剧集、电影、人物、世界设定与布袋戏制作技艺。[访问网站](https://pili-jianghu-archive.blackpatio.chatgpt.site)

## 本地预览

用浏览器打开 `dist/index.html` 即可。也可以在项目目录运行 `python -m http.server 4273 --bind 127.0.0.1 --directory dist`，再访问 [本地预览](http://127.0.0.1:4273/)。

## 修改站点

- `dist/index.html` 和 `dist/style.css` 定义页面和版式。
- `dist/index-data.js` 保存官方目录条目及来源链接，`dist/work-summaries.js` 保存作品剧情简介，`dist/catalog.js` 保存延伸作品、人物和展区资料。新增作品时，为对应片名补一段介绍开篇设定或主要冲突的简介，并核对作品来源。
- `dist/person-portraits.js` 将人物姓名关联到 `dist/portraits/` 内的 WebP 文件和官方原图链接。增加照片时，用官方人物页核对姓名、戏偶和原图，再确认卡片取景、详情替代文字及图片来源。三位台柱、搜索结果和详情共用同一张照片。
- `dist/catalog.js` 的 `worldScenes` 与 `dist/scenes/` 一起维护「江湖地图与设定」的场景图。新增场景时填写地点、所属作品、图片类型、出处、说明和替代文字，并在繁简两版检查缩略图与放大弹窗。AI 示意图标明类型，并链接到支撑地点描述的设定资料。官方剧照链接到收录该画面的官方页面。
- `dist/app.js` 管理搜索、筛选及详情跳转。`dist/language.js` 管理繁简显示和词组用语。
- 更新中文文案或馆藏后，在 Windows 项目目录运行 `python tools/update-character-map.py`。生成的 `dist/character-map.js` 同时服务于简体显示和繁简搜索，并可随静态站点直接运行。
- 检查繁简两版的首页、筛选和详情。使用繁体与简体分别搜索同一条目，并确认切换后保留查询、筛选和锚点。记录实际验证和发布结果。

站点默认显示繁体中文。页头可以切换，浏览器会记住手动选择。网址参数 `?lang=zh-Hans` 可直达简体版，`?lang=zh-Hant` 可直达繁体版。

## 建站与发布记录

查看 [建站与更新记录](docs/CHANGELOG.md) 和 [维护约定](AGENTS.md)。每次先做本地验证，再更新相关文档，最后把已验证的改动发布到 [GitHub 的 `main` 分支](https://github.com/oscarxie/pili-puppetry-archive/tree/main)。
