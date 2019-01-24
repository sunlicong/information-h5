<template>
    <div class="GetRedPacket"  v-if="isStatus">
        <div class="header">
            <img :src="$url(message.photo)" class="head_portrait"/>
            <div class="name_packet">
                <span>{{message.nick}}的红包</span>
                <span v-if="message.type==1">拼</span>
            </div>
            <div class="packet_text">{{message.description}}</div>
            <div class="money"  v-if="message.status==1">
                <span>{{message.receiving}}</span>
                <span v-if="message.assetType==2">元</span>
                <span v-if="message.assetType==1">TRX</span>
            </div>
            <div class="run_out" v-if="message.status==2||message.status==3">{{message.receive}}</div>
            <div class="hint" v-if="message.status==1">已存入{{message.assetType==1?'云':'本地'}}钱包，可直接提现</div>
            <div class="hint" v-if="message.status==2&&message.sendUser">未领取的红包，已返还至{{message.assetType==1?'云':'本地'}}钱包</div>
            <div class="bottom">
                <div @click="transmit('Wallet')">
                    <img src="~@/assets/image/bottom_packet1.png" class="bottom_packet1"/>
                    <span>去提现</span>
                    <p class="gradual"></p>
                </div>
                <div @click="transmit('SendRedPack')">
                    <img src="~@/assets/image/bottom_packet2.png" class="bottom_packet2"/>
                    <span>去发红包</span>
                    <p class="gradual"></p>
                </div>
                <div @click="transmit('ShareRedPack')" v-if="message.sendUser">
                    <img src="~@/assets/image/bottom_packet3.png" class="bottom_packet3"/>
                    <span>继续转发</span>
                </div>
            </div>
        </div>
        <div class="draw">
            已领取{{message.receiveCount}}/{{message.count}}个，共<span class="span">{{message.amount}}</span>
            <span v-if="message.assetType==2">元</span>
            <span v-if="message.assetType==1">TRX</span>
        </div>
        <ul class="packet">
            <li v-for="(item,index) in list" :key="index" v-if="message.type==1">
                <img :src="$url(item.photo)" />
                <div class="center">
                    <div class="center_top">
                        <span>{{item.nick}}</span>
                        <span>拼</span>
                    </div>
                    <div class="center_bottom">{{$formatDate(item.receivingTime/1000,3)}}</div>
                </div>
                <div class="right">
                    <div>
                        {{item.amount}}
                        <span v-if="item.assetType==2">元</span>
                        <span v-if="item.assetType==1">TRX</span>
                    </div>
                    <div v-if="item.best==1">手气最佳</div>
                </div>
            </li>
        </ul>
         <div class="message"  v-if="message.type==1">
            <div class="title">区块信息</div>
            <div @click="copy()">
                <span class="key">交易ID：</span>
                <span class="value">{{txId}}</span>
                <img src="~@/assets/image/copy.png" class="copy"/>
            </div>
            <div>
                <span class="key">区块高度：</span>
                <span class="value">{{message.refBlock}}</span>
            </div>
        </div>
        <NewPointsDlg :show="showPointsPop" :pints="awardTokenAmount" @share="share"></NewPointsDlg>
        <SharePointsDlg :show="sharePointsPop" :pints="5"></SharePointsDlg>
        <mt-popup class="dialog_share_mode_box" v-model="isShowShareMode" position="top">
        <img @click="hiddenShareDialog()" src="~@/assets/image/share_mode_img.png">
        </mt-popup>
    </div>
