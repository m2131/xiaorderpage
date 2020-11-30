import axios from 'axios';
import store from '../vuex/store';
import { globalConfig } from '../globalConf'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

window.wRequestId = function () {
    var d = new Date().getTime();
    var requestId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return requestId;
};

axios.interceptors.request.use(function (config) {
    // 发送请求之前做一些处理
    NProgress.start();//顶部加载栏
    if (store.getters.getToken || sessionStorage.getItem('token')) {
        config.headers.common['accToken'] = store.getters.getToken?store.getters.getToken:sessionStorage.getItem('token');
    }
    if(config.params && config.params.version){
        config.headers.common['version']=config.params.version;
    }
    config.headers.common['requestId']=wRequestId();
    if(store.getters.getMediaSource){
        config.headers.common['mediaSource']=store.getters.getMediaSource;
    }
    if(config.data && config.data.tid){
        config.headers.common['tid']=config.data.tid;
    }

    return config;
}, function (error) {
    // 当请求异常时做一些处理
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 返回响应时做一些处理
    NProgress.done();
    if(response.data.errorCode){
        response.data.returnCode=response.data.errorCode;
        response.data.returnMsg=response.data.msg;
    }
    return response;
}, function (err) {
    // 当响应异常时做一些处理
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: err.message = '未授权，请重新登录(401)'; break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    }else{
        err.message = '连接服务器失败!'
    }
    return Promise.reject(err);
});
let serverUrl='';
if(/.com/.test(location.origin)){
    serverUrl = location.origin + '/';
}
let api = {
    post:function (url) {
        return params => {
            return axios({
                method: "post",
                url: serverUrl + url,
                data: params
            }).then(res => res.data);
        }
    },
    get: function (url) {
        return params => {
            let targetUrl= serverUrl + url;
            let urlParams = "";
            for (const key in params){
                urlParams && (urlParams += '&'+key+'='+params[key]);
                !urlParams && (urlParams += '?'+key+'='+params[key]);
            }
            urlParams && (targetUrl +=urlParams);
            return axios({
                method: "get",
                url: targetUrl
            }).then(res => res.data);
        }
    }
};

export default api;


