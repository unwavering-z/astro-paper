---
author: Unwavering
pubDatetime: 2022-09-23T04:58:53Z
modDatetime: 2025-03-20T03:15:57.792Z
title: 如何配置 AstroPaper 主题
slug: how-to-configure-astropaper-theme
featured: true
draft: false
tags:
  - 配置
  - 文档
description: 介绍如何让 AstroPaper 主题完全符合你的个人需求。
---

AstroPaper 是一个高度可定制的 Astro 博客主题。通过 AstroPaper，你可以根据个人喜好定制一切。本文将解释如何通过配置文件轻松进行一些基础定制。

## 目录

## 配置 SITE（站点信息）

重要的配置项位于 `src/config.ts` 文件中。在该文件中，你会看到 `SITE` 对象，你可以在这里指定网站的主要配置。

在开发阶段，可以将 `SITE.website` 留空。但在生产模式下，你应该在 `SITE.website` 选项中指定你部署后的 URL，因为它将用于生成规范链接（Canonical URL）、社交分享图 URL 等，这些对 SEO 至关重要。

```js file=src/config.ts
export const SITE = {
  website: "[https://blog.unwavering.top/](https://blog.unwavering.top/)", // 替换为你部署后的域名
  author: "Unwavering",
  profile: "[https://blog.unwavering.top/](https://blog.unwavering.top/)",
  desc: "一个极简、响应式且 SEO 友好的 Astro 博客主题。",
  title: "Unwavering-Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 分钟
  showArchives: true,
  showBackButton: true, // 在文章详情页显示返回按钮
  editPost: {
    enabled: true,
    text: "建议修改",
    url: "[https://github.com/unwavering-z/astro-paper/edit/main/](https://github.com/unwavering-z/astro-paper/edit/main/)",
  },
  dynamicOgImage: true, // 启用自动动态生成 OG 分享图
  dir: "ltr", // 文字方向："ltr"（从左到右）| "rtl"（从右到左）| "auto"
  lang: "zh-CN", // HTML 语言代码。设为空则默认为 "en"
  timezone: "Asia/Shanghai", // 默认全局时区 (IANA 格式)
} as const;
```

Here are SITE configuration options

| 选项              | 描述                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `website`             | 您已部署的网站 URL                                                                                                                                                                                                                                                                                                                                                                                                         |
| `author`              | 你的名字                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `profile`             | 您的个人/作品集网站网址，用于提升搜索引擎优化效果。如果没有网站，请填写null空字符串。""                                                                                                                                                                                                                                                                                                         |
| `desc`                | 您的网站描述。有助于搜索引擎优化和社交媒体分享。                                                                                                                                                                                                                                                                                                                                                                   |
| `title`               | 您的网站名称                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `ogImage`             | 网站的默认 OG 图片。方便在社交媒体上分享。OG 图片可以是外部图片 URL，也可以放置在/public目录下 .                                                                                                                                                                                                                                                                     |
| `lightAndDarkMode`    | 启用或禁用light & dark mode此功能。如果禁用，将使用网站默认的主配色方案。此选项默认启用。                                                                                                                                                                                                                                                                                         |
| `postPerIndex`        | 首页该版块下要显示的帖子数量Recent。                                                                                                                                                                                                                                                                                                                                                      |
| `postPerPage`         | 您可以指定每页显示的帖子数量。（例如：如果设置SITE.postPerPage为 3，则每页仅显示 3 篇帖子）                                                                                                                                                                                                                                                                          |
| `scheduledPostMargin` | 在生产模式下，发布时间不明的帖子pubDatetime将不可见。但是，如果帖子发布pubDatetime时间在未来 15 分钟内，则会显示。scheduledPostMargin如果您不喜欢默认的 15 分钟发布时间范围，可以进行设置。                                                                                                                                                                               |
| `showArchives`        | 决定是否显示Archives菜单（位于About上下Search菜单之间）及其在网站上的对应页面。此选项默认设置true为“是”。                                                                                                                                                                                                                                            |
| `showBackButton`      | Go back决定是否在每篇博客文章中显示该按钮。                                                                                                                                                                                                                                                                                                                                                            |
| `editPost`            | 此选项允许用户通过在博客文章标题下方提供编辑链接来建议修改博客文章。此功能可通过设置SITE.editPost.enabled禁用false。                                                                                                                                                                                                                                          |
| `dynamicOgImage`      | 此选项控制在博客文章 frontmatter 中未指定 og-image 时是否生成动态 og-imageogImage。如果您有很多博客文章，建议禁用此功能。更多详情请参阅权衡说明。 |
| `dir`                 | 指定整个博客的文本方向。用作HTML的 dir 属性<html dir="ltr">。支持的值：ltr| rtl|auto                                                                                                                                                                                               |
| `lang`                |用作 HTML ISO 语言代码<html lang"en">。默认值为en。                                                                                                                                                                                                                                                                                                                                                             |
| `timezone`            | 此选项允许您使用IANA 格式指定时区。设置此选项可确保本地主机和已部署站点的时间戳一致，从而消除时间差异。                                                                                                                                                                         |
## 更新布局宽度

