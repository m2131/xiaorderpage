module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.3.30:8033',   //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'    //代理的路径
                }
            }
        }
    }
}