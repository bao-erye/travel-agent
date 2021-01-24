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
                            placeholder="产品编号" @change="getSearchType">
                        <el-option label="产品名称" value="1"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" ></el-button>
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
                        @select="handleSelection"
                        @select-all="handleSelection"
                >
                    <el-table-column prop="id" label="编号"  align="center" width="50px"></el-table-column>
                    <el-table-column prop="cpbh" label="产品编号"  align="center"></el-table-column>
                    <el-table-column prop="cpmc" label="产品名称"  align="center"></el-table-column>
                    <el-table-column  label="发表用户"  align="center">
                        <template slot-scope="scope">
                            <div style="flex:display;justify-content:center;align-items:center;">
                                <div>{{scope.row.fbyh}}</div>
                                <img :src="avatar" class="user-avatar" alt />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pf" label="评分"  align="center"></el-table-column>
                    <el-table-column prop="pjms" label="评价描述"  align="center"></el-table-column>
                    <el-table-column prop="xcap" label="行程安排"  align="center"></el-table-column>
                    <el-table-column prop="dyfw" label="导游服务"  align="center"></el-table-column>
                    <el-table-column prop="zsty" label="住宿体验"  align="center"></el-table-column>
                    <el-table-column prop="cszl" label="餐食质量"  align="center"></el-table-column>
                    <el-table-column prop="jqzl" label="景区质量"  align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="65px" align="center">
                        <template>
                            <!-- <el-button type="text" icon="el-icon-view" @click="dialogVisible = true">回复</el-button> -->
                            <el-button type="text" icon="el-icon-delete" class="red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    title="回复"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input type="textarea"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
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
                dialogVisible: false,
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [
                    {
                        id:"1",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        fbyh:"13476818230",
                        pf:"5.5",
                        pjms:"风景很好，下次再来",
                        xcap:"非洲满意",
                        dyfw:"满意",
                        zsty:"较满意",
                        cszl:"一般",
                        jqzl:"较差",
                        lyjt:"极差"
                    },
                    {
                        id:"2",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        fbyh:"13476818230",
                        avatar:"",
                        pf:"5.5",
                        pjms:"风景很好，下次再来",
                        xcap:"非洲满意",
                        dyfw:"满意",
                        zsty:"较满意",
                        cszl:"一般",
                        jqzl:"较差",
                        lyjt:"极差"
                    },
                    {
                        id:"3",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        fbyh:"13476818230",
                        pf:"5.5",
                        pjms:"风景很好，下次再来",
                        xcap:"非洲满意",
                        dyfw:"满意",
                        zsty:"较满意",
                        cszl:"一般",
                        jqzl:"较差",
                        lyjt:"极差"
                    },
                    {
                        id:"4",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        fbyh:"13476818230",
                        pf:"5.5",
                        pjms:"风景很好，下次再来",
                        xcap:"非洲满意",
                        dyfw:"满意",
                        zsty:"较满意",
                        cszl:"一般",
                        jqzl:"较差",
                        lyjt:"极差"
                    },
                    {
                        id:"5",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        fbyh:"13476818230",
                        pf:"5.5",
                        pjms:"风景很好，下次再来",
                        xcap:"非洲满意",
                        dyfw:"满意",
                        zsty:"较满意",
                        cszl:"一般",
                        jqzl:"较差",
                        lyjt:"极差"
                    }
                ],
                pageTotal: 10,
                isLoading: false,
            };
        },
        computed:{
            avatar(){
                let avatar = JSON.parse(localStorage.getItem('userInfo')).avatar;
                return avatar ? this.base_api_url + avatar : this.init_avatar;
            },
        },
        methods: {
        
        },
        created() {
            // this.pageInit();
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