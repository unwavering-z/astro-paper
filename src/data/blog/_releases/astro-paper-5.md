---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: true
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：保持简洁的外观，内部进行了更新。"
---

期待已久的 AstroPaper v5 终于发布了。AstroPaper v5 保持了简洁清爽的界面，但内部进行了重大升级。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 重大变化

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现在搭载了 Astro v5，带来了该版本的所有新功能和改进。

### Tailwind v4

AstroPaper 已升级至 Tailwind v4，其中包含许多底层样式更改。原tailwind.config.js文件已被移除，现在所有配置都位于该src/styles/global.css文件中。与排版相关的样式已提取并移至src/styles/typography.css。

由于 TailwindCSS v4 的新行为，<style>组件内块中的样式已被移除，并替换为内联 Tailwind 类。

此外，用户界面配色方案也已更新。新的配色方案现在仅包含五种颜色：

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
```

### 移除 React + Fuse.js，改用 Pagefind 搜索

在之前的版本中，AstroPaper 使用 React.js 和 Fuse.js 来实现搜索功能和 OG 图像生成。在 AstroPaper v5 中，React.js 已被移除，并替换为[Pagefind](https://pagefind.app/), 一个静态网站搜索工具。

搜索体验与之前的版本几乎相同，但现在所有内容（而不仅仅是标题和描述）都已被索引并可搜索，这要归功于 Pagefind。

在开发模式下使用 Pagefind 的想法受到了 [这篇新文章](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/)的新启发.

### 已更新导入别名

导入别名已从 `<import_alias>` 更新为 ` @directory<import_alias> @/directory`，这意味着您现在必须这样导入：

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### 移至'pnpm'

AstroPaper 已从 切换npm到pnpm，后者提供更快、更高效的软件包管理。

### 将 icons/svg 替换为 Astro 的 SVG 组件

AstroPaper v5 将内联 SVG 替换为 Astro 的[实验性SVG 组件](https://docs.astro.build/en/reference/experimental-flags/svg/)。此次更新减少了对象中预定义 SVG 代码的需求socialIcons，使代码库更简洁、更易于维护。

### 分离常量和配置项

项目结构已重新组织。该src/config.ts文件现在仅包含一个SITE对象，该对象保存着项目的主要配置。所有常量，例如`<constant>` LOCALE、SOCIALS`<constant>` 和SHARE_LINKS`<constant>`，都已移至该src/constants.ts文件中。

## 其他显著变化

- 博客文章目录已从 更新src/content/blog/为src/data/blog/。
- 集合定义文件（src/content/config.ts）现在已被替换为src/content.config.ts。
- 为了提高性能和安全性，已对多个依赖项进行了升级。
- 移除IBM Plex Mono字体并切换到系统默认的等宽字体。
- 按钮Go back逻辑已更新。现在，AstroPaper v5 不再触发浏览器的历史记录 API，而是使用浏览器会话临时存储返回 URL。如果会话中不存在返回 URL，则会重定向到首页。
- 此外，还有一些细微的样式和布局上的变化。

## 结尾

AstroPaper v5 带来了诸多变化，但核心体验保持不变。您将享受到更流畅、更高效的博客平台，同时还能体验到 AstroPaper 一贯的简洁设计！

欢迎体验这些变化并分享您的想法。一如既往，感谢您的支持！

如果您喜欢这个主题，请考虑给仓库加星标。您也可以通过 GitHub Sponsors 支持我，或者请我喝杯咖啡。当然，这些操作完全是可选的，并非强制要求。

享受！

[Sat Naing](https://satnaing.dev/)