max-width整个博客的默认值为768px( max-w-3xl)。如果您想更改它，您可以轻松地更新max-w-app您的实用程序global.css。例如：

```css file=src/styles/global.css
@utility max-w-app {
  /* [!code --:1] */
  @apply max-w-3xl;
  /* [!code ++:1] */
  @apply max-w-4xl xl:max-w-5xl;
}
```

您可以在Tailwind CSS 文档max-width中探索更多值。
## 配置徽标或标题

LOGO_IMAGE在 AstroPaper v5 之前的版本中，您可以在文件内的对象中更新网站名称/徽标src/config.ts。但是，在 AstroPaper v5 中，此选项已被移除，取而代之的是 Astro 内置的 SVG 和图像组件。

![An arrow pointing at the website logo](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)

你可以选择以下三种方式：

### 选项 1：网站标题文本

这是最简单的办法，你只需要更新SITE.title文件即可src/config.ts。

### 选项 2：Astro 的 SVG 组件

如果您想使用 SVG 格式的徽标，则可以考虑使用此选项。

- 首先在src/assets目录中添加一个 SVG 文件。（例如src/assets/dummy-logo.svg：）
- 然后将该 SVG 导入到内部Header.astro

  ```astro file=src/components/Header.astro
  ---
  // ...
  import DummyLogo from "@/assets/dummy-logo.svg";
  ---
  ```

- 最后，替换{SITE.title}为导入的徽标。

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <DummyLogo class="scale-75 dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

这种方法最大的优点在于您可以根据需要自定义 SVG 样式。在上面的示例中，您可以看到如何在深色模式下反转 SVG 徽标的颜色。

### 选项 3：Astro 的图像组件

如果您的徽标是图像但不是 SVG 格式，则可以使用 Astro 的图像组件。

- 将您的徽标添加到src/assets目录中。（例如src/assets/dummy-logo.png：）
- 导入Image您的徽标Header.astro

  ```astro file=src/components/Header.astro
  ---
  // ...
  import { Image } from "astro:assets";
  import dummyLogo from "@/assets/dummy-logo.png";
  ---
  ```

- 然后，替换{SITE.title}为导入的徽标。

  ```html
  <a
    href="/"
    class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
  >
    <image src="{dummyLogo}" alt="Dummy Blog" class="dark:invert" />
    <!-- {SITE.title} -->
  </a>
  ```

使用这种方法，您仍然可以使用 CSS 类来调整图像的外观。但是，这可能并不总是符合您的需求。如果您需要根据浅色或深色模式显示不同的徽标图像，请查看组件内部是如何处理浅色/深色图标的Header.astro。

## 配置社交链接

![An arrow pointing at social link icons](https://github.com/user-attachments/assets/8b895400-d088-442f-881b-02d2443e00cf)

您可以在SOCIALS对象内部配置社交链接constants.ts。

```ts file=src/constants.ts
export const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: ` ${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "X",
    href: "https://x.com/username",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/username/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const;
```

## 配置共享链接

您可以在SHARE_LINKS对象内部配置共享链接src/constants.ts。



![An arrow pointing at share link icons](https://github.com/user-attachments/assets/4f930b68-b625-45df-8c41-e076dd2b838e)

## 结论

以下是关于如何自定义此主题的简要说明。如果您懂一些编程，可以进行更多自定义。有关自定义样式的更多信息，请阅读这篇文章。感谢阅读。✌🏻
