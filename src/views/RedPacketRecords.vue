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
                    <strong>{{getList.tRXAmountSum}}</strong>
                    <b>TRX</b>
                </li>
                <li class="rmb">
                    <strong>{{getList.amountSum}}</strong>
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
                            <span>{{item.createTime.slice(11,19)}}</span>
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
                        <span>{{item.createTime.slice(11,19)}}</span>
                        <span>已领完{{item.receivedCounts}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RedPacketRecords',
    data () {
        return {
            type: 'get',
            getList: '',
            sendList: ''
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
                console.log(res.data.data)
                this.getList = res.data.data
            })
        },
        sendPacketList () {
            this.$axios({
                url: '/blockchain/v1/redpack/extendRecords',
                method: 'get'
            })
            .then(res => {
                console.log(res.data.data)
                this.sendList = res.data.data
            })
        },
        changeType (type) {
            this.type = type
            this.getUser()
        },
        goDetail (id) {
            this.$router.push({path: '/GetRedPacket', query: {redpackId: id}});
        }
    }
}
</script>

<style lang="less" scoped>
.RedPacketRecords {
    background-color: #fff;
    .TabBar>ul {
        width: 100%;
        height: 1.3rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
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
                    font-size: .85rem;
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
        margin: 0 .4rem;
        padding: .4rem 0;
        ul>li {
            width: 100%;
            height: 1.73rem;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            .userAvantar {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            .info {
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                .top {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    span {
                        font-size: .43rem;
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
                .top,.bottom {
                    height: .6rem;
                    margin-left: .1rem;
                    align-items: center;
                }
            }
        }
    }
    .send_list {
        ul {
            margin: 0 .4rem;
            padding: .25rem 0;
            div {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
            }
            .top {
                font-size: .43rem;
                color: #051426;
            }
            .bottom {
                margin-top: .1rem;
                font-size: .37rem;
                color: #A3AEBA;
            }
        }
    }
}
</style>
