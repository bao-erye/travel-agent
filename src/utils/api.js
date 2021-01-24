import req from './request';

let api_base_url = req.api_base_url;
let fetch = req.fetch;
export default {

    api_base_url,

    login(params) {
        return fetch(`supplier/login`, params, 'post');
    },//登入

    out_login(params) {
        return fetch(`web/out_login`, params, 'post');
    },//登出

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
    getOrderList(params) {
        return fetch('getOrderList', params, 'post');
    },//获取反馈
    searchSpecifiedOrder(params) {
        return fetch('searchSpecifiedOrder', params, 'post');
    },//搜索指定反馈
};
