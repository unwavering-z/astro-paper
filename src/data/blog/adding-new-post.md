---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-06-13T16:52:45.934Z
title: 在 AstroPaper 主题中添加新帖子
slug: 在 AstroPaper 主题中添加新帖子
featured: true
draft: false
tags:
  - docs
description:
  一些在 AstroPaper 博客主题中创建新帖子的规则/建议、技巧和注意事项。
---

以下是一些在 AstroPaper 博客主题中创建新帖子的规则/建议、技巧和注意事项。

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
    <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## 目录

## 创建博客文章

要撰写新的博客文章，请在src/data/blog/目录内创建一个 markdown 文件。

> 在 AstroPaper v5.1.0 之前，所有博客文章都必须放在 中src/data/blog/，这意味着你不能将它们组织成子目录。

从 AstroPaper v5.1.0 开始，您现在可以将博客文章组织到子目录中，从而更容易管理您的内容。

例如，如果您想将文章分组到某个类别下2025，您可以将其放在 中src/data/blog/2025/。这也会影响文章的 URL，因此src/data/blog/2025/example-post.md将可通过 访问/posts/2025/example-post。

如果您不希望子目录影响帖子 URL，只需在文件夹名称前加上下划线即可_。

```bash
# Example: blog post structure and URLs
src/data/blog/very-first-post.md          -> mysite.com/posts/very-first-post
src/data/blog/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/data/blog/_2026/another-post.md       -> mysite.com/posts/another-post
src/data/blog/docs/_legacy/how-to.md      -> mysite.com/posts/docs/how-to
src/data/blog/Example Dir/Dummy Post.md   -> mysite.com/posts/example-dir/dummy-post
```

> 💡提示：您也可以在文章的首页元数据中覆盖其别名。更多详情请参见下一节。

如果构建输出中没有出现子目录 URL，请删除 node_modules，重新安装软件包，然后重新构建。

## 前言

Frontmatter 是存储博客文章（文章）重要信息的主要位置。它位于文章顶部，并以 YAML 格式编写。阅读更多关于 Frontmatter 及其在天文文档中的用法。

以下是每篇文章的 frontmatter 属性列表。

| 财产          | 描述                                                                                                                           | 评论                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **_title_**        | 帖子标题。（h1）                                                                                                              | 必需的*                        |
| **_description_**  | 文章描述。用于文章摘要和网站文章描述中。                                                      | 必需的*                       |
| **_pubDatetime_**  | 以 ISO 8601 格式发布日期时间。                                                                                                | 必需的*                         |
| **_modDatetime_**  | 修改后的日期时间，格式为 ISO 8601。（仅当博客文章被修改时才添加此属性）                                           | 可选项                                      |
| **_author_**       | 帖子作者。                                                                                                                  | 默认值 = SITE.author                          |
| **_slug_**         | 帖子别名。此项为选填项。                                                                                            | 默认值 = slug 化文件名                  |
| **_featured_**     | 是否将此帖子显示在首页的精选部分                                                                     | 默认值 = false                                |
| **_draft_**        |将此帖子标记为“未发布”。                                                                                                        | 默认值 = false                                |
| **_tags_**         | 本文相关关键词。以YAML数组格式编写。                                                                         | 默认值 = others                               |
| **_ogImage_**      | 帖子原图。适用于社交媒体分享和搜索引擎优化。可以是远程URL，也可以是相对于当前文件夹的图片路径。  | 默认值 =SITE.ogImage或生成的 OG 图像 |
| **_canonicalURL_** | 如果文章已存在于其他来源，则使用规范 URL（绝对路径）。                                                        | 默认值 = Astro.site+Astro.url.pathname |
| **_hideEditPost_** | 隐藏博客标题下方的“编辑文章”按钮。此设置仅适用于当前博客文章。                                                   | 默认值 = false                                |
| **_timezone_**     | 请以 IANA 格式为当前博客文章指定时区。这将覆盖SITE.timezone当前博客文章的默认配置。 | 默认值 =SITE.timezone                     |

> 提示！您可以通过new Date().toISOString()在控制台中运行命令来获取 ISO 8601 格式的日期时间。但请务必移除引号。

仅需指定 frontmatter 中的字段title。descriptionpubDatetime

标题和描述（摘录）对于搜索引擎优化 (SEO) 非常重要，因此 AstroPaper 鼓励在博客文章中包含这些内容。

