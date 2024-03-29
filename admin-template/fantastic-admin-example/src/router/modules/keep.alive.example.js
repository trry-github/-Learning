const Layout = () => import('@/layout/index.vue')

export default {
    path: '/keep_alive_example',
    component: Layout,
    redirect: '/keep_alive_example/page',
    name: 'keepAliveExample',
    meta: {
        title: '页面缓存',
        icon: 'sidebar-keep-alive'
    },
    children: [
        {
            path: 'page',
            name: 'keepAliveExamplePage',
            component: () => import('@/views/keep_alive_example/page.vue'),
            meta: {
                title: '二级路由缓存'
            }
        },
        {
            path: 'detail',
            name: 'keepAliveExampleDetail',
            component: () => import('@/views/keep_alive_example/detail.vue'),
            meta: {
                title: '同级路由',
                sidebar: false,
                activeMenu: '/keep_alive_example/page'
            }
        },
        {
            path: 'detail2',
            redirect: '/keep_alive_example/detail2',
            meta: {
                title: '下级路由',
                sidebar: false
            },
            children: [
                {
                    path: '',
                    name: 'keepAliveExampleDetail2',
                    component: () => import('@/views/keep_alive_example/detail.vue'),
                    meta: {
                        title: '下级路由',
                        activeMenu: '/keep_alive_example/page'
                    }
                },
                {
                    path: 'detail3',
                    redirect: '/keep_alive_example/detail2/detail3',
                    meta: {
                        title: '下下级路由',
                        sidebar: false
                    },
                    children: [
                        {
                            path: '',
                            name: 'keepAliveExampleDetail3',
                            component: () => import('@/views/keep_alive_example/detail.vue'),
                            meta: {
                                title: '下下级路由',
                                activeMenu: '/keep_alive_example/page'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: 'nested',
            name: 'keepAliveExampleNested1',
            component: () => import('@/views/keep_alive_example/nested/nested.vue'),
            meta: {
                title: '路由多级缓存(1)'
            },
            children: [
                {
                    path: 'nested',
                    name: 'keepAliveExampleNested2',
                    component: () => import('@/views/keep_alive_example/nested/nested/nested.vue'),
                    meta: {
                        title: '路由多级缓存(1-1)'
                    },
                    children: [
                        {
                            path: 'test',
                            name: 'keepAliveExampleNestedTest',
                            component: () => import('@/views/keep_alive_example/nested/nested/nested/index.vue'),
                            meta: {
                                title: '测试页面(1-1-1)',
                                cache: true
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
