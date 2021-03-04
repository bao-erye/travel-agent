<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-files"></i> 产品评价
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 操作菜单区域 -->
            <div class="handle-box">
                <el-input style="width: 510px;" placeholder="请输入内容" v-model="search_key_word" class="input-with-select" clearable>
                    <el-select style="width: 120px;"  v-model="searchType" slot="prepend"
                            placeholder="选择类型" @change="getSearchType">
                        <el-option label="显示全部" value=""></el-option>
                        <el-option label="产品编号" value="1"></el-option>
                        <el-option label="产品名称" value="2"></el-option>
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
                        class="table"
                        ref="multipleTable"
                >
                    <el-table-column prop="id" label="产品编号" width="80" align="center"></el-table-column>
                    <el-table-column prop="name" label="产品名称" width="300" align="center"></el-table-column>
                    <el-table-column prop="comments" label="评价总数"  align="center"></el-table-column>
                    <el-table-column prop="score" label="总体评分"  align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120" align="center">
                        <template scope="scope">
                            <router-link :to="{ name: 'travelEvaDetails', params: { id: goodsId }}">
                                <el-button type="text" icon="el-icon-view" @click="setGoodsId(scope.$index,scope.row.id)">查看所有评价</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
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
        </div>
    </div>
</template>
<script>
    import api from '../../utils/api';

    export default {
        name: 'ConstantList',
        data() {
            return {
                userInfo: {},
                query: {
                    supplierId: '',
                    goodsId: '',
                    name: '',
                    current: 1,
                    size: 4
                },
                tableData: [],// 表格数据
                pageTotal: 10,// 总条数
                isLoading: false,
                searchType: '',
                search_key_word: '',
                goodsId: 1, //选中的商品ID
            };
        },
        created() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.query.supplierId = this.userInfo.id
            this.getGoodsList();//获取商品列表
        },
        methods: {
            // 获取商品
            getGoodsList() {
                this.isLoading = true;
                var that = this;
                console.log(that.query)
                that.api.getGoodsComments(that.query).then(res => {
                    console.log(res)
                    if(res.code=="200") {
                        that.pageTotal = res.data.total
                        that.tableData = res.data.records
                        that.isLoading = false
                        
                    }else {
                        this.$message.error(res.messsage)
                    }
                    
                })
            },
            getSearchType(e) {
                
            },
            // 搜索点击事件
            getSearchResult() {
                this.initQuery();
                if(this.searchType == 1){
                    this.query.goodsId = this.search_key_word;
                }else if(this.searchType == 2){
                    this.query.name = this.search_key_word;
                }
                this.getGoodsList();
            },
            initQuery() {
                this.query.goodsId = '';
                this.query.name = '';
            },
            handlePageChange(val, e) {
                this.getGoodsList()
            },
            // 设置跳转商品ID
            setGoodsId(index, id) {
                this.goodsId = id
            }
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
</style>