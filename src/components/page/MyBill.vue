<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item> <i class="el-icon-files"></i> 我的账单 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="营业分析" name="first">
                        <div class="schart">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-card shadow="hover">
                                        <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                                    </el-card>
                                </el-col>
                                <el-col :span="12">
                                    <el-card shadow="hover">
                                        <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                                    </el-card>
                                </el-col>
                                
                            </el-row>
                        </div>
                        
                    </el-tab-pane>
                    <el-tab-pane label="财务详情" name="second">
                        <div style="margin-top:5px;margin-bottom:15px;font-size:18px">
                            总销售额：￥{{account}}
                        </div>
                        <!-- 表格区域 -->
                        <div>
                            <el-table
                                :data="tableData"
                                v-loading="isLoading"
                                border
                                ref="multipleTable"
                            >
                                <el-table-column prop="id" label="订单编号"  align="center" width="70px"></el-table-column>
                                <el-table-column prop="goodsName" label="产品名称" align="center"></el-table-column>
                                <el-table-column prop="createTime" label="下单时间" align="center">
                                    <template slot-scope="scope">
                                        {{new Date(scope.row.createTime).toLocaleString()}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="totalPrice" label="订单总价" align="center"></el-table-column>
                                <el-table-column label="优惠" align="center">
                                    <template scope="scope">
                                        {{scope.row.discount}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="实际收入"  align="center">
                                    <template scope="scope">
                                        {{scope.row.totalPrice - scope.row.discount}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 分页区域 -->
                            <div class="pagination">
                                <el-pagination
                                    background
                                    layout="total, prev, pager, next"
                                    :current-page="query.current"
                                    :page-size="query.size"
                                    :total="pageTotal"
                                    @current-change="handlePageChange"
                                ></el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>

                
            </div>
        </div>
    </div>
</template>
<script>
import api from '../../utils/api';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import Schart from 'vue-schart';
export default {
    name: 'ConstantList',
    components: {
        quillEditor
    },
    data() {
        return {
            userInfo: {},
            account: 0,//总销售额
            query: {
                supplierId: '',
                orderId: '',
                goodsName: '',
                contactName: '',
                state: '4',
                userName: '',
                current: 1,
                size: 7
            },
            tableData: [],
            pageTotal: 1,
            isLoading: false,

            activeName: 'first',
            editorOption: {
                placeholder: 'Hello World'
            },
            options: {
                type: 'pie',
                title: {
                    text: '各类产品销售额占比'
                },
                legend: {
                    position: 'left'
                },
                // xRorate: 25,
                labels: ['国内游产品', '周边游产品', '国外游产品', '特价游产品'],
                datasets: [
                    {
                        data: [1, 1, 1, 1]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近5个月销售额趋势图'
                },
                labels: ['X月', 'X月', 'X月', 'X月', 'X月'],
                datasets: [
                    {
                        label: '销售额',
                        data: [0, 0, 0, 0, 0]   
                    }
                ]
            }
        };
    },
    computed: {
    },
    components: {
        Schart
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.query.supplierId = this.userInfo.id
        this.account = this.userInfo.account
        this.getDone()
        this.getSumType()
        this.getSumMonth()
    },
    methods: {
        // 获取已结算订单
        getDone() {
            this.api.getOrderList(this.query).then(res => {
                console.log(res)
                    if(res.code=="200") {
                        this.pageTotal = res.data.total
                        this.tableData = res.data.data
                        this.account = res.data.sum
                    }else {
                        this.$message.error(res.message)
                    }
            })
        },
        // 获取各类产品销售额
        getSumType() {
            this.api.sumType().then(res => {
                console.log(res)
                    if(res.code=="200") {
                        this.options.datasets[0].data=res.data
                    }else {
                        this.$message.error(res.message)
                    }
            })
        },
        // 获取近几月销售额
        getSumMonth() {
            this.api.sumMonth().then(res => {
                console.log(res)
                    if(res.code=="200") {
                        this.options2.datasets[0].data=res.data.data
                        this.options2.labels = res.data.labels
                    }else {
                        this.$message.error(res.message)
                    }
            })
        },
        handlePageChange(e) {
            this.query.current = e
            this.getDone()
        },
        // 提现
        // submit() {
        //     var that = this;
        //     var msg = '提现后，钱款将于3-7个工作日到达您的银行账户';
        //     var tp = '提现提醒';
        //     this.$confirm(msg, tp, {
        //         distinguishCancelAndClose: true,
        //         type: 'warning',
        //         confirmButtonText: '确认',
        //         cancelButtonText: '取消'
        //     }).then(() => {
        //         this.api.cashout({supplierID:this.userInfo.id}).then(res => {
        //             console.log(res)
        //                 if(res.code=="200") {
        //                     this.$message.success("提现成功")
        //                     this.account = 0
        //                     this.userInfo.account = 0
        //                     localStorage.removeItem('userInfo');
        //                     localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        //                 }else {
        //                     this.$message.error(res.message)
        //                 }
        //         })
        //     })
            
        // }
    }
    
};
</script>
<style scoped>
.el-select .el-input {
    width: 130px;
}
.handle-box {
    margin-bottom: 20px;
    display: flex;
}

.dialog-footer {
    right: 30px;
}
.user-avatar {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px auto;
}
.schart{
    width: 100%;
    height: 350px;
    margin-top: 20px;
}
</style>
