<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">修改密码</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="password">
                    <el-input v-model="param.newPwd" placeholder="请输入新密码" type="password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password1">
                    <el-input v-model="password" placeholder="请再次输入新密码" type="password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="question1">
                    <el-input v-model="param.question1" disabled="true">
                        <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="answer1">
                    <el-input v-model="param.answer1" placeholder="请输入答案">
                        <el-button slot="prepend" icon="el-icon-document-checked"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="question2">
                    <el-input v-model="param.question2" disabled="true">
                        <el-button slot="prepend" icon="el-icon-key"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="answer2">
                    <el-input v-model="param.answer2" placeholder="请输入答案">
                        <el-button slot="prepend" icon="el-icon-document-checked"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">确认修改</el-button>
                </div>
                <el-row type="flex" justify="space-between" style="margin-top:8px">
                    <el-col :span="12" ></el-col>
                    <el-col :span="12" style="text-align:right"><router-link to="/login" class="operate">立即登录</router-link></el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                newPwd: '',
                question1:'你父亲的姓是什么',
                answer1:'',
                question2:'你母亲的姓是什么',
                answer2:''
            },
            password:'',
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                password1: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
                answer1: [{ required: true, message: '请输入答案', trigger: 'blur' }],
                answer2: [{ required: true, message: '请输入答案', trigger: 'blur' }],
            },
        };
    },
    created(){
    },
    methods: {
        submitForm() {
            var that = this
            this.$refs.login.validate(valid => {
                if (valid) {
                    that.$message = this.$message
                    this.api.login({name:this.param.name,password:this.param.password}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            localStorage.setItem('userInfo', JSON.stringify(res.data));
                            that.$router.push('/dashboard');
                            that.$message.success('登录成功');
                        }else{
                            that.$message.error(res.message);
                        }
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
    },
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/bg.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.operate {
    text-align:left;
    font-size:13px;
    color:#303133;
}
</style>