module.exports = {
    title: '小赵的Blog',
    description: '小赵的Blog 赵登辉',
    base: '/Blog/docs/',
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN'
        }
    },
    themeConfig: {
        lastUpdated: '上次更新',
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
                    // {
                    //     title: "canvas",
                    //     path: '/study/canvas',
                    // }
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
    },
    head: [
        [
            'script', {}, `
          var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?360b302beeadc2d9027f1f3a152d9ed1";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
            </script>
          `
        ]
    ]
}