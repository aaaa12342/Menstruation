# 经心守护（Menstruation）

青少年经期健康公益微信小程序的本地演示版。使用原生 WXML/WXSS/JS，项目位于 `miniprogram/`。

## 当前进度（2026-09-27）

- 已实现：首页导航、科普与辟谣、关怀包模拟申请、匿名互助、公益项目、热线和隐私说明页面。
- 互助演示流程：匿名提问后在“我的帖子”查看待审核状态；审核通过后显示于广场；回复通过后在“回复消息”中提示；帖子和回复支持举报，处理后可在本机隐藏。操作见 [互助社区演示说明](docs/community-demo.md)。
- 科普内容：16 篇知识文章、10 篇辟谣内容；发帖/回复设有基础敏感词与个人信息检查，回复还会拦截部分诊断、用药建议。
- 已有 Node.js 自动化检查；尚未完成微信开发者工具内的模拟器/真机验收。

本版使用本机缓存和模拟数据，`project.config.json` 配置为 `touristappid`。审核台没有管理员身份验证，帖子和消息不会跨设备同步；隐私说明只覆盖当前演示方式，不能作为正式上线的完整合规文件。

## 本地运行

在微信开发者工具中导入仓库根目录，使用测试号/游客模式打开项目。没有正式 AppID 时，无法据此完成真实云开发、微信审核与发布。

可在仓库根目录运行以下检查：

```text
node tests/community-flow.test.js
node tests/report-flow.test.js
node tests/reply-screen.test.js
node tests/page-wiring.test.js
```

详细进度与待办见 [progress.md](progress.md) 和 [task_plan.md](task_plan.md)。
