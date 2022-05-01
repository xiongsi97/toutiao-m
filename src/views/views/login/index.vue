<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar  title="登录"/>
      <!-- 表单 -->

      <!-- ref 获取表单 -->
  <van-form ref="loginForm" @submit="onSubmit">
  <van-field v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号" 
    type="number"
    maxlength="11"
    :rules="userFormRules.mobile"
  >
  <i slot="left-icon" class="toutiao toutiao-shouji"></i>
  </van-field>
    <!-- v-model = "user.mobile"  少写了user  注意是两个数据 是对象  -->
    <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    type="number"
    maxlength="6"
    :rules="userFormRules.code"
    >

    <!-- slot插槽 插入icon 再写自己的图标类名 -->
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

    
    <template #button>


      <!-- 倒计时写在验证按钮同级  我写错了 写在template外面了 不显示 v-else也报错 -->
      
      <!-- 倒计时 -->
      <van-count-down 
      :time="1000 * 5"  
      format="ss s" 
      v-if="countdownfaulse" 
      @finish="countdownfaulse=false"
      />



      <!-- 发送验证码 -->

       <!--  native-type="button" 仅仅点击按钮不提交表单 进行验证 -->
    <van-button 
     v-else
  
      native-type="button"
      @click="onSendSms" class="send-yzm" round size="small" type="default" >获取验证码</van-button>
    
    </template>
    </van-field>

    
     
  <div class="login-btn-wrap">
    <van-button  native-type="submit" class="login-btn" block type="info" >登录</van-button>
  </div>
</van-form>
      </div>
</template>

<script>

//login是函数 获取登陆页面数据封装的
import {login,sendSms} from '@/api/user'

export default {
name: 'LoginIndex',
components:{},
props:{},
data(){
    return{
      // 输入框输入的内容绑定变量
    user:{
      mobile:'',
      code:''
    },

    //验证规则
    userFormRules:{
      mobile:[{
        // 必填 不填提示message错误信息
        required:true,
        message:'手机号不能为空'
      },{
        //手机号规则  错误提示message  少写了错误提示信息message
        pattern:/^1[3|5|7|8]\d{9}$/,
        message:'手机号格式错误'
      }],

      //与手机号相似
      code:[{
        required:true,
        message:'手机号不能为空'
      },{
        pattern:/^\d{6}$/,
        message:'验证码格式错误'
      }]
      },
    
     
    //注意代码 嵌套关系  变量的位置
    countdownfaulse: false
    };
},
    
computed:{},
watch:{},
created(){},
mounted(){},
methods:{
     async onSubmit( ) {
      //  获取表单数据
      const user = this.user
      // 表单验证

      // 提交表单请求数据



      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration:0


      })
      try {
         const {data} = await login(this.user)
        //  console.log('登陆成功',res)

        // 登录后 获取token    mutation commit修改数据 
        this.$store.commit('setUser',data.data)

         this.$toast.success('登录成功')
      }catch (err) {
        if(err.response.status === 400){
          console.log('手机号或验证码错误',err)
          this.$toast.fail('登录失败')
        }else{
               console.log('登陆失败',err)
               this.$toast.fail('登录失败')
        }
        
      }
      // 处理数据
    },
    async onSendSms(){
      // 1.校验手机号

      try{
        //name 只获取mobile的表单内容  验证手机号  $refs  少写s
       await this.$refs.loginForm.validate('mobile')
       console.log ('验证通过')
      }catch(err){
       return console.log ('验证失败')    
      }


// 2.倒计时

//  true写错了  位置写错了 写进了catch  注意  并且'true'没有引号
      this.countdownfaulse= true   

      // 3请求发送验证码
      try{
        //少写了user await     async 搭配await 
      await sendSms(this.user.mobile)
       this.$toast('发送成功')
      }catch(err){
        // 发送失败 关闭倒计时
          this.countdownfaulse = false
        if(err.response.status === 429){
          
          // 页面提示 this.$toast
          this.$toast('发送频繁，请稍后再试')
                  console.log('发送频繁，请稍后再试')
        }else{
          this.$toast('发送失败，请稍后再试')
                  console.log('发送失败')
        }
              
      }



    }
}
}

</script>

<style scoped lang="less">


.login-container .toutiao {
  font-size: 37px;
}

.send-yzm {
  width: 158px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  color: #666666;
  font-size: 22px;
}

.login-btn-wrap {
  padding: 53px 33px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
  }
}
</style>