(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c672696"],{"4f6c":function(t,e,a){"use strict";var i=a("6894"),r=a.n(i);r.a},6894:function(t,e,a){},b751:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 产品列表\n            ")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del",staticStyle:{"margin-left":"0"},attrs:{type:"primary",icon:"el-icon-lx-add"},on:{click:t.handleAdd}},[t._v("新增产品\n            ")]),a("el-button",{staticClass:"handle-del mr10",attrs:{type:"danger",icon:"el-icon-delete"},on:{click:t.delAllSelection}},[t._v("批量删除\n            ")]),a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"显示全部"},on:{change:t.getShowState},model:{value:t.show_state,callback:function(e){t.show_state=e},expression:"show_state"}},[a("el-option",{key:"1",attrs:{label:"显示全部",value:"-1"}}),a("el-option",{key:"2",attrs:{label:"上架中",value:"1"}}),a("el-option",{key:"3",attrs:{label:"已下架",value:"0"}})],1),a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{input:t.get_key},model:{value:t.search_key_word,callback:function(e){t.search_key_word=e},expression:"search_key_word"}},[a("el-select",{staticStyle:{width:"110px"},attrs:{slot:"prepend",placeholder:"产品编号"},on:{change:t.getSearchType},slot:"prepend",model:{value:t.searchType,callback:function(e){t.searchType=e},expression:"searchType"}},[a("el-option",{attrs:{label:"产品编号",value:"1"}}),a("el-option",{attrs:{label:"产品名称",value:"2"}}),a("el-option",{attrs:{label:"供应商",value:"3"}})],1),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.getData},slot:"append"})],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!t.load_over,expression:"!load_over"}],ref:"multipleTable",staticClass:"table",attrs:{data:t.tableData,border:"","header-cell-class-name":"table-header"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"60",align:"center"}}),a("el-table-column",{attrs:{prop:"pro_number",label:"产品编号",width:"120",align:"center"}}),a("el-table-column",{attrs:{prop:"title",label:"产品名称",width:"160",align:"center"}}),a("el-table-column",{attrs:{prop:"sales_volume",label:"销量",width:"90",align:"center"}}),a("el-table-column",{attrs:{prop:"eva_score",label:"评分",width:"60",align:"center"}}),a("el-table-column",{attrs:{label:"封面图",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticClass:"table-td-thumb",staticStyle:{width:"70px",height:"70px"},attrs:{src:t.row.avatar,"preview-src-list":[t.row.avatar]}})]}}])}),a("el-table-column",{attrs:{prop:"provider",label:"供应商",width:"120",align:"center"}}),a("el-table-column",{attrs:{label:"服务保障",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.securityList,(function(e){return a("div",{key:e},[t._v(t._s(e))])}))}}])}),a("el-table-column",{attrs:{prop:"trip_days",label:"行程天数",width:"90",align:"center"}}),a("el-table-column",{attrs:{label:"详情图片",width:"240",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-carousel",{attrs:{interval:4e3,type:"card",height:"70px","indicator-position":"none"}},t._l(e.row.imgList,(function(t,e){return a("el-carousel-item",{key:e},[a("el-image",{staticClass:"table-td-thumb",staticStyle:{width:"120px",height:"70px"},attrs:{src:t}})],1)})),1)]}}])}),a("el-table-column",{attrs:{label:"游玩主题",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.themeList,(function(e){return a("div",{key:e},[t._v(t._s(e))])}))}}])}),a("el-table-column",{attrs:{label:"交通类型",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.trafficList,(function(e){return a("div",{key:e},[t._v(t._s(e))])}))}}])}),a("el-table-column",{attrs:{prop:"address",width:"120",label:"出发地/目的地",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.start_city)+"/"+t._s(e.row.end_city))]}}])}),a("el-table-column",{attrs:{label:"价格",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v("￥"+t._s(e.row.adult_price)+"/成人")]),a("div",[t._v("￥"+t._s(e.row.child_price)+"/儿童")])]}}])}),a("el-table-column",{attrs:{label:"有效日期",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(e.row.start_time)+"\n                    "),a("br"),t._v("\n                    至\n                    "),a("br"),t._v("\n                    "+t._s(e.row.end_time)+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"status",width:"120",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:e.row.status?"success":"danger"}},[t._v(t._s(e.row.status?"上架中":"已下架")+"\n                    ")])]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑\n                    ")]),a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){return t.handleDelete(e.$index,e.row)}}},[t._v("删除\n                    ")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","current-page":t.query.pageIndex,"page-size":t.query.pageSize,total:t.pageTotal},on:{"current-change":t.handlePageChange}})],1)],1),a("el-dialog",{attrs:{title:t.handleName,visible:t.editVisible,width:"40%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"产品编号"}},[a("el-input",{on:{change:t.getProNumber},model:{value:t.form.pro_number,callback:function(e){t.$set(t.form,"pro_number",e)},expression:"form.pro_number"}})],1),a("el-form-item",{attrs:{label:"产品名称"}},[a("el-input",{on:{change:t.getProTitle},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),a("el-form-item",{attrs:{label:"供应商"}},[a("el-input",{on:{change:t.getProvider},model:{value:t.form.provider,callback:function(e){t.$set(t.form,"provider",e)},expression:"form.provider"}})],1),a("el-form-item",{attrs:{label:"封面图"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadImgUrl,"show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.form.avatar?a("img",{staticClass:"avatar",attrs:{src:t.form.avatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"出发地"}},[[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:t.getStartCity},model:{value:t.form.start_city_id,callback:function(e){t.$set(t.form,"start_city_id",e)},expression:"form.start_city_id"}},t._l(t.travelParams.cityList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)]],2),a("el-form-item",{attrs:{label:"目的地"}},[[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:t.getEndCity},model:{value:t.form.end_city_id,callback:function(e){t.$set(t.form,"end_city_id",e)},expression:"form.end_city_id"}},t._l(t.travelParams.cityList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)]],2),a("el-form-item",{attrs:{label:"成人价"}},[a("el-input",{attrs:{size:"medium",placeholder:"","suffix-icon":"el-icon-lx-recharge"},on:{change:t.getAdultPrice},model:{value:t.form.adult_price,callback:function(e){t.$set(t.form,"adult_price",e)},expression:"form.adult_price"}})],1),a("el-form-item",{attrs:{label:"儿童价"}},[a("el-input",{attrs:{"suffix-icon":"el-icon-lx-recharge",size:"medium"},on:{change:t.getChildPrice},model:{value:t.form.child_price,callback:function(e){t.$set(t.form,"child_price",e)},expression:"form.child_price"}})],1),a("el-form-item",{attrs:{label:"详情图片"}},[a("el-upload",{attrs:{action:t.uploadImgUrl,"list-type":"picture-card",multiple:"","file-list":t.detailImgList,"on-success":t.handlePictureSuccess,"on-preview":t.handlePictureCardPreview,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1),a("el-form-item",{attrs:{label:"服务保障"}},[[a("el-checkbox-group",{attrs:{size:"small"},model:{value:t.securityList,callback:function(e){t.securityList=e},expression:"securityList"}},t._l(t.travelParams.securityList,(function(e,i){return a("el-checkbox-button",{key:i,attrs:{label:e}},[t._v(t._s(e)+"\n                        ")])})),1)]],2),a("el-form-item",{attrs:{label:"产品主题"}},[[a("el-checkbox-group",{attrs:{size:"small"},model:{value:t.themeList,callback:function(e){t.themeList=e},expression:"themeList"}},t._l(t.travelParams.themeList,(function(e,i){return a("el-checkbox-button",{key:i,attrs:{label:e}},[t._v(t._s(e)+"\n                        ")])})),1)]],2),a("el-form-item",{attrs:{label:"交通方式"}},[[a("el-checkbox-group",{attrs:{size:"small"},model:{value:t.trafficList,callback:function(e){t.trafficList=e},expression:"trafficList"}},t._l(t.travelParams.trafficList,(function(e,i){return a("el-checkbox-button",{key:i,attrs:{label:e}},[t._v(t._s(e)+"\n                        ")])})),1)]],2),a("el-form-item",{attrs:{label:"行程天数"}},[[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},on:{change:t.getTripDay},model:{value:t.form.trip_day_id,callback:function(e){t.$set(t.form,"trip_day_id",e)},expression:"form.trip_day_id"}},t._l(t.travelParams.TripList,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)]],2),a("el-form-item",{attrs:{label:"有效日期"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.getDate},model:{value:t.form.dateArr,callback:function(e){t.$set(t.form,"dateArr",e)},expression:"form.dateArr"}})],1),a("el-form-item",{attrs:{label:"产品状态"}},[a("el-switch",{attrs:{"active-text":"上架","inactive-text":"下架"},on:{change:t.getStatus},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1)],1)},r=[],s=(a("28a5"),a("7514"),a("f576"),a("3b2b"),a("6b54"),a("7f7f"),a("a481"),a("ac6a"),{name:"basetable",data:function(){return{query:{pro_number:"",provider:"",title:"",status:"",pageIndex:1,pageSize:5},show_state:"",searchType:"",search_key_word:"",tableData:[],securityList:["无购物"],themeList:["古镇水乡"],trafficList:["汽车"],ajaxData:{basic:{},paramList:[],imgList:[]},load_over:!1,handleName:"",multipleSelection:[],delList:[],editVisible:!1,pageTotal:0,form:{},idx:-1,id:-1,start_city:"",end_city:"",travelParams:{},dialogImageUrl:"",dialogVisible:!1,detailImgList:[],uploadImgUrl:"",imageUrl:""}},created:function(){JSON.parse(localStorage.getItem("travelParams"))?this.travelParams=JSON.parse(localStorage.getItem("travelParams")):this.initparams(),this.getData(),this.uploadImgUrl=this.base_api_url+"web/uploadImg"},methods:{getShowState:function(t){this.query.status=t,this.getData()},get_key:function(t){console.log(t),this.search_key_word=t},setKey:function(){this.initQuery();var t=this.searchType||1;1==t&&(this.query.pro_number=this.search_key_word),2==t&&(this.query.title=this.search_key_word),3==t&&(this.query.provider=this.search_key_word)},initQuery:function(){this.query.pro_number="",this.query.title="",this.query.provider=""},getData:function(){var t=this;this.setKey();var e=this;this.load_over=!1,this.api.getTravelProducts({pro_number:this.query.pro_number,title:this.query.title,provider:this.query.provider,status:this.query.status,pageNum:this.query.pageIndex,pageSize:this.query.pageSize}).then((function(a){if("200"==a.code){var i=a.data,r={list:[],total:i.total};i.list.forEach((function(t){t.product.imgList=t.imageList,t.product.paramsList=t.paramsList,r.list.push(t.product)})),r.list.forEach((function(t){t.avatar=e.base_api_url+t.avatar,t.start_city=e.idTocity(t.start_city_id),t.end_city=e.idTocity(t.end_city_id),t.start_time=e.dateFormat(t.start_time,"yyyy-MM-dd"),t.end_time=e.dateFormat(t.end_time,"yyyy-MM-dd");var a=[];if(a.push(t.start_time),a.push(t.end_time),t.dateArr=a,t.trip_day_id=t.trip_days,t.trip_days=t.trip_days+"天"+(t.trip_days-1)+"晚",t.status=1==t.status,t.imgList.length>0){var i=[];t.imgList.forEach((function(t){i.push(e.base_api_url+t.url)})),t.imgList=i}var r=[],s=[],l=[];t.paramsList.length>0&&t.paramsList.forEach((function(t){3===t.category_id&&r.push(e.idToName(t.category_con_id,3)),4===t.category_id&&l.push(e.idToName(t.category_con_id,4)),5===t.category_id&&s.push(e.idToName(t.category_con_id,5))})),t.securityList=r,t.trafficList=l,t.themeList=s})),t.tableData=r.list,console.log(r.list),t.pageTotal=r.total||0,t.load_over=!0}}))},getProNumber:function(t){this.ajaxData.basic.pro_number=t},getProTitle:function(t){this.ajaxData.basic.title=t},getProvider:function(t){this.ajaxData.basic.provider=t},getStartCity:function(t){this.ajaxData.basic.start_city_id=t},getEndCity:function(t){this.ajaxData.basic.end_city_id=t},getAdultPrice:function(t){this.ajaxData.basic.adult_price=t},getChildPrice:function(t){this.ajaxData.basic.child_price=t},getParams:function(){var t=this;this.ajaxData.paramList=[];var e=this.securityList.map((function(e){return{category_id:3,category_con_id:t.idToName(e,3,!0)}})),a=this.trafficList.map((function(e){return{category_id:4,category_con_id:t.idToName(e,4,!0)}})),i=this.themeList.map((function(e){return{category_id:5,category_con_id:t.idToName(e,5,!0)}}));this.ajaxData.paramList=this.ajaxData.paramList.concat(e,a,i)},getTripDay:function(t){this.ajaxData.basic.trip_days=this.idToName(t,6)},getDate:function(t){this.ajaxData.basic.start_time=t[0],this.ajaxData.basic.end_time=t[1]},getStatus:function(t){this.ajaxData.basic.status=t?1:0},handlePictureSuccess:function(t,e,a){this.handleImgList(a)},handleRemove:function(t,e){this.handleImgList(e)},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handleImgList:function(t){var e=this,a=[],i=[];t.forEach((function(t){"200"==t.response.code&&(a.push(e.base_api_url+t.response.data),i.push({url:t.response.data}))})),this.form.imgList=a,this.ajaxData.imgList=i},editParam:function(){this.ajaxData.basic.id=this.form.id,this.ajaxData.basic.pro_number=this.form.pro_number,this.ajaxData.basic.title=this.form.title,this.ajaxData.basic.provider=this.form.provider,this.ajaxData.basic.avatar=this.form.avatar.replace(this.base_api_url,""),this.ajaxData.basic.start_city_id=this.form.start_city_id,this.ajaxData.basic.end_city_id=this.form.end_city_id,this.ajaxData.basic.start_time=this.form.dateArr[0],this.ajaxData.basic.end_time=this.form.dateArr[1],this.ajaxData.basic.adult_price=this.form.adult_price,this.ajaxData.basic.child_price=this.form.child_price,this.ajaxData.basic.trip_days=this.form.trip_day_id>8?this.idToName(this.form.trip_day_id,6):this.form.trip_day_id,this.ajaxData.basic.status=this.form.status?1:0},idTocity:function(t){var e="",a=JSON.parse(localStorage.getItem("travelParams")).cityList;return a.forEach((function(a){a.value===t&&(e=a.label)})),e},idToName:function(t,e){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="",r=JSON.parse(localStorage.getItem("travelParams")),s=[];return 3===e&&(s=r.SecurityList),4===e&&(s=r.TrafficList),5===e&&(s=r.ThemeList),6===e&&(s=r.TripList),s.forEach((function(e){a?e.label===t&&(i=e.value):e.value===t&&(i=e.label)})),i},initparams:function(){var t=this;this.api.getCategorys().then((function(e){if("200"==e.code){var a=e.data;t.api.getCategoryCons().then((function(i){if("200"==i.code){var r=i.data,s={cityList:[],SecurityList:[],securityList:[],ThemeList:[],themeList:[],TrafficList:[],trafficList:[],TripList:[],tripList:[]};a.forEach((function(t){r.forEach((function(e){var a={value:e.id,label:e.name};3===t.id&&t.id===e.category_id&&(s.SecurityList.push(a),s.securityList.push(e.name)),4===t.id&&t.id===e.category_id&&(s.TrafficList.push(a),s.trafficList.push(e.name)),5===t.id&&t.id===e.category_id&&(s.ThemeList.push(a),s.themeList.push(e.name)),6===t.id&&t.id===e.category_id&&(s.TripList.push(a),s.tripList.push(e.name))}))})),t.api.getAllCities().then((function(a){"200"==e.code&&(s.cityList=t.initCity(a.data),t.travelParams=s,localStorage.setItem("travelParams",JSON.stringify(s)))}))}}))}}))},initCity:function(t){var e=[];return t.forEach((function(t){var a={value:t.id,label:t.city};e.push(a)})),e},dateFormat:function(t,e){var a;t=new Date(t);var i={"y+":t.getFullYear().toString(),"M+":(t.getMonth()+1).toString(),"d+":t.getDate().toString()};for(var r in i)a=new RegExp("("+r+")").exec(e),a&&(e=e.replace(a[1],1==a[1].length?i[r]:i[r].padStart(a[1].length,"0")));return e},uniArr:function(t){var e=t.reduce((function(t,e){return t.find((function(t){return t.category_con_id==e.category_con_id}))||t.push(e),t}),[]);return e},handleAvatarSuccess:function(t,e){"200"==t.code&&(this.ajaxData.basic.avatar=t.data,this.form.avatar=this.base_api_url+t.data)},beforeAvatarUpload:function(t){return!0},handleSearch:function(){this.$set(this.query,"pageIndex",1),this.getData()},handleDelete:function(t,e){var a=this,i=this;this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){a.load_over=!1,a.api.deleteTP({id:e.id}).then((function(e){"200"==e.code&&(i.$message.success("删除成功"),i.tableData.splice(t,1),i.load_over=!0)}))})).catch((function(){}))},handleSelectionChange:function(t){var e=t.map((function(t){return t.id}));this.multipleSelection=e.join(",")},delAllSelection:function(){var t=this,e=this.multipleSelection,a=this;this.$confirm("确定要删除吗？","提示",{type:"warning"}).then((function(){console.log(e),t.api.deleteTPs({ids:e}).then((function(t){"200"==t.code&&(a.$message.success("删除成功"),a.getData())}))})).catch((function(){})),this.multipleSelection=""},handleAdd:function(){this.handleName="添加产品",this.form={},this.securityList=[],this.trafficList=[],this.themeList=[],this.detailImgList=[],this.editVisible=!0},handleEdit:function(t,e){this.handleName="编辑产品",this.idx=t,this.form=e,this.securityList=e.securityList,this.trafficList=e.trafficList,this.themeList=e.themeList,this.detailImgList=e.imgList.map((function(t,e){return{name:e+"."+t.split(".")[1],url:t}})),this.editVisible=!0},saveEdit:function(){var t=this;this.editVisible=!1,this.getParams(),console.log(this.ajaxData),"添加产品"==this.handleName?this.api.addTP({product:this.ajaxData.basic,paramsList:this.ajaxData.paramList,imageList:this.ajaxData.imgList}).then((function(e){t.getData()})):(this.editParam(),this.api.updateTP({product:this.ajaxData.basic,paramsList:this.ajaxData.paramList,imageList:this.ajaxData.imgList}).then((function(e){t.getData()})))},handlePageChange:function(t){this.$set(this.query,"pageIndex",t),this.getData()}}}),l=s,n=(a("4f6c"),a("2877")),o=Object(n["a"])(l,i,r,!1,null,"28681d76",null);e["default"]=o.exports}}]);