</template>
<script>
import SharePointsDlg from "@/components/SharePointsDlg.vue";
import NewPointsDlg from "@/components/NewPointsDlg.vue";
export default {
    name:'GetRedPacket',
    components: {
        NewPointsDlg,
        SharePointsDlg
    },
    data(){
        return {
            redpackId:this.$route.query.redpackId || 121,
            isShowShareMode: false, //分享弹框
            showPointsPop: false, // 注册奖励弹框
            awardTokenAmount: 0, // 奖励金额
            sharePointsPop: false, //分享成功获得奖励弹框
            message:{},
            list:[],
            isStatus:false,
            txId:''
        }
    },
    mounted() {
         this.$ui.Indicator.open({
			text: "加载中...",
			spinnerType: "snake"
      	});
	    this.receiveRedpack();
    },
    created() {
        this.setShareInfo();
        if (this.$store.state.awardTokenAmount) {
        this.showPointsPop = true;
        this.awardTokenAmount = this.$store.state.awardTokenAmount;
        }
    },
    methods:{
        transmit(url){
            if(url == 'ShareRedPack'){
                window.location.href =  location.protocol + "//" + window.location.host+"/dayu/ShareRedPack?redpackId="+this.redpackId
            }else{
                window.location.href =  location.protocol + "//" + window.location.host+"/dayu/"+url
            }
            
        },
        copy(){
            this.$copyText(this.message.txId);
            this.$ui.Toast("复制成功");
        },
        receiveRedpack(){
            this.$axios({
				method:'post',
				url:'/blockchain/v1/redpack/receiveRedpack',
				data:{
				    redpackId:this.redpackId
				},
			}).then((response) => {
				this.coderUrl=response.data.data.coderUrl;
			    this.message=response.data.data;
                this.$ui.Indicator.close();
                this.getRedpackList();
                this.isStatus = true;
                var data = response.data.data
                var txId = data.txId.slice(0,6) + '...'+data.txId.slice(data.txId.length-6,data.txId.length);
                this.txId = txId

			}).catch((response) => {
                this.$ui.Indicator.close();
                this.getRedpackList();
			});
        },
        getRedpackList(){
            this.$axios({
				method:'get',
				url:'/blockchain/v1/redpack/getRedpackList',
				data:{
                    redpackId:this.redpackId,
                    next:0,
                    limit:200
			    },
			}).then((response) => {
				this.list = response.data.data.data;
				this.$ui.Indicator.close();
			}).catch((response) => {
          		this.$ui.Indicator.close();
			});
        },
        /**
         * 分享
         */
        share() {
            this.showPointsPop = false;
            this.isShowShareMode = true;
            this.setShareInfo(() => {
                this.isShowShareMode = false;
                this.setShareInfo();
                this.getShareGetDb()
            });
        },
        /**
         * 分享成功获取 分享db
         */
        getShareGetDb(){
            this.$axios({
                method: "get",
                url: "/blockchain/v1/user/shareGetDb"
            }).then(response => {
                if (response.data.status) {
                this.sharePointsPop = true;
                }
            });
        },
        /**
         * 隐藏分享蒙层
         */
        hiddenShareDialog() {
            this.isShowShareMode = false;
        },
        setShareInfo(success) {
            this.$weChat.init({
                link: window.location.href + "&inviter=" + this.$store.state.user.uid,
                title: "送你大鱼股份，天天有分红，快来领取！",
                desc: "来大鱼，看资讯、领股份、天天分红！",
                imgUrl: location.protocol + "//" + window.location.host + require("../assets/image/share_index_card.png"),
                success: success || function() {}
            });
            this.$weChat.init({
                link:window.location.href,
                title: '[红包]我给你发了一个新年红包',
                desc: '快来体验，微信收发区块链生成的拼手气红包',
                imgUrl:'https://img.16pic.com/00/60/03/16pic_6003354_s.jpg',
                success: success || function() {}
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .header{
        background: #D14139;
        padding: 40px 0 20px 0;
         text-align: center;
        .head_portrait{
            width: 150px;
            height: 150px;
            border:4px solid rgba(250,208,16,1);
            border-radius: 50%;
        }
        .run_out{
            color: #ffffff;
            font-size: 36px;
            margin-top:60px;
            margin-bottom:40px
        }
        .name_packet{
            font-size:28px;
            font-family:PingFangSC-Regular;
            color: #F4BB16;
            margin-top: 20px;
            span:nth-child(2){
                width:27px;
                height:31px;
                background:rgba(255,255,255,1);
                border-radius:1px;
                font-size:24px;
                margin-left: 22px;
                display: inline-block;
                text-align: center;
                line-height: 31px;
            }
        }
        .packet_text{
            font-size:28px;
            color: #FFFFFF;
            margin-top: 20px
        }
        .money{
             color: #FFFFFF;
             margin-top: 30px;
             span:nth-child(1){
                font-size:64px
             }
             span:nth-child(2){
                font-size:32px
             }
        }
        .hint{
            color: #F4BB16;
            font-size:28px;
            margin-top: 30px
        }
        .bottom{
            display: flex;
            margin-top: 35px;
           div{
               padding: 11px 0 21px 0;
               flex: 1;
               display: flex;
               justify-content: center;
               align-items: center;
               position: relative;
               img{
                   height: 21px;
                   width: 21px;
                   margin-right: 15px;
               }
               span{
                   font-size: 28px;
                   color: #FFFFFF
               }
           }
          .gradual{
              position: absolute;
              top: 11px;
              right: 0;
              width:2px;
                height:49px;
                opacity:0.6;
                background:linear-gradient(180deg, rgba(209,65,57,1), rgba(255,255,255,1), rgba(209,65,57,1));
          }
           .bottom_packet1{
                height: 24px;
                width: 24px;
           }
            .bottom_packet2{
                height: 25px;
                width: 21px;
           }
            .bottom_packet3{
                height: 22px;
                width: 23px;
           }
        }
    }
    .draw{
        padding: 15px 28px;
        color: #A3AEBA;
        font-size: 28px;
        background: #ffffff;
        .draw .span{
            color: #D14139;
        }
        border-bottom: 1px solid #F6F6F6
    }
    .packet{
        li{
            padding: 20px 30px 30px 30px;
            border-bottom: 1px solid #F6F6F6;
            display: flex;
            background: #ffffff;
             img{
                 width: 80px;
                 height: 80px;
                 border-radius: 50%;
             }
             .center{
                 display: flex;
                 flex-direction: column;
                 justify-content: space-between;
                 flex: 1;
                 padding-left: 10px;
                 .center_top{
                     
                     span:nth-child(1){
                        color: #051426;
                        font-size: 32px;
                     }
                     span:nth-child(2){
                         width:27px;
                        height:31px;
                        background:rgba(249,131,50,1);
                        border-radius:1px;
                         font-size:24px;
                        color: #ffffff;
                        display: inline-block;
                        text-align: center;
                        line-height: 31px;
                        margin-left: 10px;
                     }
                 }
                 .center_bottom{
                     color: #A3AEBA;
                     font-size: 28px
                 }
             }
             .right{
                display: flex;
                 flex-direction: column;
                 justify-content: space-between;
                //  width: 110px;
                align-items:flex-end;
                 color: #051426;
                 font-size: 32px;
                 div:nth-child(2){
                     color: #D14139;
                     font-size: 20px;
                     width:100px;
                    height:32px;
                    background:rgba(244,187,22,1);
                    border-radius:3px;
                    text-align: center;
                 }
             }
       }
    }
   
    .message {
        font-size: 28px;
        padding: 20px 30px;
    }
    .title{
    
        color: #101F30;
    }
    .message .key{
    
        color: #A3AEBA
    }
    .message .value{
    
        color: #051426
    }
    .copy{
        width: 25px;
        height: 25px;
        margin-left: 10px;
    }
</style>


