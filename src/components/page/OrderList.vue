<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-files"></i> 订单管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作区域 -->
            <div class="handle-box">
                <el-select v-model="show_state" placeholder="显示全部" class="handle-select mr10" 
                @change="getShowState" style="width:130px">
                    <el-option key="" label="显示全部" value=""></el-option>
                    <el-option key="1" label="待付款" value="1"></el-option>
                    <el-option key="2" label="待接单" value="2"></el-option>
                    <el-option key="3" label="待出行" value="3"></el-option>
                    <el-option key="4" label="已完成" value="4"></el-option>
                    <el-option key="5" label="退款申请" value="5"></el-option>
                    <el-option key="6" label="取消退款申请" value="6"></el-option>
                </el-select>
                <el-input style="margin-left: 30px;width: 500px;" placeholder="请输入内容" v-model="search_key_word"
                        class="input-with-select" clearable >
                    <el-select style="width:110px"  v-model="searchType" slot="prepend"
                            placeholder="选择类型" @change="getSearchType">
                        <el-option label="订单编号" value="0"></el-option>
                        <el-option label="产品名称"  value="1"></el-option>
                        <el-option label="联系人" value="2"></el-option>
                        <el-option label="下单用户" value="3"></el-option>
                        
                        
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <!-- 表格区域 -->
            <div>
                <el-table
                        :data="tableData"
                        v-loading="isLoading"
                        border
                        ref="multipleTable"
                >
                    <el-table-column prop="id" label="编号" width="80" align="center"></el-table-column>
                    <el-table-column prop="userName" label="下单用户" width="80" align="center"></el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" width="240" align="center"></el-table-column>
                    <el-table-column prop="adultSum" label="成人" width="90" align="center"></el-table-column>
                    <el-table-column prop="childSum" label="儿童" width="90" align="center"></el-table-column>
                    <el-table-column prop="contactName"  label="联系人" width="140" align="center">
                        <template slot-scope="scope">
                            <ul>
                                <li style="list-style: none">
                                    {{scope.row.contactName}}{{scope.row.contactPhone}}
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="出行人" width="140" align="center">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="(item, index) in scope.row.passengerList" :key="index" style="list-style: none">
                                    {{item.name}}{{item.phone}}
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间" align="center">
                        <template slot-scope="scope">
                            {{new Date(scope.row.createTime).toLocaleString()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="订单状态" width="150" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.state === 4?'success':'primary'"
                                    :style="scope.row.state === 4?'cursor: pointer':''"
                                    @click="handleRefund(scope.row)"
                            >{{handleTags(scope.row)}}
                            </el-tag>
                        
                        </template>
                    </el-table-column>
                    <!-- 表格操作区域 -->
                    <el-table-column fixed="right" label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <!-- 接单操作 -->
                        <el-button v-if="scope.row.state == 2" type="text" style="color:#67C23A" icon="el-icon-receiving primary" @click="receiveOrder(scope.row.id)">接单</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-receiving primary">接单</el-button>
                        <!-- 拒绝接单操作 -->
                        <el-button v-if="scope.row.state == 2" type="text" style="color:#67C23A" icon="el-icon-close danger" @click="refuseOrder(scope.row.id)">拒绝接单</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-close danger">拒绝接单</el-button>
                        <!-- 退款操作 -->
                        <el-button v-if="scope.row.state == 5" type="text" style="color:#67C23A" icon="el-icon-receiving primary" @click="receiveMoney(scope.row.id)">退款</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-receiving primary">退款</el-button>
                        <!-- 拒绝接单操作 -->
                        <el-button v-if="scope.row.state == 5" type="text" style="color:#67C23A" icon="el-icon-close danger" @click="refuseMoney(scope.row.id)">拒绝退款</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-close danger">拒绝退款</el-button>
                        <!-- 编辑 -->
                        <el-button v-if="scope.row.state == 3" type="text" style="color:#409EFF" icon="el-icon-edit wrong" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-edit wrong">编辑</el-button>
                        <!-- 删除 -->
                        <el-button v-if="scope.row.state == 4" type="text" style="color:#F56C6C" icon="el-icon-delete" @click="handleDelete(scope.row.id)" >删除 </el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-delete" >删除 </el-button>
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
                <!-- 订单编辑弹框 -->
                <el-dialog :title="handleName" :visible.sync="editVisible" width="40%">
                    <el-form ref="form" :model="editForm" label-width="130px">
                        <el-form-item label="成人数量">
                            <el-input v-model="editForm.adultSum"></el-input>
                        </el-form-item>
                        <el-form-item label="儿童数量">
                            <el-input v-model="editForm.childSum"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <el-input v-model="editForm.contactName"></el-input>
                        </el-form-item>  
                        <el-form-item label="联系人电话">
                            <el-input v-model="editForm.contactPhone"></el-input>
                        </el-form-item>   
                        <!-- <el-form-item label="出行人">
                            <el-input v-model="form.provider"></el-input>
                        </el-form-item>  
                        <el-form-item label="出行人电话">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>                 -->
                        
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../utils/api';

    export default {
        name: 'OrderList',
        data() {
            return {
                userInfo: {},
                query: {
                    supplierId: '',// 页面初始化时即赋值
                    orderId: '',
                    goodsName: '',
                    contactName: '',
                    state: '',
                    userName: '',
                    current: 1,
                    size: 4
                    // pageIndex: 1,
                    // pageSize: 10
                },
                pageTotal: 0,//分页显示总数
                handleName: '',
                show_state: '',// 绑定选择的状态值
                searchType: '',// 绑定选择的搜索类型
                search_key_word: '',//绑定搜索输入框内容
                editVisible:false,
                // 表格数据
                tableData: [
                ],
                isLoading: false,//控制显示加载中
                // 订单状态
                stateList: ['待付款', '待接单', '待出行', '已完成', '退款申请', '取消退款申请'],
                editForm: {},//商品编辑弹框
                
            };
        },
        created(){
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.query.supplierId = this.userInfo.id
            this.getOrderList();//获取订单列表
        },
        methods: {
            // 获取订单列表
            getOrderList() {
                this.api.getOrderList(this.query).then( res => {
                    console.log(res)
                    if(res.code=="200"){
                        this.isLoading = false
                        this.$message.success("成功获取订单列表")
                        this.tableData = res.data.data
                        this.pageTotal = res.data.total
                        if(this.tableData != null) {
                            this.tableData.forEach(item => {
                                this.api.getPassenger({orderId: item.id}).then(response => {
                                    if(response.code=="200"){
                                        item.passengerList = response.data
                                    }else {
                                        this.$message.error("获取旅客信息列表失败")
                                    }
                                })
                            })
                            
                        }
                    }else{
                        this.$message.error("获取订单列表失败")
                    }
                })
            },
            // 分页导航点击事件
            handlePageChange(val, e) {
                this.$set(this.query, 'current', val);
                this.getOrderList()

            },
            // 正确显示订单状态
            handleTags(data) {
                return this.stateList[data.state - 1];
            },
            // 接单处理
            receiveOrder(id){
                var msg = '确认接单?';
                var tp = '接单提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.api.updateState({orderId:id,state:'3'}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            this.$message.success("成功接单")
                            this.getOrderList()
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            // 拒绝接单
            refuseOrder(id) {
                var msg = '确认拒绝接单?';
                var tp = '接单提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.api.updateState({orderId:id,state:'4'}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            this.getOrderList()
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            // 退款
            receiveMoney(id) {
                var msg = '确认退款?';
                var tp = '退款提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.api.updateState({orderId:id,state:'4'}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            this.getOrderList()
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            // 拒绝退款
            refuseMoney(id) {
                var msg = '确认拒绝退款?';
                var tp = '接单提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.api.updateState({orderId:id,state:'4'}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            this.getOrderList()
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            // 编辑操作
            handleEdit(index, row) {
                this.handleName = '编辑订单';
                this.editVisible = true;
                this.editForm = row
            },
            // 提交编辑
            saveEdit() {
                var that = this
                that.api.updateOrder(that.editForm).then(res => {
                    if(res.code=="200"){
                        that.$message.success("更新成功")
                        
                    }else{
                        that.$message.error(res.message)
                    }
                })
                that.getOrderList()
                that.editVisible = false
            },
            // 删除操作
            handleDelete(id) {
                var msg = '确认删除？删除后将不可恢复！';
                var tp = '删除提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.api.deleteOrder({orderId:id}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            that.getOrderList()
                        }else{
                            that.$message.error(res.message)
                        }
                    })
                })
            },
            // 获取改变的状态选择值
            getShowState(e) {
                this.query.state = e
                this.isLoading = true
                this.getOrderList()

            },
            // 获取改变的搜索选择值
            getSearchType(e) {
            },
            // 搜索按钮
            search() {
                this.initQuery()
                if(this.searchType == '0') {
                    this.query.orderId = this.search_key_word
                }else if(this.searchType == '1') {
                    this.query.goodsName = this.search_key_word
                }else if(this.searchType == '2') {
                    this.query.contactName = this.search_key_word
                }else if(this.searchType == '3') {
                    this.query.userName = this.search_key_word
                }
                this.isLoading = true
                this.getOrderList()
            },
            initQuery() {
                this.query.orderId = ''
                this.query.goodsName = ''
                this.query.contactName = ''
                this.query.userName = ''
                this.current = 1
                this.size = 4
            }
        }
    };
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
        display: flex;
    }

    .dialog-footer {
        right: 30px;
    }
</style>
