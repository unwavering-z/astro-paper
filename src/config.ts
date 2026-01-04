// 直接定义配置，不引用外部 types 文件，避免路径报错
export const SITE = {
  website: "https://blog.unwavering.top/", // 你的域名
  author: "Unwavering",
  profile: "https://blog.unwavering.top/",
  desc: "自己部署自用Blog",
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
    text: "在 GitHub 上编辑",
    url: "https://github.com/unwavering-z/astro-paper/edit/main/", 
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "zh-CN",
  timezone: "Asia/Shanghai",
} as const;

export const LOCALE = {
  lang: "zh-CN", 
  langTag: ["zh-CN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/unwavering-z",
    linkTitle: `访问我的 GitHub`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:your-email@example.com",
    linkTitle: `发送邮件给我`,
    active: false,
  },
] as const;

export const NAV_LINKS = [
  {
    href: "/posts/",
    text: "文章",
  },
  {
    href: "/archives/",
    text: "归档",
  },
  {
    href: "/tags/",
    text: "标签",
  },
  {
    href: "/about/",
    text: "关于",
  },
  {
    href: "/search/",
    text: "搜索",
  },
] as const;
