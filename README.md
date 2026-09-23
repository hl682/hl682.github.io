# 罗昊旻 · Haomin LUO

一份可滚动的目录，不是侧边栏简历。两间屋子：工程研究（强化学习 / 元学习）与高定时装。视觉是低饱和的剑桥石材、羊皮纸与雾，表面带一层薄釉和画布纹理。

英文在 `/`，中文在 `/zh`。上传入口是 Sanity Studio：`/studio`。

## 本地运行

需要 Node 20 或更新。

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 <http://localhost:3000>。没有填写 Sanity 环境变量时，网站使用仓库里的占位内容，构建也可以通过。

```bash
npm run build
npm start
```

`npm run build` 走 webpack。Next 16 默认的 Turbopack 会把 Sanity 用到的 `swr` 解析成没有默认导出的服务端文件，因此脚本里写了 `next build --webpack`。

## 字体

`app/styles/haomin-fonts.css` 注册三个站内族名：

| CSS 族名 | 实际字体 | 用途 |
| --- | --- | --- |
| Court Serif / Court Serif Display | Source Serif 4（OFL，未改字库） | 标题。Display 使用光学尺寸轴，大标题设在 `opsz` 60 |
| Quad Sans | IBM Plex Sans | 正文与界面，以 400 为主 |
| Ledger Mono | IBM Plex Mono | 只做很小的说明标签，字距拉开 |

字文件在 `app/styles/court-serif`、`quad-sans`、`ledger-mono`。许可证在 `app/styles/licenses`。这些不是 GT Standard，也不是 Flecha。

## 设计

颜色写在 `app/globals.css`：纸 `#ebe6dc`、墨 `#171614`（由 `#1a1916` 略加深）、石 `#8a8478`、雾 `#c9c2b4`、剑桥洗 `#4a5c58`、橡木 `#5c4f3a`，以及很低透明度的暖釉 `#c4b59a`。页面有画布颗粒、暗角和釉色，没有高饱和色。

首页是五章连续滚动：在场、研究、实践（论文 / 笔记 / 阅读）、秀场与镜头、联系。一块固定的全屏画布随滚动进度换景（Lenis + GSAP ScrollTrigger）。桌面左侧是章节轨；手机藏起轨道，用模糊的目录叠层跳章。较长的文字放在全文折叠里。内页仍是独立路由。

占位图是釉绘习作（回廊、庭院、衣褶、窗花）。旧站已经公开的肖像、SELFWHO 笑脸广告、Lacoco 签约照和 HTDE 海报被重新放入，并压上一层低饱和釉色。其余照片在 Studio 里替换。

## 栏目

| 路径 | 内容 |
| --- | --- |
| `/` `/zh` | 宣言式首页 |
| `/research` | 方向与教育弧：西南交大 → 港科大 → 剑桥圣约翰。无成绩，无实习清单 |
| `/papers` | 自己的论文：摘要、解说、图版、视频 |
| `/lab-notes` | 失败的实验，以及为什么失败 |
| `/reading` | 推荐的别人的论文：解说、信息图、幻灯片、音频 |
| `/runway` | 时装周 / 广告 / 静帧 |
| `/lens` | 摄影 |
| `/contact` | 学术 `hl682@cam.ac.uk`；经纪 `Vico.wu@lacocomodels.com`（Lacoco Models） |
| `/studio` | Sanity Studio |

在某一栏目于 Studio **发布至少一条**之后，该栏目只显示 Studio 里的内容，仓库占位会让位。发布前请先把需要保留的文字在 Studio 里建好。论文占位是 HTDE-MADDPG（一年级报告中的工作）。实验笔记占位是方法形状上的例子，不是已发生实验的记录，请替换。

## Sanity：如何上传论文、照片、视频

1. 在 <https://www.sanity.io/manage> 新建项目，记下 **Project ID**（8 位）和 dataset（一般是 `production`）。
2. 复制 `.env.example` 为 `.env.local`：

```
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

3. 在 Sanity 项目的 API → CORS 中加入：
   - `http://localhost:3000`
   - 正式域名，例如 `https://www.haominluo.com`  
   允许凭证（credentials），否则 Studio 无法登录。
4. 部署这些环境变量到托管平台（同名，且 `NEXT_PUBLIC_` 前缀不可省略）。
5. 打开 `/studio`，用 Sanity 账号登录。左侧有六个目录：

| 文档类型 | 上传什么 |
| --- | --- |
| Paper | 标题、摘要、解说、主图、更多图版、视频 URL |
| Lab note | 前提、为何失败、留下了什么、图、视频 URL |
| Reading room | 为何留下、解说、原文链接、信息图、幻灯片 URL、音频 URL |
| Runway | 品牌、季节、静帧数组、成片 URL、署名 |
| Lens | 系列、地点、说明、照片 |
| Video | 独立影片：URL、海报、归类（paper / runway / lens / note） |

图片用字段上的上传按钮。视频不进 Sanity 的大文件库：把 YouTube、Vimeo 或直接的 `.mp4` / `.webm` 链接贴进 URL 字段。幻灯片同理，贴 PPT / PDF / Google Slides 的链接。音频贴 `.mp3` 等直链后，阅读页会给出播放器。

本地若已登录 Sanity CLI，也可以：

```bash
npx sanity login
npx sanity dev
```

日常编辑用网站里的 `/studio` 即可。

## 部署与域名 www.haominluo.com

旧站是 GitHub Pages 上的 Jekyll。Next.js 与 Studio 需要 Node 主机。仓库根目录**故意不放** `CNAME` 文件，避免 GitHub Pages 把 `www.haominluo.com` 指走。域名意图写在 `deploy/CNAME`。

合并并切到新主机之后，请在仓库 Settings → Pages 里关掉 GitHub Pages，否则旧构建会和自定义域名抢主机。

### Vercel（最直接）

1. 用本仓库新建 Vercel 项目，框架选 Next.js，根目录为仓库根。
2. 填入上面的 `NEXT_PUBLIC_SANITY_*`。
3. 添加域名 `www.haominluo.com`。
4. 在域名的 DNS 增加：

```
www.haominluo.com.   CNAME   cname.vercel-dns.com.
```

根域 `@` 可用 `A` 记录 `76.76.21.21`，或把根域 301 到 `www`。以 Vercel 域名面板给出的记录为准。

### Cloudflare

可以用 Cloudflare Pages / Workers 的 OpenNext 适配器（`@opennextjs/cloudflare`，见 Cloudflare 的 Next.js 文档）。DNS 若已在 Cloudflare：

```
www   CNAME   <你的 pages.dev 或 workers 主机>    （橙云或仅 DNS，按面板要求）
```

不要同时把 `www` 指到 `hl682.github.io`。

无论哪一家，Sanity CORS 都要包含最终的 `https://www.haominluo.com`。

## 隐私

教育只保留西南交通大学、香港科技大学、剑桥大学圣约翰学院。不写 GPA，不罗列实习与奖学金。联系方式只有学院邮箱与经纪人邮箱，以及已经公开的 Instagram、LinkedIn、小红书。
