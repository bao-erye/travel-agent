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

    // loginOut(params) {
    //     return fetch(`web/out_login`, params, 'post');
    // },//登出

    //-------------------------------------------------------商品管理-------------------------------------

    getCount(params) {
        return fetch(`goods/getCount`, params, 'post')
    },// 根据商品类型获取商品总量

    getListByQuery(params) {
        return fetch(`goods/query`, params, 'get')
    },// 根据查询条件查询商品列表

    updateState(params) {
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

    //-------------------------------------------------------浏览记录管理---------------------------------

    getHistoryCount(params) {
        return fetch(`history/count`, params, 'get')
    },// 获取访问量

    addTP(params) {
        return fetch('web/addTP', params, 'post', true);
    },//新增产品

    updateTP(params) {
        return fetch('web/updateTP', params, 'post', true);
    },//更新产品

    deleteTP(params) {
        return fetch('web/deleteTP', params, 'post');
    },//删除产品

    deleteTPs(params) {
        return fetch('web/deleteTPs', params, 'post');
    },//删除产品

    uploadImg(params) {
        return fetch('web/uploadImg', params, 'post');
    },//上传图片

    getTravelProducts(params) {
        return fetch('web/getTravelProducts', params, 'get');
    },//获取产品列表

    getCategorys(params) {
        return fetch('web/getCategorys', params, 'get');
    },//获取常量类型列表

    getCategoryCons(params) {
        return fetch('web/getCategoryCons', params, 'get');
    },//获取常量内容列表

    addCategoryCons(params) {
        return fetch('web/addCategoryCons', params, 'post', true);
    },//添加常量内容列表

    updateCategoryCons(params) {
        return fetch('web/updateCategoryCons', params, 'post', true);
    },//更新常量内容列表

    deleteCategoryCons(params) {
        return fetch('web/deleteCategoryCons', params, 'post', true);
    },//更新常量内容列表
    searchSpecificCategoryCons(params) {
        return fetch('web/searchSpecificCategoryCons', params, 'post');
    },
    getAllCities(params) {
        return fetch('getAllCities', params, 'get');
    },//获取城市列表

    getUserInfo(params) {
        return fetch('web/getUserInfo', params, 'post');
    },

    upAvatar(params) {
        return fetch(`web/upAvatar`, params, 'post');
    },

    getStus(params) {
        return fetch(`rest/students`, params, 'get');
    },

    getTableData(params) {
        return fetch(`table.json`, params, 'get');
    },
    getTravelNotes(params) {
        return fetch('getTravelNotes', params, 'post');
    },// 获取游记信息
    deleteTravelNote(params) {
        return fetch('deleteTravelNote', params, 'post');
    },// 删除指定游记
    searchSpecificTravelNote(params) {
        return fetch('searchSpecificTravelNote', params, 'post');
    },//搜索指定游记
    getFeedBacks(params) {
        return fetch('web/getFeedBacks', params, 'post');
    },//获取反馈
    searchSpecifiedFeedBacks(params) {
        return fetch('web/searchSpecifiedFeedBacks', params, 'post');
    },//搜索指定反馈
    // getOrderList(params) {
    //     return fetch('getOrderList', params, 'post');
    // },//获取反馈
    searchSpecifiedOrder(params) {
        return fetch('searchSpecifiedOrder', params, 'post');
    },//搜索指定反馈
};
