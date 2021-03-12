<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">供应商管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="name">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <el-row type="flex" justify="space-between" style="margin-top:8px">
                    <el-col :span="12" ><router-link to="/updatePwd" class="operate">忘记密码</router-link></el-col>
                    <el-col :span="12" style="text-align:right"><router-link to="/register" class="operate">立即注册</router-link></el-col>
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
                name: '哲宇',
                password: '12345',
            },
            rules: {
                name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    created(){
        if(localStorage.getItem('userInfo'))
            this.$router.push('/dashboard')

    },
    methods: {
        submitForm() {
            var that = this
            // 验证输入是否合法
            this.$refs.login.validate(valid => {
                if (valid) {
                    that.$message = this.$message
                    // 登录验证
                    this.api.login({name:this.param.name,password:this.param.password}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
                            localStorage.setItem('token', JSON.stringify(res.data.token));
                            that.$message.success('登录成功');
                            // 登录日志
                            this.api.loginlog({userId:res.data.userInfo.id}).then(response => {
                                console.log(response)
                                if(res.code=="200"){
                                }else{
                                    that.$message.error(response.message);
                                }
                            })
                            // 写入上次登录时间
                            this.api.lastLogin({id:res.data.userInfo.id}).then(response1 => {
                                console.log(response1)
                                if (response1.code=="200") {
                                }else {
                                    that.$message.error(response1.message);
                                }
                            })
                            // 跳转页面
                            that.$router.push('/dashboard');
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
    background-image: url(../../assets/img/pic.jpg);
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
    background: rgba(102, 98, 98, 0.3);
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
    color:#fff;
}
</style>