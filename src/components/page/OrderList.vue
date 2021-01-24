/**
* @Description: 订单显示
* @Author: TankNee
* @Date: 2/24/2020 7:45 PM
**/
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
                    <el-option key="0" label="显示全部" value="0"></el-option>
                    <el-option key="1" label="待接单" value="1"></el-option>
                    <el-option key="2" label="已接单" value="2"></el-option>
                    <el-option key="3" label="已完成" value="3"></el-option>
                    <el-option key="4" label="退款单" value="4"></el-option>
                    <el-option key="5" label="申诉单" value="5"></el-option>
                </el-select>
                <el-input style="margin-left: 30px;width: 500px;" placeholder="请输入内容" v-model="search_key_word"
                        class="input-with-select" clearable >
                    <el-select style="width:110px"  v-model="searchType" slot="prepend"
                            placeholder="下单用户" @change="getSearchType">
                        <el-option label="下单用户" value="0"></el-option>
                        <el-option label="产品名称"  value="1"></el-option>
                        <el-option label="下单时间" value="2"></el-option>
                        <el-option label="处理时间" value="3"></el-option>
                        <el-option label="联系人" value="4"></el-option>
                        <el-option label="出行人" value="5"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getSearchResult"></el-button>
                </el-input>
            </div>
            <!-- 表格区域 -->
            <div>
                <el-table
                        :data="tableData"
                        v-loading="isLoading"
                        border
                        ref="multipleTable"
                        @select="handleSelection"
                        @select-all="handleSelection"
                >
                    <el-table-column prop="id" label="编号" width="80" align="center"></el-table-column>
                    <el-table-column prop="user_nickname" label="下单用户" width="80" align="center"></el-table-column>
                    <el-table-column prop="title" label="产品名称" width="240" align="center"></el-table-column>
                    <el-table-column prop="adult_num" label="成人" width="90" align="center"></el-table-column>
                    <el-table-column prop="child_num" label="儿童" width="90" align="center"></el-table-column>
                    <el-table-column prop="link_man"  label="联系人" width="140" align="center">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="linkMan in scope.row.link_man" :key="linkMan" style="list-style: none">
                                    {{linkMan.name}}{{handleSensitive(linkMan.mobile)}}
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column prop="passenger_ids" label="出行人" width="140" align="center">
                        <template slot-scope="scope">
                            <ul>
                                <li v-for="pa in scope.row.passengers" :key="pa" style="list-style: none">
                                    {{pa.name}}{{handleSensitive(pa.mobile)}}
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_time" label="下单时间" align="center">
                        <template slot-scope="scope">
                            {{new Date(scope.row.order_time).toLocaleString()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="订单状态" width="150" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.state === 6?'primary':'success'"
                                    :style="scope.row.state === 6?'cursor: pointer':''"
                                    @click="handleRefund(scope.row)"
                            >{{handleTags(scope.row)}}
                            </el-tag>
                        
                        </template>
                    </el-table-column>
                    <!-- 表格操作区域 -->
                    <el-table-column fixed="right" label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                style="color:#67C23A"
                                icon="el-icon-receiving primary"
                                @click="handleRefund(scope.$index, scope.row)"
                        >接单
                        </el-button>
                        <el-button
                                type="text"
                                style="color:#E6A23C"
                                icon="el-icon-close danger"
                                @click="handleRefund(scope.$index, scope.row)"
                        >拒绝接单
                        </el-button>
                        <el-button
                                type="text"
                                style="color:#409EFF"
                                icon="el-icon-edit wrong"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                type="text"
                                style="color:#F56C6C"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 分页区域 -->
                <div class="pagination">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                    ></el-pagination>
                </div>
                <!-- 订单编辑弹框 -->
                <el-dialog :title="handleName" :visible.sync="editVisible" width="40%">
                    <el-form ref="form" :model="form" label-width="130px">
                        <el-form-item label="成人数量">
                            <el-input v-model="form.pro_number" @change="getProNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="儿童数量">
                            <el-input v-model="form.title" @change="getProTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人">
                            <el-input v-model="form.provider" @change="getProvider"></el-input>
                        </el-form-item>  
                        <el-form-item label="联系人电话">
                            <el-input v-model="form.title" @change="getProTitle"></el-input>
                        </el-form-item>   
                        <el-form-item label="出行人">
                            <el-input v-model="form.provider" @change="getProvider"></el-input>
                        </el-form-item>  
                        <el-form-item label="出行人电话">
                            <el-input v-model="form.title" @change="getProTitle"></el-input>
                        </el-form-item>                
                        
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
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                show_state: '',
                editVisible:false,
                tableData: [
                    {
                        id:1,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"2",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:2,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"2",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:3,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"3",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:4,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"4",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:5,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"5",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:6,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"6",
                        order_time:"2020-06-10 10:22:33",
                    },
                    {
                        id:7,
                        user_nickname:"ty",
                        title:'三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山',
                        adult_num:"1",
                        child_num:"2",
                        little_child_num:"3",
                        link_man:[
                            {name:"XXX",mobile:"123863474"}
                        ],
                        passengers:[
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"},
                            {name:"XXX",mobile:"123863474"}
                        ],
                        state:"7",
                        order_time:"2020-06-10 10:22:33",
                    },
                    
                ],
                pageTotal: 10,
                isLoading: false,
                categoryList: [],
                categoryIdMap: {},
                handleTitle: '',
                form: {},
                searchType: '',
                search_key_word: '',
                showType: 'normalData',
                cityList: [],
                stateList: ['待付款', '待接单', '已接单', '已完成', '退款申请', '取消订单申请', '申诉处理']
            };
        },
        methods: {
            // 编辑操作
            handleEdit(index, row) {
                this.handleName = '编辑订单';
                this.editVisible = true;
            },
            handleSensitive(number) {
                return number.replace(number.substring(3, 7), '****');
            },
            handleTags(data) {
                return this.stateList[data.state - 1];
            },
            handleRefund(data) {
                if(data.state == 2){
                    this.$confirm('确认接单', '提示', {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '接受',
                    cancelButtonText: '拒绝'
                    })
                        .then(() => {

                        })
                        .catch(action => {
                            this.$message({
                                type: 'info',
                                message: action === 'cancel'
                                    ? '已拒绝'
                                    : '已接单'
                            })
                        });
                }
                if(data.state == 3){
                    this.$confirm('发送出团通知', '提示', {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                    })
                        .then(() => {

                        })
                        .catch(action => {
                            this.$message({
                                type: 'info',
                                message: action === 'cancel'
                                    ? '已取消'
                                    : '已发送'
                            })
                        });
                }
                if(data.state == 5){
                    this.$confirm('是否同意退款', '提示', {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '是',
                    cancelButtonText: '否'
                    })
                        .then(() => {

                        })
                        .catch(action => {
                            this.$message({
                                type: 'info',
                                message: action === 'cancel'
                                    ? '已拒绝退款'
                                    : '已同意退款'
                            })
                        });
                }
                if (data.state !== 6) {
                    return;
                }
                this.$confirm('是否接受退款申请', '提示', {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '接受',
                    cancelButtonText: '拒绝'
                })
                    .then(() => {

                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '拒绝退款'
                                : '关闭页面'
                        })
                    });
            },
            getShowState(e) {
                if (parseInt(e) === 0) {
                    this.isLoading = true;
                    this.getTableData();
                    this.isLoading = false;
                } else {
                    api.searchSpecifiedOrder({
                        attrName: 'state',
                        attrValue: e,
                        pageNum: this.query.pageIndex,
                        pageSize: this.query.pageSize
                    }).then(res => {
                        this.tableData = res.data.orders;
                        this.pageTotal = res.data.total;
                        this.isLoading = false;
                    });
                }

            },
            getTableData() {
                this.isLoading = true;
                var that = this;
                api.getOrderList({
                    pageNum: that.query.pageIndex,
                    pageSize: that.query.pageSize
                }).then(res0 => {
                    this.tableData = res0.data.orders;
                    this.pageTotal = res0.data.total;
                    this.isLoading = false;
                    console.log(this.form);
                }).catch(err => {
                    console.log(err);
                });
            },
            handleSelection(e) {
                console.log(e);
            },
            handlePageChange(val, e) {
                this.$set(this.query, 'pageIndex', val);
                if (this.showType === 'normalData') {
                    this.getTableData();
                } else {
                    this.getSearchResult(e, val);
                }

            },
            getSearchType(e) {

            },
            getSearchResult(e, pageNum = this.query.pageIndex) {
                this.isLoading = true;
                var list = ['user_nickname', 'title', 'order_time', 'deal_time', 'linkMan', 'passenger'];
                var that = this;
                this.query.pageIndex = 1;
                if (this.search_key_word) {
                    this.showType = 'searching';
                    api.searchSpecifiedOrder({
                        attrName: list[this.searchType] || 'user_nickname',
                        attrValue: this.search_key_word,
                        pageNum: pageNum,
                        pageSize: that.query.pageSize
                    }).then(res => {
                        this.tableData = res.data.orders;
                        this.pageTotal = res.data.total;
                        this.isLoading = false;
                    });

                } else {
                    this.showType = 'normal';
                    this.$message.error('请输入搜索内容');
                    this.query.pageIndex = 1;
                    this.getTableData();
                    this.isLoading = false;
                }
                console.log(this.showType);

            },
            //数组去重
            uniArr(arr) {
                var obj = {};
                var new_arr = arr.reduce(function(prev, element) {
                    if (!prev.find(el => el.category_con_id == element.category_con_id)) {
                        prev.push(element);
                    }
                    return prev;
                }, []);
                return new_arr;
            },
            //初始化城市列表
            initCity(cityList) {
                var cl = [];
                cityList.forEach(c => {
                    var t = {
                        value: c.id,
                        label: c.city
                    };
                    cl.push(t);
                });
                return cl;
            },
            pageInit() {
                api.getAllCities().then(res => {
                    if (res.code === 200) {
                        this.cityList = this.initCity(res.data);
                        localStorage.setItem('cityList', JSON.stringify(this.cityList));
                    }
                }).catch(err => {
                    console.log(err);
                }).then(res => {
                    this.getTableData();
                });
            }
        },
        created() {
            //this.pageInit();
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
