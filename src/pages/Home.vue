<template>
	<el-row class="container color_base8">
		<el-col :span="24" class="header bg_primary2 color_base" v-if="',all,noSidebar,'.indexOf(','+nestType+',')>=0">
			<el-col :span="4" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
<!--				{{collapsed?'':sysName}}-->
			</el-col>
			<el-col :span="10">

				<div class="tools" @click.prevent="collapse" v-if="',all,'.indexOf(','+nestType+',')>=0">
					<i class="fa fa-align-justify"></i>
				</div>
				<div class="breadcrumbBox">
					<el-col :span="24" class="breadcrumb-container" v-show="$route.name">
						<!--<strong class="title color_base9">{{$route.name}}</strong>-->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :to="targetPath(item.path)" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
				</div>
			</el-col>
			<el-col :span="8" class="userinfo">
				<el-dropdown trigger="hover" style="width:100%;">
					<div class="el-dropdown-link userinfo-inner color_base">
<!--						<img :src="sysUserAvatar?sysUserAvatar:GTools.imagesUri('default_photo.png')" />-->
						<div style="width:75%;float: right;line-height: 20px;margin-top:12px;font-size:16px;">{{sysOrgName}}</div>
						<div style="width:75%;float: right;line-height: 18px;">{{sysUserName}}</div>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-if="false">我的消息</el-dropdown-item>
						<el-dropdown-item v-if="true" @click.native="setting">个人设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" :class="',section,noHead,'.indexOf(','+nestType+',')>=0?'main sectionMain':'main'" >
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" v-if="',all,noHead,'.indexOf(','+nestType+',')>=0">
				<!--导航菜单-->
				<el-menu
						:default-active='activeNav'
						ref="menuMain"
						class="el-aside-menu"
						:router="true"
						background-color="#f7fafb"
						text-color="#606978"
						v-show="!collapsed"
						active-text-color="#118ae0">
					<el-menu-item  v-for="(item,key) in $router.options.routes[0].children" :index="item.path">
						<i :class="item.iconCls"></i>
						<span slot="title">{{item.name}}</span>
					</el-menu-item>
				</el-menu>
<!--				<el-menu-->
<!--						:default-active='activeNav'-->
<!--						ref="menuMain"-->
<!--						class="el-aside-menu"-->
<!--						:router="true"-->
<!--						background-color="#f7fafb"-->
<!--						text-color="#606978"-->
<!--						v-show="!collapsed"-->
<!--						active-text-color="#ffd04b">-->
<!--					<el-submenu v-for="(item,key) in $router.options.routes" :index="item.path" v-if="item.name">-->
<!--						<template slot="title">-->
<!--							<i :class="item.iconCls" style="color: #000"></i>-->
<!--							<span>{{item.name}}</span>-->
<!--						</template>-->
<!--						<el-menu-item v-if="item.children" v-for="(itemChild,keyChild) in item.children" :index="itemChild.path">{{itemChild.name}}</el-menu-item>-->
<!--					</el-submenu>-->
<!--				</el-menu>-->
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" class="el-submenu item">
						<template v-if="item.name">
							<ul class="el-submenu">
								<li class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></li>
							</ul>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container bg_base10">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" id="fullScreenMain" class="content-wrapper">
						<transition name="fade" mode="out-in" >
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import api from '../api/api';

	export default {
		data() {
			return {
        activeNav:"/orderList",
		sysName:this.getUrlData().title?this.getUrlData().title:'vueElement',
		collapsed:false,
		sysUserName: '',
        sysOrgName: '',
		sysUserAvatar: '',
		form: {
			name: '',
			region: '',
			date1: '',
			date2: '',
			delivery: false,
			type: [],
			resource: '',
			desc: ''
		},
        nestType:this.getUrlData().nestType?this.getUrlData().nestType:'all'
			}
		},
		methods: {
      queryShop(){
        api.get('/api/shopList')({}).then((result) => {
          if(result.status == "200"){
            this.shop = result.data;
          }
        })
      },
      targetPath(match){
				let tempPath=this.$route.path,
					regex = new RegExp("/", 'g'), // 使用g表示整个字符串都要匹配
					resultCurrent = match.match(regex),
					countCurrent = !resultCurrent ? 0 : resultCurrent.length,
					resultFull = tempPath.match(regex),
					countFull = !resultFull ? 0 : resultFull.length;
        while(countCurrent<countFull){
					let tempIndex=tempPath.lastIndexOf("/");
					tempPath=tempPath.substring(0,tempIndex);
          resultFull = tempPath.match(regex);
          countFull = !resultFull ? 0 : resultFull.length;
				};
        return tempPath;
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
                    _this.$router.push('/login');
				}).catch(() => {

				});
			},
			//设置页面 可查看个人信息与重置密码
      setting: function () {
          this.$router.push({path: '/setting'});
      },
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
        this.$refs.menuMain.$el.style.width='188px';
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
      ...mapGetters([
          'getToken',
          'getUserInfo',
          'getUrlData',
        ]
      ),
      ...mapActions([
          'setToken',
          'saveUserInfo'
        ]
      ),
		},
		mounted() {
		},
		created(){
		  this.activeNav = this.$route.fullPath;
		}

	}

</script>

<style lang="less" scoped>

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}

			}
			.logo-width{
				width:188px;
				text-overflow:ellipsis;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
				float:left;
			}
			.breadcrumbBox{
				padding: 23px 0;
				position: absolute;
				margin-left: 60px;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 188px;
				width: 188px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 188px;
				width: 188px;
			}
			.content-container {
				min-width:796px;
				/*background: #f1f2f7;*/
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 10px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					/*background-color: #fff;*/
					box-sizing: border-box;
				}
			}
		}
        .sectionMain{
            top: 0;
        }
	}
</style>