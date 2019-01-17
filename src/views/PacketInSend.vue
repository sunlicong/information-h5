<template>
    <div class="PacketInSend">
        <ul>
            <li v-for="(item,index) in packetList" :key="index">
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
