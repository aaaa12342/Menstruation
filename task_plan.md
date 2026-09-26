# 经心守护微信小程序开发计划

## Goal

在 `aaaa12342/Menstruation` 中完成可由微信开发者工具打开、调试和部署的青少年经期健康公益微信小程序，并按需求资料实现核心功能。

## Current Phase

本地 MVP 第二轮体验优化：搜索、收藏、举报记录与单帖删除

## Phases

- [x] 需求范围与 MVP 确认
- [x] 产品设计与页面/数据结构设计
- [x] 微信小程序工程初始化与云开发配置（本地模拟模式）
- [x] 核心模块实现（首版演示页面）
- [x] 本地互助闭环、内容扩充及基础安全检查
- [x] 本机举报、处理与隐藏闭环
- [ ] 科普关键词搜索与空结果状态
- [ ] 科普/辟谣本机收藏与收藏筛选
- [ ] 我的举报记录页面
- [ ] 本机帖子单独删除与关联数据清理
- [ ] 微信开发者工具模拟器/真机验收与问题修复
- [ ] 正式上线准备（AppID、服务端审核、权限、隐私与备案）

## Next Step

实现并自动化验证搜索、收藏、举报记录和单帖删除四项本地优化。

## Decisions

- 首版目标：可演示版本（MVP），不接入真实云环境。
- 开发环境：无 AppID，使用微信开发者工具本地预览/测试模式。
- 用户身份：无需登录，采用匿名模拟流程。
- 数据策略：当前为本地模拟数据与缓存；正式云服务、跨设备同步尚未接入。
- 审核策略：本机审核台仅供演示；正式运营需独立服务端审核与管理员权限。

## Errors Encountered

| Error | Attempt | Resolution |
|---|---:|---|
| GitHub Contents API returned 403 Resource not accessible by integration | 1 | Do not retry unchanged; user must grant/reconnect write permission or initialize the repository manually |
| GitHub Contents API returned 403 while committing design document | 2 | Keep the approved design document locally and request repository write access before remote sync |
| GitHub Contents API still returned 403 after reconnect | 3 | Diagnose GitHub App installation scope and repository Contents write permission; do not retry unchanged |
| Retry briefly failed with transport error, then write returned 403 again | 4 | Read connection is healthy but GitHub Contents write remains unavailable; stop connector write attempts |
| GitHub connector writes remained unavailable | 5 | Local Git push to `origin/main` succeeded; use local Git for repository sync |
