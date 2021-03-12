import req from './request';

let api_base_url = req.api_base_url;
let fetch = req.fetch;
export default {

    api_base_url,

    //----------------------------------------------用户管理--------------------------------------------
    login(params) {
        return fetch(`supplier/login`, params, 'post');
    },//登入

    loginlog(params) {
        return fetch(`supplier/insert`, params, 'post', true);
    },//添加登录日志

    lastLogin(params) {
        return fetch(`supplier/lastLogin`, params, 'post');
    },// 写入上次登录时间

    register(params) {
        return fetch(`supplier/register`, params, 'post', true);
    },//注册

    updatePwd(params) {
        return fetch(`supplier/updatepwd`, params, 'post');
    },//修改密码

    updateIcon(params) {
        return fetch(`supplier/updateIcon`, params, 'post')
    },// 修改头像


    cashout(params) {
        return fetch(`supplier/cash`, params, 'get')
    },// 提现

    testToken(params) {
        return fetch(`supplier/test`, params, 'get')
    },// token验证

    //-------------------------------------------------------商品管理-------------------------------------

    getCount(params) {
        return fetch(`goods/getCount`, params, 'post')
    },// 根据商品类型获取商品总量

    getListByQuery(params) {
        return fetch(`goods/query`, params, 'get')
    },// 根据查询条件查询商品列表

    updateGoodsState(params) {
        return fetch(`goods/state`, params, 'get')
    },// 更新商品状态

    deleteGoods(params) {
        return fetch(`goods/delete`, params, 'get')
    },// 删除商品

    addGoods(params) {
        return fetch(`goods/add`, params, 'post', true)
    },// 添加商品

    addScheduling(params) {
        return fetch(`scheduling/add`, params, 'post', true)
    },//添加商品行程

    updateGoods(params) {
        return fetch(`goods/update`, params, 'post', true)
    },// 更新商品信息

    updateScheduling(params) {
        return fetch(`scheduling/update`, params, 'post', true)
    },//更新行程信息

    getScheduling(params) {
        return fetch(`scheduling/get`, params, 'get')
    },//根据商品ID获取行程信息

    getTop(params){
        return fetch(`goods/hotspot`, params, 'get')
    },// 获取热点商品top5

    //--------------------------------------------------------订单管理------------------------------------

    getOrderCount(params) {
        return fetch(`order/count`, params, 'get')
    },// 订单数量

    getChartDay(params) {
        return fetch(`order/chartDay`, params, 'get')
    },// 各商品销量，仪表盘数据

    getChartMonth(params) {
        return fetch(`order/chartMonth`, params, 'get')
    },// 各月各商品销量，仪表盘数据

    getOrderList(params) {
        return fetch(`order/get`, params, 'get')
    },// 根据查询条件获取订单列表

    getPassenger(params) {
        return fetch(`passenger/get`, params, 'get')
    },// 根据旅客ID获取旅客信息

    updateState(params) {
        return fetch(`order/updatestate`, params, 'get')
    },//更新订单状态

    deleteOrder(params) {
        return fetch(`order/delete`, params, 'get')
    },// 删除订单

    updateOrder(params) {
        return fetch(`order/update`, params, 'post',true)
    },//更新订单状态

    sumType(params) {
        return fetch(`order/sumType`, params, 'get')
    },// 获取各类产品销售额
    sumMonth(params) {
        return fetch(`order/sumMonth`, params, 'get')
    },// 获取近几月销售额

    //-------------------------------------------------------评价管理-------------------------------------
    getCommentCount(params) {
        return fetch(`comment/count`, params, 'get')
    },// 获取商品评价总数

    getGoodsComments(params) {
        return fetch(`goods/queryc`, params, 'get')
    },// 获取带评论数的商品列表

    getCommentByQuery(params) {
        return fetch(`comment/get`, params, 'get')
    },

    //-------------------------------------------------------浏览记录管理---------------------------------

    getHistoryCount(params) {
        return fetch(`history/count`, params, 'get')
    },// 获取访问量
    
    //-------------------------------------------------------资格审核--------------------------------------

    getQualification(params) {
        return fetch(`qualify/get`, params, 'get')
    },// 根据供应商ID获取资格审核材料

    updateQualify(params) {
        return fetch(`qualify/update`, params, 'post', true)
    },// 更新审核材料
    //----------------------------------------------------------------------------------------------------

};
