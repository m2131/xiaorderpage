<template>
  <section style="background: #fff;padding: 20px;">
    <el-row>
      <el-col>
        <el-radio-group v-model="shopID" size="mini" @change="changeShop">
          <el-radio-button v-for="(item,key) in shop" :label="item.shopID" v-if="key<=10">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="shopID" size="mini" style="margin:5px 0;" @change="changeShop">
          <el-radio-button v-for="(item,key) in shop" :label="item.shopID" v-if="key>10 && key<=20">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="shopID" size="mini" @change="changeShop">
          <el-radio-button v-for="(item,key) in shop" :label="item.shopID" v-if="key>20 && key<=30">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col style="margin-top: 20px;">
        <el-table :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                  style="width: 100%;">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="buyShopID" label="上家店铺" min-width="100">
            <template scope="scope"><a v-if="scope.row.buyShopID" style="text-decoration: none;color: #3c6ccc" :href="scope.row.buyShopID" target="_blank">点击前往</a></template>
          </el-table-column>
          <el-table-column prop="buyAccount" label="购买账号" min-width="100">
            <template scope="scope">{{options.buyAccountObj[scope.row.buyAccount]}}</template>
          </el-table-column>
          <el-table-column prop="buyPayAccount" label="支付账号" min-width="100">
            <template scope="scope">{{options.buyPayAccountObj[scope.row.buyPayAccount]}}</template>
          </el-table-column>
          <el-table-column prop="buyPrice" label="购买费用" min-width="100">
            <template scope="scope">{{scope.row.buyPrice?'￥'+scope.row.buyPrice:''}}</template>
          </el-table-column>
          <el-table-column prop="buyTime" label="采购时间" min-width="130":formatter="GTools.formatDate"></el-table-column>
          <el-table-column prop="OrderID" label="单号" min-width="130"></el-table-column>
          <el-table-column prop="OrderStatus" label="状态" min-width="70"></el-table-column>
          <el-table-column prop="OrderCreationDate" label="订单成立时间" min-width="120"></el-table-column>
          <el-table-column prop="DeliveryMethod" label="虾皮快递" min-width="100"></el-table-column>
          <el-table-column prop="buySendCompany" label="物流公司" min-width="100"></el-table-column>
          <el-table-column prop="buySendType" label="寄送方式" min-width="130">
            <template scope="scope">{{options.buySendTypeObj[scope.row.buySendType]}}</template>
          </el-table-column>
          <el-table-column prop="buySendOrderNo" label="上家物流单号" min-width="130"></el-table-column>
          <el-table-column prop="NoOfProductInOrder" label="數量" min-width="50"></el-table-column>
          <el-table-column prop="SKUReferenceNo" label="商品款式" min-width="350"></el-table-column>
          <el-table-column prop="updateDate" label="更新时间" min-width="130" :formatter="GTools.formatDate"></el-table-column>
          <el-table-column label="操作" min-width="80" fixed="right">
            <template scope="scope">
              <el-button size="mini" type="danger" @click="weOpen(scope.row)">采购</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24"
              class="toolbar toolBarPagination">
        <el-pagination layout="total, prev, pager, next, jumper"
                       background
                       @current-change="(value) => wbCurrentChange(value)"
                       :page-size="wbPageSize"
                       :current-page="wbPageNo"
                       :total="wbTotal"
                       style="float:right;margin-top: 10px;">
        </el-pagination>
      </el-col>
    </el-row>



    <el-dialog :visible.sync="weShow" :close-on-click-modal="true" top="3%" width="500px" title="采购信息"
               append-to-body>
      <el-row>
        <el-col>
          <el-form :model="weForm" ref="weForm" :rules="weFormRules" :label-position="'right'" label-width="120px" size="mini" style="margin-left: 40px">
            <el-form-item label="上家店铺ID：" prop="buyShopID">
              <el-input v-model.trim="weForm.buyShopID" placeholder="请输入上家店铺ID" class="widthInput"></el-input>
            </el-form-item>
            <el-form-item label="购买账号：" prop="buyAccount">
              <el-select filterable v-model="weForm.buyAccount" placeholder="请选择购买账号">
                <el-option v-for="item in options.buyAccount" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付账号：" prop="buyPayAccount">
              <el-select filterable v-model="weForm.buyPayAccount" placeholder="请选择支付账号">
                <el-option v-for="item in options.buyPayAccount" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="打包方式：" prop="buySendType">
              <el-select filterable v-model="weForm.buySendType" placeholder="请选择打包方式">
                <el-option v-for="item in options.buySendType" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买入价格：" prop="buyPrice">
              <el-input v-model.trim="weForm.buyPrice" placeholder="请输入买入价格" class="widthInput"></el-input>
            </el-form-item>
            <el-form-item label="上家配送物流：" prop="buySendCompany">
              <el-select filterable v-model="weForm.buySendCompany" placeholder="请选择上家配送物流">
                <el-option v-for="item in options.buySendCompany" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上家物流单号：" prop="buySendOrderNo">
              <el-input v-model.trim="weForm.buySendOrderNo" placeholder="请输入上家物流单号" class="widthInput"></el-input>
            </el-form-item>
            <el-form-item label="上家物流状态：" prop="buySendState">
              <el-select filterable v-model="weForm.buySendState" placeholder="请选择上家物流状态">
                <el-option v-for="item in options.buySendState" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
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
      shop:[],
      shopObj:{},
      shopID:'xj_zwf',
      shopSite:'tw',
      wbSearch:{
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
      wbPageSize:10,
      wbPageNo:1,
      options: {
        shop:[
          {value: 'xj_zwf', label: 'xj_zwf'},
          {value: 'xj_lw.my', label: 'xj_lw.my'},
          {value: 'xj_lw.ph', label: 'xj_lw.ph'},
        ],
        buyAccountObj:{
          "pdd_15013991128":"拼多多1128",
          "pdd_15814495319":"拼多多5319",
          "weiew@weiew.net":"淘宝weiew",
        },
        buyAccount:[
          {value: 'pdd_15013991128', label: '拼多多1128'},
          {value: 'pdd_15814495319', label: '拼多多5319'},
          {value: 'weiew@weiew.net', label: '淘宝weiew'},
        ],
        buyPayAccountObj:{
          "weiew@weiew.net":"支付宝weiew"
        },
        buyPayAccount:[
          {value: 'weiew@weiew.net', label: '支付宝weiew'}
        ],
        buySendCompany:[
          {value: 'yuantong', label: '圆通'},
          {value: 'shentong', label: '申通'},
          {value: 'yunda', label: '韵达'},
          {value: 'zhongtong', label: '中通'},
          {value: 'shunfeng', label: '顺丰'},
          {value: 'tiantian', label: '天天'},
          {value: 'huitongkuaidi', label: '百世'},
          {value: 'quanfengkuaidi', label: '全峰'},
          {value: 'youshuwuliu', label: '优速'},
          {value: 'suer', label: '速尔'},
          {value: 'debangwuliu', label: '德邦'},
          {value: 'tiandihuayu', label: '华宇'},
          {value: 'longbanwuliu', label: '龙邦'},
          {value: 'zhongyouwuliu', label: '中邮'},
          {value: 'chuanxiwuliu', label: '传喜'},
          {value: 'ztky', label: '中铁'},
          {value: 'ems', label: 'EMS'},
          {value: 'zhaijisong', label: '宅急送'},
          {value: 'youzhengguonei', label: '邮政包裹'},
          {value: 'youzhengguoji', label: '邮政国际'}
        ],
        buySendTypeObj: {
          xpPack:"虾皮打包",
          ppxPack:"皮皮虾打包",
        },
        buySendType:[
          {value: 'xpPack', label: '虾皮打包'},
          {value: 'ppxPack', label: '皮皮虾打包'},
          {value: 'wjPack', label: '伟佳打包'},
        ],
        buySendState:[
          {value: '1', label: '已下单'},
          {value: '2', label: '待揽收'},
          {value: '3', label: '运送中'},
          {value: '4', label: '待派送'},
          {value: '5', label: '已收货'},
        ],
      },
      activeRow: {},
      weShow:false,
      weForm:{
        buyShopID: "",
        buyAccount : "",
        buyPayAccount: "",
        buyPrice: "",
        buySendType: "",
        buySendCompany: "",
        buySendOrderNo: "",
        buySendState: "",
      },
      weFormRules: {
        buyShopID: [{required: true, message: '请输入上家ID', trigger: 'blur'}],
        buyAccount: [{required: true, message: '请选择购买账号', trigger: 'blur'}],
        buyPayAccount: [{required: true, message: '请选择支付账号', trigger: 'blur'}],
        buySendType: [{required: true, message: '请选择打包方式', trigger: 'blur'}],
        buyPrice: [{required: true, message: '请输入买入价格', trigger: 'blur'}],
      },
      loading:true,
      iframeUrl:""
    }
  },
  methods: {
    changeShop(row){
      this.shopSite = this.shopObj[row].shopSite;
      this.wbQuery();
    },
    wbQuery(){
      let that = this;
      let postData = {
        ...this.wbSearch,
        shopID: this.shopID,
        shopSite: this.shopSite,
        pageNo: this.wbPageNo,
        pageSize: this.wbPageSize,
      }
      api.post('/api/orderList')(postData).then((result) => {
        if(result.status == "200"){
          that.wbList = result.data.docs;
          that.wbPageSize = result.data.pageInfo.pageSize;
          that.wbPageNo = result.data.pageInfo.current;
          that.wbTotal = result.data.pageInfo.totalItems;
        }else{
          that.wbList = [];
          that.wbTotal = 0;
          that.wbPageNo = 1;
        }
      })
    },
    wbSelect(){
      this.wbPageNo = 1;
      this.wbQuery();
    },
    wbReset(){
      this.wbPageNo = 1;
      this.wbSearch.status = '';
      this.wbSearch.buyId = '';
      this.wbSearch.timeType = '';
      this.wbSearch.time = '';
      this.wbSearch.startTime = '';
      this.wbSearch.endTime = '';
      this.wbSearch.userName = '';
    },
    wbCurrentChange(val){
      this.wbPageNo = val;
      this.wbQuery();
    },
    weOpen(row){
      this.activeRow = row;
      this.weShow = true;
      this.weForm = {
        buyShopID:row.buyShopID,
        buyAccount : row.buyAccount? row.buyAccount:"pdd_15013991128",
        buyPayAccount: row.buyPayAccount? row.buyPayAccount:"weiew@weiew.net",
        buyPrice: row.buyPrice,
        buySendCompany: row.buySendCompany,
        buySendOrderNo: row.buySendOrderNo,
        buySendType: row.buySendType? row.buySendType:"xpPack",
        buySendState: row.buySendState,
      }
    },
    weSubmit(){
      let that = this;
      let postData = {
        ...this.weForm,
        shopSite: this.shopSite,
        shopID: this.shopID,
        _id: this.activeRow._id
      }
      if(!this.activeRow.buyShopID){
        postData.buyTime = "new";
      }
      this.$refs.weForm.validate((valid) => {
        if (valid) {
          api.post("api/orderPurchase")(postData).then((data) => {
            if(data.status == "200"){
              that.$message({
                message: '保存成功',
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
    queryShop(){
      api.post('/api/shopList')({pageSize: 50}).then((result) => {
        this.shop = result.data.docs;
        this.options.shop = [];
        result.data.docs.forEach((item,index)=>{
          this.options.shop.push({label:item.shopID,name:item.shopName,value:item.shopID,site:this.GData.shopeeSite[item.shopSite]});
          this.shopObj[item.shopID] = {shopSite:item.shopSite,shopName:item.shopName};
        })
        this.wbQuery();
      })
    },
  },
  mounted() {
    this.queryShop();
  }
}



</script>

<style scoped>
.widthInput{
  width: 193px;
}
</style>