---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: AstroPaper博客文章中的动态OG图像生成
slug: AstroPaper博客文章中的动态和图像生成
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0 新增功能，为博客文章引入动态 OG 图像生成。

---

AstroPaper v1.4.0 新增功能，为博客文章引入动态 OG 图像生成。


## 目录
## 引言

OG 图片（也称社交图片）在社交媒体互动中扮演着重要角色。如果您还不了解 OG 图片的含义，它指的是我们在 Facebook、Discord 等社交媒体平台上分享网站 URL 时显示的图片。

> 用于 Twitter 的社交图片严格来说并不称为 OG 图片。但是，在本文中，我将使用“OG 图片”一词来指代所有类型的社交图片。

## 默认/静态 OG 图像（旧方法）

AstroPaper 已经提供了一种在博客文章中添加 OG 图片的方法。作者可以在 frontmatter 的 `ogImage` 属性中指定 OG 图片。即使作者没有在 frontmatter 中定义 OG 图片，也会使用默认的 OG 图片作为备用（在这种情况下是 `public`）。

## 动态 OG 图像

为每篇文章生成动态的OG图片，可以让作者避免为每篇博文都指定OG图片。此外，这还能防止备用OG图片在所有博文中都相同。

在 AstroPaper v1.4.0 中，Vercel 的[Satori](https://github.com/vercel/satori)该软件包用于动态 OG 图像生成。

博客文章将在构建时生成动态 OG 图片。

- 不要在前言中包含原始图片。
- 未标记为草稿。

## AstroPaper动态OG图像的结构分析

AstroPaper 的动态 OG 图像包含博文标题、作者姓名和网站标题。作者姓名和网站标题将通过 **"src" 的 `SITE.author` 和 `SITE.title` 获取。
![Example Dynamic OG Image link](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符问题

标题中包含非拉丁字符时，默认情况下可能无法正确显示。要解决此问题，我们需要将 `loadGoogleFont.ts` 文件中的 `fontsConfig` 替换为您首选的字体。

```ts file=src/utils/loadGoogleFont.ts
async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP:wght@700",
      weight: 700,
      style: "normal",
    },
    { name: "Noto Sans", font: "Noto+Sans", weight: 400, style: "normal" },
    {
      name: "Noto Sans",
      font: "Noto+Sans:wght@700",
      weight: 700,
      style: "normal",
    },
  ];
  // ...
}
```

> 查看 [this PR](https://github.com/satnaing/astro-paper/pull/318) 了解更多信息.

## 权衡

虽然这是一个很不错的功能，但它也存在一些弊端。每张 OG 图片大约需要一秒钟来生成。起初可能不太明显，但随着博客文章数量的增加，您可能需要禁用此功能。由于每张 OG 图片都需要时间生成，因此图片数量越多，构建时间就会呈线性增长。

例如：如果生成一张原始图像需要一秒钟，那么生成 60 张图片大约需要一分钟，而生成 600 张图片大约需要十分钟。随着内容规模的扩大，这可能会显著影响构建时间。


Related issue: [#428](https://github.com/satnaing/astro-paper/issues/428)

## 局限性

截至撰写本文时， [Satori](https://github.com/vercel/satori) 这项功能相当新，尚未正式发布。因此，这项动态 OG 图像功能仍然存在一些局限性。

- 此外，目前还不支持从右到左的语言。
- [Using emoji](https://github.com/vercel/satori#emojis) 标题可能有点绕口。
