<template>
	<section>
		<div class="main">

		</div>
	</section>
</template>

<script>
    import api from '../api/api';
    export default {
        data() {
            return {
            	phone:{
            		link:"",
            		linkList:"",
					linkValList:[]
				},
            }
        },
        methods: {
			initData(){

			}
        },
        mounted() {

        }
	}

</script>

<style lang="scss" type="text/scss" scoped>

	.main{
		width: 1000px;
		margin: 50px auto;
		text-align: center;
	}
	.phoneTips{
		font-size: 24px;
		margin-bottom: 10px;
		color: #244bc7;
	}
	.phoneList{
		line-height: 40px;
		font-size: 40px;
	}
	.phoneListNo{
		color: #666;
	}
	.phoneListPhone{
		color: #2e81df;
	}
	.phoneListCode{
		color: #e77911;
	}
	.el-row {
		margin-bottom: 6px;
	}
	.el-col {
		border-radius: 6px;
	}
	.welcome-content{
		padding:53px 2px;
	}
	.grid-content {
		border-radius: 2px;
		min-height: 160px;
		padding:2px;
	}
	.grid-content2{
		border-radius: 2px;
		min-height: 80px;
	}
	.mainTitle{
		margin:18px 20px 0;
	}
	.amountContent{
		font-size: 36px;
		font-weight: revert;
		line-height:86px;
		height:86px;
		text-align: center;
	}
	.mainMark{
		font-size:12px;
		margin-left:18px;
	}
	.mainSubTitle{
		margin:32px 20px 0;
		text-align: center;
	}
	.amountSubContent{
		font-size: 24px;
		line-height:56px;
		height:56px;
		text-align: center;
	}
	.alignCenter{
		text-align: center;
	}
	.secondContent{
		line-height:80px;
		height:80px;
		text-align: center;
	}
	.rightLine{
		float: right;
		padding:20px 1px 20px 0;
		margin-top:20px;
	}
	.localTopToolbar{
		margin:0;

	}
	.listTitle{
		margin-left: 10px;
		line-height: 40px;
		font-size: 16px;
	}
	.listSelect{
		float:right;
		padding-bottom:6px;
	}
	.photoImg{
		width:98px;
	}
	.welcome-org{
		font-size:16px;
		/*font-weight: bold;*/
	}
	.welcome-msg{
		font-size:12px;
	}
	.rightImg{
		width:48px;
	}
	.listImage{
		width:112px;
		height:auto;
	}
	.vipImg{
		width: 32px;
		position: absolute;
		margin-left: -32px;
		margin-top: 66px;
	}
	.el-radio+.el-radio{
		margin-left:12px;
	}
	.settingBtn{
		border:0;
		position:absolute;
		right:0;
		top:0;
		border-radius: 0;
	}
	.infoCardBox{
		min-width:360px;
		width:40%;
		max-width:800px;
		position: absolute;
		bottom:10px;
		right:10px;
		z-index:10;
	}

	.changeInfoItem{
		padding:2px 0;
	}
	.changeInfoItem{
		cursor: pointer;
	}
	.changeInfoItem:active{
		padding-top:3px;
		padding-bottom:1px;
	}
	.changeDetailHead{
		font-size:16px;
		text-align: center;
		height:32px;
		line-height: 32px;
		font-weight: bold;
	}
	.payInfo_Ul{
		list-style:none;
		width:800px;
		margin:0;
		padding: 0 10px;
	}
	.payInfo_Ul li label {
		float:left; /* 向左漂移，将竖排变为横排 */
		width:100px;
		text-align: right;
	}
	.payInfo_Ul li{
		float:left;
		width:400px;
		line-height: 24px;
	}
	.payInfo_Ul li div{
		padding-left:110px;
	}

</style>