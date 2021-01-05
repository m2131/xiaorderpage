<template>
    <section style="background: #fff;padding: 20px;">
        <el-row>
            <el-col>
              <el-radio-group v-model="shopID" size="mini" @change="changeShop">
                <el-radio-button v-for="(item,key) in shop" :key="item.shopID" :label="item.shopID" v-if="key<=10">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="shopID" size="mini" style="margin:5px 0;" @change="changeShop">
                <el-radio-button v-for="(item,key) in shop" :key="item.shopID" :label="item.shopID" v-if="key>10 && key<=20">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
              </el-radio-group>
              <el-radio-group v-model="shopID" size="mini" @change="changeShop">
                <el-radio-button v-for="(item,key) in shop" :key="item.shopID" :label="item.shopID" v-if="key>20 && key<=30">{{item.shopID}} [{{item.shopSite}}]</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="24" style="margin-top: 10px">
                <el-form :inline="true"
                         size="mini"
                         :model="wbSearch"
                         :label-position="'left'"
                         type="flex"
                         justify="space-around">
                    <el-form-item label="订单日期">
                        <el-date-picker
                                v-model="wbSearch.orderDate"
                                type="daterange"
                                range-separator="至"
                                :unlink-panels="true"
                                start-placeholder="请选择开始日期"
                                end-placeholder="请选择结束日期"
                                placeholder="请选择日期"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
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
            <el-col style="margin: 10px 0;">
                <el-button size="mini" type="danger" @click="weOpen('order')">导入订单</el-button>
                <el-button size="mini" type="danger" @click="weOpen('income')">导入打款</el-button>
            </el-col>
            <el-col>
                <el-table v-if="shopSite=='tw'" :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                          style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="OrderID" label="单号" min-width="130"></el-table-column>
                    <el-table-column prop="OrderStatus" label="状态" min-width="70"></el-table-column>
                    <el-table-column prop="OrderCreationDate" label="订单成立时间" min-width="135" :formatter="GTools.formatDate"></el-table-column>
                    <el-table-column prop="DeliveryMethod" label="寄送方式" min-width="120"></el-table-column>
                    <el-table-column prop="NoOfProductInOrder" label="數量" min-width="50"></el-table-column>
                    <el-table-column prop="SKUReferenceNo" label="商品款式" min-width="300"></el-table-column>
                    <el-table-column prop="buyPrice" label="采购" min-width="80">
                      <template slot-scope="scope">
                        <span>￥{{scope.row.buyPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="DealPrice" label="商品售价(台)" min-width="90">
                      <template slot-scope="scope">
<!--                        <span style="color: #ccc;display: block;font-size: 14px">￥{{ (scope.row.DealPrice*0.2313).toFixed(2)}}</span>-->
                        <span style="color: #2494dc">{{scope.row.DealPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="_AppropriationMoney" label="拨款(台)" min-width="80"></el-table-column>
                    <el-table-column prop="_RealityExpressFee" label="实际运费" min-width="80"></el-table-column>
                    <el-table-column prop="_BuyerExpressFee" label="买家运费" min-width="80"></el-table-column>
                    <el-table-column prop="_ShopeeExpressFee" label="XP运费补贴" min-width="90"></el-table-column>
                    <el-table-column prop="_TransactionFee" label="交易手续费" min-width="80"></el-table-column>
                    <el-table-column prop="_ServiceFee" label="服务费" min-width="80"></el-table-column>
                    <el-table-column prop="_Commission" label="佣金" min-width="80"></el-table-column>
                    <el-table-column prop="_RefundAmount" label="退款金額" min-width="80"></el-table-column>



<!--                  <el-table-column prop="TransactionFee" label="成交手续费" min-width="80"></el-table-column>-->
<!--                  <el-table-column prop="ActionFee" label="活动服务费" min-width="80"></el-table-column>-->
<!--                  <el-table-column prop="CashFlowsFee" label="金流服务费" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="OrderSubtotal" label="订单小计" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="TotalAmount" label="订单总额" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="BuyerAccount" label="C账号" min-width="120"></el-table-column>-->
<!--                    <el-table-column prop="BuyerExpressFee" label="C运费" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="CancelReason" label="取消原因" min-width="140"></el-table-column>-->
<!--                    <el-table-column prop="ShopeeRebate" label="虾皮补贴" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ShopeeCoinsOffset" label="虾币折抵" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="CreditCardDiscountTotal" label="虾皮信用卡折抵" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ShopeeCoinsVoucher" label="虾币回馈券" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ShopeeBundleDiscount" label="虾皮折扣券折抵" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="CreditCardFee" label="信用卡手续费利率" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ProductName" label="商品名称" min-width="120"></el-table-column>-->
<!--                    <el-table-column prop="OriginalPrice" label="商品原价" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="DealPrice" label="商品活动价" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ParentSKUReferenceNo" label="主商品货号" min-width="120"></el-table-column>-->
<!--                    <el-table-column prop="BundleDealIndicator" label="促销组合指标" min-width="50"></el-table-column>-->
<!--                    <el-table-column prop="DeliveryAddress" label="C地址" min-width="120"></el-table-column>-->
<!--                    <el-table-column prop="PhoneNumber" label="C电话" min-width="120"></el-table-column>-->
<!--                    <el-table-column prop="ZipCode" label="C邮编)" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ReceiverName" label="C姓名 (單)" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="ShipmentMethod" label="出货方式" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="PaymentMethod" label="付款方式" min-width="80"></el-table-column>-->
<!--                    <el-table-column prop="OrderPaidTime" label="C付款時間" min-width="120"></el-table-column>-->
                    <el-table-column prop="updateDate" label="更新时间" min-width="135":formatter="GTools.formatDate"></el-table-column>
                    <el-table-column label="操作" min-width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="wcOpen(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="wbDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>


              <el-table v-if="shopSite=='my'" :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                        style="width: 100%;">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="OrderID" label="单号" min-width="130"></el-table-column>
                <el-table-column prop="OrderStatus" label="状态" min-width="70"></el-table-column>
                <el-table-column prop="OrderCreationDate" label="订单成立时间" min-width="135" :formatter="GTools.formatDate"></el-table-column>
                <el-table-column prop="DeliveryMethod" label="寄送方式" min-width="120"></el-table-column>
                <el-table-column prop="NoOfProductInOrder" label="數量" min-width="50"></el-table-column>
                <el-table-column prop="SKUReferenceNo" label="商品款式" min-width="300"></el-table-column>
                <el-table-column prop="buyPrice" label="采购" min-width="80">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.buyPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="DealPrice" label="商品售价(马)" min-width="90">
                  <template slot-scope="scope">
                    <!--                        <span style="color: #ccc;display: block;font-size: 14px">￥{{ (scope.row.DealPrice*0.2313).toFixed(2)}}</span>-->
                    <span style="color: #2494dc">{{scope.row.DealPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="_AppropriationMoney" label="拨款(马)" min-width="80"></el-table-column>
                <el-table-column prop="_RealityExpressFee" label="实际运费" min-width="80"></el-table-column>
                <el-table-column prop="_BuyerExpressFee" label="买家运费" min-width="80"></el-table-column>
                <el-table-column prop="_ShopeeExpressFee" label="XP运费补贴" min-width="90"></el-table-column>
                <el-table-column prop="_TransactionFee" label="交易手续费" min-width="80"></el-table-column>
                <el-table-column prop="_ServiceFee" label="服务费" min-width="80"></el-table-column>
                <el-table-column prop="_Commission" label="佣金" min-width="80"></el-table-column>
                <el-table-column prop="_RefundAmount" label="退款金額" min-width="80"></el-table-column>


<!--                <el-table-column prop="SellerBundleDiscount" label="B折扣券" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="TransactionFee" label="成交手续费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="ActionFee" label="活动服务费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="CashFlowsFee" label="金流服务费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="OrderSubtotal" label="订单小计" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="TotalAmount" label="订单总额" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="BuyerAccount" label="C账号" min-width="120"></el-table-column>-->
<!--                <el-table-column prop="BuyerExpressFee" label="C运费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="CancelReason" label="取消原因" min-width="140"></el-table-column>-->
<!--                <el-table-column prop="ShopeeRebate" label="虾皮补贴" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="ShopeeCoinsOffset" label="虾币折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="CreditCardDiscountTotal" label="虾皮信用卡折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShopeeCoinsVoucher" label="虾币回馈券" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShopeeBundleDiscount" label="虾皮折扣券折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="CreditCardFee" label="信用卡手续费利率" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ProductName" label="商品名称" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="OriginalPrice" label="商品原价" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="DealPrice" label="商品活动价" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ParentSKUReferenceNo" label="主商品货号" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="BundleDealIndicator" label="促销组合指标" min-width="50"></el-table-column>-->
                <!--                    <el-table-column prop="DeliveryAddress" label="C地址" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="PhoneNumber" label="C电话" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="ZipCode" label="C邮编)" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ReceiverName" label="C姓名 (單)" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShipmentMethod" label="出货方式" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="PaymentMethod" label="付款方式" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="OrderPaidTime" label="C付款時間" min-width="120"></el-table-column>-->
                <el-table-column prop="updateDate" label="更新时间" min-width="135":formatter="GTools.formatDate"></el-table-column>
                <el-table-column label="操作" min-width="150">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="wcOpen(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="wbDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-table v-if="shopSite=='ph'" :data="wbList" stripe size="small" highlight-current-row v-loading="wblistLoading"
                        style="width: 100%;">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="OrderID" label="单号" min-width="135"></el-table-column>
                <el-table-column prop="OrderStatus" label="状态" min-width="70"></el-table-column>
                <el-table-column prop="OrderCreationDate" label="订单成立时间" min-width="135" :formatter="GTools.formatDate"></el-table-column>
                <el-table-column prop="DeliveryMethod" label="寄送方式" min-width="120"></el-table-column>
                <el-table-column prop="NoOfProductInOrder" label="數量" min-width="50"></el-table-column>
                <el-table-column prop="SKUReferenceNo" label="商品款式" min-width="300"></el-table-column>
                <el-table-column prop="buyPrice" label="采购" min-width="80">
                  <template slot-scope="scope">
                    <span>￥{{scope.row.buyPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="DealPrice" label="商品售价(菲)" min-width="90">
                  <template slot-scope="scope">
                    <!--                        <span style="color: #ccc;display: block;font-size: 14px">￥{{ (scope.row.DealPrice*0.2313).toFixed(2)}}</span>-->
                    <span style="color: #2494dc">{{scope.row.DealPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="_AppropriationMoney" label="拨款(菲)" min-width="80"></el-table-column>
                <el-table-column prop="_RealityExpressFee" label="实际运费" min-width="80"></el-table-column>
                <el-table-column prop="_BuyerExpressFee" label="买家运费" min-width="80"></el-table-column>
                <el-table-column prop="_ShopeeExpressFee" label="XP运费补贴" min-width="90"></el-table-column>
                <el-table-column prop="_TransactionFee" label="交易手续费" min-width="80"></el-table-column>
                <el-table-column prop="_ServiceFee" label="服务费" min-width="80"></el-table-column>
                <el-table-column prop="_Commission" label="佣金" min-width="80"></el-table-column>
                <el-table-column prop="_RefundAmount" label="退款金額" min-width="80"></el-table-column>


<!--                <el-table-column prop="SellerBundleDiscount" label="B折扣券" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="TransactionFee" label="成交手续费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="ActionFee" label="活动服务费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="CashFlowsFee" label="金流服务费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="OrderSubtotal" label="订单小计" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="TotalAmount" label="订单总额" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="BuyerAccount" label="C账号" min-width="120"></el-table-column>-->
<!--                <el-table-column prop="BuyerExpressFee" label="C运费" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="CancelReason" label="取消原因" min-width="140"></el-table-column>-->
<!--                <el-table-column prop="ShopeeRebate" label="虾皮补贴" min-width="80"></el-table-column>-->
<!--                <el-table-column prop="ShopeeCoinsOffset" label="虾币折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="CreditCardDiscountTotal" label="虾皮信用卡折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShopeeCoinsVoucher" label="虾币回馈券" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShopeeBundleDiscount" label="虾皮折扣券折抵" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="CreditCardFee" label="信用卡手续费利率" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ProductName" label="商品名称" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="OriginalPrice" label="商品原价" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="DealPrice" label="商品活动价" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ParentSKUReferenceNo" label="主商品货号" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="BundleDealIndicator" label="促销组合指标" min-width="50"></el-table-column>-->
                <!--                    <el-table-column prop="DeliveryAddress" label="C地址" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="PhoneNumber" label="C电话" min-width="120"></el-table-column>-->
                <!--                    <el-table-column prop="ZipCode" label="C邮编)" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ReceiverName" label="C姓名 (單)" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="ShipmentMethod" label="出货方式" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="PaymentMethod" label="付款方式" min-width="80"></el-table-column>-->
                <!--                    <el-table-column prop="OrderPaidTime" label="C付款時間" min-width="120"></el-table-column>-->
                <el-table-column prop="updateDate" label="更新时间" min-width="135":formatter="GTools.formatDate"></el-table-column>
                <el-table-column label="操作" min-width="150">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="wcOpen(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="wbDelete(scope.row)">删除</el-button>
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



        <el-dialog :visible.sync="weShow" :close-on-click-modal="true" top="3%" width="550px" :title="xlsType=='order'?'导入订单':'导入打款'"
                   append-to-body>
            <el-row>
                <el-col>
                    <el-form :model="weForm" :label-position="'right'" label-width="100px">
                        <el-form-item label="归属店铺：">
                            <el-select filterable
                                       v-model="weForm.shopID"
                                       @change="(item)=>{weForm.shopSite = shopObj[item].shopSite;weForm.shopName = shopObj[item].shopName}"
                                       placeholder="请选择店铺">
                                <el-option
                                        v-for="item in options.shop"
                                        :key="item.value"
                                        :label="item.label+' - '+item.site"
                                        :value="item.value">
                                  <span style="color: #1689ee;width: 60px;display: inline-block;">{{item.label}}</span>
                                  <span style="color: #ccc;width: 60px;display: inline-block;">{{item.site}}</span>
                                  <span>{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="xlsType=='order'?'订单xls':'打款xls'">
                            <el-upload  class="upload-file"
                                        name="xlsFile"
                                        :data="weForm"
                                        v-model="weForm.file"
                                        :auto-upload="false"
                                        ref="orderUpload"
                                        action="/api/uploadOrder">
                                <el-button size="small" type="primary">选择{{ xlsType=='order'?'订单':'打款' }}xls</el-button>
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
                shop:[],
                shopObj:{},
                shopID:'xj_zwf',
                shopSite:'tw',
                xlsType:"order",
                wbSearch:{
                    orderDate:["2020-08-06 00:00:00", "2021-02-26 00:00:00"],
                    orderStart:"",
                    orderEnd:"",
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
                    ]
                },
                weShow:false,
                weForm:{
                    file:'',
                    shopID:'',
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
                if(postData.orderDate){
                    postData.orderStart = postData.orderDate[0];
                    postData.orderEnd = postData.orderDate[1];
                    delete postData.orderDate;
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
            },
            wbCurrentChange(val){
                this.wbPageNo = val;
                this.wbQuery();
            },
            weOpen(type){
                this.xlsType = type;
                this.weShow = true;
            },
            weSubmit(){
                this.$refs.orderUpload.submit();
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
</style>