<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item> <i class="el-icon-files"></i> 审核认证 </el-breadcrumb-item>
                <el-breadcrumb-item>当前审核状态:
                    <span style="color:#F56C6C">未通过</span>
                    <span style="color:#67C23A">通过</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="main-wrap">
                <el-form label-position="left" label-width="140px">
                    <el-form-item label="单位名称">
                        <el-input v-model="query.unit_name"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表姓名">
                        <el-input v-model="query.head_name"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表电话">
                        <el-input v-model="query.head_mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="法人代表身份证号码">
                        <el-input v-model="query.head_mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人姓名">
                        <el-input v-model="query.head_name"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话">
                        <el-input v-model="query.head_mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人身份证号码">
                        <el-input v-model="query.head_mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照副本复印件">
                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="法人身份证复印件">
                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="负责人身份证复印件">
                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">提交审核</el-button>
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
            query: {
                unit_name: '',
                head_name: '',
                head_mobile: ''
            }
        };
    },
    created() {},
    methods: {}
};
</script>

<style scoped>
.main-wrap {
    height: auto;
    width: 500px;
    /* margin: 50px auto; */
}
.el-form-item__label {
    width: 120px !important;
}
</style>
