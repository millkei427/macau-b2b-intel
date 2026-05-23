# Macau B2B Intel

可重用 TypeScript library + Claude Skill。澳門 B2B 目標名單 fetcher。

## 線上
- GitHub: millkei427/macau-b2b-intel (public)
- 已 publish npm: `@millkei/macau-b2b-intel`

## 資料覆蓋（~1,188 entities，~796 直接可 contact）
- 76 K-12 + 10 大專學校 (DSEDJ)
- 150 酒店 (macaotourism API)
- 117 政府部門 (gov.mo APM)
- 628 餐廳 (macaotourism)
- 201 旅行社 (macaotourism)
- 6 賭場 (hardcoded)

## 技術 stack
- TypeScript library
- 對應 Claude Skill 名：`macau-b2b-intel`
- 配 `macau-b2b-growth-engine` skill 一齊用（cold email 自動化）

## Use case
- B2B 冷 outreach（已 deploy 喺 PC Shop Growth Engine）
- Tender radar
- Market research / 招標 source
- Partnership prospecting
- Aggregator bootstrapping

## 工作習慣 (user)
- 回應**繁中 / 粵語**
- 對外通訊用**書面語**鐵律（cold email / 客戶 / 合約 必須繁體書面語）
- PowerShell，Windows
