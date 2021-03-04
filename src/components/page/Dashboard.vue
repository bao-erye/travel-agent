<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <el-card shadow="hover" class="mgb20" style="height:223px;">
                    <div class="user-info">
                        <img :src="iconUrl" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                    </div>
                    <div class="user-info-list">
                        {{new Date(userInfo.lastLoginTime).toLocaleString()}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="13">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numHistory}}</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-order grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numOrder}}</div>
                                    <div>订单总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numInland}}</div>
                                    <div>国内游产品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-4">
                                <i class="el-icon-orange grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numRim}}</div>
                                    <div>周边游产品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-5">
                                <i class="el-icon-ship grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numOut}}</div>
                                    <div>出境游产品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-6">
                                <i class="el-icon-present grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{numSpecial}}</div>
                                    <div>特价游产品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 热销榜 -->
            <el-col :span="6">
                <el-card shadow="hover" class="mgb20" style="height:223px;">
                    <div class="hot-img">
                        <img src="../../assets/img/hot.png" class="hot-img-detail"/>
                        热销榜
                    </div>
                    <div class="hot-item" v-for="(hot,index) in topList" :key="index">
                        <el-badge :value="hot.count" class="item">
                            {{hot.name}}
                        </el-badge>
                    </div>
                    
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            userInfo: '',//用户信息
            name:'',
            iconUrl: '',
            role: '您好,供应商',
            numHistory: 0,
            numOrder: 0,
            numInland: 0,
            numRim: 0,
            numOut: 0,
            numSpecial: 0,
            topList:[],// 热销榜
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各产品销售图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
                datasets: [
                    {
                        label: '国内游',
                        data: [0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: '周边游',
                        data: [0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: '出境游',
                        data: [0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        label: '特价游',
                        data: [0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各产品销售趋势图'
                },
                labels: ['X月', 'X月', 'X月', 'X月', 'X月'],
                datasets: [
                    {
                        label: '国内游',
                        data: [0, 0, 0, 0, 0]
                    },
                    {
                        label: '周边游',
                        data: [0, 0, 0, 0, 0]
                    },
                    {
                        label: '出境游',
                        data: [0, 0, 0, 0, 0]
                    },
                    {
                        label: '特价游',
                        data: [0, 0, 0, 0, 0]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.name = this.userInfo.name
        this.iconUrl = this.userInfo.iconUrl
        this.getCount() //获取商品数量
        this.getOrderCount() // 获取订单数量
        this.getHistoryCount() // 获取访问量
        this.getChartDay() // 获取一周各商品销量
        this.getChartMonth() // 获取几月各商品销量
        this.getTop()// 获取热销榜
    },
    methods: {
        // 获取商品数量
        getCount() {
            var that = this
            this.api.getCount({supplierId:that.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    this.numInland = res.data[0]
                    this.numRim = res.data[1]
                    this.numOut = res.data[2]
                    this.numSpecial = res.data[3]
                }else{
                    that.$message.error(res.message)
                }
            })
        },
        // 获取订单总量
        getOrderCount() {
            var that = this
            this.api.getOrderCount({supplierId:that.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.numOrder = res.data
                }else{
                    that.$message.error(res.message)
                }
            })
        },
        // 获取访问量
        getHistoryCount() {
            var that = this
            this.api.getHistoryCount({supplierId:that.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.numHistory = res.data
                }else{
                    that.$message.error(res.message)
                }
            })
        },
        // 获取一周各商品销量
        getChartDay() {
            var that = this
            this.api.getChartDay({supplierId:that.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    this.options.datasets=res.data
                }else{
                    that.$message.error(res.message)
                }
            })
        },
        // 获取一年各商品销量
        getChartMonth() {
            var that = this
            this.api.getChartMonth({supplierId:that.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    this.options2.labels=res.data.labels
                    this.options2.datasets=res.data.data
                }else{
                    that.$message.error(res.message)
                }
            })
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        // 获取热门景点top5
        getTop() {
            var that = this
            this.api.getTop().then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.topList = res.data
                }else{
                    that.$message.error(res.message)
                }
            })
        }

        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
    background: #9000ff;
}

.grid-con-4 .grid-num {
    color: #9000ff;
}

.grid-con-5 .grid-con-icon {
    background: #ec008c;
}

.grid-con-5 .grid-num {
    color: #ec008c;
}

.grid-con-6 .grid-con-icon {
    background: #ff9700;
}

.grid-con-6 .grid-num {
    color: #ff9700;
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
.hot-img{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    height: 30px;
    margin-bottom: 10px;
}
.hot-img-detail{
    width: 30px;
    height: 30px;
}
.hot-item{
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    height: 30px;
}
</style>
