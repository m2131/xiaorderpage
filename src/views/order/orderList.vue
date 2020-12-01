<template>
    <section style="background: #fff;padding: 20px;">
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"
                         size="small"
                         :model="wbSearch"
                         :label-position="'left'"
                         type="flex"
                         justify="space-around">
                    <el-form-item>
                        <el-select filterable
                                   class="widthInput"
                                   v-model="wbSearch.status"
                                   placeholder="请选择状态">
                            <el-option
                                    v-for="item in options.status"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="wbSearch.userName" placeholder="请输入商户名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="wbSearch.goodName" placeholder="请输入商品名称"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary"
                                   v-on:click="wbSelect"
                                   icon="el-icon-search">
                        </el-button>
                        <el-button type="default"
                                   @click="wbReset"
                                   icon="el-icon-refresh">
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col style="margin-bottom: 10px">
                <el-button size="mini" type="danger" @click="weOpen()">导入订单</el-button>
            </el-col>
            <el-col>
                <el-table :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                          style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="goodId" label="商品ID" min-width="70"></el-table-column>
                    <el-table-column prop="userName" label="商户名称" min-width="70"></el-table-column>
                    <el-table-column prop="goodName" label="商品名称" min-width="70"></el-table-column>
                    <el-table-column prop="goodAmount" label="商品金额" min-width="70"></el-table-column>
                    <el-table-column prop="productName" label="商品分类" min-width="70"></el-table-column>
                    <el-table-column prop="publishTime" label="上架时间" min-width="120"></el-table-column>
                    <el-table-column prop="status" label="上架状态" min-width="70">
                        <template scope="scope">
                            {{scope.row.status=='0'?'未上架':'已上架'}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="consumeCount" label="消费次数" min-width="70"></el-table-column>-->
                    <el-table-column prop="titlePicture" label="标题图" min-width="100">
                        <template scope="scope">
                            <img  style="height: 60px;" :src="scope.row.titlePicture">
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="longitude" label="经度" min-width="80"></el-table-column>-->
                    <!--<el-table-column prop="latitude" label="纬度" min-width="80"></el-table-column>-->
                    <el-table-column prop="remark" label="服务说明" min-width="120">
                        <template scope="scope">
                            <div v-for="item in scope.row.bodyList" v-if="item.title =='服务说明'" class="listContent">
                                <p v-for="(itemA,indexA) in item.contexts">
                                    {{itemA.title}}:{{itemA.context}}
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="购买须知" min-width="120">
                        <template scope="scope">
                            <div v-for="item in scope.row.bodyList" v-if="item.title =='购买须知'" class="listContent">
                                <p v-for="(itemA,indexA) in item.contexts">
                                    {{itemA.title}}:{{itemA.context}}
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="150">
                        <template scope="scope">
                            <el-button size="mini" type="danger" @click="wcOpen(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="wbDelete(scope.row)">删除</el-button>
                            <el-button size="mini" v-if="scope.row.status == '0'" type="danger" @click="wbUpperLower(scope.row,'upper')">上架</el-button>
                            <el-button size="mini" v-if="scope.row.status == '1'" type="danger" @click="wbUpperLower(scope.row)">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24"
                    class="toolbar toolBarPagination">
                <el-pagination layout="total, prev, pager, next, jumper"
                               background
                               @current-change="(value) => wbCurrentChange(value)"
                               :page-size="10"
                               :current-page="wbPage"
                               :total="wbTotal"
                               style="float:right;margin-top: 10px;">
                </el-pagination>
            </el-col>
        </el-row>



        <el-dialog :visible.sync="weShow" :close-on-click-modal="true" top="3%" width="500px" title="导入订单"
                   append-to-body>
            <el-row>
                <el-col>
                    <el-form :model="weForm" :inline="true" size="mini" :label-position="'right'" label-width="130px">
                        <el-form-item label="归属店铺：">
                            <el-select filterable
                                       class="widthInput"
                                       v-model="weForm.shop"
                                       placeholder="请选择状态">
                                <el-option
                                        v-for="item in options.shop"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单xls：">
                            <el-upload  class="upload-file"
                                        name="xlsFile"
                                        :data="weForm"
                                        v-model="weForm.file"
                                        :auto-upload="false"
                                        ref="orderUpload"
                                        action="/api/uploadOrder">
                                <el-button size="small" type="primary">导入订单</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="24" style="text-align: center;margin-top: 30px;">
                    <el-button type="primary" size="large" @click="weSubmit()">保存</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </section>
</template>

<script>
    import api from "../../api/api"
    export default {
        data() {
            return {
                wbSearch:{
                    status:'',
                    buyId:'',
                    timeType:'',
                    time:'',
                    startTime:'',
                    endTime:'',
                    userName:'',
                    productId:'',
                    goodName:'',
                },
                wbList:[],
                wbShow:false,
                wblistLoading:false,
                wbTotal:1,
                wbPageNum:10,
                wbPage:1,
                options: {
                    shop:[
                        {value: 'xj_zwf', label: 'xj_zwf'},
                        {value: 'xj_lw.my', label: 'xj_lw.my'},
                        {value: 'xj_lw.ph', label: 'xj_lw.ph'},
                    ],
                    timeType:[
                        {value: 'GMT_CREATE', label: '创建日期'},
                        {value: 'GMT_UPDATE', label: '更新日期'},
                        {value: 'GMT_SUBMIT', label: '发起支付日期'},
                    ],
                    status:[
                        {value: '', label: '全部'},
                        {value: '0', label: '未上架'},
                        {value: '1', label: '已上架'},
                    ],
                    legalCertType:[
                        {value: '01', label: '居民身份证'},
                        {value: '04', label: '军官证'},
                        {value: '07', label: '护照'},
                        {value: '71', label: '组织机构代码证'},
                        {value: '72', label: '税务登记证'},
                        {value: '73', label: '营业执照'},
                        {value: '06', label: '军官离退休证'},
                        {value: '12', label: '社保证'},
                        {value: '13', label: '团体其他'},
                        {value: '14', label: '个人其他'},
                        {value: '15', label: '企业代码'},
                        {value: '16', label: '法人证书'},
                        {value: '17', label: '台胞证'},
                    ],
                },
                weShow:false,
                weForm:{
                    file:'',
                    shop:'',
                },
                loading:true,
                iframeUrl:""
            }
        },
        methods: {
            wbQuery(){
                let that = this;
                let postData = {
                    ...this.wbSearch,
                    pageNo: this.wbPage,
                    pageSize: 10,
                }
                if(postData.time){
                    postData.startTime = postData.time[0];
                    postData.endTime = postData.time[1];
                    delete postData.time;
                }
                for(let key in postData){
                    if(!postData[key]){
                        delete postData[key]
                    }
                }
                api.post('/api/product/000001')(postData).then((result) => {
                    let data = result.dataBody;
                    if(data && data.datas){
                        that.wbList = data.datas;
                        that.wbTotal = data.rowCount;
                        that.wbPage = data.pageNo;
                    }else{
                        that.wbList = [];
                        that.wbTotal = 0;
                        that.wbPage = 1;
                    }
                })
            },
            wbSelect(){
                this.wbPage = 1;
                this.wbQuery();
            },
            wbReset(){
                this.wbPage = 1;
                this.wbSearch.status = '';
                this.wbSearch.buyId = '';
                this.wbSearch.timeType = '';
                this.wbSearch.time = '';
                this.wbSearch.startTime = '';
                this.wbSearch.endTime = '';
                this.wbSearch.userName = '';
            },
            wbCurrentChange(val){
                this.wbPage = val;
                this.wbQuery();
            },
            weOpen(){
                this.weShow = true;
            },
            weSubmit(){
                this.$refs.orderUpload.submit();
            }
        },
        mounted() {
            this.wbQuery();
        }
    }



</script>

<style scoped>
</style>