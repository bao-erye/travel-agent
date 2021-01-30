<template>
    <el-card shadow="hover" class="mgb20" style="height:252px;">
        <div class="user-info">
            <img :src="cropImg" 
            class="user-avator" alt />
            <div class="crop-demo-btn">更换图片
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
            </div>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper 
                ref='cropper' 
                :src="imgSrc" 
                :ready="cropImage" 
                :zoom="cropImage" 
                :cropmove="cropImage" 
                :outputSize=0.1
                style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="updateIcon">确 定</el-button>
                </span>
            </el-dialog>
            <div class="user-info-cont">
                <div class="user-info-name">{{userInfo.name}}</div>
            </div>
        </div>
        <div class="user-info-list">
            上次登录时间：
            <span>{{userInfo.lastLoginTime}}</span>
        </div>
    </el-card>
</template>

<script>
import VueCropper  from 'vue-cropperjs';
export default {
    components: {
        VueCropper
    },
    data(){
        return {    
            userInfo: '',
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.cropImg = this.userInfo.iconUrl == null?require('../../assets/img/img.jpg'): "http://localhost:8083/image/upload/"+this.userInfo.iconUrl
    },
    methods:{
        updateIcon(){
            var that = this
            this.dialogVisible = false
            this.api.updateIcon({id:that.userInfo.id,updateIcon:this.cropImg}).then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.$message.success("头像修改成功")
                    this.cropImg = "http://localhost:8083/image/upload/" + res.data.iconUrl
                    var userInfo =JSON.parse(localStorage.getItem("userInfo")) 
                    userInfo.iconUrl = res.data.iconUrl
                    localStorage.setItem("userInfo",JSON.stringify(userInfo))
                }else{
                    that.$message.error("头像修改失败")
                }
            })
        },
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop(){
            this.dialogVisible = false;
            this.cropImg = this.userInfo.avatar == null?require('../../assets/img/img.jpg'):this.base_api_url +this.userInfo.avatar;
        },
        
    }
    // 
    

}
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}
.mgb20 {
    margin-bottom: 20px;
}
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>