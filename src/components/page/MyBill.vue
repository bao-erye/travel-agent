<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item> <i class="el-icon-files"></i> 我的账单 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="余额" name="first">
                        <div style="margin-top:20px;margin-bottom:30px;font-size:25px">
                            ￥599
                        </div>
                        <el-button class="editor-btn" type="primary" @click="submit">提现</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="已结算" name="second">
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
                                <el-table-column prop="id" label="编号" width="50" align="center"></el-table-column>
                                <el-table-column prop="user_nickname" label="订单编号"  align="center"></el-table-column>
                                <el-table-column prop="title" label="产品名称" align="center"></el-table-column>
                                <el-table-column prop="adult_num" label="下单时间" align="center"></el-table-column>
                                <el-table-column prop="child_num" label="订单总价" align="center"></el-table-column>
                                <el-table-column prop="child_num" label="实付款" align="center"></el-table-column>
                                <el-table-column prop="child_num" label="实际收入"  align="center"></el-table-column>
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
export default {
    name: 'ConstantList',
    components: {
        quillEditor
    },
    data() {
        return {
            activeName: 'first',
            content1: '1、全程住4星，餐标35元，9菜一汤，7个以上荤菜2、不用起早，休闲游玩\n3、赠送刘三姐歌舞表演',
            content2: '1、全程住4星，餐标35元，9菜一汤，7个以上荤菜2、不用起早，休闲游玩\n3、赠送刘三姐歌舞表演',
            content3:
                '费用包含: 1旅游意外险： 为保障您的出行安全，途牛免费赠送您旅游意外险。 查看保障内容2交通： 当地旅游巴士3住宿： 行程所列酒店。4用餐： 行程中团队标准用餐，2早4正餐（早餐餐标6元/人，正餐餐标25元/人）（中式餐或自助餐或特色餐，自由活动期间  ',
            content4: '适合年龄:XXXXXXXXXXXXXXXXXXXX提供资料XXXXXXXXXXXXXXXXXXXX',
            content5:
                '游客违约责任:下单后，团队出票，机票、列车票、船票、包括汽车位空置等，不得更改、签转、退票。否则有票损或者汽车费用摊派。因此，如游客发生撤单行为，提前 天撤单，违约金扣款  %，提前 天撤单，违约金扣款  %，提前 天撤单，违约金扣款  %。（填写3项）',
            content6:
                '因本网站仅仅为交易双方提供交易平台，因此，如有投诉或纠纷，一切经济和法律事宜，与本网站无关。但本平台将积极为游客提供力所能及的便利！',
            editorOption: {
                placeholder: 'Hello World'
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            pageTotal: 10,
            isLoading: false
        };
    },
    computed: {
        avatar() {
            let avatar = JSON.parse(localStorage.getItem('userInfo')).avatar;
            return avatar ? this.base_api_url + avatar : this.init_avatar;
        }
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
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
.user-avatar {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 10px auto;
}
</style>
