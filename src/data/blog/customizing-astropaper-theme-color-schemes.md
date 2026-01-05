---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
modDatetime: 2025-06-13T16:46:34.155Z
title: 自定义 AstroPaper 主题配色方案
featured: false
draft: false
tags:
  - color-schemes
  - docs
description:
 如何启用/禁用网站的浅色和深色模式。此外，您还将学习如何自定义整个网站的配色方案。
---

本文将介绍如何启用/禁用网站的浅色和深色模式。此外，您还将学习如何自定义整个网站的配色方案。

## 目录

## 启用/禁用浅色和深色模式

AstroPaper主题默认包含浅色和深色模式。换句话说，它将有两种配色方案：一种用于浅色模式，另一种用于深色模式。此默认行为可在SITE配置对象中禁用。

```js file="src/config.ts"
export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // [!code highlight]
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
```

要禁用，light & dark mode请设置SITE.lightAndDarkMode为false。

## 选择主色调方案

默认情况下，如果我们禁用该功能SITE.lightAndDarkMode，我们将只获得系统首选的颜色方案。

因此，要选择主配色方案而不是首选配色方案，我们必须在primaryColorScheme变量内部设置配色方案toggle-theme.js。
```js file="public/toggle-theme.js"
const primaryColorScheme = ""; // "light" | "dark" // [!code hl]

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// ...
```

primaryColorScheme变量可以包含两个值"light"。"dark"如果您不想指定主配色方案，可以留空字符串（默认值）。

- `""` - 系统首选配色方案。（默认）
- `"light"` - 使用浅色模式作为主要配色方案。
- `"dark"` - 使用深色模式作为主要配色方案。

<details>
<summary>为什么 config.ts 文件中没有 primaryColorScheme?</summary>
为了避免页面重新加载时出现颜色闪烁，我们必须在页面加载时尽早放置切换开关的 Javascript代码。这可以解决闪烁问题，但代价是我们不能再使用ESM导入了。
</details>

## 自定义配色方案

AstroPaper主题的浅色和深色配色方案都可以在global.css文件中进行自定义。

```css file="src/styles/global.css"
@import "tailwindcss";
@import "./typography.css";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

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
/* ... */
```

在 AstroPaper 主题中，`light`:root和 `dark`html[data-theme="light"]选择器定义了浅色配色方案，而html[data-theme="dark"]`dark` 选择器定义了深色配色方案。

要自定义您的配色方案，请在内部指定浅色:root, html[data-theme="light"]，在内部指定深色html[data-theme="dark"]。

以下是对颜色属性的详细解释。

| 颜色属性 | 定义与用法                                        |
| -------------- | ---------------------------------------------------------- |
| `--background` | 网站的主色调，通常是主背景色。 |
| `--foreground` | 网站的辅助颜色，通常是文本颜色。   |
| `--accent`     | 网站的强调色。例如链接颜色、悬停颜色等。  |
| `--muted`      | 设置卡片和滚动条的背景颜色（例如鼠标悬停状态等）。   |
| `--border`     | 边框颜色。尤其用于水平行（hr）。      |

以下是更改灯光颜色方案的示例。

```css file="src/styles/global.css"
/* ... */
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
/* ... */
```

> 来看看AstroPaper 已经为您精心设计的一些 [预设配色方案](https://astro-paper.pages.dev/posts/predefined-color-schemes/) 
