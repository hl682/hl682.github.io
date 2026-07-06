# 罗昊旻个人主页 · hl682.github.io

基于 [Academic Pages](https://academicpages.github.io/)（Jekyll）构建，托管在 GitHub Pages。
网站地址：<https://hl682.github.io/>

本仓库已精简，只保留主页实际用到的内容和运行必需的主题引擎。下面这份说明告诉你**改哪里、怎么改、怎么发布**。

---

## 一、目录结构：哪些能改，哪些别动

### ✅ 你平时要编辑的（内容）

| 路径 | 作用 |
|------|------|
| `_pages/about.md` | 主页「About Me」（英文） |
| `_pages/academic.md` | 「Academic」学术（英文） |
| `_pages/career.md` | 「Career」职业（英文） |
| `_pages/hobbies.md` | 「Hobbies」兴趣爱好（英文） |
| `_pages/zh-about.md` | 主页「关于我」（中文） |
| `_pages/zh-academic.md` | 「学术」（中文） |
| `_pages/zh-career.md` | 「职业」（中文） |
| `_pages/zh-hobbies.md` | 「兴趣爱好」（中文） |
| `_config.yml` → `author:` | 侧边栏：头像、姓名、地点、邮箱、社交链接（含中英文） |
| `_data/navigation.yml` | 顶部导航栏的菜单文字与链接 |
| `images/` | 所有图片（头像、照片等） |
| `files/` | 可下载文件（简历 PDF 等） |

> 英文页和中文页是**两个独立文件**，改完一个不会自动同步到另一个，需要各改一次。

### ⚙️ 主题引擎（网站运行必需，**请勿删除**，一般也不用改）

`_layouts/`（页面模板）、`_includes/`（页面片段，如侧边栏、导航）、`_sass/`（样式源码）、`assets/`（编译后的 CSS/JS/字体）、`Gemfile`。

这些文件虽然你不会去编辑，但删掉网站就无法生成。需要调整外观时再动 `_includes/` 或 `_sass/`。

---

## 二、Markdown 写法速查

```markdown
## 二级标题          # 页面里的小节标题，如 News
### 三级标题          # 更小的标题

**加粗文字**

[显示的文字](https://网址)                 链接
[邮箱](mailto:hl682@cam.ac.uk)             邮箱链接
**[加粗的链接](https://网址)**             加粗 + 链接

- 列表第一项
- 列表第二项
```

段落之间要空一行。

---

## 三、怎么插入图片

1. 把图片放进 `images/` 文件夹（文件名用英文，避免空格，例如 `runway-2026.jpg`）。个人照片建议放 `images/about/`。
2. 在 Markdown 里引用：

```markdown
![图片说明](/images/runway-2026.jpg)
```

3. 想控制大小或并排，用 HTML：

```markdown
<img src="/images/runway-2026.jpg" alt="走秀照片" width="400">
```

> 路径都以 `/images/` 开头。目前 `images/about/` 里已存放了 3 张你上传的照片，可直接引用。

---

## 四、怎么发布（两种方式，任选其一）

### 方式 A：GitHub 网页直接改（最简单）

1. 打开 <https://github.com/hl682/hl682.github.io> 并登录。
2. 进入要改的文件（如 `_pages/about.md`），点右上角铅笔图标 ✏️。
3. 编辑正文（`---` 之间的头部配置一般不要动）。
4. 底部点 **Commit changes** 保存。
5. 等 1–3 分钟，刷新 <https://hl682.github.io/> 查看（必要时按 Ctrl+F5）。

### 方式 B：本地用 Cursor / 命令行改

```powershell
cd C:\Users\hl682\Projects\hl682.github.io
# （用编辑器改文件并保存后）
git pull            # 先拉取，避免冲突
git add .
git commit -m "更新主页内容"
git push
```

推送到 `master` 分支后，GitHub Pages 会**自动重新构建**，无需手动上传网站。

---

## 五、常见任务

- **加一条 News / 近况**：编辑 `_pages/about.md` 的 `## News`（中文在 `_pages/zh-about.md` 的 `## 近况`），把最新的一条写在最上面。
- **改侧边栏信息**：编辑 `_config.yml` 的 `author:` 段（`name`/`name_zh`、`location`/`location_zh`、`email`、`linkedin`、`instagram`、`xiaohongshu` 等）。
- **换头像**：把新图放进 `images/`，再改 `_config.yml` 里的 `avatar:` 文件名。
- **改导航菜单文字**：编辑 `_data/navigation.yml`（`main:` 英文，`main_zh:` 中文）。
- **换简历 PDF**：把文件放到 `files/`，命名为 `CV_EN.pdf`（英文界面下载）和 `CV_ZH.pdf`（中文界面下载）。

---

## 六、语言切换说明

- 顶部「中文 / EN」按钮在英文页与对应中文页之间跳转，依靠每个页面头部的 `translation_url` 关联。
- 侧边栏（姓名、地点、单位、邮箱、领英、小红书等）会随语言自动切换，翻译文案在 `_config.yml` 的 `author:` 里以 `_zh` 结尾的字段配置。

如需较大改动（新增栏目、调整结构），建议先在本地改好、`git push` 后再确认线上效果。
