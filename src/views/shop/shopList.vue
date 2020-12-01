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
                <el-button size="mini" type="danger" @click="weOpen()">新增店铺</el-button>
            </el-col>
            <el-col>
                <el-table :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                          style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="shopID" label="店铺ID" min-width="70"></el-table-column>
                    <el-table-column prop="shopName" label="店铺名称" min-width="130"></el-table-column>
                    <el-table-column prop="shopSite" label="店铺站点" min-width="70">
                      <template scope="scope">
                        {{GData.shopeeSite[scope.row.shopSite]}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="updateDate" label="更新时间" min-width="180"></el-table-column>
                    <el-table-column label="操作" min-width="150">
                        <template scope="scope">
                            <el-button size="mini" type="danger" @click="weOpen(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="weDelete(scope.row)">删除</el-button>
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



        <el-dialog :visible.sync="weShow" :close-on-click-modal="true" top="3%" width="500px" :title="weEdit?'修改店铺':'新增店铺'"
                   append-to-body>
            <el-row>
                <el-col>
                    <el-form :model="weForm" ref="weForm" :rules="weFormRules" :inline="true" size="mini" :label-position="'right'" label-width="130px">
                        <el-form-item label="店铺站点：" prop="shopSite">
                            <el-select filterable
                                       class="widthInput"
                                       v-model="weForm.shopSite"
                                       placeholder="请选择店铺站点">
                                <el-option
                                        v-for="item in options.shopSite"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="店铺账号：" prop="shopID">
                          <el-input v-model.trim="weForm.shopID" placeholder="请输入店铺账号"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺名称：" prop="shopName">
                          <el-input v-model.trim="weForm.shopName" placeholder="请输入店铺名称"></el-input>
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
                    shopSite:[
                        {value: 'tw', label: '台湾'},
                        {value: 'ph', label: '菲律宾'},
                        {value: 'my', label: '马来西亚'},
                        {value: 'th', label: '泰国'},
                        {value: 'sg', label: '新加坡'},
                        {value: 'id', label: '印度尼西亚'},
                    ],
                    status:[
                        {value: '', label: '全部'},
                        {value: '0', label: '未上架'},
                        {value: '1', label: '已上架'},
                    ],
                },
                weShow:false,
                weEdit:false,
                weForm:{
                    shopSite:'',
                    shopID:'',
                    shopName:'',
                },
                weFormRules: {
                  shopID: [{required: true, message: '请输入店铺账号', trigger: 'blur'}],
                  shopSite: [{required: true, message: '请选择店铺站点', trigger: 'blur'}],
                  shopName: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],
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
                api.get('/api/shopList')(postData).then((result) => {
                    if(result.status == "200"){
                        that.wbList = result.data;
                        that.wbTotal = result.rowCount;
                        that.wbPage = result.pageNo;
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
            weOpen(row){
                if(row){
                  this.weForm = row;
                  this.weEdit = true;
                }else{
                  this.weForm = {
                    shopSite:'',
                    shopID:'',
                    shopName:'',
                  }
                  this.weEdit = false;
                }
                this.weShow = true;
            },
            weSubmit(){
              let that = this;
              let postData = {
                ...this.weForm
              }
              let url = "api/shopCreate";
              postData._id && (url = "api/shopUpdate");
              this.$refs.weForm.validate((valid) => {
                if (valid) {
                  api.post(url)(postData).then((data) => {
                    if(data.status == "200"){
                      that.$message({
                        message: postData._id?'修改成功':'新增成功！',
                        type: 'success'
                      });
                      that.wbQuery();
                      that.weShow = false;
                    }else{
                      that.$message({
                        message: data.msg?data.msg:'操作失败！',
                        type: 'success'
                      });
                    }
                  })
                }
              })
            },
            weDelete(row) {
              let that = this;
              this.$confirm('确定删除该店铺?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                api.post("api/shopRemoves")({id: row._id}).then((data) => {
                  if (data.status == "200") {
                    that.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    that.wbQuery();
                  } else {
                    that.$message({
                      message: data.msg ? data.msg : '操作失败！',
                      type: 'success'
                    });
                  }
                })
              })
            }
        },
        mounted() {
            this.wbQuery();
        }
    }



</script>

<style scoped>
</style>