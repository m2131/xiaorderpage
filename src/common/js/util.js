export default {

    install(Vue,options)
    {
            // 全局变量
        Vue.prototype.GData= {
            shopeeSite:{
                'tw':'台湾',
                'ph':'菲律宾',
                'my':'马来西亚',
                'th':'泰国',
                'sg':'新加坡',
                'id':'印度尼西亚',
            },
            typeName:{
                "01":"名称1",
                "02":"名称2"
            },
        },
            // 校验工具
        Vue.prototype.VTools={
            /**
             *手机号检验
             */
            checkInit: function (rule, value, callback) {
                var ruleText = /^[1-9]\d*$|^[0]$/,
                    massageText=(rule.messageText?rule.messageText:'整数');
                value=value?value.trim():value;
                if (value === '') {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
            /**
             *手机号检验
             */
            checkRate: function (rule, value, callback) {
                var ruleText = /^[1-9]\d*^|$[0]$/,
                    massageText=(rule.messageText?rule.messageText:'整数');
                value=value?value.trim():value;
                if (value === '') {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
            /**
             *手机号检验
             */
            checkMobile: function (rule, value, callback) {
                var ruleText = /^1[3|4|5|7|8]\d{9}$/,
                    massageText=(rule.messageText?rule.messageText:'手机号');
                if (value === '' || value==undefined) {
                    rule.beNull?callback():callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误'));
                } else {
                    callback();
                }
            },
            /**
             *登录密码检验
             */
            checkPassword: function (rule, value, callback) {
                var ruleText = /^[a-zA-Z\d]{6,16}$/,
                    massageText=(rule.messageText?rule.messageText:'密码');
                value=value?value.trim():value;
                if (value === '') {
                    callback(new Error('请输入'+massageText));
                } else if (!ruleText.test(value)) {
                    callback(new Error(massageText+'格式错误:6-16位大小写字母、数字'));
                } else {
                    callback();
                }

                !/^[a-zA-Z\d]*$/.test(value)

            }

        },
            // 全局工具
        Vue.prototype.GTools= {
            /*动态加载的图片引入*/
            imagesUri:(url,type)=>{
                return require('../../assets/images/'+url);
            },
            /**
             * 格式化价格-》万元
             * @param {int} price
             * */
            priceFormat:function(price){
                if(!price) return;
                var priceStr=price.toString();
                if(priceStr.lastIndexOf(".")!=-1){
                    priceStr=priceStr.substr(0,priceStr.lastIndexOf("."));
                }
                var priceF;
                if(priceStr.length>4){
                    priceF=priceStr.substring(0,(priceStr.length-4));
                    priceF+=(priceStr.slice(-4,-3)!=='0')?"."+priceStr.slice(-4,-3):'';
                    priceF+="万";
                }else{
                    priceF=priceStr+"元";
                }
                return priceF;
            },
            /**
             * 格式化价格-》万元
             * @param {int} price
             * */
            formatDate (row, column){
                // 获取单元格数据
                let data = row[column.property]
                if (!data) {
                    return ''
                }
                let dt = new Date(data)
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
            }
        };
    }
};
