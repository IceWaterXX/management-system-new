const authoritylist = [
    {
        title:'平台权限',
        key:'all',
        children: [
            {
                title: ' 首页', // 菜单标题名称
                key: '/home', // 对应的 path
            },
            {
                title: ' 商品',
                key: '/products',
                children: [ // 子菜单列表
                    {
                        title: ' 品类管理',
                        key: '/category',
                    },
                    {
                        title: ' 商品管理',
                        key: '/product',
                    },
                ]
            },
            {
                title: ' 用户管理',
                key: '/user',
            },
            {
                title: ' 角色管理',
                key: '/role',
            },
            {
                title: ' 图形图表',
                key: '/charts',
                children: [
                    {
                        title: ' 柱形图',
                        key: '/charts/bar',
                    },
                    {
                        title: ' 折线图',
                        key: '/charts/line',
                    },
                    {
                        title: ' 饼图',
                        key: '/charts/pie',
                    },
                ]
            },
        ]
    }
]
export default authoritylist