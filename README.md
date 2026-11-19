# 霹雳纪事

「霹雳纪事」是霹雳布袋戏的非官方资料馆，涵盖剧集、电影、人物、世界设定与布袋戏制作技艺。[访问网站](https://pili-jianghu-archive.blackpatio.chatgpt.site)

## 本地预览

用浏览器打开 `dist/index.html` 即可。也可以在项目目录运行 `python -m http.server 4273 --bind 127.0.0.1 --directory dist`，再访问 [本地预览](http://127.0.0.1:4273/)。

## 修改站点

- `dist/index.html` 和 `dist/style.css` 定义页面和版式。
- `dist/index-data.js` 保存官方目录条目及来源链接，`dist/work-summaries.js` 保存作品剧情简介，`dist/catalog.js` 保存延伸作品、人物和展区资料。新增作品时，为对应片名补一段介绍开篇设定或主要冲突的简介，并核对作品来源。
- `dist/app.js` 管理搜索、筛选及详情跳转。`dist/language.js` 管理繁简显示和词组用语。
- 更新中文文案或馆藏后，在 Windows 项目目录运行 `python tools/update-character-map.py`。生成的 `dist/character-map.js` 同时服务于简体显示和繁简搜索，并可随静态站点直接运行。
- 检查繁简两版的首页、筛选和详情。使用繁体与简体分别搜索同一条目，并确认切换后保留查询、筛选和锚点。记录实际验证和发布结果。

站点默认显示繁体中文。页头可以切换，浏览器会记住手动选择。网址参数 `?lang=zh-Hans` 可直达简体版，`?lang=zh-Hant` 可直达繁体版。

## 建站与发布记录

查看 [建站与更新记录](docs/CHANGELOG.md)。之后每次修改都追加记录，包括改动内容、验证和发布情况。
