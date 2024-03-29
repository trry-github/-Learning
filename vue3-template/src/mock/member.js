export default [
    {
        url: '/mock/member/login',
        method: 'post',
        response: option => {
            return {
                message: '成功',
                code: 0,
                data: {
                    account: option.body.account,
                    token: '@string',
                    failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60
                }
            }
        }
    },
    {
        url: '/mock/member/permission',
        method: 'get',
        response: option => {
            let permissions = []
            if (option.query.account == 'admin') {
                permissions = [
                    'permission.browse',
                    'permission.create',
                    'permission.edit',
                    'permission.remove'
                ]
            } else if (option.query.account == 'test') {
                permissions = [
                    'permission.browse'
                ]
            }
            return {
                message: '成功',
                code: 0,
                data: {
                    permissions
                }
            }
        }
    }
]
