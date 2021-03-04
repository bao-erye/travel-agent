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
                <el-button style="margin-left:0" type="primary" icon="el-icon-lx-add" class="handle-del" @click="handleAdd" >新增产品
                </el-button>
                <el-select v-model="goodsState" placeholder="显示全部" class="handle-select mr10" @change="getShowState">
                    <el-option key="1" label="显示全部" value=""></el-option>
                    <el-option key="2" label="未发布" value="1"></el-option>
                    <el-option key="3" label="已发布" value="2"></el-option>
                    <el-option key="4" label="已上架" value="3"></el-option>
                    <el-option key="5" label="已下架" value="4"></el-option>
                </el-select>
                <el-input placeholder="请输入内容" v-model="search_key_word" @input="get_key" class="input-with-select" clearable>
                    <el-select style="width: 110px;" v-model="searchType" slot="prepend" placeholder="产品编号" @change="set_key">
                        <el-option label="产品编号" value="1"></el-option>
                        <el-option label="产品名称" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <!-- 商品列表 -->
            <el-table
                :data="tableData"
                v-loading="false"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
                <el-table-column prop="id" label="编号" width="60" align="center"></el-table-column>
                <el-table-column prop="name" label="产品名称" width="180" align="center"></el-table-column>
                <el-table-column prop="sold" label="销量" width="60" align="center"></el-table-column>
                <el-table-column prop="score" label="评分" width="60" align="center"></el-table-column>
                <el-table-column label="封面图" width="120" align="center">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 70px; height: 70px"
                            class="table-td-thumb"
                            :src="scope.row.coverImageUrl"
                            :preview-src-list="[scope.row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="provider" label="供应商" width="120" align="center"></el-table-column> -->
                <el-table-column label="服务保障" width="120" align="center">  <!--service_ensure-->
                    <template slot-scope="scope">
                        <!-- <div v-for="item in scope.row.securityList" :key="item">{{ item }}</div> -->
                        {{scope.row.serviceEnsure}}
                    </template>
                </el-table-column>
                <el-table-column prop="days" label="行程天数" width="60" align="center"></el-table-column>
                <el-table-column label="详情图片" width="240" align="center">
                    <template slot-scope="scope">
                        <!-- <el-carousel :interval="4000" type="card" height="70px" indicator-position="none">
                            <el-carousel-item v-for="(img, i) in scope.row.imgList" :key="i">
                                <el-image style="width: 120px; height: 70px" class="table-td-thumb" :src="img"></el-image>
                            </el-carousel-item>
                        </el-carousel> -->
                        <el-image
                            style="width: 70px; height: 70px"
                            class="table-td-thumb"
                            :src="scope.row.detailImageUrl"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="交通类型" width="120" align="center"><!--transport-->
                    <template slot-scope="scope">
                        <!-- <div v-for="item in scope.row.trafficList" :key="item">{{ item }}</div> -->
                        {{scope.row.transport}}
                    </template>
                </el-table-column>
                <el-table-column prop="begin_place" width="120" label="出发地/目的地" align="center">
                    <template slot-scope="scope">{{ scope.row.beginPlace }}/{{ scope.row.endPlace }}</template>
                </el-table-column>
                <el-table-column prop="across_place" width="120" label="途径地" align="center">
                    <template slot-scope="scope">
                        <!-- <div v-for="item in scope.row.through_address" :key="item">{{ item }}</div> -->
                        {{scope.row.acrossPlace}}
                    </template>
                </el-table-column>
                <el-table-column label="价格/结算价格/类型" width="180" align="center">
                    <template slot-scope="scope">
                        <div>￥{{ scope.row.adultPrice }}/成人</div>
                        <div>￥{{ scope.row.childPrice }}/儿童</div>
                    </template>
                </el-table-column>
                <el-table-column label="有效日期" width="120" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.earliestDate }}
                        <br />
                        至
                        <br />
                        {{ scope.row.latestDate }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="120" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state==1" >未发布</el-tag>
                        <el-tag v-else-if="scope.row.state==2" type="warning">已发布</el-tag>
                        <el-tag v-else-if="scope.row.state==3" type="success">上架中</el-tag>
                        <el-tag v-else-if="scope.row.state==4" type="info">已下架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <!-- 发布操作 -->
                        <el-button v-if="scope.row.state == 1 || scope.row.state == 4" type="text" style="color:#67C23A" icon="el-icon-s-release" @click="releaseGoods(scope.row.id)">发布</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-s-release">发布</el-button>
                        <!-- <el-button
                            type="text"
                            style="color:#409EFF"
                            :icon="scope.row.status ? 'el-icon-bottom' : 'el-icon-top'"
                            @click="handleTp(scope.row.status)"
                            >{{ scope.row.status ? '下架' : '上架' }}
                        </el-button> -->
                        <!-- 下架操作 -->
                        <el-button v-if="scope.row.state == 3"  type="text" style="color:#409EFF" icon="el-icon-bottom" @click="offGoods(scope.row.id)">下架</el-button>
                        <el-button v-else disabled type="text" style="color:#909399" icon="el-icon-bottom">下架</el-button>
                        <!-- 编辑操作 -->
                        <el-button v-if="scope.row.state==1 || scope.row.state == 4" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" style="color:#E6A23C">编辑 </el-button>
                        <el-button v-else disabled type="text" icon="el-icon-edit" style="color:#909399">编辑 </el-button>
                        <!-- 删除操作 -->
                        <el-button 
                            v-if="scope.row.state == 1 || scope.row.state == 4" 
                            type="text" 
                            icon="el-icon-delete" 
                            class="red" 
                            @click="deleteGoods(scope.row.id)"
                            style="color:#F56C6C">删除
                        </el-button>
                        <el-button v-else disabled type="text" icon="el-icon-delete" class="red" style="color:#909399">删除
                        </el-button>
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

        <!-- 编辑商品和添加商品弹出框 -->
        <el-dialog :title="handleName" :visible.sync="editVisible" width="50%">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <el-form ref="baseForm" :model="addForm" :rules="baseForm"  label-width="130px" label-position="right">
                        <el-form-item label="行程归类" prop="type">
                            <template>
                                <!-- <el-checkbox-group v-model="securityList" size="small">
                                    <el-checkbox-button v-for="(s, i) in goodsTypeList" :label="s" :key="i">{{ s }} </el-checkbox-button>
                                </el-checkbox-group> -->
                                <el-radio-group v-model="typeModel" size="small" @change="setType">
                                    <el-radio-button v-for="s in goodsTypeList" :label="s" :key="s"></el-radio-button>
                                </el-radio-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="产品名称" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="供应商">
                            <el-input v-model="form.provider" @change="getProvider"></el-input>
                        </el-form-item> -->
                        <el-form-item label="封面图" prop="coverImageUrl" ref="fileRule">
                            <el-upload
                                class="avatar-uploader"
                                name="upload"
                                v-model="addForm.coverImageUrl"
                                :action="uploadImgUrl"
                                :show-file-list="false"
                                :on-success="handleCoverImageSuccess"
                                :before-upload="beforeImageUpload"
                            >
                                <img v-if="coverImageUrl" :src="coverImageUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="出发地" prop="beginPlace">
                            <!-- <el-select v-model="form.start_city_id" filterable placeholder="请选择" @change="getStartCity">
                                <el-option
                                    v-for="item in travelParams.cityList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select> -->
                            <el-input v-model="addForm.beginPlace"></el-input>
                        </el-form-item>
                        <el-form-item label="目的地" prop="endPlace">
                            <!-- <el-select v-model="form.end_city_id" filterable placeholder="请选择" @change="getEndCity">
                                <el-option
                                    v-for="item in travelParams.cityList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select> -->
                            <el-input v-model="addForm.endPlace"></el-input>
                        </el-form-item>
                        <el-form-item label="途径地" prop="acrossPlace">
                            <el-input v-model="addForm.acrossPlace"></el-input>
                        </el-form-item>
                        <el-form-item label="单房差">
                            <el-input v-model="addForm.otherExpense" suffix-icon="el-icon-lx-recharge"></el-input>
                        </el-form-item>
                        <el-form-item label="成人价" prop="adultPrice">
                            <el-input
                                v-model="addForm.adultPrice"
                                size="medium"
                                placeholder=""
                                suffix-icon="el-icon-lx-recharge"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="儿童价" prop="childPrice">
                            <el-input
                                v-model="addForm.childPrice"
                                suffix-icon="el-icon-lx-recharge"
                                size="medium"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="详情图片" prop="detailImageUrl" ref="fileRule">
                            <!-- <el-upload
                                :action="uploadImgUrl"
                                list-type="picture-card"
                                multiple
                                :file-list="detailImgList"
                                :on-success="handleDetailImageSuccess"
                                :on-preview="handleDetailImagePreview"
                                :on-remove="handleRemove"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="" />
                            </el-dialog> -->
                            <el-upload
                                class="avatar-uploader"
                                name="upload"
                                v-model="addForm.detailImageUrl"
                                :action="uploadImgUrl"
                                :show-file-list="false"
                                :on-success="handleDetailImageSuccess"
                                :before-upload="beforeImageUpload"
                            >
                                <img v-if="detailImageUrl" :src="detailImageUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="服务保障" prop="serviceEnsure">
                            <template>
                                <el-checkbox-group v-model="serviceList" size="small" @change="serviceChange">
                                    <el-checkbox-button v-for="s in serviceEnsureList" :label="s" :key="s"
                                        >{{ s }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="交通方式" prop="transport" >
                            <template>
                                <el-checkbox-group v-model="trafficList" size="small" @change="transportChange">
                                    <el-checkbox-button v-for="s in transportList" :label="s" :key="s"
                                        >{{ s }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                        <el-form-item label="行程天数" prop="days">
                            <el-input v-model="addForm.days" @input="setSheduling" type="number" :disabled="handleDays"></el-input>
                        </el-form-item>
                        <el-form-item label="库存量" prop="stock">
                            <el-input v-model="addForm.stock" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="有效日期">
                            <el-date-picker
                                v-model="dateList"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                @change="dateChange"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                
                <el-tab-pane label="行程安排" name="second">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleTabClick">
                        <el-tab-pane  v-for="(item, i) in shedulingList" :label="'第'+Number(i+1)+'天'" :key="i" :name="'第'+Number(i+1)+'天'">
                            <el-form ref="shedulingForm" :rules="shedulingForm" label-position="right" label-width="100px" >
                                <el-form-item label="行程内容" prop="general">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入行程内容"
                                        v-model="item.general"
                                        :rows="2"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="住宿安排" prop="sleep">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入住宿安排"
                                        v-model="item.sleep"
                                        :rows="1"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="浏览景点" prop="scenery">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入浏览景点"
                                        v-model="item.scenery"
                                        :rows="5"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="早餐" prop="breakfast">
                                    <el-input  placeholder="请输入早餐安排" v-model="item.breakfast"></el-input>
                                </el-form-item>
                                <el-form-item label="午餐" prop="lunch">
                                    <el-input placeholder="请输入午餐安排" v-model="item.lunch"></el-input>
                                </el-form-item>
                                <el-form-item label="晚餐" prop="dinner">
                                    <el-input placeholder="请输入晚餐安排" v-model="item.dinner"></el-input>
                                </el-form-item>
                                <el-form-item label="自由活动" prop="relax">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入自由活动内容"
                                        v-model="item.relax"
                                        :rows="2"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="注意事项" prop="attention">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入注意事项"
                                        v-model="item.attention"
                                        :rows="4"
                                    ></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="产品特色" name="third">
                    <el-card class="box-card" style="margin-top:5px">
                        <div slot="header" class="clearfix">
                            <span>特色</span>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button> -->
                        </div>
                        <div class="text item">
                            <el-input type="textarea" v-model="addForm.characteristic" :rows="6"></el-input>
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="费用说明" name="fourth">
                    <quill-editor ref="myTextEditor" v-model="addForm.costDescription"></quill-editor>
                </el-tab-pane>
                <el-tab-pane label="注意事项" name="fifth">
                    <quill-editor ref="myTextEditor" v-model="addForm.attention"></quill-editor>
                </el-tab-pane>
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
import cityData from '../common/city-data.js';

export default {
    name: 'basetable',
    components: {
        quillEditor
    },
    data() {
        return {
            userInfo: {},// 用户信息
            query: {
                supplierId: '',
                goodsId: '',
                type: '4',
                name: '',
                state: '',
                current: 1,
                size: 4
            },
            tableData: [],// 表格数据
            pageTotal: 0,//商品总数
            goodsState: '',//商品状态查询条件
            search_key_word: '',// 搜索内容
            searchType: '1',//搜索类型
            goodsTypeList: ['国内游','周边游','国外游','特价游'],
            serviceEnsureList: ['无自费','无购物','及时确认','安心游','如实描述'],
            transportList: ['大巴','高铁','飞机','邮轮'],
            // addForm: {},
            addForm: {
                type: '',
                supplierId: '',
                name: '北京3日游',
                coverImageUrl: '',
                beginPlace: '武汉',
                endPlace: '北京',
                acrossPlace: '武汉,河南,天津',
                otherExpense: '500',
                adultPrice: '1000',
                childPrice: '800',
                detailImageUrl: '',
                serviceEnsure: '',
                transport: '',
                days: 0,
                stock: 0,
                earliestDate: '',
                latestDate: '',
                characteristic: 
                    '1-新婚蜜月鲜花大床，全程0购物 轻松游云南！\n' +
                    '2-洱海旅拍体验、野生菌火锅、祭火大典、洱海私人游艇、冰川大索道、高原明珠蓝月谷、西南第一湿地拉市海、敞篷吉普全嗨环洱海\n' +
                    '3-新婚蜜月鲜花大床，全程0购物 轻松游云南！\n' +
                    '4-洱海旅拍体验、野生菌火锅、祭火大典、洱海私人游艇、冰川大索道、高原明珠蓝月谷、西南第一湿地拉市海、敞篷吉普全嗨环洱海',
                costDescription:
                    '费用包含：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '费用不含：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '儿童费用说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '幼儿费用说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '单房差说明：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                attention:
                    '适合年龄：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '提供资料：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '需携带物品：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '特殊限制：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '安全提示：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<br/>' +
                    '保险说明：人民保险承保，50万游客意外伤害险，5万医疗险，国内2万遗体送返险，国外10万遗体送返险。购买成功后，拨打人保客服95518，报姓名和身份证号，查询保单。由供应商（旅行社）提供旅行社责任险。',

            },// 添加商品表单数据
            typeModel: '',// 所选行程归类绑定
            uploadImgUrl: '',// 图片上传地址
            coverImageUrl: '',// 上传所选择的封面图片
            detailImageUrl: '',// 详情图片
            cityData,// 城市数据
            serviceList: [],// 服务保障绑定列表
            trafficList: [],// 交通方式绑定列表
            dateList: [],// 最早日期和最晚日期
            shedulingList: [],//行程安排列表
            cascaderProps: {
                value: 'code',
                label: 'name',
                children: 'children'
            },// 选择器参数对象
            // 表单验证
            baseForm: {
                type: [{ required: true, message: '请选择行程归类', trigger: 'blur' }],
                name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
                coverImageUrl: [{ required: true, message: '请添加封面图片', trigger: 'blur' }],
                detailImageUrl: [{ required: true, message: '请添加详情图片', trigger: 'blur' }],
                beginPlace: [{ required: true, message: '请选择出发地', trigger: 'blur' }],
                endPlace: [{ required: true, message: '请选择目的地', trigger: 'blur' }],
                acrossPlace: [{ required: true, message: '请输入途径地', trigger: 'blur' }],
                adultPrice: [{ required: true, message: '请输入成人价', trigger: 'blur' }],
                childPrice: [{ required: true, message: '请输入儿童价', trigger: 'blur' }],
                serviceEnsure: [{ required: true, message: '请选择服务保障', trigger: 'blur' }],
                transport: [{ required: true, message: '请选择交通方式', trigger: 'blur' }],
                days: [{ required: true, message: '请输入行程天数', trigger: 'blur' }],
                stock: [{ required: true, message: '请输入库存量', trigger: 'blur' }]
            },
            // 表单验证
            shedulingForm: {
                general: [{ required: true, message: '请输入行程内容', trigger: 'blur' }],
                sleep: [{ required: true, message: '请输入住宿安排', trigger: 'blur' }],
                scenery: [{ required: true, message: '请输入浏览景点', trigger: 'blur' }],
                breakfast: [{ required: true, message: '请输入早餐安排', trigger: 'blur' }],
                lunch: [{ required: true, message: '请输入午餐安排', trigger: 'blur' }],
                dinner: [{ required: true, message: '请输入晚餐安排', trigger: 'blur' }],
                relax: [{ required: true, message: '请输入自由活动内容', trigger: 'blur' }],
                attention: [{ required: true, message: '请输入注意事项', trigger: 'blur' }],
            },
            handleName: '',// 弹框的显示内容
            activeName1: 'first',// 弹框tabs响应页面绑定
            activeName2: 'first',// 行程安排tabs响应页面绑定
            editVisible: false,// 控制弹框显示
            handleDays: false// 行程天数输入框是否禁用
        };
    },
    created() {
        this.uploadImgUrl = this.base_api_url + 'goods/upload';
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));// 获取供应商信息
        this.query.supplierId = this.userInfo.id;
        this.addForm.supplierId = this.userInfo.id;
        this.getListByQuery();// 获取商品列表
    },
    methods: {
        // 根据查询条件查询商品列表
        getListByQuery(){
            var that = this
            this.api.getListByQuery(that.query).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            that.tableData = res.data.records;
                            that.pageTotal = res.data.total;
                        }else{
                            that.$message.error(res.message);
                        }
                    })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getListByQuery();
        },
        // 设置商品状态查询条件
        getShowState(e) {
            this.query.state = e;
            this.getListByQuery();
        },
        // 设置搜索内容
        get_key(e) {
            this.search_key_word = e;
        },
        // 选择器变化事件
        set_key(e) {
            console.log("搜索类型"+e);
            this.searchType = e;
        },
        // 搜索点击按钮事件
        search() {
            this.initQuery();
            if(this.searchType == 1){
                this.query.goodsId = this.search_key_word;
            }else if(this.searchType == 2){
                this.query.name = this.search_key_word;
            }
            this.getListByQuery();
        },
        initQuery() {
            this.query.goodsId = '';
            this.query.name = '';
        },
        // 发布商品
        releaseGoods(id) {
            var that = this;
            var msg = '谨慎发布，发布后，商品将会提交给管理员审核，审核通过后会上架商品。因此内容不能修改、编辑，不能随意删除、不能随意下架';
            var tp = '发布提醒';
            this.$confirm(msg, tp, {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                this.api.updateGoodsState({goodsId:id,state:'2'}).then(res => {
                    console.log(res)
                    if(res.code=="200"){
                        that.$message.success("成功发布商品")
                        that.getListByQuery()
                    }else{
                        that.$message.error("发布商品失败")
                    }
                })
            })
        },
        // 下架商品
        offGoods(id) {
            var that = this;
            var msg = '谨慎下架，下架后，商品将不会显示给客户。';
            var tp = '下架提醒';
            this.$confirm(msg, tp, {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                this.api.updateGoodsState({goodsId:id,state:'4'}).then(res => {
                    console.log(res)
                    if(res.code=="200"){
                        that.$message.success("成功下架商品")
                        that.getListByQuery()
                    }else{
                        that.$message.error(res.message)
                    }
                })
            })
        },
        // 删除商品
        deleteGoods(id) {
            var that = this;
            var msg = '谨慎删除，删除后，商品信息将不会保留。';
            var tp = '删除提醒';
            this.$confirm(msg, tp, {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                that.api.deleteGoods({goodsId:id}).then(res => {
                    console.log(res)
                    if(res.code=="200"){
                        that.$message.success("成功删除商品")
                        that.getListByQuery()
                    }else{
                        that.$message.error("商品删除失败")
                    }
                })
            })
        },
        // 封面图片上传成功
        handleCoverImageSuccess(res, file) {
            console.log(res)
            this.addForm.coverImageUrl = res.data
            this.coverImageUrl = URL.createObjectURL(file.raw);
        },
        // 封面图片上传之前
        beforeImageUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 详情图片上传成功
        handleDetailImageSuccess(res, file) {
            console.log(res)
            this.addForm.detailImageUrl = res.data
            this.detailImageUrl = URL.createObjectURL(file.raw);
        },
        // 设置行程安排列表
        setSheduling(e) {
            var that = this;
            that.shedulingList = [];
            for(var i=1;i<Number(e)+1;i++){
                var sheduling = {
                    general: '天安门-故宫-颐和园-圆明园-长城-山海关',
                    sleep: '万达文华酒店',
                    scenery: '酒店享用早餐后，乘车赴西山，游览高原明珠【滇池海埂大坝】（游览时间30分钟），这里水面开阔，朝阳的余晖静静地洒在水面上。滇池又称昆明湖，是云南一大的淡水湖，素称五百里滇池，是中国第六大淡水湖。 滇池位于西山脚下，云南民族村与西山公园隔水相望，素来是昆明市度假观光和避暑的胜地。海埂本是一条自东向西横插入滇池的长堤，将滇池一分为二。埂南为滇池，埂北是草海。堤上绿树成荫，垂柳拂面，堤下是有着细软沙滩的湖水，是昆明市天然浴场。每年冬季，都会有来自西伯利亚的红嘴鸥来此过冬，你可以和这些小精灵们欢乐互动。',
                    breakfast: '酒店自助早餐，（用时：约30分钟）',
                    lunch: '自理',
                    dinner: '长街宴，（用时：约40分钟）',
                    relax: '自由活动',
                    attention: '以上行程可能会因天气、路况等原因做相应调整，敬请谅解！',
                    goodsId: ''
                };
                that.shedulingList.push(sheduling);
            }
            
        },
        // 弹出框 tabs点击事件
        handleClick(tab, event) {
            // console.log(tab);
            // console.log(event);
        },
        // 行程安排tabs点击事件
        handleTabClick(tab, event) {
            // var index = Number(tab.index);
            // console.log("这个页面的数据为:");
            // console.log(this.shedulingList[index]);
        },
        // 行程归类change事件
        setType() {
            if(this.typeModel == '国内游'){
                this.addForm.type = '1'
            } else if(this.typeModel == '周边游'){
                this.addForm.type = '2'
            } else if(this.typeModel == '国外游'){
                this.addForm.type = '3'
            } else if(this.typeModel == '特价游'){
                this.addForm.type = '4'
            }
            
        },
        // 服务保障多选框change事件
        serviceChange() {
            this.addForm.serviceEnsure = ''
            this.serviceList.forEach(e => {
                this.addForm.serviceEnsure = this.addForm.serviceEnsure + e + ','
            })
        },
        // 交通方式多选框change事件
        transportChange() {
            this.addForm.transport = ''
            this.trafficList.forEach(e => {
                this.addForm.transport = this.addForm.transport + e + ','
            })
        },
        // 日期选择器change事件
        dateChange(e) {
            this.addForm.earliestDate = e[0];
            this.addForm.latestDate = e[1];
        },
        // 提交商品信息
        saveEdit() {
            var that = this;
            console.log(that.addForm)
            console.log(that.shedulingList)
            // 基本信息表单验证
            that.$refs.baseForm.validate((valid) => {
                if (valid) {
                    if(that.handleName == '添加产品') {
                        // 发送添加商品请求
                        that.api.addGoods(that.addForm).then(res => {
                            console.log(res)
                            if(res.code=="200"){
                                that.$message.success("成功添加商品")
                                that.shedulingList.forEach( item => {
                                    // 给行程安排设置商品ID
                                    item.goodsId = res.data
                                    // 发送添加商品行程安排请求
                                    that.api.addScheduling(item).then(response => {
                                        console.log(response)
                                        if(response.code=="200"){

                                        }else {
                                            that.$message.error("添加商品行程失败")
                                        }
                                    })
                                })
                            }else{
                                that.$message.error("添加商品失败")
                            }
                            // 关闭弹框
                            that.editVisible = false;
                            // 清空表单
                            that.addForm = {}
                        })
                    }else if(that.handleName == '编辑产品') {
                        // 发送修改商品请求
                        that.api.updateGoods(that.addForm).then(res => {
                            console.log(res)
                            if(res.code=="200"){
                                that.$message.success("成功修改商品")
                                that.shedulingList.forEach( item => {
                                    // 发送更新行程安排请求
                                    that.api.updateScheduling(item).then(response => {
                                        console.log(response)
                                        if(response.code=="200"){
                                        }else {
                                            that.$message.error("修改商品行程失败")
                                        }
                                    })
                                })
                            }else{
                                that.$message.error("修改商品失败")
                            }
                            // 关闭弹框
                            that.editVisible = false;
                            // 清空表单
                            that.addForm = {};
                            // 设置天数输入可用
                            this.handleDays = false;
                        })
                    }
                } else {
                    that.$message.error("请检查填写的商品基本信息是否有遗漏或者有错误")
                }
            });
            // 刷新数据
            that.getListByQuery()
        },
        //新增产品按钮点击事件
        handleAdd() {
            this.handleName = '添加产品';
            // 清除之前绑定
            this.addForm = {};
            this.typeModel = ''
            this.coverImageUrl = ''
            this.detailImageUrl = ''
            this.serviceList = []
            this.trafficList = []
            this.dateList = []
            this.shedulingList = []
            // 显示弹框
            this.editVisible = true;
        },
        // 设置商品分类显示
        setType(type) {
            if(type == '1'){
                this.typeModel = '国内游'
            }else if(type == '2'){
                this.typeModel = '周边游'
            }else if(type == '3'){
                this.typeModel = '国外游'
            }else if(type == '4'){
                this.typeModel = '特价游'
            }
        },
        // 设置商品封面图片显示
        setCoverImage(url) {
            this.coverImageUrl = url
        },
        // 设置商品详情图片显示
        setDetailImage(url) {
            this.detailImageUrl = url
        },
        // 设置服务保障列表显示
        setServiceEnsure(service) {
            var array = service.split("，");
            this.serviceList = array
        },
        // 设置交通方式显示
        setTransport(transport) {
            var array = transport.split("，");
            this.trafficList = array
        },
        // 设置日期显示
        setDate(early,late) {
            var array = [];
            array.push(early)
            array.push(late)
            this.dateList = array
        },
        // 编辑按钮点击事件
        handleEdit(index, row) {
            // 设置显示数据
            this.handleName = '编辑产品';
            this.addForm = row
            this.setType(row.type);
            this.setCoverImage(row.coverImageUrl)
            this.setDetailImage(row.detailImageUrl)
            this.setServiceEnsure(row.serviceEnsure)
            this.setTransport(row.transport)
            this.setDate(row.earliestDate, row.latestDate)
            this.handleDays = true;// 禁止修改行程天数
            // 获取行程安排显示
            this.api.getScheduling({goodsId:row.id}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    this.$message.success("成功获取商品行程")
                    this.shedulingList = res.data
                    this.addForm.days = res.data.length
                }else {
                    this.$message.error("获取商品行程失败")
                }
            })
            this.editVisible = true;
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