slug是 URL 的唯一标识符。因此，它slug必须是唯一的，并且与其他文章不同。Slug 中的空格slug应该用 `\`-或 ` \` 分隔，_但-建议使用 `\`。Slug 会使用博客文章文件名自动生成。不过，您也可以slug在博客文章的 frontmatter 中定义 Slug。

例如，如果博客文件名是 `blog.com` adding-new-post.md，而您没有在 frontmatter 中指定别名（slug），Astro 会自动使用文件名为博客文章创建一个别名。因此，别名将是 `blog.com` adding-new-post。但是，如果您在 frontmatter 中指定了别名slug，则会覆盖默认别名。您可以在Astro 文档中了解更多信息。

如果在博客文章中省略标签tags（即未指定标签），others则会使用默认标签作为该文章的标签。您可以在配置content.config.ts文件中设置默认标签。

```ts file="src/content.config.ts"
export const blogSchema = z.object({
  // ...
  draft: z.boolean().optional(),
  // [!code highlight:1]
  tags: z.array(z.string()).default(["others"]), // replace "others" with whatever you want
  // ...
});
```

### 示例前言

以下是文章开头部分的示例。

```yaml file="src/data/blog/sample-post.md"
---
title: The title of the post
author: your name
pubDatetime: 2022-09-21T05:17:19Z
slug: the-title-of-the-post
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: This is the example description of the example post.
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

## 添加目录

默认情况下，文章不包含目录。要添加目录，您需要以特定方式进行指定。
请用 h2 格式（Markdown 中的 ##）编写Table of contents，并将其放置在您希望它在文章中显示的位置。

例如，如果您想将目录放在引言段落的正下方（就像我通常做的那样），您可以按以下方式操作。

<!-- prettier-ignore-start -->
```md
---
# frontmatter
---

Here are some recommendations, tips & ticks for creating new posts in AstroPaper blog theme.

<!-- [!code ++] -->
## Table of contents

<!-- the rest of the post -->
```
<!-- prettier-ignore-end -->

## 标题

关于标题，有一点需要注意。AstroPaper 博客文章使用标题（位于文章前言部分）作为文章的主标题。因此，文章中其余的标题应该使用 h2 到 h6 的格式。

这条规则并非强制性的，但出于视觉效果、可访问性和搜索引擎优化方面的考虑，强烈建议遵守。

## 语法高亮显示

AstroPaper 默认使用Shiki作为语法高亮插件。从 AstroPaper v5.4 开始，使用@shikijs/transformers来增强代码块的显示效果。如果您不想使用它，可以像这样将其移除。

```bash
pnpm remove @shikijs/transformers
```

```js file="astro.config.ts"
// ...
// [!code --:5]
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
      // [!code --:3]
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  // ...
}
```

## 博客内容图片存储

以下是在 Markdown 文件中存储和显示图像的两种方法。

> 注意！如果需要在 Markdown 中设置优化图片的样式，则应[使用 MDX]。(https://docs.astro.build/en/guides/images/#images-in-mdx-files).

### 目录内部src/assets/（推荐）

您可以将图像存储在目录中。Astro 将通过图像服务 APIsrc/assets/自动优化这些图像。 [Image Service API](https://docs.astro.build/en/reference/image-service-reference/).

您可以使用相对路径或别名路径（@/assets/）来提供这些图像。

例如：假设你想显示example.jpg路径为/src/assets/images/example.jpg.

```md
![something](@/assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

> 理论上，你可以将图片存储在任何目录下src。这里src/assets只是提供一个建议。

###  目录`public` 

您可以将图像存储在该public目录中。请注意，存储在public目录中的图像不会被 Astro 处理，这意味着它们未经优化，您需要自行进行图像优化。

对于这些图像，您应该使用绝对路径；这些图像可以使用markdown 注释或HTML img 标签显示。[markdown annotation](https://www.markdownguide.org/basic-syntax/#images-1) or [HTML img tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img).

例如：假设example.jpg位于/public/assets/images/example.jpg。

```md
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

## Bonus

### 图像压缩

在博客文章中插入图片时（尤其是public目录下的图片），建议对图片进行压缩。这会影响网站的整体性能。

我推荐一些图片压缩网站。

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG 图片

如果文章未指定主图，则会使用默认的主图。虽然并非强制要求，但建议在文章的 frontmatter 中指定主图。主图的推荐尺寸为1200 x 640像素。

> 自 AstroPaper v1.4.0 版本起，如未指定，OG 图像将自动生成。请查看公告。[the announcement](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/).
