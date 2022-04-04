module.exports = {
    title: '小赵的Blog',
    description: '小赵的Blog 赵登辉',
    base: '/Blog/',
    theme: 'reco',
    dest: '/blog/docs',
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
                ]
            }
        ],
        sidebar: [
            {
                title: '胡诌诌',
                path: '/',
                collapsable: true,
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
                title: "学习",
                path: '/study/',
                collapsable: true,
                children: [
                    { title: "js", path: "/study/", },
                    { title: "canvas", path: "/study/canvas", }
                ],
            },
            {
                title: "工作",
                path: '/job/',
                collapsable: true,
                children: [
                    { title: "入职了", path: "/job/", },
                    { title: "test", path: "/job/test", },
                    { title: "ci/cd", path: "/job/ci", }
                ],
            },
            {
                title: "生活",
                path: '/life/',
                collapsable: true,
                children: [
                    { title: "生活开始了", path: "/life/", },
                ],
            },
            {
                title: "力扣",
                path: '/leetcode/',
                collapsable: true,
                children: [
                    { title: "力扣", path: "/leetcode/", },
                    { title: "448.找到所有数组中消失的数字", path: "/leetcode/448.找到所有数组中消失的数字", },
                ],
            },
            {
                title: "其他",
                path: '/other/',
                collapsable: true,
                children: [
                    { title: "其他", path: "/other/", },
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