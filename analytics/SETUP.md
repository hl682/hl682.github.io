# 访客追踪功能 · 部署说明 (Visitor Tracking Setup)

这个功能让你在有访客时收到提醒，并把访问时间、IP、大致地理位置、浏览页面、
停留时长、滚动深度、下载点击等记录到一个 Google 表格里。访客对此无感知。

整个链路：
`网站前端 (visitor-tracker.js)` → `Google Apps Script (Code.gs)` → `Google 表格 + 邮件/Telegram 提醒`

前端部分已经接好了，你只需要创建后端并把它的网址填进 `_config.yml`。

---

## 一、创建后端（Google Apps Script）

1. 用你的 Google 账号打开 <https://sheets.google.com>，新建一个空白表格，命名为
   「网站访客记录」（名字随意）。
2. 在该表格里点菜单 **扩展程序 (Extensions) → Apps Script**。
3. 删除默认的 `Code.gs` 内容，把本仓库 `analytics/Code.gs` 的**全部内容**粘贴进去。
4. 修改顶部 CONFIG 区：
   - `NOTIFY_EMAIL`：改成你要接收提醒的邮箱（建议就是你的 Gmail）。
   - （可选）`TELEGRAM_TOKEN` / `TELEGRAM_CHAT_ID`：想用 Telegram 推送就填，见下方「可选：Telegram」。
   - （可选）`SHARED_TOKEN`：想防止别人乱调用就设一个随机字符串，并在 `_config.yml`
     的 `visitor_tracking.token` 填一样的值。
5. 点 **部署 (Deploy) → 新建部署 (New deployment)**：
   - 类型选 **Web 应用 (Web app)**。
   - **执行身份 (Execute as)**：选「我 (Me)」。
   - **谁可以访问 (Who has access)**：选 **任何人 (Anyone)**。
     （必须选这个，网页访客才能匿名发送数据；不会暴露你的表格。）
   - 点「部署」，首次会要求授权，按提示允许（会提示"未验证的应用"，选高级→继续，
     因为这是你自己的脚本）。
6. 复制生成的 **Web app URL**，形如：
   `https://script.google.com/macros/s/AKfy....../exec`

---

## 二、把网址填进网站

打开 `_config.yml`，找到 `visitor_tracking`，把 `endpoint` 填成上一步复制的网址：

```yaml
visitor_tracking:
  enabled  : true
  endpoint : "https://script.google.com/macros/s/AKfy....../exec"
  ip_lookup: "https://ipapi.co/json/"
  token    : ""   # 如果后端设了 SHARED_TOKEN，这里填一样的值
```

然后提交并推送：

```bash
git add _config.yml
git commit -m "Enable visitor tracking endpoint"
git push
```

GitHub Pages 构建完成后（约 1-3 分钟），访问网站就会开始记录。

---

## 三、验证是否生效

1. 打开你自己的网站 <https://hl682.github.io/>。
2. 几秒后刷新那个 Google 表格，应出现一行 `pageview` 记录（含 IP、城市、页面等）。
3. 邮箱应收到一封「New visitor: ...」提醒。
4. 点一下任意「下载 CV / Snap」按钮，表格会多一行 `download`，并再收到一封提醒。
5. 离开或切走页面时，会记录一行 `exit`（含停留秒数 `Duration(s)` 与最大滚动 `MaxScroll%`）。

---

## 可选：Telegram 实时推送（无每日额度限制，推荐）

Gmail 的 `MailApp` 每天约 100 封上限；访问量大时建议用 Telegram：

1. 在 Telegram 找 **@BotFather** → `/newbot` → 得到 `TELEGRAM_TOKEN`。
2. 给你的新 bot 发一句话，然后找 **@userinfobot** 拿到你的 `TELEGRAM_CHAT_ID`。
3. 把这两个值填进 `Code.gs` 的 CONFIG，重新「部署 → 管理部署 → 编辑 → 新版本」。

---

## 关于提醒频率

- 默认每个访客**会话**只发一次 pageview 提醒（`DEDUPE_PAGEVIEW_PER_SESSION = true`），
  避免同一个人翻几页就狂发邮件。
- 下载点击每次都提醒。
- `exit`（时长）只写表格、不提醒。
- 想改行为，编辑 `Code.gs` 顶部的 `NOTIFY_ON` 等开关即可。

---

## 隐私合规提醒（务必阅读）

记录访客 IP 属于处理个人数据。在英国/欧盟（GDPR、PECR）、加州（CCPA）等地区，
通常需要在网站上**告知**访客（隐私声明），某些情形还需取得同意。
「访客完全不知情」地记录 IP 存在法律风险。建议至少在页脚放一行低调的隐私说明，
例如：*"This site collects anonymous visit statistics."*
如需我帮你加一行不显眼的隐私说明，或改成不记录完整 IP（只存城市/国家），告诉我即可。
