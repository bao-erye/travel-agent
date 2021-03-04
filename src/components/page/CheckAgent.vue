<template>
    <div>
        <div class="head">
            <div class="crumbs">
                <el-breadcrumb>
                    <el-breadcrumb-item> <i class="el-icon-files"></i> 审核认证 </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="state">
                <i class="el-icon-watch"></i>
                当前审核状态：
                <el-tag v-if="form.state == 1" type="warning" effect="dark">审核中</el-tag>
                <el-tag v-else-if="form.state == 2" type="success" effect="dark">通过</el-tag>
                <el-tag v-else-if="form.state == 3" type="danger" effect="dark">未通过</el-tag>
            </div>
        </div>
        
        
        <div class="container">
            
            <div class="main-wrap">
                <el-form :model="form" ref="baseForm" :rules="baseForm" label-position="left" label-width="170px" >
                    <el-form-item label="单位名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表姓名" prop="representName">
                        <el-input v-model="form.representName"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表电话" prop="representPhone">
                        <el-input v-model="form.representPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表身份证号码" prop="representIdcard">
                        <el-input v-model="form.representIdcard"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人姓名" prop="chargeName">
                        <el-input v-model="form.chargeName"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="chargePhone">
                        <el-input v-model="form.chargePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号码" prop="chargeIdcard">
                        <el-input v-model="form.chargeIdcard"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照副本复印件" prop="licenseImage">
                        <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload> -->
                        <el-upload
                            class="avatar-uploader"
                            name="upload"
                            v-model="form.licenseImage"
                            :action="uploadImgUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess1"
                            :before-upload="beforeImageUpload"
                        >
                            <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2M</div>
                            <div class="img-div">
                                <img v-if="licenseImage" :src="licenseImage" class="img" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="法人身份证复印件" prop="representImage">
                        <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
                        </el-upload> -->
                        <el-upload
                            class="avatar-uploader"
                            name="upload"
                            v-model="form.representImage"
                            :action="uploadImgUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess2"
                            :before-upload="beforeImageUpload"
                        >
                            <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2M</div>
                            <div class="img-div">
                                <img v-if="representImage" :src="representImage" class="img" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                            
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="负责人身份证复印件" prop="chargeImage">
                        <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload> -->
                        <el-upload
                            class="avatar-uploader"
                            name="upload"
                            v-model="form.chargeImage"
                            :action="uploadImgUrl"
                            :show-file-list="false"
                            :on-success="handleSuccess3"
                            :before-upload="beforeImageUpload"
                        >
                            <div class="el-upload__tip" slot="tip">只能上传jpg文件，且不超过2M</div>
                            <div class="img-div">
                                <img v-if="chargeImage" :src="chargeImage" class="img" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                            
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交审核</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            userInfo: {},//供应商信息
            form: {},// 表单信息
            uploadImgUrl: '',
            licenseImage: '',// 营业执照复印件
            representImage: '',// 法人身份证复印件
            chargeImage: '',// 负责人身份证复印件
            // 表单验证
            baseForm: {
                name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
                representName: [{ required: true, message: '请输入法人代表姓名', trigger: 'blur' }],
                representPhone: [{ required: true, message: '请输入法人代表电话', trigger: 'blur' }],
                representIdcard: [{ required: true, message: '请输入法人代表身份证号码', trigger: 'blur' }],
                chargeName: [{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
                chargePhone: [{ required: true, message: '请输入负责人电话', trigger: 'blur' }],
                chargeIdcard: [{ required: true, message: '请输入负责人身份证号码', trigger: 'blur' }],
                licenseImage: [{ required: true, message: '请选择营业执照副本复印件', trigger: 'blur' }],
                representImage: [{ required: true, message: '请选择法人身份证复印件', trigger: 'blur' }],
                chargeImage: [{ required: true, message: '请选择负责人身份证复印件', trigger: 'blur' }]
            },
        };
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));// 获取供应商信息
        this.uploadImgUrl = this.base_api_url + 'qualify/upload';
        this.getQualification();
    },
    methods: {
        // 获取供应商审核材料
        getQualification() {
            this.api.getQualification({supplierId:this.userInfo.id}).then(res => {
                console.log(res)
                if(res.code=="200") {
                    this.form = res.data
                    this.licenseImage = this.form.licenseImage;
                    this.representImage = this.form.representImage;
                    this.chargeImage = this.form.chargeImage;
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        // 图片上传成功
        handleSuccess1(res, file) {
            console.log(res)
            this.form.licenseImage = res.data
            this.licenseImage = URL.createObjectURL(file.raw);
        },
        // 图片上传成功
        handleSuccess2(res, file) {
            console.log(res)
            this.form.representImage = res.data
            this.representImage = URL.createObjectURL(file.raw);
        },
        // 图片上传成功
        handleSuccess3(res, file) {
            console.log(res)
            this.form.chargeImage = res.data
            this.chargeImage = URL.createObjectURL(file.raw);
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
        // 保存修改
        submit() {
            this.$refs.baseForm.validate((valid) => {
                if(valid){
                    this.api.updateQualify(this.form).then(res => {
                        console.log(res)
                        if(res.code == "200"){
                            this.$message.success('提交成功');
                        }else {
                            this.$message.error('提交失败');
                        }
                })
                }
                
            })
        }
    }
};
</script>

<style scoped>
.state{
    height: 40px;
    color: #606266;
    font-size: 14px;
}
.main-wrap {
    height: auto;
    width: 500px;
    /* margin: 50px auto; */
}
.el-form-item__label {
    width: 120px !important;
}
.img-div{
    height: 300px;
    width: 100%;
}
.img{
    width: 100%;
}
</style>
