module.exports = {
    proxyList: {
        '/api':{
            target: 'http://192.168.3.3:7001',//测试环境
            changeOrigin:true,
            pathRewrite:{
                '^/api':'/api'
            }
        },
    }
}