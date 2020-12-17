<template>
  <div id="app">
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }

</script>

<style lang="less" type="text/scss">
  body {
    margin: 0px;
    padding: 0px;
    /*background: url(assets/bg1.jpg) center !important;
        background-size: cover;*/
    // background: #1F2D3D;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    padding: 10px;
    margin:0;
    background-color: #fff;
    border:1px solid rgb(223, 236, 234);
    border-top:0;
    border-left:0;
    border-right:0;
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .toolBarPagination{
    &.toolbar{
      border: none;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  //@import '~scss_custom';

  //@color-primary: #20a0ff;//#18c79c
  //@color-primary: rgba(51, 51, 51, 1);//#18c79c
  @color-primary: #18C79C;
  @color-primary1: rgb(70, 210, 176);
  @color-primary2: rgba(51, 51, 51, 1);
  @color-primary3:rgba(24, 199, 156, 0.7);

  @color-base:#fff;
  @color-base1:#f5f7fa;
  @color-base2:rgb(223, 236, 234);
  @color-base3:#F2F6FC;
  @color-base4:#C0C4CC;
  @color-base6:#909399;
  @color-base7:#606266;
  @color-base8:#303133;
  @color-base9:#475669;
  @color-base10:rgba(245, 245, 245, 1);
  @color-base11:#eaeaea;
  @color-base12:#cac6c6;
  @color-base13:#505458;
  @color-base14:#999999;
  @color-base15:#EBEEF5;
  @color-base16:#E4E7ED;
  @color-base17:rgba(0,0,0,.4);
  @color-base18:#eae9e9;
  @color-base19:#5099d3;
  @color-base20:#8c939d;
  @color-base21:#000000;
  @color-base22:#C8EBFB;
  @color-base23:#aeaeae;
  @color-base24:#c0ccda;
  @color-base25:#8492a6;
  @color-base26:#3c6ccc;
  @color-base27:#e89800;
  @color-base28:#fafafa;
  @color-base29:#ff6d6d;

  @color-success:#67C23A;
  @color-danger:#F56C6C;
  @color-warning:#E6A23C;




  .mine_smallCell .cell{
    padding-left:8px;
    padding-right:8px;
    line-height:20px;
  }
  .hightLightFont div.cell{
    font-weight: bold;
    color: @color-primary1;
  }
  .cellTable.mine_smallCell .cell{
    padding-left: 0;
    padding-right: 0;
    line-height: 12px;
  }
  .widthInput{
    width:179px;
  }
  .el-table th{
    background-color: @color-base1;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    margin:0;
  }
  .showValue{
    padding:3px 10px;
    min-height:28px;
    line-height: 28px;
    border:1px solid @color-base2;
    border-radius: 4px;
  }
  .showText{
    padding:7px 10px;
    height:76px;
    line-height: 1.5;
    border:1px solid @color-base2;
    border-radius: 4px;
  }
  .alignRight{
    text-align: right;
  }
  .alignCenter{
    text-align: center;
  }
  .font12{
    font-size:12px;
  }
  .font13{
    font-size:13px;
  }
  .colorGreen{
    color: @color-success;
  }
  .colorOrange{
    color: @color-warning;
  }
  .colorRed{
    color: @color-danger;
  }
  .orderToolbar{
    margin:0;
    background-color: @color-base;
    border:1px solid @color-base2;
    border-top:0;
  }
  .el-tabs__item{
    font-weight: normal;
  }
  .el-tabs__nav-next:hover,el-tabs__nav-prev:hover{
    color:@color-primary;
  }
  .policyTabsBox .el-tabs--card>.el-tabs__header .el-tabs__item{
    padding:0 10px;
    height:26px;
    line-height:26px;
  }
  .policyTabsBox .el-tabs__nav-next,.policyTabsBox .el-tabs__nav-prev{
    line-height:28px;
  }
  .selectTreeIpt{
    padding:3px 10px;
    height:28px;
    line-height: 28px;
    border:1px solid @color-base2;
    border-radius: 4px;
  }
  .contentBox{
    background-color: @color-base;
    border:1px solid @color-base2;
    border-radius: 6px;
    min-height:600px;
  }
  .boxHead{
    padding-left:12px;
    padding-right:12px;
    background-color: @color-base3;
    border-bottom:1px solid @color-base2;
    line-height:48px;
    font-size:18px;
  }
  .boxBody{
    padding: 8px 0;
  }
  .boxBody .el-form{
    padding:0 8px;
  }
  .el-breadcrumb__inner{
    color:@color-base4;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color:@color-base6;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color:@color-base6;
  }
  .inputCheck .el-input-group__append{
    padding:0 2px;
  }
  .inputCheck .el-checkbox__label{
    padding-left:2px;
    font-size:12px;
    font-weight: lighter;
  }

  .policyProduct .miniPadding{
    padding:2px 4px;
  }
  .policyProduct .el-table.el-table-cell-top td{
    vertical-align: top;
  }
  /*disable下 radio的样式调整*/
  .policyProduct .el-radio__input.is-disabled.is-checked .el-radio__inner{
    color:@color-primary;
    border-color:@color-primary;
  }
  .policyProduct .el-radio__input.is-disabled.is-checked+span.el-radio__label{
    color:@color-primary;
  }
  .policyProduct .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
    background-color:@color-primary;
  }

  /*disable下 checkbox的样式调整*/
  .policyProduct .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
    background-color:@color-primary;
    border-color:@color-primary;
  }
  .policyProduct .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label{
    color:@color-primary;
  }
  .policyProduct .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
    border-color:@color-base;
  }
  .policyProduct .el-button.is-disabled.btnOnCheck{
    color: @color-primary;
    border-color: @color-primary;
  }
  .policyProduct .el-input.is-disabled .el-input__inner{
    background-color: @color-base;
    color:@color-base7;
  }
  .deliverForm .el-input--mini .el-input__icon{
    color: @color-danger;
  }
  .bgSuccess{
    background-color: @color-success;
  }
  .bgDanger{
    background-color: @color-danger;
  }
  .bgWarning{
    background-color: @color-warning;
  }


  .dataAnalysis .el-radio-button--mini .el-radio-button__inner {
    padding:7px 4px;

  }
  .el-radio-group.size12 .el-radio__input,.el-radio-group.size12 .el-radio__label{
    font-size:12px;
  }
  .el-radio-group.size12 .el-radio__input .el-radio__inner{
    width:12px;
    height:12px;
  }

  .miniPadding .el-input__inner{
    padding:0 4px;
  }
  .rateInput .el-input__inner{
    height:24px;
  }
  .textCenter .el-input__inner{
    text-align: center;
  }
  .el-date-table td.start-date::before{
    content: '起';
    position: absolute;
    left: 0;
    top: -1.3em;
    right: 0;
    bottom: 0;
    margin: auto;
    color: @color-primary;
  }
  .el-date-table td.end-date::before{
    content: '止';
    position: absolute;
    left: 0;
    top: -1.3em;
    right: 0;
    bottom: 0;
    margin: auto;
    color: @color-primary;
  }
  .el-date-table td.start-date.end-date::before{
    content: '起';
    position: absolute;
    left: 0;
    top: -1.3em;
    right: 0;
    bottom: 0;
    margin: auto;
    color: @color-primary;
  }
  .el-table--small td,.el-table--small th{
    padding: 4px 0;
  }
  .customRowHeight .el-table--small td{
    padding: 4px 0;
  }
  .customRowHeight .el-table--small th{
    padding: 6px 0;
  }
  .cumstomTemplate.customRowHeight .el-table--small th {
    padding: 1px 0;
  }
  .el-submenu .el-menu-item{
    min-width: 187px;
  }
  .el-upload-list{
    text-align: left;
  }
  .el-button.is-circle {
    border-radius: 50%;
    padding: 8px;
  }
  .mine_smallForm .el-form-item--medium .el-form-item__label{
    line-height:24px;
    padding-bottom:6px;
  }
  .mine_smallForm .el-form-item{
    margin-bottom:16px;
  }
  .login_box{
    background: @color-base;
    border: 1px solid @color-base11;
    box-shadow: 0 0 25px @color-base12;
    .el-input-group__append button.el-button {
      color: @color-primary;
      border-radius: 0;
      &:hover {
        background: @color-primary1;
        border-color: @color-primary1;
        color: @color-base;
      }
    }
  }
  .login_switchLogin{
    border-top: 70px solid @color-primary3;
    border-color: @color-primary;
    border-left: 70px solid transparent;
  }
  .bottomLine{
    border-bottom:1px solid @color-base15;
    padding-top:1px;
    width:240px;
    margin-left:auto;
    margin-right:auto;
  }
  .dataAnalysis{
    >.el-col.halfCol> {
      min-height: 258px;
    }
    >.el-col>.el-row{
      padding: 6px 4px;
      border:1px solid @color-base16;
    }
  }
  .secondAnaBtn{
    cursor: pointer;
    color:@color-primary;
    font-size:15px;
    z-index: 1;
    border-radius: 4px;

  }
  .secondAnaBtn:hover{
    /*color:rgb(70, 210, 176);*/
    font-size:16px;
    color:@color-base;
    background-color: @color-base17;
  }
  .settingBtn:hover{
    background-color: @color-base;
  }
  .showAllBtn{
    font-size:12px;
    padding:2px 4px;
    color:@color-base6;
    cursor: pointer;
  }
  .showAllBtn:hover{
    color:@color-primary;
  }
  .changeInfoItem:hover{
    color: @color-primary;
  }
  .btnOpenCard{
    color: #f56c6c;
    cursor: pointer;
    padding:4px;
    float:right;
  }
  .btnOpenCard:hover{
    color: #ff7e7e;
  }
  .uploader-example {
    width: 90%;
    padding: 15px;
    margin: 40px auto 0;
    margin-top: 0;
    font-size: 12px;
    box-shadow: 0 0 10px @color-base17;
  }
  .noList{
    text-align: center;
    margin-top: 100px;
    color: @color-base19;
    border: 1px dashed @color-base18;
    display: inline-block;
    padding: 10px;
    background: @color-base;
  }
  .rightTopCloseBtn i{
    color:@color-base16;
  }
  .rightTopCloseBtn:hover i{
    color:@color-base3;
  }
  .el-input-group__append button.el-button {
    color: @color-primary;
    border-radius: 0;
    &:hover {
      background: @color-primary1;
      border-color: @color-primary1;
      color: @color-base;
    }
  }
  .templateInput {
    height: 24px;
    width: 10em;
    border: none;
    border-bottom: 1px solid @color-base;
    outline: none;
    font-size: 12px;
    padding-right: 18px;
    //background-image: url("../../assets/images/edit.png");
    background-position: right center;
    background-size: 18px 18px;
    background-repeat: no-repeat;
  }
  .templateInput:focus {
    border-bottom: 1px solid @color-base20;
  }
  .transferDrag {
    border: 1px solid @color-base15;
    border-radius: 4px;
    overflow: hidden;
    background: @color-base;
    display: inline-block;
    vertical-align: middle;
    width: 330px;
    max-height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .transferDrag .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background: @color-base1;
    margin: 0;
    border-bottom: 1px solid @color-base15;
    box-sizing: border-box;
    color: @color-base21;
  }
  .shareQQBtn{
    cursor: pointer;
    border-radius: 8px;
  }
  .shareQQBtn:hover{
    background-color: @color-base3;
  }
  .btnOnCheck{
    color:@color-primary;
    border-color:@color-primary;
  }
  .btnOnCheck.is-disabled{
    color: @color-base4;
    border-color: @color-base4;
  }
  .el-form-no-padding .el-form-item{
    margin-bottom:0;
  }
  .el-form-border .el-form-item{
    border-bottom:1px solid @color-base15;
  }
  .tableHasBorder.el-table--enable-row-transition .el-table__body td{
    border-left:1px solid @color-base15;
  }
  .refreshBtn{
    margin-right:4px;
    cursor: pointer;
  }
  .refreshBtn:hover{
    color:@color-primary;
  }
  .agreementRemove{
    font-size:20px;
    color:@color-danger;
    cursor: pointer;
  }
  .agreementRemove:hover{
    color:@color-base29;
  }









  .bg_primary2{
    background: @color-primary2;
  }
  .bg_primary{
    background: @color-primary;
  }
  .bg_base{
    background:@color-base;
  }
  .bg_base10{
    background:@color-base10;
  }
  .bg_base16{
    background:@color-base16;
  }
  .bg_base22{
    background:@color-base22;
  }

  .color_primary{
    color:@color-primary;
  }
  .color_base8{
    color:@color-base8;
  }
  .color_base{
    color:@color-base;
  }
  .color_base9{
    color:@color-base9;
  }
  .color_base13{
    color:@color-base13;
  }
  .color_base14{
    color:@color-base14;
  }
  .color_base6{
    color:@color-base6;
  }
  .color_base2{
    color:@color-base2;
  }
  .color_base7{
    color:@color-base7;
  }
  .color_base16{
    color:@color-base16;
  }
  .color_base25{
    color:@color-base25;
  }
  .color_base26{
    color:@color-base26;
  }
  .color_base27{
    color:@color-base27;
  }
  .color_base28{
    color:@color-base28;
  }
  .color_base4{
    color:@color-base4;
  }
  .color_success{
    color:@color-success;
  }

  .border_b_1_d_base2{
    border-bottom:1px dashed @color-base2;
  }
  .border_a_1_d_base6{
    border:1px dashed @color-base6;
  }
  .border_a_1_s_base2{
    border: 1px solid @color-base2;
  }
  .border_b_1_s_base15{
    border-bottom:1px @color-base15 solid;
  }
  .border_r_1_s_base15{
    border-right:1px @color-base15 solid;
  }
  .border_a_1_s_base15{
    border:1px @color-base15 solid;
  }
  .border_a_1_s_base23{
    border:1px @color-base23 solid;
  }
  .border_a_1_s_base24{
    border:1px @color-base24 solid;
  }
  .border_a_1_s_base11{
    border:1px @color-base11 solid;
  }
  .shadow_base12{
    box-shadow: 0 0 25px @color-base12;
  }
  .noBorder{
    border:0 !important;
  }
</style>