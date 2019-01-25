<template>
    <div class="RedPacketRecords">
        <div class="TabBar">
            <ul>
                <li>
                    <div class="getRedPacket" :class=" type === 'get' ? 'active' : '' " @click="changeType('get')">收到的红包</div>
                </li>
                <li>
                    <div class="sendRedPacket" :class=" type === 'send' ? 'active' : '' "  @click="changeType('send')">发出的红包</div>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="user">
                <img :src="getList.photo">
                <p class="one_line">{{getList.nick}}</p>
            </div>
            <ul class="money">
                <li class="trx">
                    <strong>{{tRXAmountSum}}</strong>
                    <b>TRX</b>
                </li>
                <li class="rmb">
                    <strong>{{amountSum}}</strong>
                    <b>元</b>
                </li>
            </ul>
            <ul class="totalPacket" v-if="type === 'get'">
                <li class="getPackets">
                    <span>收到红包</span>
                    <em>{{getList.receivedCounts}}个</em>
                </li>
                <li class="best">
                    <span>手气最佳</span>
                    <em>{{getList.bestCounts}}个</em>
                </li>
            </ul>
            <div class="sendPacket" v-if="type === 'send'">
                <span>发出红包</span>
                <strong>{{sendList.extendCounts}}</strong>
                <em>个</em>
            </div>
        </div>
        <div class="get_list" v-if="type === 'get'">
            <ul>
                <li v-for="item in getList.recordDetailVoList" @click="goDetail(item.redpackId)" :key="item.redpackId">
                    <img class="userAvantar" :src="item.photo" alt="">
                    <div class="info">
                        <div class="top">
                            <span>{{item.nick}}<b v-if="item.type === 1">拼</b></span>
                            <span v-if="item.assetType === 1">{{item.amount}}TRX</span>
                            <span v-if="item.assetType === 2">{{item.amount}}元</span>
                        </div>
                        <div class="bottom">
                            <span>{{item.receivingTime}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="send_list" v-if="type === 'send'">
            <ul>
                <li v-for="item in sendList.recordDetailVoList" @click="goDetail(item.redpackId)" :key="item.redpackId">
                    <div class="top">
                        <span v-if="item.type === 1">拼手气红包</span>
                        <span v-if="item.type === 2">普通红包</span>
                        <span v-if="item.assetType === 1">{{item.amount}}TRX</span>
                        <span v-if="item.assetType === 2">{{item.amount}}元</span>
                    </div>
                    <div class="bottom">
                        <span>{{item.createTime}}</span>
                        <span>{{item.receivedStatus}}{{item.receivedCounts}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="non" v-if="(type === 'get' && getList.recordDetailVoList.length === 0) || (type === 'send' && sendList.recordDetailVoList.length === 0)">
            <img src="~@/assets/image/img_non.png">
            <div>暂时还没有数据哦～</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RedPacketRecords',
    data () {
        return {
            type: 'get',
            getList: {
                recordDetailVoList: []
            },
            sendList: {
                recordDetailVoList: []
            },
            tRXAmountSum: '',
            amountSum: ''
        }
    },
    mounted () {
        this.getUser()
    },
    methods: {
        getUser () {
            if (this.type === 'get') {
                this.getPacketList()
            } else {
                this.sendPacketList()
            }
        },
        getPacketList () {
            this.$axios({
                url: '/blockchain/v1/redpack/receivedRecords',
                method: 'get'
            })
            .then(res => {
                this.getList = res.data.data
                this.amountSum = res.data.data.amountSum
                this.tRXAmountSum = res.data.data.tRXAmountSum
            })
        },
        sendPacketList () {
            this.$axios({
                url: '/blockchain/v1/redpack/extendRecords',
                method: 'get'
            })
            .then(res => {
                this.sendList = res.data.data
                this.amountSum = res.data.data.amountSum
                this.tRXAmountSum = res.data.data.tRXAmountSum
            })
        },
        changeType (type) {
            this.type = type
            this.getUser()
        },
        goDetail (id) {
			if(this.$viewPort().isMiniprogram){
				this.$wxSdk().miniProgram.navigateTo({url: '/pages/getRedPacket/getRedPacket?redpackId=' + id})
			} else {
				this.$router.push({path: '/GetRedPacket', query: {redpackId: id}});
			}
        }
    }
}
</script>

<style lang="less" scoped>
.RedPacketRecords {
    .TabBar>ul {
        width: 100%;
        height: 1.3rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #fff;
        li {
            width: 50%;
            height: 100%;
            .getRedPacket,.sendRedPacket {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #A3AEBA;
                font-size: 0.43rem;
                position: relative;
                &.active {
                    color: #D14139;
                }
                &.active::after {
                    content: '';
                    position: absolute;
                    bottom: .03rem;
                    left: 0;
                    width: 100%;
                    height: .03rem;
                    background: #D14139;
                }
            }
        }
    }
    .content {
        width: 100%;
        height: 6.25rem;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        background-color: #FBF2EC;
        .user {
            width: 100%;
            margin-top: .6rem;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            img {
                width: 1.85rem;
                height: 1.85rem;
                border-radius: 50%;
            }
            p {
                margin-top: .27rem;
                max-width: 60%;
                color: #071628;
                font-size: .43rem;
            }
        }
        .money,.totalPacket {
            width: 100%;
            height: 1rem;
            margin-top: .2rem;
            display: flex;
            flex-flow: row nowrap;
            li {
                width: 50%;
                display: flex;
                flex-flow: row nowrap;
                align-items: baseline;
                justify-content: center;
                color: #D14139;
                strong {
                    font-size: 52px;
                }
                b {
                    font-size: .43rem;
                    font-weight: 400;
                }
                span {
                    color: #AAB3BE;
                    font-size: .37rem;
                }
                em {
                    margin-left: .2rem;
                    color: #071628;
                    font-size: .48rem;
                }
            }
        }
        .totalPacket {
            margin-top: .45rem;
        }
        .sendPacket {
            width: 100%;
            height: 1rem;
            margin-top: .45rem;
            display: flex;
            align-items: baseline;
            justify-content: center;
            span {
                color: #AAB3BE;
                font-size: .37rem;
            }
            strong {
                margin-left: .2rem;
                color: #D14139;
                font-size: .48rem;
                font-weight: 400;
            }
            em {
                color: #071628;
                font-size: .48rem;
            }
        }
    }
    .get_list {
        background-color: #fff;
        ul>li {
            padding: 0 .4rem;
            height: 130px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border-bottom: 2px solid #f6f6f6;
            .userAvantar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
            .info {
                height: 90px;
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                .top {
                    height: 45px;
                    margin-bottom: 5px;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    span {
                        font-size: 32px;
                        color: #051426;
                        b {
                            width:27px;
                            height:31px;
                            background:rgba(249,131,50,1);
                            border-radius:1px;
                            font-size:24px;
                            font-weight: 400;
                            color: #fff;
                            display: inline-block;
                            text-align: center;
                            line-height: 31px;
                            margin-left: 10px;
                        }
                    }
                }
                .bottom {
                    span {
                        font-size: 28px;
                        color: #A3AEBA;
                    }
                }
                .top,.bottom {
                    height: 40px;
                    margin-left: .1rem;
                    align-items: center;
                }
            }
        }
    }
    .send_list {
        background-color: #fff;
        ul {
            li {
                height: 130px;
                padding: 0 .4rem;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                border-bottom: 2px solid #f6f6f6;
            }
            div {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
            }
            .top {
                height: 45px;
                margin-bottom: 5px;
                font-size: 32px;
                color: #051426;
            }
            .bottom {
                height: 40px;
                font-size: 28px;
                color: #A3AEBA;
            }
        }
    }
    .non {
        margin-top: 110px;
        text-align: center;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #9b9b9b;
        img {
            width: 290px;
            height: 396px;
        }
    }
}
</style>
