<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 产品列表 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 查询控件 -->
            <div class="handle-box">
                <el-button style="margin-left:0" type="primary" icon="el-icon-lx-add" class="handle-del" @click="handleAdd"
                    >新增产品
                </el-button>
                <el-select v-model="show_state" placeholder="显示全部" class="handle-select mr10" @change="getShowState">
                    <el-option key="1" label="显示全部" value="-1"></el-option>
                    <el-option key="2" label="上架中" value="1"></el-option>
                    <el-option key="3" label="已下架" value="0"></el-option>
                </el-select>

                <el-input placeholder="请输入内容" v-model="search_key_word" @input="get_key" class="input-with-select" clearable>
                    <el-select style="width: 110px;" v-model="searchType" slot="prepend" placeholder="产品编号" @change="getSearchType">
                        <el-option label="产品编号" value="1"></el-option>
                        <el-option label="产品名称" value="2"></el-option>
                        <el-option label="供应商" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                </el-input>
            </div>
            <!-- 商品列表 -->
            <el-table
                :data="tableData"
                v-loading="!load_over"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
                <el-table-column prop="pro_number" label="产品编号" width="120" align="center"></el-table-column>
                <el-table-column prop="title" label="产品名称" width="160" align="center"></el-table-column>
                <el-table-column prop="sales_volume" label="销量" width="90" align="center"></el-table-column>
                <el-table-column prop="eva_score" label="评分" width="60" align="center"></el-table-column>
                <el-table-column label="封面图" width="120" align="center">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 70px; height: 70px"
                            class="table-td-thumb"
                            :src="scope.row.avatar"
                            :preview-src-list="[scope.row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="provider" label="供应商" width="120" align="center"></el-table-column>
                <el-table-column label="服务保障" width="120" align="center">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.securityList" :key="item">{{ item }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="trip_days" label="行程天数" width="90" align="center"></el-table-column>
                <el-table-column label="详情图片" width="240" align="center">
                    <template slot-scope="scope">
                        <el-carousel :interval="4000" type="card" height="70px" indicator-position="none">
                            <el-carousel-item v-for="(img, i) in scope.row.imgList" :key="i">
                                <el-image style="width: 120px; height: 70px" class="table-td-thumb" :src="img"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </template>
                </el-table-column>
                <el-table-column label="交通类型" width="120" align="center">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.trafficList" :key="item">{{ item }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" width="120" label="出发地/目的地" align="center">
                    <template slot-scope="scope">{{ scope.row.start_city }}/{{ scope.row.end_city }}</template>
                </el-table-column>
                <el-table-column prop="through_address" width="120" label="途径地" align="center">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.through_address" :key="item">{{ item }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="价格/结算价格/类型" width="180" align="center">
                    <template slot-scope="scope">
                        <div>￥{{ scope.row.adult_price }}/￥900//成人</div>
                        <div>￥{{ scope.row.child_price }}/￥500//儿童</div>
                        <div>￥300/￥260//幼童</div>
                    </template>
                </el-table-column>
                <el-table-column label="有效日期" width="120" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.start_time }}
                        <br />
                        至
                        <br />
                        {{ scope.row.end_time }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="120" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? '上架中' : '已下架' }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-s-release" @click="dateVisible = true">发布</el-button>
                        <el-button
                            type="text"
                            :icon="scope.row.status ? 'el-icon-bottom' : 'el-icon-top'"
                            @click="handleTp(scope.row.status)"
                            >{{ scope.row.status ? '下架' : '上架' }}
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除
                        </el-button>
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

        <!-- 编辑商品和添加商品弹出框 -->
        <el-dialog :title="handleName" :visible.sync="editVisible" width="50%">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form ref="form" :model="form" label-width="130px" label-position="right">
                        <el-form-item label="行程归类">
                            <template>
                                <el-checkbox-group v-model="securityList" size="small">
                                    <el-checkbox-button v-for="(s, i) in xcgl" :label="s" :key="i">{{ s }} </el-checkbox-button>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                        <!-- <el-form-item label="产品编号">
                            <el-input v-model="form.pro_number" @change="getProNumber"></el-input>
                        </el-form-item> -->
                        <el-form-item label="产品名称">
                            <el-input v-model="form.title" @change="getProTitle"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="供应商">
                            <el-input v-model="form.provider" @change="getProvider"></el-input>
                        </el-form-item> -->
                        <el-form-item label="封面图">
                            <el-upload
                                class="avatar-uploader"
                                :action="uploadImgUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="出发地">
                            <template>
                                <el-select v-model="form.start_city_id" filterable placeholder="请选择" @change="getStartCity">
                                    <el-option
                                        v-for="item in travelParams.cityList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="目的地">
                            <template>
                                <el-select v-model="form.end_city_id" filterable placeholder="请选择" @change="getEndCity">
                                    <el-option
                                        v-for="item in travelParams.cityList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="途径地">
                            <el-input v-model="form.accrosPlace" @change="getProTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="单房差">
                            <el-input v-model="dfc" @change="getProTitle" suffix-icon="el-icon-lx-recharge"></el-input>
                        </el-form-item>
                        <el-form-item label="成人价">
                            <el-input
                                v-model="form.adult_price"
                                size="medium"
                                @change="getAdultPrice"
                                placeholder=""
                                suffix-icon="el-icon-lx-recharge"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="儿童价">
                            <el-input
                                v-model="form.child_price"
                                suffix-icon="el-icon-lx-recharge"
                                size="medium"
                                @change="getChildPrice"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="详情图片">
                            <el-upload
                                :action="uploadImgUrl"
                                list-type="picture-card"
                                multiple
                                :file-list="detailImgList"
                                :on-success="handlePictureSuccess"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="" />
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="服务保障">
                            <template>
                                <el-checkbox-group v-model="securityList" size="small">
                                    <el-checkbox-button v-for="(s, i) in travelParams.securityList" :label="s" :key="i"
                                        >{{ s }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="交通方式">
                            <template>
                                <el-checkbox-group v-model="trafficList" size="small">
                                    <el-checkbox-button v-for="(s, i) in travelParams.trafficList" :label="s" :key="i"
                                        >{{ s }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="行程天数">
                            <template>
                                <el-select v-model="form.trip_day_id" filterable placeholder="请选择" @change="getTripDay">
                                    <el-option
                                        v-for="item in travelParams.TripList"
                                        :key="item.value"
                                        :label="item.label == '8' ? '8天及以上' : item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                        </el-form-item>
                        <el-form-item label="有效日期">
                            <el-date-picker
                                v-model="form.dateArr"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                @change="getDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item label="产品状态">
                            <el-switch v-model="form.status" active-text="上架" inactive-text="下架" @change="getStatus"> </el-switch>
                        </el-form-item> -->
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="产品特色" name="second">
                    <el-card class="box-card" style="margin-top:5px">
                        <div slot="header" class="clearfix">
                            <span>特色</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button> -->
                        </div>
                        <div class="text item">
                            <el-input type="textarea" v-model="ts" :rows="6"></el-input>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="行程安排" name="third">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick1">
                        <el-tab-pane label="第一天" name="first">
                            <el-form label-position="right" label-width="100px" >
                                <el-form-item label="行程内容">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入行程内容"
                                        v-model="form.general"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="住宿安排">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入住宿安排"
                                        v-model="form.sleep"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="浏览景点">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入浏览景点"
                                        v-model="form.scenery"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="早餐">
                                    <el-input  placeholder="请输入早餐安排" v-model="form.breakfast"></el-input>
                                </el-form-item>
                                <el-form-item label="午餐">
                                    <el-input placeholder="请输入午餐安排" v-model="form.lunch"></el-input>
                                </el-form-item>
                                <el-form-item label="晚餐">
                                    <el-input placeholder="请输入晚餐安排" v-model="form.dinner"></el-input>
                                </el-form-item>
                                <el-form-item label="自由活动">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入自由活动内容"
                                        v-model="form.relax"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="注意事项">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入注意事项"
                                        v-model="form.attention"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="第二天" name="second">
                            <el-form label-position="right" label-width="100px" >
                                <el-form-item label="行程内容">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入行程内容"
                                        v-model="form.general"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="住宿安排">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入住宿安排"
                                        v-model="form.sleep"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="浏览景点">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入浏览景点"
                                        v-model="form.scenery"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="早餐">
                                    <el-input  placeholder="请输入早餐安排" v-model="form.breakfast"></el-input>
                                </el-form-item>
                                <el-form-item label="午餐">
                                    <el-input placeholder="请输入午餐安排" v-model="form.lunch"></el-input>
                                </el-form-item>
                                <el-form-item label="晚餐">
                                    <el-input placeholder="请输入晚餐安排" v-model="form.dinner"></el-input>
                                </el-form-item>
                                <el-form-item label="自由活动">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入自由活动内容"
                                        v-model="form.relax"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="注意事项">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入注意事项"
                                        v-model="form.attention"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="费用说明" name="fourth">
                    <quill-editor ref="myTextEditor" v-model="content3" :options="editorOption"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="注意事项" name="five">
                    <quill-editor ref="myTextEditor" v-model="content4" :options="editorOption"></quill-editor>
                </el-tab-pane>
                <!-- <el-tab-pane label="费违约责任" name="six">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>旅行社违约责任</span>
                        </div>
                        <div class="text item">
                            下单后，提前7天撤单，退回全款，不扣违约金，提前2天撤单，违约金扣款团款的10%，提前 1天撤单，违约金扣款团款的20%。
                        </div>
                    </el-card>
                    <el-card class="box-card" style="margin-top:10px">
                        <div slot="header" class="clearfix">
                            <span>游客违约责任</span>
                        </div>
                        <div class="text item">
                            下单后，提前（供应商填写）天撤单，违约金扣款团款的<el-input
                                style="width:60px;margin:0 5px"
                                value="30"
                            ></el-input
                            >%；
                        </div>
                        <div class="text item" style="margin-top:6px">
                            提前<el-input style="width:60px;margin:0 5px" value="30"></el-input>天撤单，违约金扣款团款的<el-input
                                style="width:60px;margin:0 5px"
                                value="30"
                            ></el-input
                            >%；
                        </div>
                        <div class="text item" style="margin-top:6px">
                            提前<el-input style="width:60px;margin:0 5px" value="3"></el-input>天撤单，违约金扣款团款的<el-input
                                style="width:60px;margin:0 5px"
                                value="30"
                            ></el-input
                            >%。
                        </div>
                        <div class="text item" style="margin-top:10px">
                            <el-input type="textarea" :rows="6" v-model="wyzr"></el-input>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="特别提示" name="serven">
                    <quill-editor ref="myTextEditor" v-model="content6" :options="editorOption"></quill-editor>
                </el-tab-pane> -->
            </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

export default {
    name: 'basetable',
    components: {
        quillEditor
    },
    data() {
        return {
            dateVisible: false,
            ts:
                '1-新婚蜜月鲜花大床，全程0购物 轻松游云南！\n' +
                '2-洱海旅拍体验、野生菌火锅、祭火大典、洱海私人游艇、冰川大索道、高原明珠蓝月谷、西南第一湿地拉市海、敞篷吉普全嗨环洱海\n' +
                '3-新婚蜜月鲜花大床，全程0购物 轻松游云南！\n' +
                '4-洱海旅拍体验、野生菌火锅、祭火大典、洱海私人游艇、冰川大索道、高原明珠蓝月谷、西南第一湿地拉市海、敞篷吉普全嗨环洱海',
            content3:
                '费用包含：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '费用不含：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '儿童费用说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '幼儿费用说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '单房差说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            content4:
                '适合年龄：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '提供资料：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '需携带物品：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '特殊限制：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '安全提示：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                '保险说明：人民保险承保，50万游客意外伤害险，5万医疗险，国内2万遗体送返险，国外10万遗体送返险。购买成功后，拨打人保客服95518，报姓名和身份证号，查询保单。由供应商（旅行社）提供旅行社责任险。',
            wyzr:
                '如遇天灾、人祸、交通意外、交通工具误点等非供应商（旅行社）所能抵抗及控制的因素，导致包括且不限于行程取消、延期、中断、其他人身财产安全损失，旅行社和游客互不承担负责，各自承担自身的人身财产损失。旅行社有义务协助游客处理相关事情。',
            content6:
                '因本网站仅仅为交易双方提供交易平台，因此，如有投诉或纠纷，一切经济和法律事宜，与本网站无关。本网站不承担任何经济和法律责任。但本网站为维护消费者权益，及自身的声誉，本网站将为游客提供相关协助，配合游客在本地进行投诉或者诉讼等法律行为。',
            activeName: 'first',
            activeName1: 'first',
            activeName2: 'first',
            dateDialogVisible: false,
            dfc: '500',
            jd: [],
            xcgl: ['周边游', '国内游', '出境游', '特价游'],
            yljd: ['东湖', '南湖', '泰国', '新加坡', '印度尼西亚'],
            // tjd: ['武汉', '南京', '合肥', '成都'],
            query: {
                pro_number: '',
                provider: '',
                title: '',
                status: '',
                pageIndex: 1,
                pageSize: 5
            },
            show_state: '',
            searchType: '',
            search_key_word: '',
            tableData: [],
            securityList: ['无购物'],
            themeList: ['古镇水乡'],
            trafficList: ['汽车'],
            ajaxData: {
                basic: {},
                paramList: [],
                imgList: []
            },
            load_over: false,
            handleName: '',
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            start_city: '',
            end_city: '',
            travelParams: {},
            dialogImageUrl: '',
            dialogVisible: false,
            detailImgList: [],
            uploadImgUrl: '',
            imageUrl: '',
            datePickerShow: true,
            feeProps: {}
        };
    },
    created() {
        if (JSON.parse(localStorage.getItem('travelParams'))) {
            this.travelParams = JSON.parse(localStorage.getItem('travelParams'));
        } else {
            this.initparams();
        }
        this.getData();
        this.uploadImgUrl = this.base_api_url + 'web/uploadImg';
    },
    methods: {
        closeFee() {
            this.datePickerShow = false;
        },
        getFeeProps() {
            // this.feeProps = {xxx}
        },
        showPicker() {
            this.feeProps = {
                '2020-03-30': 11,
                '2020-04-01': 11,
                '2020-04-02': 11
            };
            this.datePickerShow = true;
        },

        onClick(e) {
            console.log(e);
        },
        handleTp(state) {
            var msg = '';
            var tp = '上架提醒';
            if (state == 0) {
                msg = '谨慎上架，上架后，内容不能修改、编辑，不能随意删除、不能随意下架';
                tp = '上架提醒';
            } else {
                msg = '该产品有未完成订单，请处理后再下架！';
                tp = '下架提醒';
            }
            this.$confirm(msg, tp, {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {});
        },
        getShowState(e) {
            this.query.status = e;
            this.getData();
        },
        get_key(e) {
            console.log(e);
            this.search_key_word = e;
        },
        setKey() {
            this.initQuery();
            var e = this.searchType || 1;
            if (e == 1) this.query.pro_number = this.search_key_word;
            if (e == 2) this.query.title = this.search_key_word;
            if (e == 3) this.query.provider = this.search_key_word;
        },
        initQuery() {
            this.query.pro_number = '';
            this.query.title = '';
            this.query.provider = '';
        },
        getData() {
            this.setKey();
            var that = this;
            this.load_over = false;
            this.api
                .getTravelProducts({
                    pro_number: this.query.pro_number,
                    title: this.query.title,
                    provider: this.query.provider,
                    status: this.query.status,
                    pageNum: this.query.pageIndex,
                    pageSize: this.query.pageSize
                })
                .then(res => {
                    if (res.code == '200') {
                        var data = res.data;
                        var tableData = {
                            list: [],
                            total: data.total
                        };
                        data.list.forEach(d => {
                            d.product.imgList = d.imageList;
                            d.product.paramsList = d.paramsList;
                            tableData.list.push(d.product);
                        });

                        tableData.list.forEach(v => {
                            v.through_address = ['武汉', '南京', '上海'];
                            v.avatar = that.base_api_url + v.avatar;
                            v.start_city = that.idTocity(v.start_city_id);
                            v.end_city = that.idTocity(v.end_city_id);
                            v.start_time = that.dateFormat(v.start_time, 'yyyy-MM-dd');
                            v.end_time = that.dateFormat(v.end_time, 'yyyy-MM-dd');
                            var arr = [];
                            arr.push(v.start_time);
                            arr.push(v.end_time);
                            v.dateArr = arr;
                            v.trip_day_id = v.trip_days;
                            v.trip_days = v.trip_days + '天' + (v.trip_days - 1) + '晚';
                            v.status = v.status == 1 ? true : false;
                            if (v.imgList.length > 0) {
                                var imgs = [];
                                v.imgList.forEach(img => {
                                    imgs.push(that.base_api_url + img.url);
                                });
                                v.imgList = imgs;
                            }
                            var securityList = [];
                            var themeList = [];
                            var trafficList = [];
                            if (v.paramsList.length > 0) {
                                v.paramsList.forEach(p => {
                                    if (p.category_id === 3) securityList.push(that.idToName(p.category_con_id, 3));
                                    if (p.category_id === 4) trafficList.push(that.idToName(p.category_con_id, 4));
                                    if (p.category_id === 5) themeList.push(that.idToName(p.category_con_id, 5));
                                });
                            }
                            v.securityList = securityList;
                            v.trafficList = trafficList;
                            v.themeList = themeList;
                        });
                        this.tableData = tableData.list;
                        console.log(tableData.list);
                        this.pageTotal = tableData.total || 0;
                        this.load_over = true;
                    }
                });
        },
        //获取产品编号
        getProNumber(e) {
            this.ajaxData.basic.pro_number = e;
        },
        //获取产品名称
        getProTitle(e) {
            this.ajaxData.basic.title = e;
        },
        //获取产品提供商
        getProvider(e) {
            this.ajaxData.basic.provider = e;
        },
        //获取出发地id
        getStartCity(e) {
            this.ajaxData.basic.start_city_id = e;
        },
        //获取目的地id
        getEndCity(e) {
            this.ajaxData.basic.end_city_id = e;
        },
        //获取成人价格
        getAdultPrice(e) {
            this.ajaxData.basic.adult_price = e;
        },
        //获取成人价格
        getChildPrice(e) {
            this.ajaxData.basic.child_price = e;
        },
        //获取产品的服务保障，交通类型，游玩主题等
        getParams() {
            this.ajaxData.paramList = [];
            var arr1 = this.securityList.map(item => {
                return { category_id: 3, category_con_id: this.idToName(item, 3, true) };
            });
            var arr2 = this.trafficList.map(item => {
                return { category_id: 4, category_con_id: this.idToName(item, 4, true) };
            });
            var arr3 = this.themeList.map(item => {
                return { category_id: 5, category_con_id: this.idToName(item, 5, true) };
            });
            this.ajaxData.paramList = this.ajaxData.paramList.concat(arr1, arr2, arr3);
        },

        //获取行程天数
        getTripDay(e) {
            this.ajaxData.basic.trip_days = this.idToName(e, 6);
        },
        //获取有效日期
        getDate(e) {
            this.ajaxData.basic.start_time = e[0];
            this.ajaxData.basic.end_time = e[1];
        },
        //获取产品状态
        getStatus(e) {
            this.ajaxData.basic.status = e ? 1 : 0;
        },
        handlePictureSuccess(response, file, fileList) {
            this.handleImgList(fileList);
        },
        handleRemove(file, fileList) {
            this.handleImgList(fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //图片处理
        handleImgList(fileList) {
            var imgList = [];
            var ajaxImgList = [];
            fileList.forEach(i => {
                if (i.response.code == '200') {
                    imgList.push(this.base_api_url + i.response.data);
                    ajaxImgList.push({
                        url: i.response.data
                    });
                }
            });
            this.form.imgList = imgList;
            this.ajaxData.imgList = ajaxImgList;
        },
        //参数处理
        editParam() {
            this.ajaxData.basic.id = this.form.id;
            this.ajaxData.basic.pro_number = this.form.pro_number;
            this.ajaxData.basic.title = this.form.title;
            this.ajaxData.basic.provider = this.form.provider;
            this.ajaxData.basic.avatar = this.form.avatar.replace(this.base_api_url, '');
            this.ajaxData.basic.start_city_id = this.form.start_city_id;
            this.ajaxData.basic.end_city_id = this.form.end_city_id;
            this.ajaxData.basic.start_time = this.form.dateArr[0];
            this.ajaxData.basic.end_time = this.form.dateArr[1];
            this.ajaxData.basic.adult_price = this.form.adult_price;
            this.ajaxData.basic.child_price = this.form.child_price;
            this.ajaxData.basic.trip_days = this.form.trip_day_id > 8 ? this.idToName(this.form.trip_day_id, 6) : this.form.trip_day_id;
            this.ajaxData.basic.status = this.form.status ? 1 : 0;
        },
        //城市id转为名称
        idTocity(city_id) {
            var city_name = '';
            var cityList = JSON.parse(localStorage.getItem('travelParams')).cityList;
            cityList.forEach(c => {
                if (c.value === city_id) city_name = c.label;
            });
            return city_name;
        },
        //类型转换
        idToName(d, type, reverse = false) {
            var res = '';
            var paramsList = JSON.parse(localStorage.getItem('travelParams'));
            var list = [];
            if (type === 3) list = paramsList.SecurityList;
            if (type === 4) list = paramsList.TrafficList;
            if (type === 5) list = paramsList.ThemeList;
            if (type === 6) list = paramsList.TripList;

            list.forEach(s => {
                if (reverse) {
                    if (s.label === d) res = s.value;
                } else {
                    if (s.value === d) res = s.label;
                }
            });
            return res;
        },
        //初始化常量类型列表
        initparams() {
            var that = this;
            this.api.getCategorys().then(res => {
                if (res.code == '200') {
                    var categorys = res.data;
                    that.api.getCategoryCons().then(v => {
                        if (v.code == '200') {
                            var categoryCons = v.data;
                            var params = {
                                cityList: [],
                                SecurityList: [],
                                securityList: [],
                                ThemeList: [],
                                themeList: [],
                                TrafficList: [],
                                trafficList: [],
                                TripList: [],
                                tripList: []
                            };
                            categorys.forEach(c => {
                                categoryCons.forEach(cc => {
                                    var t = {
                                        value: cc.id,
                                        label: cc.name
                                    };
                                    if (c.id === 3 && c.id === cc.category_id) {
                                        params.SecurityList.push(t);
                                        params.securityList.push(cc.name);
                                    }
                                    if (c.id === 4 && c.id === cc.category_id) {
                                        params.TrafficList.push(t);
                                        params.trafficList.push(cc.name);
                                    }
                                    if (c.id === 5 && c.id === cc.category_id) {
                                        params.ThemeList.push(t);
                                        params.themeList.push(cc.name);
                                    }
                                    if (c.id === 6 && c.id === cc.category_id) {
                                        params.TripList.push(t);
                                        params.tripList.push(cc.name);
                                    }
                                });
                            });
                            that.api.getAllCities().then(city => {
                                if (res.code == '200') {
                                    params.cityList = that.initCity(city.data);
                                    that.travelParams = params;
                                    localStorage.setItem('travelParams', JSON.stringify(params));
                                }
                            });
                        }
                    });
                }
            });
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
        //日期格式转换
        dateFormat(date, fmt) {
            let ret;
            date = new Date(date);
            const opt = {
                'y+': date.getFullYear().toString(), // 年
                'M+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString() // 日
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
                }
            }
            return fmt;
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
        //上传图像成功
        handleAvatarSuccess(res, file) {
            if (res.code == '200') {
                this.ajaxData.basic.avatar = res.data;
                this.form.avatar = this.base_api_url + res.data;
            }
            //this.imageUrl = URL.createObjectURL(file.raw);
            //console.log(this.imageUrl)
        },
        //上传图像之前图片类型和大小检验
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            // this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;
            return true;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            var that = this;
            // 二次确认删除
            this.$confirm('该产品下架未满一个月不能删除', '提示', {
                type: 'warning'
            })
                .then(() => {
                    // this.load_over = false;
                    // this.api.deleteTP({ id: row.id }).then(res => {
                    //     if (res.code == '200') {
                    //         that.$message.success('删除成功');
                    //         that.tableData.splice(index, 1);
                    //         that.load_over = true;
                    //     }
                    // });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            var del_ids = val.map(item => {
                return item.id;
            });
            this.multipleSelection = del_ids.join(',');
            //this.multipleSelection = val;
        },
        delAllSelection() {
            var del_ids = this.multipleSelection;
            var that = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //this.load_over = false;
                    console.log(del_ids);
                    this.api.deleteTPs({ ids: del_ids }).then(res => {
                        if (res.code == '200') {
                            that.$message.success('删除成功');
                            that.getData();
                            //that.tableData.splice(index, 1);
                            //that.load_over = true;
                        }
                    });
                })
                .catch(() => {});
            // const length = this.multipleSelection.length;
            // let str = '';
            // this.delList = this.delList.concat(this.multipleSelection);
            // for (let i = 0; i < length; i++) {
            //     str += this.multipleSelection[i].name + ' ';
            // }
            // this.$message.error(`删除了${str}`);
            this.multipleSelection = '';
        },
        //新增
        handleAdd() {
            this.handleName = '添加产品';
            this.form = {};
            this.securityList = [];
            this.trafficList = [];
            this.themeList = [];
            this.detailImgList = [];
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.handleName = '编辑产品';
            this.idx = index;
            this.form = row;
            this.securityList = row.securityList;
            this.trafficList = row.trafficList;
            this.themeList = row.themeList;
            this.detailImgList = row.imgList.map((t, i) => {
                return { name: i + '.' + t.split('.')[1], url: t };
            });
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            var that = this;
            this.editVisible = false;
            this.getParams();
            console.log(this.ajaxData);
            if (this.handleName == '添加产品')
                this.api
                    .addTP({
                        product: this.ajaxData.basic,
                        paramsList: this.ajaxData.paramList,
                        imageList: this.ajaxData.imgList
                    })
                    .then(res => {
                        that.getData();
                    });
            else {
                this.editParam();
                //console.log(this.ajaxData)
                this.api
                    .updateTP({
                        product: this.ajaxData.basic,
                        paramsList: this.ajaxData.paramList,
                        imageList: this.ajaxData.imgList
                    })
                    .then(res => {
                        that.getData();
                    });
            }
            //this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            //this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.el-select .el-input {
    width: 130px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.el-input-group {
    width: 40% !important;
    margin-right: 15px !important;
}

.el-upload--text {
    height: 100px !important;
    width: 100px !important;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    margin-left: 10px;
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    /* width: 178px;
        height: 178px;
        line-height: 178px; */
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    /* width: 178px;
        height: 178px; */
    display: block;
}
</style>
