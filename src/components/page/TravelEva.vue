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
                        @select="handleSelection"
                        @select-all="handleSelection"
                >
                    <el-table-column prop="id" label="编号"  align="center" width="50px"></el-table-column>
                    <el-table-column prop="cpbh" label="产品编号"  align="center"></el-table-column>
                    <el-table-column prop="cpmc" label="产品名称"  align="center"></el-table-column>
                    <el-table-column prop="pjzs" label="评价总数"  align="center"></el-table-column>
                    <el-table-column prop="ztpf" label="总体评分"  align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120" align="center">
                        <template>
                            <router-link to="/travelEvaDetails">
                                <el-button type="text" icon="el-icon-view">查看所有评价</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
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
                        pjzs:"120",
                        ztpf:"5.5",
                    },
                    {
                        id:"2",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        pjzs:"120",
                        ztpf:"5.5",
                    },
                    {
                        id:"3",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        pjzs:"120",
                        ztpf:"5.5",
                    },
                    {
                        id:"4",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        pjzs:"120",
                        ztpf:"5.5",
                    },
                    {
                        id:"5",
                        cpbh:"926622631MA6Fe4NB55Y",
                        cpmc:"三亚春节热售 豪品0自费 印象丽江+洱海大邮轮+玉龙雪山",
                        pjzs:"120",
                        ztpf:"5.5",
                    }
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
                cityList: []
            };
        },
        methods: {
            getTableData() {
                this.isLoading = true;
                var that = this;
                api.getFeedBacks({
                    pageNum: that.query.pageIndex,
                    pageSize: that.query.pageSize
                }).then(res0 => {
                    res0.data.feedbacks.forEach(f => {
                        console.log(f);
                        f.user_nickname = res0.data.users[f.uid];
                    });
                    this.tableData = res0.data.feedbacks;
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
                var list = ['user_nickname', 'link_way', 'text', 'pb_time'];
                var that = this;
                this.query.pageIndex = 1;
                if (this.search_key_word) {
                    this.showType = 'searching';
                    api.searchSpecifiedFeedBacks({
                        attrName: list[this.searchType] || 'user_nickname',
                        attrValue: this.search_key_word,
                        pageNum: pageNum,
                        pageSize: that.query.pageSize
                    }).then(res => {
                        res.data.feedbacks.forEach(f => {
                            f.user_nickname = res.data.users[f.uid];
                        });
                        this.tableData = res.data.feedbacks;
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
</style>