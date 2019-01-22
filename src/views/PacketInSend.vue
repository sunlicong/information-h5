<template>
    <div class="PacketInSend">
        <ul>
            <li v-for="item in packetList" @click="goDetail(item.redpackId)" :key="item.redpackId">
                <div class="top">
                    <span v-if="item.type === 1">拼手气红包</span>
                    <span v-if="item.type === 2">普通红包</span>
                    <span v-if="item.asset_type === 1">{{item.tRXAmountSum}}TRX</span>
                    <span v-if="item.asset_type === 2">{{item.amountSum}}元</span>
                </div>
                <div class="bottom">
                    <span>{{item.createTime.slice(11,19)}}</span>
                    <span>{{item.receivedStatus}}{{item.receivedCounts}}</span>
                </div>
            </li>
        </ul>
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
            this.$router.push({path: '/GetRedPacket', query: {redpackId: id}});
        }
    }
}
</script>

<style lang="less" scoped>
.PacketInSend {
    background-color: #fff;
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
</style>
