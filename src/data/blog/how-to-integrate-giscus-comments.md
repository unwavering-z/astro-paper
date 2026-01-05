---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: 如何将Giscus评论整合到AstroPaper中
slug: 如何整合 giscus 评论
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: 在 GitHub Pages 上使用 Giscus 实现静态博客的评论功能。
---

在类似这样的平台上托管一个轻量级的静态博客 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) 它有很多优点，但也减少了一些互动性。幸运的是， [Giscus](https://giscus.app/) 存在并提供了一种将用户评论嵌入静态网站的方法。
## 目录

##Giscus 的工作原理

[Giscus 使用 GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) 读取并存储 _GitHub_ 用户在与存储库关联的“讨论”中发表的评论。

将 _Giscus_ 客户端脚本包嵌入到您的网站中，并配置正确的存储库 URL，用户即可查看和撰写评论（登录 _GitHub_ 后）。

这种方法是无服务器的，因为评论存储在 _GitHub_ 上，并在客户端动态加载，因此非常适合像 _AstroPaper_ 这样的静态博客。

## 设置 Giscus

_Giscus_ 可以轻松设置在 [giscus.app](https://giscus.app/), 但我稍后会概述一下流程。

### 先决条件

要让 Giscus 正常运行，需要满足以下先决条件：

- 仓库是[public](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- the [Giscus app](https://github.com/apps/giscus) is installed
- the [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) 您的存储库已启用此功能

如果由于任何原因无法满足这些条件，则很遗憾，_Giscus_ 无法集成。
### 配置 _Giscus_

接下来，需要配置 Giscus。在大多数情况下，预设的默认设置就足够了，只有在有特殊原因且了解相关操作的情况下才需要修改。不用太担心做出错误的选择；您可以随时调整配置。

但是你需要

- 选择正确的用户界面语言。
- 指定要连接的 _GitHub_ 存储库，通常是包含您静态托管的 _AstroPaper_ 博客的存储库。 _GitHub Pages_
- 如果您想确保没有人能直接在 GitHub 上发布随意评论，请在 GitHub 上创建并设置一个“公告”类型的讨论。
- 定义配色方案

配置设置后，_Giscus_ 会生成一个 `<script>` 标签，您将在后续步骤中用到它。

## 简单脚本标签

现在你应该会看到一个类似这样的脚本标签：

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

只需将其添加到网站的源代码中即可。如果您使用的是 AstroPaper 框架并希望在文章中启用评论功能，请导航到 `PostDetails.astro` 文件，然后将其粘贴到您希望评论显示的位置，例如粘贴在“分享此文章到：”按钮下方。
```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
  <main>
    <ShareLinks />

    <!-- [!code ++:6] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```

搞定了！您已成功将评论功能集成到 _AstroPaper_ 中！

## React 组件，支持浅色/深色主题

布局中嵌入的脚本标签相当静态，_Giscus_ 配置（包括 `theme`）被硬编码到布局中。鉴于 _AstroPaper_ 具有轻量级特性。

首先，我们将安装 [React component](https://www.npmjs.com/package/@giscus/react) for _Giscus_:

```bash
npm i @giscus/react && npx astro add react
```

然后我们在 `src/components` 目录下创建一个新的 `Comments.tsx` React 组件：

```tsx file=src/components/Comments.tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

这个 React 组件不仅封装了原生的 Giscus 组件，还引入了额外的属性，即 `lightTheme` 和 `darkTheme`。通过利用两个事件监听器，Giscus 评论将与网站主题保持一致，并在网站或浏览器主题更改时动态切换深色和浅色主题。

我们还需要定义 `GISCUS` 配置，其最佳位置在 `constants.ts` 文件中：

```ts file=src/constants.ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```

请注意，在此处指定 `theme` 将覆盖 `lightTheme` 和 `darkTheme` 属性，从而产生静态主题设置，类似于之前使用 `<script>` 标签嵌入 _Giscus_ 的方法。

要完成此过程，请将新的 Comments 组件添加到 `PostDetails.astro`（替换上一步中的 `script` 标签）。

```jsx file=src/layouts/PostDetails.astro
// [!code ++:1]
import Comments from "@/components/Comments";

<ShareLinks />

// [!code ++:1]
<Comments client:only="react" />

<hr class="my-6 border-dashed" />

<Footer />
```

就这样！
