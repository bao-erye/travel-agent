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
                            placeholder="全部显示">
                        <el-option label="发表用户" value="1"></el-option>
                        <el-option label="评价内容" value="2"></el-option>
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
                    <el-table-column prop="id" label="产品编号"  align="center" width="75px"></el-table-column>
                    <el-table-column prop="goodsName" label="产品名称"  align="center" ></el-table-column>
                    <el-table-column prop="userName" label="发表用户"  align="center" ></el-table-column>
                    <el-table-column prop="score" label="评分"  align="center"  width="50px"></el-table-column>
                    <el-table-column prop="content" label="评价描述"  align="center" width="200px"></el-table-column>
                    <el-table-column label="行程安排"  align="center">
                        <template scope="scope">
                            {{scoreList[scope.row.schedule-1]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="导游服务"  align="center">
                        <template scope="scope">
                            {{scoreList[scope.row.guide-1]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="住宿体验"  align="center">
                        <template scope="scope">
                            {{scoreList[scope.row.sleep-1]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="餐食质量"  align="center">
                        <template scope="scope">
                            {{scoreList[scope.row.food-1]}}
                        </template>
                    </el-table-column>
                    <el-table-column label="景区质量"  align="center">
                        <template scope="scope">
                            {{scoreList[scope.row.scenery-1]}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="65px" align="center">
                        <template>
                            <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 回复弹框 -->
                <!-- <el-dialog
                    title="回复"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input type="textarea"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog> -->
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
import { Form } from 'element-ui';
    import api from '../../utils/api';

    export default {
        name: 'ConstantList',
        data() {
            return {
                dialogVisible: false,
                query: {
                    goodsId: 1,
                    userName: '',
                    content: '',
                    current: 1,
                    size: 4
                },
                tableData: [],
                pageTotal: 1,
                isLoading: false,
                search_key_word: '',
                searchType: '',
                scoreList: ['较差','一般','较满意','满意','非常满意'],
                //5非常满意，4满意，3较满意，2一般，1较差

            };
        },
        created() {
            if(this.$route.params.id != null){
                    this.query.goodsId = this.$route.params.id;
                    this.getCommentByQuery()
                }
        },
        watch:{
            "$route":function(to,from){
                if(this.$route.params.id != null){
                    this.query.goodsId = this.$route.params.id;
                    this.getCommentByQuery()
                }
                
                
            //from 对象中包含当前地址
            //to 对象中包含目标地址
            //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
            }
        },
        methods: {
            getCommentByQuery() {
                this.api.getCommentByQuery(this.query).then(res => {
                    console.log(res)
                    if(res.code=="200"){
                        this.$message.success("成功获取评价列表")
                        this.tableData = res.data.data
                        this.pageTotal = res.data.total
                    }else{
                        this.$message.error("获取评价列表失败")
                    }
                })
            },
            initQuery() {
                this.userName = ''
                this.content = ''
            },
            // 获得搜索结果
            getSearchResult() {
                this.initQuery();
                if(this.searchType == 1){
                    this.query.userName = this.search_key_word;
                }else if(this.searchType == 2){
                    this.query.content = this.search_key_word;
                }
                this.getCommentByQuery();

            },
            // 分页点击事件
            handlePageChange() {
                this.getCommentByQuery()
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
    .user-avatar{
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin:10px auto;
    }
</style>