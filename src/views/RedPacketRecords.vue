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
                <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epDEhCtkibl8pEHLaCr3XtO6mIbUGtM5uSEsiaorgFibmjc5D0icQAI4Jp0Fia8pExdca7O81zYFiaCcsyQ/132" alt="">
                <p class="one_line">1615q1w6d1561一共收到</p>
            </div>
            <ul class="money">
                <li class="trx">
                    <strong>0.77</strong>
                    <b>TRX</b>
                </li>
                <li class="rmb">
                    <strong>0.10</strong>
                    <b>元</b>
                </li>
            </ul>
            <ul class="totalPacket" v-if="type === 'get'">
                <li class="getPackets">
                    <span>收到红包</span>
                    <em>5个</em>
                </li>
                <li class="best">
                    <span>手气最佳</span>
                    <em>1个</em>
                </li>
            </ul>
            <div class="sendPacket" v-if="type === 'send'">
                <span>发出红包</span>
                <strong>5</strong>
                <em>个</em>
            </div>
        </div>
        <div class="get_list">
            <ul>
                <li>
                    <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epDEhCtkibl8pEHLaCr3XtO6mIbUGtM5uSEsiaorgFibmjc5D0icQAI4Jp0Fia8pExdca7O81zYFiaCcsyQ/132" alt="">
                    <div class="info">
                        <div class="top">
                            <span>小太阳<img src="../assets/image/pin.png"></span>
                            <span>0.1TRX</span>
                        </div>
                        <div class="bottom">
                            <span>17:54:30</span>
                        </div>
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
            type: 'get'
        }
    },
    methods: {
        changeType (type) {
            this.type = type
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
}
</style>
