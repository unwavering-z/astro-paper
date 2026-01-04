import type { Site, Config, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.unwavering.top/", // 你的域名
  author: "Unwavering",
  profile: "https://blog.unwavering.top/", // 个人简介链接
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
    text: "在 GitHub 上编辑", // 汉化编辑按钮
    url: "https://github.com/unwavering-z/astro-paper/edit/main/", // 请确认你的 GitHub 仓库路径是否正确
  },
  dynamicOgImage: true,
  dir: "ltr", // 文字方向：从左到右
  lang: "zh-CN", // 核心修改：设置为中文
  timezone: "Asia/Shanghai", // 核心修改：设置为中国标准时间
};

export const LOCALE = {
  lang: "zh-CN", // html 语言代码
  langTag: ["zh-CN"], // 日期格式化使用的标签
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/unwavering-z", // 建议改为你的 GitHub 地址
    linkTitle: `访问我的 GitHub`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:your-email@example.com",
    linkTitle: `发送邮件给我`,
    active: false,
  },
];

// 核心修改：汉化导航菜单
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
];
