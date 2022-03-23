module.exports = {
    title: '小赵的Blog',
    description: '小赵的Blog 赵登辉',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            {
                text: '小赵的 JavaScript 博客',
                items: [
                    { text: 'Github', link: 'https://github.com/Zhaoiii' },
                    { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
                ]
            }
        ],
        sidebar: [
            {
                title: '胡诌诌',
                path: '/',
                collapsable: false, // 不折叠
            },
            {
                title: "学习",
                path: '/study/',
                collapsable: false, // 不折叠
                children: [
                ],
            },
            {
                title: "工作",
                path: '/job/',
                collapsable: false, // 不折叠
                children: [
                ],
            },
            {
                title: "生活",
                path: '/life/',
                collapsable: false, // 不折叠
                children: [
                ],
            },
            {
                title: "其他",
                path: '/other/',
                collapsable: false, // 不折叠
                children: [
                ],
            },
        ]
    }
}