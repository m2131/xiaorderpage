module.exports = {
    proxyList: {
        '/api':{
            target: 'http://localhost:8080',//测试环境
            changeOrigin:true,
            pathRewrite:{
                '^/api':'/api'
            }
        },
    }
}