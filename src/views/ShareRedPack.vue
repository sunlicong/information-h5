<template>
    <div class="ShareRedPack" v-if="isStatus" :style="{'height':height+'px'}">
		<img  :src="$url(coderUrl)" class="share_img"/>
		<div class="bottom_btn">
			<div @click="showShare(true)">分享给好友</div>
			<div>长按保存海报</div>
		</div>
		<mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
      		<img @click="showShare(false)" src="~@/assets/image/share_mode_img.png">
   		</mt-popup>
    </div>
</template>
<script>
export default {
	name: "ShareRedPack",
    data() {
        return {
			redpackId:this.$route.query.redpackId || 29,//服务ID
			isShowShareMode: false, //分享弹框
			height:window.screen.height,
			coderUrl:'',
			isStatus:false,
        };
	},
	created(){
      var link = window.location.href 
      if(link.indexOf('from=groupmessage')>-1||link.indexOf('from=singlemessage')>-1||link.indexOf('timeline')>-1){
          this.$router.push({path:"/GetRedPacket",query:{redpackId:this.redpackId}})
      }
	},
    mounted() {
		 this.$ui.Indicator.open({
			text: "加载中...",
			spinnerType: "snake"
		  });
		var link = window.location.href 
		if(link.indexOf('from=groupmessage')>-1||link.indexOf('from=singlemessage')>-1||link.indexOf('timeline')>-1){
			this.$router.push({path:"/GetRedPacket",query:{redpackId:this.redpackId}})
		}else{
			this.getRedEnvelopeShare();
		}
	},
	methods:{
		getRedEnvelopeShare(){
			var link = location.protocol + "//" + window.location.host+"/dayu/GetRedPacket?redpackId="+this.redpackId
			this.$axios({
				method:'get',
				url:'/blockchain/v1/share/redEnvelopeShare',
				data:{
					type:1,
					pathUrlChat:link,
					pathUrlApplet:'/pages/getRedPacket/getRedPacket?redpackId='+this.redpackId,
					redpackId:this.redpackId
				},
			}).then((response) => {
				this.coderUrl=response.data.data.coderUrl;
				this.isStatus = true;
				this.$ui.Indicator.close();
				this.$weChat.init({
					link:window.location.href,
					title: '[红包]我给你发了一个新年红包',
					desc: '快来体验，微信收发区块链生成的拼手气红包',
					imgUrl:'https://img.16pic.com/00/60/03/16pic_6003354_s.jpg'
				});
			}).catch((response) => {
          		this.$ui.Indicator.close();
			});
		},
		showShare(e) {
			this.isShowShareMode = e;
			if(e){
				
			}
		}
	},
}
</script>
<style lang="less" scoped>
.dialog_share_mode_box{
	background: none;
}
.ShareRedPack{
	background: url('~@/assets/image/share_bg.png');
	background-size: 100% 100%;
	text-align: center;
	padding-top: 35px;
	padding-bottom: 35px;
	overflow: hidden;
	width: 100%;
	.share_img{
		width: 74.9%;
	}
	.bottom_btn{
		height: 90px;
		display: flex;
		justify-content: space-between;
		margin-top: 67px;
		padding: 0 30px;
		div{
			width: 47.3%;
			height: 90px;
			font-size: 32px;
			line-height: 90px;
			text-align: center;
		}
		div:nth-child(1){
			background:rgba(242,93,76,1);
			border-radius:8px;
			color: #ffffff;
		}
		div:nth-child(2){
			border-radius:8px;
			border:2px solid rgba(242,93,76,1);
			color: #F25D4C;
		}
	}
}
</style>


