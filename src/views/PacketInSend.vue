<template>
    <div class="PacketInSend">
        <div class="PacketInSend_list">
            <ul v-if="packetList.length > 0">
                <li v-for="item in packetList" @click="goDetail(item.redpackId)" :key="item.redpackId">
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
        <div class="non" v-if="packetList.length === 0">
            <img src="~@/assets/image/img_non.png">
            <div>暂时还没有数据哦～</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PacketInSend",
    data () {
        return {
            packetList: ''
        }
    },
    mounted () {
        this.getPacketList()
    },
    methods: {
        getPacketList () {
            this.$axios({
                url: '/blockchain/v1/redpack/extendingRecords',
                method: 'get'
            })
            .then(res => {
                console.log(res.data.data)
                this.packetList = res.data.data
            })
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
.PacketInSend {
    .PacketInSend_list {
        background-color: #fff;
        ul {
            margin: 0 .4rem;
            li {
                height: 130px;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                border-bottom: 1px solid #fafafa;
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
