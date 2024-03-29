import htmlPlugin from 'vite-plugin-html'

export default function createHtml(env, isBuild) {
    const { VITE_APP_TITLE, VITE_APP_DEBUG_TOOL } = env
    const html = htmlPlugin({
        inject: {
            injectData: {
                title: VITE_APP_TITLE,
                debugTool: VITE_APP_DEBUG_TOOL
            }
        },
        minify: isBuild
    })
    return html
}
