<template>
    <div class="PacketInSend">
        <ul>
            <li>
                <div class="top">
                    <span>普通红包</span>
                    <span>0.1TRX</span>
                </div>
                <div class="bottom">
                    <span>17:54:30</span>
                    <span>已领完1/2</span>
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
