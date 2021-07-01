let globalSettings = {
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    openPermission: false,
    /**
     * 布局类型，当设置为非 adaption 时，请去 ./src/assets/styles/resources/layout.scss 里设置 $g-app-width
     * adaption 自适应
     * adaption-min-width 自适应（有最小宽度）
     * center 定宽居中
     * center-max-width 定宽居中（有最大宽度）
     */
    layout: 'adaption',
    /**
     * 主题，默认提供 5 款
     * default 默认
     * vue-cli Vue CLI 风格
     * gitee 码云风格
     * freshness 清新
     * elegant 素雅
     */
    theme: 'default',
    // Element 组件默认尺寸，支持：large、medium、small、mini
    elementSize: 'large',
    // 是否显示头部
    showHeader: false,
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 切换侧边栏同时跳转页面
    switchSidebarAndPageJump: false,
    // 是否开启标签栏
    enableTabbar: false,
    // 顶部导航栏（包含标签栏）是否固定
    topbarFixed: true,
    // 是否开启面包屑导航
    enableBreadcrumb: true,
    // 是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    showCopyright: true,
    // 版权信息配置，格式为：Copyright © [dates] <company>
    copyrightDates: '2020',
    copyrightCompany: 'Fantastic-admin',
    copyrightWebsite: 'https://hooray.gitee.io/fantastic-admin',
    // 是否开启导航搜索
    enableNavSearch: true,
    // 是否开启通知中心
    enableNotification: false,
    // 是否开启国际化
    enableI18n: false,
    // 默认语言，留空则跟随系统
    defaultLang: '',
    // 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
    enableMobileAdaptation: true,
    // 是否开启全屏
    enableFullscreen: false,
    // 是否开启页面刷新
    enablePageReload: false,
    // 是否开启载入进度条
    enableProgress: true,
    // 是否开启动态标题
    enableDynamicTitle: false,
    // 是否开启控制台
    enableDashboard: true,
    // 控制台名称
    dashboardTitle: '控制台',
    // localStorage sessionStorage 前缀
    storagePrefix: 'fa_',
    // 是否开启扁平化路由，开启后三级以及三级以上的嵌套路由均为被处理成二级，但侧边栏导航的层级效果不变
    enableFlatRoutes: false,
    // 是否在非开发环境开启错误日志功能，具体业务代码在 ./util/error.log.js
    enableErrorLog: false,
    // 是否开启主题配置（建议在生产环境关闭）
    enableThemeSetting: true
}

// 演示&开发环境开启全部功能（这部分代码可删除，仅方便作者打包演示环境）
if (process.env.VUE_APP_TYPE == 'example' || process.env.NODE_ENV == 'development') {
    globalSettings.openPermission = true
    globalSettings.enableNotification = true
    globalSettings.enableSidebarCollapse = true
    globalSettings.enableTabbar = true
    globalSettings.enableI18n = true
    globalSettings.enableFullscreen = true
    globalSettings.enablePageReload = true
    globalSettings.enableDynamicTitle = true
    globalSettings.enableErrorLog = true
}

export default globalSettings
